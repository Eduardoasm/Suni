/* eslint-disable no-plusplus */
/* eslint-disable import/namespace */
/* eslint-disable import/no-cycle */
import type {
  FilterQuery,
  ProjectionType,
  QueryOptions,
  UpdateQuery,
  UpdateWithAggregationPipeline,
} from 'mongoose';
import mongoose from 'mongoose';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { NoSentryError, paginateModel } from '../../utils';
import { ILoanRequest, LoanRequest } from './loanRequest.model';
import {
  TCreateLoanRequest,
  TCreateLoanOffer,
  TGetLoanOfferRequest,
  TGetLoanRequest,
  TGetMyLoanRequest,
  TGetMarketLoanRequests,
  TGetCostsOfRequest,
  TCancelLoanRequest,
  TGetUserRequestAmount,
  TValidateForLoanRequest,
} from './loanRequest.dto';
import * as loanOfferService from '../loanOffer/loanOffer.service';
import { ILoanOffer } from '../loanOffer';
import * as settingsService from '../settings/settings/settings.service';
import { getUserInfo } from '../../utils/walletService/userInfo';
import * as currencyService from '../currency/currency.service';
import { balanceLock, getUserWallet } from '../../utils/walletService';
import * as creditScoreService from '../creditScore/creditScore/creditScore.service';
import { validateWalletAndTransactionCurrency } from '../../utils/validations/walletCurrency';
import {
  getValidAmounts,
  validateRequestFee,
} from '../../utils/validations/request';
import { deleteBlock } from '../../utils/walletService/cancelAd';
import { convertFromUSDC } from '../../utils/coinConversion/convertFromUSDC';
import { apiPriceBtc } from '../../utils/apiPriceBtc';
import { paymentServiceFee } from '../../utils/walletService/paymentFeeService';
import * as notificationService from '../notification/notification.service';
import { sendEmail } from '../../utils/emails/wauEmail';
import { rejectOffers } from '../../utils/rejectOffers';
import * as contractService from '../contract/contract/contract.service';
import { sendNotifications } from '../../utils/pushNotifications/sendNotification';
import { ISettings } from '../settings/settings';
import { createNotification } from '../../utils/avilaServices/createNotification';

dayjs.extend(utc);
dayjs.extend(timezone);

export async function findOne(
  filter?: FilterQuery<ILoanRequest>,
  projection?: ProjectionType<ILoanRequest> | null,
  options?: QueryOptions<ILoanRequest> | null
) {
  return LoanRequest.findOne(filter, projection, options).exec();
}

export async function find(
  filter?: FilterQuery<ILoanRequest>,
  projection?: ProjectionType<ILoanRequest> | null,
  options?: QueryOptions<ILoanRequest> | null
) {
  return LoanRequest.find(filter, projection, options).exec();
}

export async function updateOne(
  filter: FilterQuery<ILoanRequest>,
  update: UpdateQuery<ILoanRequest> | UpdateWithAggregationPipeline,
  options?: QueryOptions<ILoanRequest> | null
) {
  return LoanRequest.updateOne(filter, update, options).exec();
}

export async function create(body: TCreateLoanRequest, token: string) {
  const { data: user } = await getUserInfo(token);

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const { selectedWallet, amount, installments, credolabReferenceNumber } =
      body;

    const settings = await settingsService.findOne({ active: true });

    const { userLoanRequest, serviceFee } = await validateRequestFee(
      body.currency,
      settings,
      body.amount,
      user
    );

    const { isAllowed, message } = await validateForLoanRequest(
      token,
      user,
      serviceFee,
      userLoanRequest,
      settings,
      {
        currency: body.currency,
        amount,
        selectedWallet,
        installments,
        version: body.version,
      }
    );

    if (!isAllowed) throw new NoSentryError(message);

    const credolabDataset = await creditScoreService.getCredolabDataset(
      credolabReferenceNumber
    );

    let creditScore = null;

    credolabDataset.forEach((insight) => {
      if (insight?.code === 'Score') creditScore = insight?.value?.score;
    });

    if (!creditScore) {
      throw new NoSentryError('Credolab score not available');
    }

    const createdCreditScoreUser = await creditScoreService.create(
      {
        values: {
          referenceNumber: credolabReferenceNumber,
          value: creditScore,
          provider: 'credolab',
        },
      },
      token,
      session
    );

    const currency = await currencyService.findOne({
      symbol: body?.currency?.toLowerCase(),
    });

    const userName = user?.metamapStatus?.dni_firstName ?? user?.name;

    const userLastName = user?.metamapStatus?.dni_lastName ?? user?.lastname;

    const createdLoanRequest = await LoanRequest.create(
      [
        {
          selectedWalletCurrency: currency._id,
          borrower: user?.id,
          borrowerInfo: {
            name: userName,
            lastName: userLastName,
            country: user?.metamapStatus?.country,
            dni: user?.metamapStatus?.dni_value,
            email: user?.email,
          },
          amountInUSDC: amount,
          installments,
          selectedWallet,
          country: user?.metamapStatus?.country,
          creditScore,
        },
      ],
      { session }
    );

    const creditScoreVariables = {
      name: `${userName} ${userLastName}`,
    };

    if (createdCreditScoreUser) {
      await sendEmail(
        'credolab_score_created',
        token,
        creditScoreVariables,
        null,
        user?.email
      );
    }

    const notificationBorrower = await notificationService.create(
      {
        user: createdLoanRequest[0].borrower,
        collectionName: 'loan',
        message: `Número de referencia de solicitud de préstamo: ${createdLoanRequest[0].referenceNumber}`, // Loan request reference number:
        subject: 'Se ha creado una solicitud de préstamo',
        active: true,
      },
      session
    );

    const loanRequestVariables = {
      name: `${userName} ${userLastName}`,
      application_number: `#${createdLoanRequest[0].referenceNumber}`,
    };

    await sendEmail(
      'loan_request_processed',
      token,
      loanRequestVariables,
      null,
      user?.email
    );

    if (userLoanRequest) {
      const borrowerBalanceLock = {
        token,
        walletId: selectedWallet,
        fee: serviceFee,
        service: 'loan_request',
      };

      await paymentServiceFee(borrowerBalanceLock);
    }

    await session.commitTransaction();

    return createdLoanRequest[0];
  } catch (error) {
    await session.abortTransaction();
    throw new NoSentryError(error);
  } finally {
    session.endSession();
  }
}

export async function pagination(
  page: number,
  perPage: number,
  filter?: FilterQuery<ILoanRequest>,
  projection?: ProjectionType<ILoanRequest> | null,
  options?: QueryOptions<ILoanRequest> | null
) {
  return paginateModel(page, perPage, LoanRequest, filter, projection, options);
}

export async function getMarketLoanRequests(
  body: TGetMarketLoanRequests,
  token: string
) {
  // servicio de buscar todas las solicitudes
  // obtener las solicitudes que no son mias  y sort de mayor creditscore
  const { data: user } = await getUserInfo(token);

  const filters: any = {
    status: 'active',
    active: true,
    borrower: {
      $ne: user?.id,
    },
  };

  const options: any = {
    sort: {
      creditScore: -1,
    },
  };

  return pagination(body?.page, body?.perPage, filters, null, options);
}

interface LoanOfferForRequest {
  loanRequest: ILoanRequest;
  loanOffer: ILoanOffer;
}

export async function createLoanOffer(
  body: TCreateLoanOffer,
  token: string
): Promise<LoanOfferForRequest> {
  const { data: user } = await getUserInfo(token);

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const userWallet = await getUserWallet(token, body.selectedWallet);

    await validateWalletAndTransactionCurrency(userWallet, body.currency);

    const settings = await settingsService.findOne({
      active: true,
    });

    const loanRequest = await findOne(
      {
        _id: body.loanRequest,
      },
      null,
      { session }
    );

    if (!loanRequest) {
      throw new NoSentryError('Request not found');
    }

    if (user.id === loanRequest.borrower)
      throw new NoSentryError('Cannot take your loan request');

    const day = dayjs();

    let expirationDate;
    // regla de eslint de no usar doble ternario, se cambiaron por if else si no manda expiration el front lo tomamos de los settings
    if (body.expirationHours || body.expirationMinutes) {
      expirationDate = day
        .add(body.expirationHours ?? 0, 'hour')
        .add(body.expirationMinutes ?? 0, 'minute')
        .format();
    } else if (settings.offerExpiration.type === 'minutes') {
      expirationDate = day
        .add(settings?.offerExpiration?.rate, 'minute')
        .format();
    } else {
      expirationDate = day
        .add(settings?.offerExpiration?.rate, 'hour')
        .format();
    }

    if (body.interestRate < settings?.minInterestRate)
      throw new NoSentryError(
        `Interest rate cannot be less than ${settings?.minInterestRate}`
      );

    if (body.interestRate > settings?.maxInterestRate)
      throw new NoSentryError(
        `Interest rate cannot be greater than ${settings?.maxInterestRate}`
      );

    const btcPrice = await apiPriceBtc();

    const serviceFeeInUSDC =
      settings.contractFees.lenderFee.type === 'percentage'
        ? (settings.contractFees.lenderFee.value * loanRequest.amountInUSDC) /
          100
        : settings.contractFees.lenderFee.value;

    const serviceFee = await convertFromUSDC(
      body.currency.toLowerCase(),
      btcPrice,
      serviceFeeInUSDC
    );

    const amountInSelectedWalletCurrency = await convertFromUSDC(
      body.currency.toLowerCase(),
      btcPrice,
      loanRequest.amountInUSDC
    );

    const amountPercentage =
      ((serviceFee + amountInSelectedWalletCurrency) * 1) / 100;

    if (
      serviceFee + amountInSelectedWalletCurrency + amountPercentage >
      userWallet.available_balance
    )
      throw new NoSentryError(
        'Selected wallet balance is not enough to make offer'
      );

    const block = await balanceLock({
      token,
      walletId: body.selectedWallet,
      amount: amountInSelectedWalletCurrency,
      expiresAt: expirationDate,
      serviceFee,
    });

    const userName = user?.metamapStatus?.dni_firstName ?? user?.name;

    const userLastName = user?.metamapStatus?.dni_lastName ?? user?.lastname;

    const createdLoanOffer = await loanOfferService.create(
      {
        lender: user?.id,
        lenderInfo: {
          name: userName,
          lastName: userLastName,
          country: user?.metamapStatus?.country,
          dni: user?.metamapStatus?.dni_value,
          email: user?.email,
        },
        interestRate: body.interestRate,
        selectedWallet: body.selectedWallet,
        expirationDate,
        currency: body.currency,
        amount: loanRequest.amountInUSDC,
        borrower: loanRequest.borrower,
        installments: loanRequest.installments,
        blockId: block?.data?.id,
        blockedAmountInWalletCurrency: block?.data?.amount,
        lenderFeeInUSDC: serviceFeeInUSDC,
        lenderFeeInWalletCurrency: serviceFee,
        referenceNumberOfLoanRequest: loanRequest.referenceNumber,
      },
      session
    );

    const notificationLender = await notificationService.create(
      {
        user: createdLoanOffer[0].lender,
        collectionName: 'loan',
        message: `Se ha creado una oferta de préstamo para la solicitud: ${loanRequest.referenceNumber}`, // A loan offer has been created for the loan request
        subject: 'Se ha creado una oferta de préstamo', // A loan offer has been created
        active: true,
      },
      session
    );

    const notificationBorrower = await notificationService.create(
      {
        user: createdLoanOffer[0].borrower,
        collectionName: 'loan',
        message: `Has recibido una oferta de préstamo para la solicitud: ${loanRequest.referenceNumber}`, // A loan offer has been created for the loan request
        subject: 'Has recibido una oferta de préstamo', // you have received a loan offer
        active: true,
      },
      session
    );

    let offerDuration: string;

    if (body.expirationHours || body.expirationMinutes) {
      offerDuration = `${body.expirationHours ?? 0} horas y ${
        body.expirationMinutes ?? 0
      } minutos`;
    } else if (settings.offerExpiration.type === 'minutes') {
      offerDuration = `${settings?.offerExpiration?.rate} minutos`;
    } else {
      offerDuration = `${settings?.offerExpiration?.rate} horas`;
    }

    const variables = {
      name: `${loanRequest?.borrowerInfo?.name} ${loanRequest?.borrowerInfo?.lastName}`,
      application_number: `#${loanRequest?.referenceNumber}`, // TODO what is applicaton_number?
      interest_rate: createdLoanOffer[0]?.interestRate,
      offer_duration: offerDuration,
    };

    const paramsPush = {
      token,
      userId: loanRequest.borrower,
      title: 'Oferta de préstamo recibida',
      message: `Has recibido una nueva oferta de ${createdLoanOffer[0].interestRate}%
      en tu solicitud de préstamos ${loanRequest.referenceNumber}`,
    };

    await sendNotifications(paramsPush);

    await sendEmail(
      'loan_offer_received',
      token,
      variables,
      null,
      loanRequest?.borrowerInfo?.email
    );

    await createNotification(
      // notification Oferta de préstamo recibida
      {
        messageTemplateId: '65a834012d07da37baf04e09',
        model: 'loanRequest',
        module: 'loans',
        object: loanRequest?._id,
        recipientId: loanRequest?.borrower,
        senderId: user?.id,
      },
      token
    );

    // agregar la oferta a la solicitud de prestamo
    try {
      loanRequest.offers.push(createdLoanOffer[0]._id);
      await loanRequest.save();
    } catch (error) {
      console.log(error, 'error creating loan offer');
      await deleteBlock(token, block?.data?.id);
      createdLoanOffer[0].delete();
      throw new NoSentryError('Error creating offer');
    }

    // comprobar si se creo correctamente
    if (!createdLoanOffer[0]) {
      await deleteBlock(token, block?.data?.id);
      throw new NoSentryError('Error creating offer');
    }

    await session.commitTransaction();

    return {
      loanRequest,
      loanOffer: createdLoanOffer[0],
    };
  } catch (error) {
    await session.abortTransaction();
    throw new NoSentryError(error);
  } finally {
    session.endSession();
  }
}

export async function getLoanOffersForRequest(
  body: TGetLoanRequest,
  token: string
) {
  // servicio de obtener todas las ofertas de una solicitud
  const { data: user } = await getUserInfo(token);

  if (!user) {
    throw new NoSentryError('User not found');
  }

  // obtenemos la solicitud
  const loanRequest = await LoanRequest.findOne({
    _id: body.loanRequest,
  }).populate('offers');
  // validamos que haya una solicitud
  if (!loanRequest) {
    throw new NoSentryError('Not found the loan request');
  }
  // buscamos las ofertas de esa solicitud
  const { offers } = loanRequest;

  return { loanOffers: offers };
}

export async function getOneLoanOfferForRequest(
  body: TGetLoanOfferRequest,
  token: string
): Promise<LoanOfferForRequest> {
  const { data: user } = await getUserInfo(token);

  if (!user) {
    throw new NoSentryError('User not found');
  }

  const loanRequest = await LoanRequest.findOne({
    _id: body.loanRequest,
  }).populate('offers');

  const loan = loanRequest.offers.find((element) => {
    const offer = element._id.toString() === body.loanOffer;
    return offer;
  });

  const loanOffer = await loanOfferService.findOne({ _id: loan });

  return {
    loanRequest,
    loanOffer,
  };
}

export async function getMyLoanRequests(
  body: TGetMyLoanRequest,
  token: string
) {
  const { data: user } = await getUserInfo(token);

  const filters: any = {
    borrower: user?.id,
    active: true,
    status: 'active',
  };

  if (body?.startDate && body?.endDate) {
    filters.createdAt = {
      $gte: body?.startDate ? body?.startDate : { $ne: null },
      $lte: body?.endDate ? body?.endDate : { $ne: null },
    };
  }

  if (body?.status) {
    filters.status = body?.status;
  }

  return pagination(body?.page, body?.perPage, filters);
}

export async function getUserRequestAmounts(
  token: string,
  body: TGetUserRequestAmount
) {
  const { data: user } = await getUserInfo(token);

  const settings = await settingsService.findOne({
    active: true,
  });

  const { arrOfAmounts, sumContractsRequestAmount } = await getValidAmounts(
    user?.id,
    settings.contract.allowedBlocks,
    settings.contract.amountOfBlocksAllowed
  );

  if (!body?.version) {
    return {
      amounts: arrOfAmounts,
    };
  }

  if (body?.version === 'v2') {
    return {
      minAmount: arrOfAmounts[0],
      maxAmount: arrOfAmounts[arrOfAmounts.length - 1],
      availableCredit:
        arrOfAmounts[arrOfAmounts.length - 1] - sumContractsRequestAmount,
    };
  }
}

export async function getCostsOfRequest(
  body: TGetCostsOfRequest,
  token: string
): Promise<any> {
  await getUserInfo(token);

  const settings = await settingsService.findOne({
    active: true,
  });

  const btcPrice = await apiPriceBtc();

  const serviceFeeInUSDC =
    settings.contractFees.lenderFee.type === 'percentage'
      ? (settings.contractFees.lenderFee.value * body.amountInUSDC) / 100
      : settings.contractFees.lenderFee.value;

  const serviceFee = await convertFromUSDC(
    body.currency.toLowerCase(),
    btcPrice,
    serviceFeeInUSDC
  );

  const amountInSelectedWalletCurrency = await convertFromUSDC(
    body.currency.toLowerCase(),
    btcPrice,
    body.amountInUSDC
  );

  return {
    amountInSATS: serviceFee + amountInSelectedWalletCurrency,
    amountInUSDC: serviceFeeInUSDC + body.amountInUSDC,
  };
}

export async function cancelRequest(body: TCancelLoanRequest, token: string) {
  const { data: user } = await getUserInfo(token);

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    if (!user) {
      throw new NoSentryError('User not found');
    }

    const loanRequest = await LoanRequest.findOne(
      {
        $and: [
          {
            _id: body?._id,
          },
          {
            borrower: user?.id,
          },
          {
            status: 'active',
          },
          {
            active: true,
          },
        ],
      },
      null,
      { session }
    ).populate({
      path: 'offers',
      model: 'LoanOffer',
    });

    if (!loanRequest) {
      throw new NoSentryError('Loan request not found');
    }

    await Promise.all(rejectOffers(loanRequest, token, null, session));

    loanRequest.status = 'canceled';
    await loanRequest.save();

    await session.commitTransaction();

    return loanRequest;
  } catch (error) {
    await session.abortTransaction();
    throw new NoSentryError(error);
  } finally {
    session.endSession();
  }
}

export async function validateForLoanRequest(
  token: string,
  user,
  serviceFee: number,
  userLoanRequest: ILoanRequest,
  settings: ISettings,
  body: TValidateForLoanRequest
) {
  const userWallet = await getUserWallet(token, body.selectedWallet);

  const { arrOfAmounts, sumContractsRequestAmount } = await getValidAmounts(
    user?.id,
    settings?.contract?.allowedBlocks,
    settings?.contract?.amountOfBlocksAllowed
  );
  if (!body?.version) {
    const userRequest = await LoanRequest.findOne({
      borrower: user.id,
      status: 'active',
    });

    if (userRequest) {
      return {
        isAllowed: false,
        message: 'You have an active loan application',
      };
    }

    const userContract = await contractService.findOne({
      borrower: user.id,
      status: 'active',
    });

    if (userContract) {
      return {
        isAllowed: false,
        message:
          'You have an active contract. You must finish it to request a new loan',
      };
    }

    if (!arrOfAmounts.includes(body.amount)) {
      return {
        isAllowed: false,
        message: `Invalid amount, possible request amounts are ${arrOfAmounts}`,
      };
    }
  } else if (body?.version === 'v2') {
    if (
      body.amount < arrOfAmounts[0] || // validacion de errores cuando el amount es menos o mayor al limite minimo y maximo de bloques
      body.amount > arrOfAmounts[arrOfAmounts.length - 1]
    ) {
      return {
        isAllowed: false,
        message:
          arrOfAmounts.length === 1
            ? `Invalid amount, possible request amount is ${arrOfAmounts[0]}`
            : `Invalid amount, possible request amounts are between ${
                arrOfAmounts[0]
              } and ${arrOfAmounts[arrOfAmounts.length - 1]}`,
      };
    }

    if (
      arrOfAmounts[arrOfAmounts.length - 1] - sumContractsRequestAmount <
      arrOfAmounts[0]
    ) {
      return {
        isAllowed: false,
        message:
          'The available request amount is less than the mínimum request amount',
      };
    }

    if (
      sumContractsRequestAmount + body.amount >
      arrOfAmounts[arrOfAmounts.length - 1]
    ) {
      return {
        isAllowed: false,
        message: `Amount exceeds the limit, possible request amounts are between ${
          arrOfAmounts[0]
        } and ${
          arrOfAmounts[arrOfAmounts.length - 1] - sumContractsRequestAmount
        }`,
      };
    }
  }

  if (
    body.installments < (settings?.contract?.minMonthlyPayments ?? 1) ||
    body.installments > (settings?.contract?.maxMonthlyPayments ?? 1)
  ) {
    return {
      isAllowed: false,
      message: `Invalid number of installments, value most be between ${settings.contract.minMonthlyPayments} and ${settings.contract.maxMonthlyPayments}`,
    };
  }
  try {
    await validateWalletAndTransactionCurrency(userWallet, body.currency);
  } catch (e) {
    return { isAllowed: false, message: e.message };
  }

  // Logic to pay request fee

  if (serviceFee > userWallet.available_balance && userLoanRequest)
    return {
      isAllowed: false,
      message:
        'Selected wallet available balance is not enough to make loan request',
    };

  return { isAllowed: true, message: 'User is allowed to make loan request' };
}
