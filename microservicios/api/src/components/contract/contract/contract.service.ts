/* eslint-disable no-nested-ternary */
/* eslint-disable import/no-extraneous-dependencies */
import mongoose from 'mongoose';
import type {
  AggregateOptions,
  FilterQuery,
  PipelineStage,
  ProjectionType,
  QueryOptions,
  UpdateQuery,
  UpdateWithAggregationPipeline,
} from 'mongoose';
import xl from 'excel4node';
import { Finance } from 'financejs';
import axios from 'axios';
import dayjs from 'dayjs';
import htmlToPdfMake from 'html-to-pdfmake';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import jsdom from 'jsdom';
import fs from 'fs';
import { paginateModel } from '../../../utils';
import { NoSentryError } from '../../../utils/NoSentryError';
import { apiPriceBtc } from '../../../utils/apiPriceBtc';
import {
  TGetContractsFilterByStatus,
  TGetContractsFilterByStatusByClient,
  TGetByDate,
  TCreateContract,
  TGetAmortization,
  TGetContractsByStatusInput,
  TGetContractEarning,
  TGetMyContracts,
  TSendContract,
  TGetTransactionsByLenderOrBorrower,
  TGetContractsFilterByStatusByUser,
  TGetPreCancelInfo,
  TPreCancel,
  TGetUserStats,
  TGetContractInfo,
} from './contract.dto';
import { IContract, Contract } from './contract.model';
import * as settingService from '../../settings/settings/settings.service';
import * as loanRequestService from '../../loanRequest/loanRequest.service';
import * as loanOfferService from '../../loanOffer/loanOffer.service';
import { getDay } from '../../../utils/getDay';
import { IPaymentPlan } from '../payment-plan';
import { getUserInfo } from '../../../utils/walletService/userInfo';
import { unlockBalance } from '../../../utils/walletService/amountUnlock';
import { convertFromUSDC } from '../../../utils/coinConversion/convertFromUSDC';
import * as currencyService from '../../currency/currency.service';
import { getUserWallet } from '../../../utils/walletService';
import * as signS3Service from '../../s3/s3.service';
import { sendEmail } from '../../../utils/emails/wauEmail';
import { getCountryFullName } from '../../../utils/country';
import { getMonthString } from '../../../utils/date';
import * as notificationService from '../../notification/notification.service';
import { formatWallet } from '../../../utils/formatWallet';
import { rejectOffers } from '../../../utils/rejectOffers';
import { sendNotifications } from '../../../utils/pushNotifications/sendNotification';
import { transfer } from '../../../utils/walletService/transfer';
import { getValidAmounts } from '../../../utils/validations/request';
import { getUserCredits } from '../../../utils/creditHistory/creditsReceived';
import { getUserCreditsPaidOnTime } from '../../../utils/creditHistory/creditsPaidOnTime';
import { getUserCreditsPaidLate } from '../../../utils/creditHistory/creditsPaidLate';
import * as transactionService from '../../transaction/transaction.service';
import * as userService from '../../user/user/user.service';
import { createNotification } from '../../../utils/avilaServices/createNotification';
import * as creditScoreService from '../../creditScore/creditScore/creditScore.service';

export async function findOne(
  filter?: FilterQuery<IContract>,
  projection?: ProjectionType<IContract> | null,
  options?: QueryOptions<IContract> | null
) {
  return Contract.findOne(filter, projection, options).exec();
}

export async function find(
  filter?: FilterQuery<IContract>,
  projection?: ProjectionType<IContract> | null,
  options?: QueryOptions<IContract> | null
) {
  return Contract.find(filter, projection, options).exec();
}

export async function updateOne(
  filter: FilterQuery<IContract>,
  update: UpdateQuery<IContract> | UpdateWithAggregationPipeline,
  options?: QueryOptions<IContract> | null
) {
  return Contract.updateOne(filter, update, options).exec();
}

export async function aggregate(
  pipeline?: PipelineStage[] | null,
  options?: AggregateOptions | null
) {
  return Contract.aggregate(pipeline, options);
}

export async function getContractInfo(body: TGetContractInfo) {
  const contract = await Contract.findById(body?.contractId);
  const [lenderInfo, borrowerInfo] = await Promise.all([
    userService.getWAOClient(contract?.lender),
    userService.getWAOClient(contract?.borrower),
  ]);
  const clientsInfo = {
    lender: {
      name: lenderInfo?.data?.data?.metamapStatus?.metamapStatus?.dni_firstName
        ? lenderInfo?.data?.data?.metamapStatus?.dni_firstName
        : lenderInfo?.data?.data?.name ?? '',
      lastName: lenderInfo?.data?.data?.metamapStatus?.dni_lastName
        ? lenderInfo?.data?.data?.metamapStatus?.dni_lastName
        : lenderInfo?.data?.data?.lastname ?? '',
      country: lenderInfo?.data?.data?.metamapStatus?.country ?? '',
      email: lenderInfo?.data?.data?.email ?? '',
    },
    borrower: {
      name: borrowerInfo?.data?.data?.metamapStatus?.metamapStatus
        ?.dni_firstName
        ? borrowerInfo?.data?.data?.metamapStatus?.dni_firstName
        : borrowerInfo?.data?.data?.name ?? '',
      lastName: borrowerInfo?.data?.data?.metamapStatus?.dni_lastName
        ? borrowerInfo?.data?.data?.metamapStatus?.dni_lastName
        : borrowerInfo?.data?.data?.lastname ?? '',
      country: borrowerInfo?.data?.data?.metamapStatus?.country ?? '',
      email: borrowerInfo?.data?.data?.email ?? '',
    },
  };
  return { contract, clientsInfo };
}

export async function create(
  body: TCreateContract,
  token: string
): Promise<IContract> {
  const { data: user } = await getUserInfo(token);

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const settings = await settingService.findOne({
      active: true,
    });

    const loanRequest = await (
      await loanRequestService.findOne(
        {
          offers: { $in: [body.loanOffer] },
        },
        null,
        { session }
      )
    ).populate({
      path: 'offers',
      model: 'LoanOffer',
    });

    if (!loanRequest) {
      throw new NoSentryError('Loan request does not exist');
    }

    const borrowerWallet = await getUserWallet(
      token,
      loanRequest.selectedWallet
    );

    const loanOffer = await loanOfferService.findOne(
      { _id: body.loanOffer },
      null,
      { session }
    );

    if (!loanOffer) throw new NoSentryError('Loan offer does not exist');

    if (loanRequest.borrower !== user.id) {
      throw new NoSentryError('Contract can only be created by the borrower');
    }

    const belongs = loanRequest?.offers?.find(
      (offer) => offer._id.toString() === body.loanOffer.toString()
    );

    if (!belongs) {
      throw new NoSentryError('Offer does not belong to request');
    }

    const borrowerFee: number =
      settings.contractFees.borrowerFee.type === 'percentage'
        ? (settings.contractFees.borrowerFee.value * loanRequest.amountInUSDC) /
          100
        : settings.contractFees.borrowerFee.value;

    const currency = await currencyService.findOne({
      _id: loanRequest.selectedWalletCurrency,
    });

    const btcPrice = await apiPriceBtc();

    const destServiceFee = await convertFromUSDC(
      currency.symbol.toLowerCase(),
      btcPrice,
      borrowerFee
    );

    const paymentPlan: IPaymentPlan[] = await getPaymentPlan(
      loanRequest.amountInUSDC,
      loanOffer.interestRate,
      loanRequest.installments
    );

    const createdContract = await Contract.create(
      [
        {
          loanRequest: loanRequest._id,
          loanOffer: loanOffer._id,
          lender: loanOffer.lender,
          borrower: loanRequest.borrower,
          walletTransactionsCurrency: loanRequest.selectedWalletCurrency,
          amountInUSDC: loanRequest.amountInUSDC,
          amountReceivedInWalletTransactionsCurrency:
            loanOffer.blockedAmountInWalletCurrency,
          rate: loanOffer.interestRate,
          startDate: new Date(),
          paymentPlan,
          lenderFeeInUSDC: loanOffer.lenderFeeInUSDC,
          lenderFeeInWalletTransactionsCurrency:
            loanOffer.lenderFeeInWalletCurrency,
          borrowerFeeInUSDC: borrowerFee,
          borrowerFeeInWalletTransactionsCurrency: destServiceFee,
        },
      ],
      { session }
    );

    loanRequest.status = 'closed';
    await loanRequest.save();

    loanOffer.status = 'approved';
    await loanOffer.save();

    await Promise.all(rejectOffers(loanRequest, token, loanOffer, session));

    const notificationLender = await notificationService.create(
      {
        user: loanOffer.lender,
        collectionName: 'contract',
        message: `Número de contrato: ${createdContract[0].referenceNumber}`, // Contract number
        subject: 'Se ha creado un contrato', // A contract has been created
        active: true,
      },
      session
    );

    const notificationBorrower = await notificationService.create(
      {
        user: loanOffer.borrower,
        collectionName: 'contract',
        message: `Número de contrato: ${createdContract[0].referenceNumber}`, // Contract number
        subject: 'Se ha creado un contrato', // A contract has been created
        active: true,
      },
      session
    );

    const paramsPush = {
      token,
      userId: loanOffer.lender,
      title: 'Oferta de préstamo aceptada',
      message: `Tu oferta ${loanOffer.referenceNumber} ha sido aceptada,
      se ha creado el contrato ${createdContract[0].referenceNumber} exitosamente`,
    };

    await sendNotifications(paramsPush);

    await createNotification(
      // notification Oferta aceptada
      {
        messageTemplateId: '65a8341b2d07da37baf04e0c',
        model: 'contract',
        module: 'loans',
        object: createdContract[0]?._id,
        recipientId: loanOffer?.lender,
        senderId: user?.id,
      },
      token
    );

    try {
      await sendContract(
        {
          lenderName: loanOffer?.lenderInfo?.name,
          lenderLastName: loanOffer?.lenderInfo?.lastName,
          lenderCountry: getCountryFullName(loanOffer?.lenderInfo?.country),
          lenderDni: loanOffer?.lenderInfo?.dni ?? '',
          lenderEmail: loanOffer?.lenderInfo?.email,
          borrowerName: user?.metamapStatus?.dni_firstName ?? user?.name,
          borrowerLastName: user?.metamapStatus?.dni_lastName ?? user?.lastname,
          borrowerCountry: getCountryFullName(user?.metamapStatus?.country),
          borrowerDni: user?.metamapStatus?.dni_value ?? '',
          borrowerEmail: user?.email,
          amountInUSDC: createdContract[0]?.amountInUSDC,
          installments: loanRequest?.installments,
          firstPaymentDate: paymentPlan?.[0]?.paymentDate,
          interestRate: createdContract[0]?.rate,
          moraFee: settings?.contractFees?.moraFee?.value,
          templateContent: settings?.contract?.templateContent,
          currentDay: dayjs().date().toString(),
          currentMonth: getMonthString(dayjs().month()),
          currentYear: dayjs().year().toString(),
          requestId: loanRequest?._id?.toString(),
          offerReferenceNumber: loanOffer?.referenceNumber,
        },
        token
      );
      await unlockBalance({
        token,
        toWalletId: loanRequest.selectedWallet,
        amount: loanOffer.blockedAmountInWalletCurrency,
        destServiceFee,
        blockId: loanOffer.blockId,
      });
    } catch (error) {
      throw new NoSentryError(`Error in send contract ${error.message}`);
    }

    await session.commitTransaction();
    await transactionService.createTransaction(
      {
        contract: createdContract[0]._id,
        from: createdContract[0].lender,
        to: createdContract[0].borrower,
        amount: createdContract[0].amountInUSDC,
        lenderFee: createdContract[0].lenderFeeInUSDC,
        borrowerFee: createdContract[0].borrowerFeeInUSDC,
        interest: 0,
        type: 'investment',
      },
      createdContract[0].borrower,
      createdContract[0].lender
    );
    return createdContract[0];
  } catch (error) {
    await session.abortTransaction();
    throw new NoSentryError(error);
  } finally {
    session.endSession();
  }
}

export async function getTransactionsByLenderOrBorrower(
  body: TGetTransactionsByLenderOrBorrower
) {
  const contracts = await Contract.find({
    $or: [{ lender: body?.user }, { borrower: body?.user }],
  });
  const loanRequests = await Contract.find({
    borrower: body?.user,
  });
  return { contracts, loanRequests };
}

export async function getContractsFilterByStatus(
  body: TGetContractsFilterByStatus,
  token: string
) {
  const { data: user } = await getUserInfo(token);

  if (!user) {
    throw new NoSentryError('Invalid user');
  }

  const STATUS = ['active', 'concluded'];

  if (!body.status) {
    throw new NoSentryError('Please insert a valid status');
  }

  if (!STATUS.includes(body.status)) {
    throw new NoSentryError('Please insert a valid status');
  }

  const contracts = Contract.find({
    status: body.status,
  });
  return contracts;
}

export async function getContractsByStatus(
  body: TGetContractsByStatusInput,
  token: string
) {
  const { data: user } = await getUserInfo(token);

  if (!user) {
    throw new NoSentryError('Invalid user');
  }
  const active = await Contract.find({
    status: 'active',
    lender: user?.id ? user?.id : { $ne: null },
  });
  const concluded = await Contract.find({
    status: 'concluded',
    lender: user?.id ? user?.id : { $ne: null },
  });
  const onDefault = await Contract.find({
    onDefault: true,
    lender: user?.id ? user?.id : { $ne: null },
  });
  const contracts = await Contract.find({
    lender: user?.id ? user?.id : { $ne: null },
  });
  return {
    active,
    concluded,
    onDefault,
    contracts,
  };
}

export async function getContractsFilterByStatusByClient(
  body: TGetContractsFilterByStatusByClient,
  token: string
) {
  const { data: user } = await getUserInfo(token);

  if (!user) {
    throw new NoSentryError('Invalid user');
  }

  const userContracts = Contract.find({
    $or: [{ lender: user?.id }, { borrower: user?.id }],
  });

  return userContracts;
}

export async function pagination(
  page: number,
  perPage: number,
  filter?: FilterQuery<IContract>,
  projection?: ProjectionType<IContract> | null,
  options?: QueryOptions<IContract> | null
) {
  return paginateModel(page, perPage, Contract, filter, projection, options);
}

export async function incomes() {
  const contractsData = await Contract.aggregate([
    {
      $unwind: '$paymentPlan',
    },
    {
      $group: {
        _id: { $dateToString: { format: '%Y-%m-%d', date: '$startDate' } },
        count: { $sum: 1 },
        lenderFee: {
          $sum: '$lenderFeeInUSDC',
        },
        borrowerFee: {
          $sum: '$borrowerFeeInUSDC',
        },
        paymentPlanFees: {
          $sum: '$paymentPlan.fees',
        },
      },
    },
    { $sort: { _id: 1 } },
  ]);

  const btcPriceInUsd: number = await apiPriceBtc();
  const btcPriceInSatoshi = 100000000;

  const contracts = contractsData?.map((contract) => {
    const clientsFeeInUsd =
      (contract?.lenderFee ?? 0) + (contract?.borrowerFee ?? 0);
    const clientsFeeInBtc = clientsFeeInUsd / btcPriceInUsd;
    const clientsFeeInSat = clientsFeeInBtc * btcPriceInSatoshi;
    const paymentPlanFeesInUSD = contract?.paymentPlanFees ?? 0;
    const paymentPlanFeesInBtc =
      paymentPlanFeesInUSD === 0 ? 0 : contract.paymentPlanFees / btcPriceInUsd;
    const paymentPlanFeesInSat = paymentPlanFeesInBtc * btcPriceInSatoshi;
    return {
      date: contract?._id,
      income: {
        usd: Number(clientsFeeInUsd + paymentPlanFeesInUSD),
        btc: clientsFeeInBtc + paymentPlanFeesInBtc,
        sat: clientsFeeInSat + paymentPlanFeesInSat,
      },
      count: contract?.count,
    };
  });
  return contracts;
}

export async function income() {
  const contracts = await Contract.aggregate([
    {
      $unwind: '$paymentPlan',
    },
    {
      $group: {
        _id: '$null',
        lenderFee: {
          $sum: '$lenderFee',
        },
        borrowerFee: {
          $sum: '$borrowerFee',
        },
        paymentPlanFees: {
          $sum: '$paymentPlan.fees',
        },
      },
    },
  ]);

  const btcPriceInUsd: number = await apiPriceBtc();
  const btcPriceInSatoshi = 100000000;

  const paymentPlanFees: number = Number.isNaN(
    Number(contracts[0]?.paymentPlanFees)
  )
    ? 0
    : contracts[0]?.paymentPlanFees;

  const lenderFee: number = Number.isNaN(Number(contracts[0]?.lenderFee))
    ? 0
    : contracts[0]?.lenderFee;

  const borrowerFee: number = Number.isNaN(Number(contracts[0]?.borrowerFee))
    ? 0
    : contracts[0]?.borrowerFee;

  const lenderAndBorrowerFee: number = lenderFee + borrowerFee;

  const incomeInSatoshi: number = paymentPlanFees + lenderAndBorrowerFee;

  const incomeInBtc: number = incomeInSatoshi / btcPriceInSatoshi;

  const incomeInUsd: number = btcPriceInUsd * incomeInBtc;

  return {
    usd: incomeInUsd,
    satoshi: incomeInSatoshi,
    btc: incomeInBtc,
  };
}

export async function interestRate() {
  const contracts = await Contract.aggregate([
    {
      $sort: {
        'paymentPlan.interest': 1,
      },
    },
    {
      $group: {
        _id: '$null',
        interest: {
          $push: '$$CURRENT',
        },
      },
    },
    {
      $project: {
        max: {
          $arrayElemAt: ['$interest', -1],
        },
        min: {
          $arrayElemAt: ['$interest', 0],
        },
      },
    },
  ]);

  const maxInterest: number = contracts[0]?.max?.paymentPlan?.map(
    (max) => max.interest
  );

  const minInterest: number = contracts[0]?.min?.paymentPlan?.map(
    (min) => min.interest
  );

  const mediaValue: number = maxInterest[0] + minInterest[0];

  const medInterest: number = mediaValue / 2;

  return {
    maxInterest: maxInterest[0],
    medInterest,
    minInterest: minInterest[0],
  };
}

export async function getIncomeByDate(body: TGetByDate) {
  const monday = getDay(body.startDate, 1, 6);
  const sunday = getDay(body.startDate, 7, 0);

  const contractsIncomeByDate = await Contract.aggregate([
    {
      $match: {
        startDate: {
          $gte: monday,
          $lte: sunday,
        },
      },
    },
    {
      $unwind: '$paymentPlan',
    },
    {
      $group: {
        _id: '$startDate',
        fees: {
          $sum: '$paymentPlan.fees',
        },
      },
    },
    {
      $sort: {
        _id: 1,
      },
    },
  ]);

  return { contractsIncomeByDate };
}

// export async function getIncomeByMonth(body: TGetByDate) {
//   const firstDay = new Date(
//     body.startDate.getFullYear(),
//     body.startDate.getMonth(),
//     1
//   );
//   const lastDay = new Date(
//     body.startDate.getFullYear(),
//     body.startDate.getMonth() + 1,
//     0
//   );

//   const incomesByMonth = await Contract.aggregate([
//     {
//       $unwind: '$paymentPlan',
//     },
//     {
//       $match: {
//         startDate: {
//           $gte: firstDay,
//           $lte: lastDay,
//         },
//       },
//     },
//     {
//       $group: {
//         _id: '$paymentPlan.paymentDate',
//         paymentPlanFees: {
//           $sum: '$paymentPlan.fees',
//         },
//         total: {
//           $sum: 1,
//         },
//       },
//     },
//   ]);

//   const weeks = {
//     days0To7: [],
//     days8To14: [],
//     days15To21: [],
//     days21ToEnd: [],
//   };

//   const distributeByWeeks = incomesByMonth?.map((e) => {
//     if (e._id.getDate().toString() <= 6) {
//       return weeks.days0To7.push(e);
//     }
//     if (e._id.getDate().toString() <= 13 && e._id.getDate().toString() >= 7) {
//       return weeks.days8To14.push(e);
//     }
//     if (e._id.getDate().toString() <= 20 && e._id.getDate().toString() >= 14) {
//       return weeks.days15To21.push(e);
//     }
//     return weeks.days21ToEnd.push(e);
//   });

//   console.log('soy incomes', incomesByMonth)

//   return weeks;
// }

export async function getLoansByDate(body: TGetByDate) {
  const monday = getDay(body.startDate, 1, 6);
  const sunday = getDay(body.startDate, 7, 0);

  const contractsLoansByDate = await Contract.aggregate([
    {
      $match: {
        startDate: {
          $gte: monday,
          $lte: sunday,
        },
      },
    },
    {
      $group: {
        _id: '$startDate',
        loans: {
          $sum: 1,
        },
      },
    },
    {
      $sort: {
        _id: 1,
      },
    },
  ]);

  return { contractsLoansByDate };
}

export async function getDefaultPaymentContractsByMonth() {
  const defaultPaymentContractsByMonth = await Contract.aggregate([
    {
      $unwind: '$paymentPlan',
    },
    {
      $match: {
        onDefault: true,
        $expr: {
          $gte: [
            '$paymentPlan.payment',
            {
              $subtract: [new Date(), 90 * 24 * 60 * 60 * 1000],
            },
          ],
        },
      },
    },
    {
      $addFields: {
        rangeTime: {
          $cond: {
            if: {
              $gte: [
                '$paymentPlan.payment',
                {
                  $subtract: [new Date(), 30 * 24 * 60 * 60 * 1000],
                },
              ],
            },
            then: 'range_30_now',
            else: {
              $cond: {
                if: {
                  $gte: [
                    '$paymentPlan.payment',
                    {
                      $subtract: [new Date(), 60 * 24 * 60 * 60 * 1000],
                    },
                  ],
                },
                then: 'range_60_30',
                else: {
                  $cond: {
                    if: {
                      $gte: [
                        '$paymentPlan.payment',
                        {
                          $subtract: [new Date(), 90 * 24 * 60 * 60 * 1000],
                        },
                      ],
                    },
                    then: 'range_90_60',
                    else: '$null',
                  },
                },
              },
            },
          },
        },
      },
    },
    {
      $group: {
        _id: {
          r: '$rangeTime',
        },
        total: {
          $sum: 1,
        },
      },
    },
    {
      $project: {
        rangeTime: '$_id.r',
        total: 1,
        _id: 0,
      },
    },
  ]);

  return { defaultPaymentContractsByMonth };
}

export async function getDefaultPaymentContractsByDate(body: TGetByDate) {
  const monday = getDay(body.startDate, 1, 6);
  const sunday = getDay(body.startDate, 7, 0);

  const defaultPaymentContractsByDate = await Contract.aggregate([
    {
      $unwind: '$paymentPlan',
    },
    {
      $match: {
        onDefault: true,
        'paymentPlan.payment': {
          $gte: monday,
          $lte: sunday,
        },
      },
    },
    {
      $group: {
        _id: '$paymentPlan.payment',
        paymentContracts: {
          $sum: 1,
        },
      },
    },
    {
      $sort: {
        _id: 1,
      },
    },
  ]);

  return { defaultPaymentContractsByDate };
}

interface Indicators {
  satoshiBalance: number;
  totalLoans: number;
  onDefault: number;
  concluded: number;
}

export async function indicators(): Promise<Indicators> {
  const { satoshi: satoshiBalance } = await income();

  const totalLoans = await Contract.count();

  const onDefault = await Contract.aggregate([
    {
      $match: {
        onDefault: true,
      },
    },
    {
      $count: 'onDefault',
    },
  ]);

  const concluded = await Contract.aggregate([
    {
      $match: {
        status: 'concluded',
      },
    },
    {
      $count: 'concluded',
    },
  ]);

  return {
    satoshiBalance,
    totalLoans,
    onDefault: onDefault[0]?.onDefault ?? 0,
    concluded: concluded[0]?.concluded ?? 0,
  };
}

export function userEarnings(body: TGetContractEarning) {
  const finance = new Finance();
  // // To calculate Amortization
  const financeOne: number = finance.AM(
    body.amount,
    body.interest,
    body.months,
    1
  );
  const totalAmortization: number = financeOne * body.months;

  const userGain: number = totalAmortization - body.amount;

  return {
    earning: userGain,
  };
}

export async function getPaymentPlan(
  amount: number,
  interest: number,
  months: number
): Promise<IPaymentPlan[]> {
  const monthlyInterestRate = interest / 100 / 12;
  const installment =
    interest === 0
      ? amount / months
      : (amount * monthlyInterestRate) /
        (1 - (1 + monthlyInterestRate) ** -months);
  let initialCapital = amount;
  const paymentPlan: IPaymentPlan[] = [];

  for (let month = 1; month <= months; month += 1) {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const fees = initialCapital * monthlyInterestRate;
    const capital = installment - fees;
    initialCapital -= capital;
    const paymentDate = new Date(currentDate.setMonth(currentMonth + month));

    paymentPlan.push({
      amount: installment,
      originalAmount: installment,
      rate: interest,
      fees,
      originalFees: fees,
      paymentDate,
    });
  }

  return paymentPlan;
}

export async function amortization(body: TGetAmortization) {
  const contractAmortization: IPaymentPlan[] = await getPaymentPlan(
    body.amount,
    body.interest,
    body.months
  );

  return { getAmortization: contractAmortization };
}

export async function getMyContracts(body: TGetMyContracts, token: string) {
  const { data: user } = await getUserInfo(token);

  const filters: any = {
    $or: [{ lender: user?.id }, { borrower: user?.id }],
    active: true,
  };

  if (body?.status) {
    filters.status = body?.status;
  }

  if (body?.startDate && body?.endDate) {
    filters.createdAt = {
      $gte: body?.startDate,
      $lte: body?.endDate,
    };
  }

  if (body?.role && body.role === 'lender') {
    filters.lender = user?.id;
    filters.borrower = {
      $nin: user?.id,
    };
  }

  if (body?.role && body?.role === 'borrower') {
    filters.borrower = user?.id;
    filters.lender = {
      $nin: user?.id,
    };
  }

  return pagination(body?.page, body?.perPage, filters);
}

export async function sendContract(body: TSendContract, token: string) {
  const content = Object.keys(body).reduce(
    (finalTemplateContent: string, key) =>
      finalTemplateContent.replace(key, body[key]),
    body.templateContent
  );

  const s3 = await signS3Service.signS3Service({
    filename: `${body.requestId}_contract.pdf`,
    filetype: 'application/pdf',
  });

  pdfMake.vfs = pdfFonts.pdfMake.vfs;
  const { JSDOM } = jsdom;
  const { window } = new JSDOM('');

  const html = htmlToPdfMake(content, { window });

  const docDefinition = {
    content: [html],
  };

  const pdfDocGenerator = pdfMake.createPdf(docDefinition);

  pdfDocGenerator.getBuffer(async (buffer) => {
    fs.writeFileSync('example.pdf', buffer);
    const requestOptions = {
      headers: {
        'Content-Type': 'application/pdf',
        'x-amz-acl': 'public-read',
      },
    };

    await axios.put(
      s3.signedRequest,
      fs.readFileSync('example.pdf'),
      requestOptions
    );
  });

  await sendEmail(
    'loan_contract_started_request_accepted',
    token,
    {
      name: `${body.borrowerName} ${body.borrowerLastName}`,
      application_number: `#${body.offerReferenceNumber}`,
      loan_amount: `${body.amountInUSDC} USD`,
      interest_rate: body.interestRate,
      payment_period: `${body.installments} meses`,
    },
    s3.url,
    body.borrowerEmail
  );

  await sendEmail(
    'loan_contract_started_offer_accepted',
    token,
    {
      name: `${body.lenderName} ${body.lenderLastName}`,
      contract_number: `#${body.offerReferenceNumber}`,
    },
    s3.url,
    body.lenderEmail
  );
}

export async function getContractsFilterByStatusByUser(
  body: TGetContractsFilterByStatusByUser,
  token: string
) {
  const { data: user } = await getUserInfo(token);

  const filters: any = {
    $or: [{ lender: user?.id }, { borrower: user?.id }],
  };

  if (body.status) {
    filters.status = body.status;
  }

  const options: any = {
    sort: {
      createdAt: -1,
    },
  };

  return pagination(body.page, body.perPage, filters, null, options);
}

export async function getPreCancelInfo(body: TGetPreCancelInfo, token: string) {
  const contract = await findOne({ _id: body.contractId });
  const loanRequest = await loanRequestService.findOne({
    _id: contract.loanRequest,
  });
  const btcPrice = await apiPriceBtc();
  const wallet = await getUserWallet(token, loanRequest.selectedWallet);
  if (!wallet) throw new NoSentryError('Token has expired. Login again.');
  const userWallet = await formatWallet(wallet, btcPrice);
  const capital = contract?.paymentPlan?.reduce(
    (unpaidCapital, paymentPlan) => {
      let accumulatedUnpaidCapital = unpaidCapital;
      if (!paymentPlan.paid) {
        accumulatedUnpaidCapital += paymentPlan.amount - paymentPlan.fees;
      }
      return accumulatedUnpaidCapital;
    },
    0
  );
  const currentDate = new Date();
  const currentDay = currentDate.getDate();
  const interest = (capital * currentDay * (contract.rate / 100)) / 360;
  const amountToPay = capital + interest;
  const amountToPayInSats = await convertFromUSDC(
    wallet.type,
    btcPrice,
    amountToPay
  );
  return { amountToPay, amountToPayInSats, userWallet };
}

export async function preCancel(body: TPreCancel, token: string) {
  const { data: user } = await getUserInfo(token);
  const contract = await findOne({ _id: body.contractId });
  if (!contract) throw new NoSentryError('Contract does not exist');
  if (contract.status === 'concluded')
    throw new NoSentryError('Contract has concluded');
  const loanRequest = await loanRequestService.findOne({
    _id: contract.loanRequest,
  });
  const wallet = await getUserWallet(token, loanRequest.selectedWallet);
  const btcPrice = await apiPriceBtc();
  const amountToPayInSats = await convertFromUSDC(
    wallet.type,
    btcPrice,
    body.amountToPay
  );
  const amountPercentage = (amountToPayInSats * 1) / 100;
  if (wallet.available_balance < amountToPayInSats + amountPercentage)
    throw new NoSentryError('Amount to pay not available');
  const acceptedOffer = await loanOfferService.findOne({
    _id: { $in: loanRequest.offers },
    status: 'approved',
  });

  try {
    await transfer(
      {
        amount: amountToPayInSats,
        fromWalletId: loanRequest.selectedWallet,
        toWalletId: acceptedOffer.selectedWallet,
      },
      token
    );
  } catch (error) {
    throw new NoSentryError(error.message);
  }

  // suma de todos los fee restantes para guardarlo en la transaction
  const interest = contract.paymentPlan.reduce(
    (acum, element) => (!element.paid ? acum + element.fees : acum),
    0
  );

  contract.paymentDue = false;
  const updatedPaymentPlans = contract.paymentPlan.map((paymentPlan) => {
    const { status, paid, ...rest } = paymentPlan;
    const updatedPaymentPlan = {
      status: paymentPlan.status === 'next_payment' ? 'successful' : status,
      paid: true,
      ...rest,
    };
    return updatedPaymentPlan;
  });

  contract.paymentPlan = updatedPaymentPlans;
  contract.status = 'concluded';
  contract.preCancel = true;
  await contract.save();

  await transactionService.createTransaction(
    {
      contract: contract._id,
      from: contract.borrower,
      to: contract.lender,
      amount: body.amountToPay,
      lenderFee: 0,
      borrowerFee: 0,
      interest,
      type: 'payment',
    },
    contract.borrower,
    contract.lender
  );

  const notificationVariables = {
    '{{name}}':
      `${user?.metamapStatus?.dni_firstName?.split(' ')[0]} ${
        user?.metamapStatus?.dni_lastName?.split(' ')[0]
      }` ?? user?.name,
    '{{contractNumber}}': contract?.referenceNumber,
  };

  await createNotification(
    // notification Precancelación de crédito
    {
      messageTemplateId: '65a8344d2d07da37baf04e18',
      model: 'contract',
      module: 'loans',
      object: contract?._id,
      recipientId: contract?.lender,
      senderId: user?.id,
      variables: notificationVariables,
    },
    token
  );

  return contract;
}

export async function getUserStats(body: TGetUserStats, token: string) {
  await getUserInfo(token);

  const settings = await settingService.findOne({ active: true });

  const { arrOfAmounts, sumContractsRequestAmount } = await getValidAmounts(
    body?.borrower,
    settings?.contract?.allowedBlocks,
    settings?.contract?.amountOfBlocksAllowed
  );

  const creditsReceived = await getUserCredits(body?.borrower, 'borrower');

  const creditsPaidOnTime = await getUserCreditsPaidOnTime(body?.borrower);

  const creditsPaidLate = await getUserCreditsPaidLate(body?.borrower);

  const availableCredit =
    arrOfAmounts[arrOfAmounts.length - 1] - sumContractsRequestAmount;

  return {
    minAmount: arrOfAmounts[0],
    maxAmount: arrOfAmounts[arrOfAmounts.length - 1],
    creditsReceived,
    creditsPaidOnTime,
    creditsPaidLate,
    availableCredit,
  };
}

export async function addOriginalValues() {
  const activeContracts = await Contract.find({ status: 'active' });
  for (const contract of activeContracts) {
    const originalPaymentPlan = await getPaymentPlan(
      contract.amountInUSDC,
      contract.rate,
      contract.paymentPlan.length
    );
    const newPaymentPlan: IPaymentPlan[] = contract.paymentPlan.map(
      (paymentPlan, index) => {
        paymentPlan.originalAmount = originalPaymentPlan[index].originalAmount;
        paymentPlan.originalFees = originalPaymentPlan[index].originalFees;
        return paymentPlan;
      }
    );
    contract.paymentPlan = newPaymentPlan;
  }
  return Promise.all(activeContracts.map((contract) => contract.save()));
}

export async function contractAndCreditScoreDetails() {
  const wb = new xl.Workbook();

  const ws = wb.addWorksheet('credolab_users_payments');

  const headers = [
    'Reference Number',
    'Collected Date',
    'Due Date 1',
    'Payment Date 1',
    'Due date 2',
    'Payment date 2',
    'Concluded Contract',
    'Pre Cancel',
    'On Default',
  ];

  headers.forEach((header, index) => {
    ws.cell(1, index + 1).string(header);
  });

  ws.column(1).setWidth(60);
  ws.column(2).setWidth(15);
  ws.column(3).setWidth(15);
  ws.column(4).setWidth(15);
  ws.column(5).setWidth(15);
  ws.column(6).setWidth(15);
  ws.column(8).setWidth(20);
  ws.column(7).setWidth(15);
  ws.column(9).setWidth(15);

  const contracts = await find();

  let currentRow = 2; // Comenzamos desde la segunda fila

  for (let i = 0; i <= contracts.length - 1; i += 1) {
    const userCreditScore = await creditScoreService.findOne({
      user: contracts[i]?.borrower,
    });

    const paymentsOfContract = await transactionService.find(
      {
        contract: contracts[i]?._id,
        type: 'payment',
      },
      {},
      {
        sort: {
          createdAt: 1,
        },
      }
    );

    ws.cell(currentRow, 1).string(
      userCreditScore?.values[userCreditScore.values.length - 1]
        ?.referenceNumber
    );

    ws.cell(currentRow, 2).string(
      userCreditScore?.values[userCreditScore.values.length - 1]?.createdAt
        .toISOString()
        .split('T')[0]
    );

    ws.cell(currentRow, 3).string(
      contracts[i]?.paymentPlan[0]?.paymentDate?.toISOString().split('T')[0] ??
        '-'
    );

    ws.cell(currentRow, 4).string(
      paymentsOfContract[0]?.createdAt?.toISOString().split('T')[0] ?? '-'
    );

    ws.cell(currentRow, 5).string(
      contracts[i]?.paymentPlan[1]?.paymentDate?.toISOString().split('T')[0] ??
        '-'
    );

    ws.cell(currentRow, 6).string(
      paymentsOfContract[1]?.createdAt?.toISOString().split('T')[0] ?? '-'
    );

    ws.cell(currentRow, 7).string(
      contracts[i]?.status === 'concluded' ? 'SI' : 'NO'
    );

    ws.cell(currentRow, 8).string(contracts[i]?.preCancel ? 'SI' : 'NO');

    ws.cell(currentRow, 9).string(contracts[i]?.onDefault ? 'SI' : 'NO');

    ws.row(currentRow).setHeight(25);

    currentRow += 1;
  }

  wb.write(
    `Suni-users-payment-${new Date().toISOString().slice(0, 10)}.xlsx`,
    function (err, stats) {
      if (err) {
        console.error(err);
      } else {
        console.log(stats); // Prints out an instance of a node.js fs.Stats object
      }
    }
  );

  return true;
}
