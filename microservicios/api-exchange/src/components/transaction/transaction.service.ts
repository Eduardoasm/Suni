/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-unused-expressions */
/* eslint-disable array-callback-return */
/* eslint-disable import/no-cycle */
import mongoose from 'mongoose';
import type {
  FilterQuery,
  ProjectionType,
  QueryOptions,
  UpdateQuery,
  UpdateWithAggregationPipeline,
} from 'mongoose';
import axios from 'axios';
import moment from 'moment';
import BigNumber from 'bignumber.js';
import { NoSentryError, paginateModel } from '../../utils';
import { ITransaction, Transaction } from './transaction.model';
import {
  TCreateTransaction,
  TCancelTransaction,
  TNotifyPayment,
  TReleaseCrypto,
  TGetTransactionUser,
  TGetFee,
} from './transaction.dto';
import * as listingService from '../listing/listing/listing.service';
import * as assetService from '../asset/asset.service';
import * as chatService from '../streamChat/streamChat.service';
import { getUser } from '../../utils/walletService/userWau';
import { IListing, Listing } from '../listing/listing/listing.model';
import { getUserWallet } from '../../utils/walletService/userWallet';
import { balanceLock } from '../../utils/walletService/userBalanceLock';
import { paginate } from '../../utils/pagination';
import { ISettings, Settings } from '../settings';
import { ICurrency } from '../currency';
import * as currencyService from '../currency/currency.service';
import { unlockBalance } from '../../utils/walletService/amountUnlock';
import { sendEmail } from '../../utils/emails/sendEmail';
import { amountAssetConvert } from '../../utils/amountAssetConvert';
import { validateBtcTransAmount } from '../../utils/parametersValidations/validateBtcTransAmount';
import { getCryptoHolderFee } from '../../utils/parametersValidations/getCryptoHolderFee';
import { getFiatHolderFee } from '../../utils/parametersValidations/getFiatHolderFee';
import { getCryptoHolderTransFee } from '../../utils/parametersValidations/getCryptoHolderTransFee';
import { sendNotifications } from '../../utils/pushNotifications/sendNotification';
import { maxAmountConvert } from '../../utils/maxAmountConvert';
import * as bestPriceService from '../bestPrice/bestPrice.service';
import { IAsset } from '../asset';
import { createNotification } from '../../utils/avilaServices/createNotification';

BigNumber.config({ DECIMAL_PLACES: 10, ROUNDING_MODE: 4 });

export async function getInProgressTransactions(token: string) {
  const { data: user } = await getUser(token);
  const statusTransaction = ['pending', 'payment_executed', 'payment_received'];
  const statusListing = ['active', 'taker_assigned', 'default'];
  /// Transactions as taker
  const takerTransactions = await Transaction.find({
    $and: [
      { 'taker.id': user.id },
      {
        status: {
          $in: statusTransaction,
        },
      },
    ],
  }).sort({ createdAt: -1 });

  /// Transactions as maker
  const makerListings = await Listing.find({
    'maker.id': user.id,
    status: {
      $in: statusListing,
    },
  });

  const makerTransactions = await Transaction.find({
    $and: [
      {
        listing: {
          $in: makerListings.map((e) => e._id),
        },
      },
      {
        status: {
          $in: statusTransaction,
        },
      },
    ],
  }).sort({ createdAt: -1 });

  return {
    makerTransactions,
    takerTransactions,
    totalMakerTransactions: makerTransactions.length,
    totalTakerTransactions: takerTransactions.length,
    total: makerTransactions.length + takerTransactions.length,
  };
}

export async function findOne(
  filter?: FilterQuery<ITransaction>,
  projection?: ProjectionType<ITransaction> | null,
  options?: QueryOptions<ITransaction> | null
) {
  return Transaction.findOne(filter, projection, options).exec();
}

export async function customFindOne(
  filter?: FilterQuery<ITransaction>,
  projection?: ProjectionType<ITransaction> | null,
  options?: QueryOptions<ITransaction> | null
) {
  return Transaction.findOne(filter, projection, options)
    .populate([
      {
        path: 'paymentMethod',
        model: 'PaymentMethod',
        populate: [
          {
            path: 'values',
            model: 'PaymentMethodValue',
            populate: {
              path: 'paymentMethodInput',
              model: 'PaymentMethodInput',
            },
          },
          {
            path: 'type',
            model: 'PaymentMethodCategory',
            populate: [
              {
                path: 'currency',
                model: 'Currency',
              },
              {
                path: 'paymentMethodInputs',
                model: 'PaymentMethodInput',
              },
            ],
          },
        ],
      },
      {
        path: 'listing',
        model: 'Listing',
        populate: [
          {
            path: 'currency',
            model: 'Currency',
          },
          {
            path: 'asset',
            model: 'Asset',
          },
          {
            path: 'bestPrice',
            model: 'BestPrice',
            populate: [
              {
                path: 'currency',
                model: 'Currency',
              },
              {
                path: 'asset',
                model: 'Asset',
              },
            ],
          },
          {
            path: 'paymentMethods',
            model: 'PaymentMethod',
            populate: [
              {
                path: 'values',
                model: 'PaymentMethodValue',
                populate: {
                  path: 'paymentMethodInput',
                  model: 'PaymentMethodInput',
                },
              },
              {
                path: 'type',
                model: 'PaymentMethodCategory',
                populate: [
                  {
                    path: 'currency',
                    model: 'Currency',
                  },
                  {
                    path: 'paymentMethodInputs',
                    model: 'PaymentMethodInput',
                  },
                ],
              },
            ],
          },
        ],
      },
    ])
    .exec();
}

export async function find(
  filter?: FilterQuery<ITransaction>,
  projection?: ProjectionType<ITransaction> | null,
  options?: QueryOptions<ITransaction> | null
) {
  return Transaction.find(filter, projection, options).exec();
}

export async function updateOne(
  filter: FilterQuery<ITransaction>,
  update: UpdateQuery<ITransaction> | UpdateWithAggregationPipeline,
  options?: QueryOptions<ITransaction> | null
) {
  return Transaction.updateOne(filter, update, options).exec();
}

async function validateAmount(
  currency: ICurrency,
  listing: IListing,
  user: any,
  body: any,
  setting: ISettings,
  asset: IAsset
) {
  // TODO ...hacer cambio de buscar amountMax de asset a currency para multiplicarlo por el precio o hacer la conversion
  // TODO ...dependiendo de el asset
  const today = moment().startOf('day');
  const startOfToday = today.toDate();
  const endOfToday = today.endOf('day').toDate();

  let listingPrice: number = listing?.price;

  if (listing?.bestPricePercentage) {
    if (listing?.priceReferenceType === 'suni') {
      const bestPrice = await bestPriceService.findOne({
        currencyId: listing?.currency._id,
        assetId: listing?.asset._id,
      });
      if (listing?.type === 'sale')
        listingPrice = listing.bestPricePercentage * bestPrice.saleBestPrice;
      else
        listingPrice =
          listing.bestPricePercentage * bestPrice.purchaseBestPrice;
    } else {
      listingPrice =
        listing.bestPricePercentage *
        asset.conversionRateToUsd *
        currency.conversionRateToUsd;
    }
  }

  // obtener el amount de currency
  const fiatAmount = body.amount * listingPrice;

  // obtener el amount en usd
  const amountInUsd =
    (listingPrice * body.amount) / currency.conversionRateToUsd;

  // obtener todas las transacciones de maker y taker de el dia para validar que no supere al settings amount
  const makerTransactions = await Transaction.find({
    $and: [
      { 'maker.id': listing?.maker?.id },
      { createdAt: { $gte: startOfToday, $lte: endOfToday } },
    ],
  });
  const takerTransactions = await Transaction.find({
    $and: [
      { 'taker.id': user?.id },
      { createdAt: { $gte: startOfToday, $lte: endOfToday } },
    ],
  });
  const takerMaxAmount = takerTransactions.reduce(
    (acc, curr) => acc + curr.amountUsd,
    0
  );
  const makerMaxAmount = makerTransactions.reduce(
    (acc, curr) => acc + curr.amountUsd,
    0
  );
  const totalUsdTakerTransactions = amountInUsd + takerMaxAmount;
  const totalUsdMakerTransactions = amountInUsd + takerMaxAmount;
  if (
    takerMaxAmount >= setting.transactions.maxAmountAllowed ||
    totalUsdTakerTransactions >= setting.transactions.maxAmountAllowed
  )
    throw new NoSentryError('taker exceeded the amount of daily transactions');
  if (
    makerMaxAmount >= setting.transactions.maxAmountAllowed ||
    totalUsdMakerTransactions >= setting.transactions.maxAmountAllowed
  )
    throw new NoSentryError('maker exceeded the amount of daily transactions');

  return {
    amountInUsd,
    fiatAmount,
    listingPrice,
  };
}

export async function create(body: TCreateTransaction, token: string) {
  const { data: user } = await getUser(token);

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const STATUS_CANCELED = 'canceled';
    const STATUS_DEFAULT = 'default';
    // validar que este el listing creado
    const listing = await listingService.findOne(
      { _id: body.listingId },
      null,
      { session }
    );
    if (!listing) throw new NoSentryError('Listing not found');
    // validar que no este en status canceled o default para proceder
    if (listing.status === STATUS_CANCELED)
      throw new NoSentryError(
        'Cannot create Transaction with listing canceled'
      );
    if (listing.status === STATUS_DEFAULT)
      throw new NoSentryError('Cannot create Transaction with listing default');
    // validar que este el asset indicado en la BD
    const asset = await assetService.findOne({ _id: listing.asset });
    if (!asset) throw new NoSentryError('Asset not found');

    const setting = await Settings.findOne({ active: true });

    // buscar el currency que se usara en el listing
    const currency = await currencyService.findOne({ _id: listing.currency });

    const { amountInUsd, fiatAmount, listingPrice } = await validateAmount(
      currency,
      listing,
      user,
      body,
      setting,
      asset
    );
    // validar que el usuario no tome su propio listing
    if (user?.id === listing?.maker?.id)
      throw new NoSentryError('Cannot take your listing');

    await amountAssetConvert(body, asset);
    await validateBtcTransAmount(setting, asset, body);

    if (body.amount > listing.amount) {
      throw new NoSentryError(
        'The amount cannot be greater than the listing amount'
      );
    }

    const userName = user?.metamapStatus?.dni_firstName ?? user?.name;

    const userLastName = user?.metamapStatus?.dni_lastName ?? user?.lastname;

    const transactionData = {
      listing: listing._id,
      taker: {
        id: user?.id,
        email: user?.email,
        name: userName,
        lastname: userLastName,
      },
      amount: body.amount,
      paymentMethod: body.paymentMethod ?? null,
      selectedWallet: body.selectedWallet,
      maker: {
        id: listing?.maker?.id,
        email: listing?.maker?.email,
        name: listing?.maker?.name,
        lastname: listing?.maker?.lastname,
      },
      loanAdId: null,
      amountUsd: amountInUsd,
      makerFee: listing.fee,
      takerFee: null,
      fiatAmount,
    };

    const wallet = await getUserWallet(token, body.selectedWallet);

    if (!wallet) throw new NoSentryError('Wallet doesn`t exist');

    if (listing.type === 'purchase') {
      const amountPercentage = (body.amount * 1) / 100;
      if (wallet.balance < body.amount + amountPercentage) {
        throw new NoSentryError('Doesn`t have enough balance');
      }
      const makerFee = await getCryptoHolderFee(
        {
          transactionAmount: body.amount,
          assetNetwork: asset.network,
          transactionType: 'sale',
          userRole: 'taker',
        },
        setting
      );
      transactionData.takerFee = makerFee;
      const ad = await balanceLock({
        token,
        wallet: wallet.wallet,
        amount: body.amount,
        makerFee,
      });
      transactionData.loanAdId = ad?.data?.id;
    } else {
      const takerFee = await getFiatHolderFee(
        {
          transactionAmount: body.amount,
          assetNetwork: asset.network,
          transactionType: 'purchase',
          userRole: 'taker',
        },
        setting
      );
      transactionData.takerFee = takerFee;
    }

    if (listing.amount === body.amount) listing.active = false;

    listing.amount -= body.amount;

    listing.status =
      listing.amount < listing.minAmountAsset ? 'default' : 'taker_assigned';

    if (listing.amount === 1) listing.active = false;

    if (listing.maxAmountAsset > listing.amount) {
      maxAmountConvert(asset.network, listing, listingPrice);
    }

    await listing.save();

    if (listing.status === 'default') {
      const paramsPushListing = {
        token,
        userId: listing.maker.id,
        title: 'Anuncio',
        message: `La disponibilidad de tu anuncio se encuentra por debajo del límite mínimo,
        actualízalo para que pueda ser visualizado nuevamente en el mercado`,
      };

      await sendNotifications(paramsPushListing);
    }

    const createdTransaction = await Transaction.create([transactionData], {
      session,
    });

    const variablesHolderCrypto = {
      name:
        listing.type === 'purchase'
          ? `${userName} ${userLastName}`
          : `${listing?.maker?.name} ${listing?.maker?.lastname}`,
    };

    const userEmailHolderCrypto =
      listing.type === 'purchase' ? user?.email : listing?.maker?.email;

    const paramsPush = {
      token,
      userId: listing.maker.id,
      title: 'Transacción',
      message: `Se ha creado la transacción ${createdTransaction[0].referenceNumber}`,
    };

    await sendNotifications(paramsPush);

    await sendEmail(
      'exchange_transaction_started',
      token,
      variablesHolderCrypto,
      null,
      userEmailHolderCrypto
    );

    await chatService.createChannel({
      channelId: createdTransaction[0]._id.toString(),
      taker: createdTransaction[0]?.taker?.id,
      maker: listing?.maker?.id,
    });

    await createNotification(
      // notification Oferta de Listing tomado
      {
        messageTemplateId: '65a834772d07da37baf04e24',
        model: 'transaction',
        module: 'exchange',
        object: createdTransaction[0]?._id,
        recipientId: listing?.maker?.id,
        senderId: user?.id,
      },
      token
    );

    await session.commitTransaction();

    return createdTransaction[0];
  } catch (error) {
    await session.abortTransaction();
    throw new NoSentryError(error);
  } finally {
    session.endSession();
  }
}

export async function cancel(body: TCancelTransaction, token: string) {
  const { data: user } = await getUser(token);

  const transaction = await Transaction.findOne({
    _id: body.transactionId,
  });

  if (!transaction) throw new NoSentryError('Transaction not found');

  const listing = await listingService.findOne({ _id: transaction.listing });

  const asset = await assetService.findOne({ _id: listing?.asset?._id });

  const currency = await currencyService.findOne({
    _id: listing?.currency._id,
  });

  if (listing.type === 'purchase') {
    if (user.id !== listing?.maker?.id)
      throw new NoSentryError('User can not cancel transaction');
    const config = {
      method: 'delete',
      baseURL: process.env.SERVICE_URL,
      url: `/wallet/block/${transaction.loanAdId}`,
      headers: {
        authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.delete(config.url, config);
    if (!data?.success) {
      throw new NoSentryError('Error deleting ad in wallet');
    }
  } else if (user.id !== transaction?.taker?.id)
    throw new NoSentryError('User can not cancel transaction');

  let listingPrice: number = listing?.price;

  if (listing?.bestPricePercentage) {
    if (listing.priceReferenceType === 'suni') {
      const bestPrice = await bestPriceService.findOne({
        currencyId: listing?.currency._id,
        assetId: listing?.asset._id,
      });
      if (listing?.type === 'sale')
        listingPrice = listing.bestPricePercentage * bestPrice.saleBestPrice;
      else
        listingPrice =
          listing.bestPricePercentage * bestPrice.purchaseBestPrice;
    } else {
      listingPrice =
        listing.bestPricePercentage *
        asset.conversionRateToUsd *
        currency.conversionRateToUsd;
    }
  }

  listing.status = 'active';
  listing.amount += transaction.amount;
  listing.maxAmountAsset =
    listing.maxAmountAsset + transaction.amount > listing.originalMaxAssetAmount
      ? listing.originalMaxAssetAmount
      : listing.maxAmountAsset + transaction.amount;
  listing.maxAmount = listing.maxAmountAsset * listingPrice;
  listing.active = true;
  await listing.save();

  transaction.status = 'cancelled';
  await transaction.save();
  return transaction;
}

export async function notifyPayment(body: TNotifyPayment, token: string) {
  const { data: user } = await getUser(token);

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const transaction = await Transaction.findOne(
      {
        _id: body.transactionId,
      },
      null,
      { session }
    );

    if (!transaction) throw new NoSentryError('Transaction not found');

    transaction.status = 'payment_executed';

    const userName = transaction.loanAdId
      ? transaction?.taker?.name
      : transaction?.maker?.name;

    const userLastName = transaction.loanAdId
      ? transaction?.taker?.lastname
      : transaction?.maker?.lastname;

    const variables = {
      name: `${userName} ${userLastName}`,
    };

    const userEmail = transaction.loanAdId
      ? transaction?.taker?.email
      : transaction?.maker?.email;

    const paramsPush = {
      token,
      userId: transaction.loanAdId
        ? transaction?.taker?.id
        : transaction?.maker?.id,
      title: 'Se ha confirmado el envío de los fondos',
      message: `Tu contraparte de la transacción ${transaction.referenceNumber} ha confirmado el envío de los fondos`,
    };

    await sendNotifications(paramsPush);

    await sendEmail(
      'fiat_sent_confirmation',
      token,
      variables,
      null,
      userEmail
    );

    if (body.paymentMethod) transaction.paymentMethod = body.paymentMethod;
    await transaction.save();

    const channel = await chatService.getChannelById({
      channelId: body.transactionId.toString(),
    });
    const text = 'Payment has been made';
    const message = {
      text,
      user: { id: user.id },
      type: 'system',
    };
    await channel.sendMessage(message);

    await session.commitTransaction();

    return transaction;
  } catch (error) {
    await session.abortTransaction();
    throw new NoSentryError(error);
  } finally {
    session.endSession();
  }
}

export async function releaseCrypto(body: TReleaseCrypto, token: string) {
  const { data: user } = await getUser(token);

  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    const transaction = await Transaction.findOne(
      {
        _id: body.transactionId,
      },
      null,
      { session }
    );

    if (!transaction) throw new NoSentryError('Transaction not found');

    if (transaction.status !== 'payment_executed')
      throw new NoSentryError('Payment has not been notified');

    const listing = await listingService.findOne(
      { _id: transaction.listing },
      null,
      { session }
    );

    if (!listing) throw new NoSentryError('Listing not found');
    if (
      (listing.type === 'purchase' && user.id !== transaction?.taker?.id) ||
      (listing.type === 'sale' && user.id !== listing?.maker?.id)
    ) {
      throw new NoSentryError('User is not crypto holder');
    }

    if (listing?.type === 'sale') {
      await unlockBalance({
        token,
        toWallet: transaction?.selectedWallet,
        amount: transaction?.amount,
        takerFee: transaction?.takerFee,
        blockId: listing?.loanAdId,
      });
    } else {
      await unlockBalance({
        token,
        toWallet: listing?.selectedWallet?.address,
        amount: transaction?.amount,
        takerFee: transaction?.takerFee,
        blockId: transaction?.loanAdId,
      });
    }

    transaction.status = 'successful';
    await transaction.save();

    listing.status =
      listing.amount < listing.minAmountAsset ? 'default' : 'active';
    await listing.save();

    const paramsPush = {
      token,
      userId: transaction.loanAdId
        ? transaction?.maker?.id
        : transaction?.taker?.id,
      title: 'Se han liberado las criptomonedas',
      message: `Tu contraparte de la transacción ${transaction.referenceNumber} ha liberado las criptomonedas`,
    };

    await sendNotifications(paramsPush);

    const userMakerName = transaction?.maker?.name;

    const userMakerLastName = transaction?.maker?.lastname;

    const variablesMaker = {
      name: `${userMakerName} ${userMakerLastName}`,
    };

    const userMaker = transaction?.maker?.email;

    await sendEmail(
      'fiat_received_confirmation',
      token,
      variablesMaker,
      null,
      userMaker
    );

    const userTakerName = transaction?.taker?.name;

    const userTakerLastName = transaction?.taker?.lastname;

    const variablesTaker = {
      name: `${userTakerName} ${userTakerLastName}`,
    };

    const userTaker = transaction?.taker?.email;

    await sendEmail(
      'fiat_received_confirmation',
      token,
      variablesTaker,
      null,
      userTaker
    );

    const channel = await chatService.getChannelById({
      channelId: body.transactionId.toString(),
    });
    const text = 'Payment received. Crypto amount has been released';
    const message = {
      text,
      user: { id: user.id },
      type: 'system',
    };

    await channel.sendMessage(message);

    await session.commitTransaction();

    return transaction;
  } catch (err) {
    await session.abortTransaction();
    throw new NoSentryError(err);
  } finally {
    session.endSession();
  }
}

export async function pagination(
  page: number,
  perPage: number,
  filter?: FilterQuery<ITransaction>,
  projection?: ProjectionType<ITransaction> | null,
  options?: QueryOptions<ITransaction> | null
) {
  return paginateModel(page, perPage, Transaction, filter, projection, options);
}

export async function getTransactionUser(
  body: TGetTransactionUser,
  token: string
) {
  const { data: user } = await getUser(token);

  const asset = await assetService.findOne({ _id: body.asset });

  if (body.role === 'purchase') {
    const transactionFilter = await Transaction.aggregate([
      {
        $lookup: {
          from: 'listings',
          localField: 'listing',
          foreignField: '_id',
          as: 'listingDetails',
        },
      },
      {
        $match: {
          'listingDetails.asset': asset?._id ? asset?._id : { $ne: null },
          $or: [
            { 'taker.id': user?.id, 'listingDetails.type': 'sale' },
            { 'maker.id': user?.id, 'listingDetails.type': 'purchase' },
          ],
          status: body?.status ? body?.status : { $ne: null },
        },
      },
      {
        $sort: {
          createdAt: -1,
        },
      },
    ]);

    return paginate(body.page, body.perPage, transactionFilter);
  }

  if (body.role === 'sale') {
    const transactionFilter = await Transaction.aggregate([
      {
        $lookup: {
          from: 'listings',
          localField: 'listing',
          foreignField: '_id',
          as: 'listingDetails',
        },
      },
      {
        $match: {
          'listingDetails.asset': asset?._id ? asset?._id : { $ne: null },
          $or: [
            { 'taker.id': user.id, 'listingDetails.type': 'purchase' },
            { 'maker.id': user.id, 'listingDetails.type': 'sale' },
          ],
          status: body?.status ? body?.status : { $ne: null },
        },
      },
      {
        $sort: {
          createdAt: -1,
        },
      },
    ]);

    return paginate(body.page, body.perPage, transactionFilter);
  }

  const transactionFilterUser = await Transaction.aggregate([
    {
      $lookup: {
        from: 'listings',
        localField: 'listing',
        foreignField: '_id',
        as: 'listingDetails',
      },
    },
    {
      $match: {
        'listingDetails.asset': asset?._id ? asset?._id : { $ne: null },
        $or: [{ 'maker.id': user.id }, { 'taker.id': user.id }],
        status: body?.status ? body?.status : { $ne: null },
      },
    },
    {
      $sort: {
        createdAt: -1,
      },
    },
  ]);

  return paginate(body.page, body.perPage, transactionFilterUser);
}

export async function getFee(body: TGetFee) {
  const settings = await Settings.findOne({ active: true });

  const valid = !(
    body.assetNetwork.toLowerCase() === 'btc' &&
    body.transactionAmount < settings.btc.minTransAmount
  );

  const serviceFee =
    body.transactionType === 'purchase'
      ? await getFiatHolderFee(body, settings)
      : await getCryptoHolderFee(body, settings);

  const transFee =
    body.transactionType === 'sale'
      ? await getCryptoHolderTransFee(body, settings)
      : 0;

  return {
    fee: serviceFee + transFee,
    valid,
    minTransAmount: settings.btc.minTransAmount,
  };
}
