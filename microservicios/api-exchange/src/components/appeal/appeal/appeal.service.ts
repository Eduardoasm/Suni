/* eslint-disable import/no-cycle */
import mongoose from 'mongoose';
import type {
  FilterQuery,
  ProjectionType,
  QueryOptions,
  UpdateQuery,
  UpdateWithAggregationPipeline,
} from 'mongoose';
import { IAppeal, Appeal } from './appeal.model';
import { NoSentryError, paginateModel } from '../../../utils';
import * as transactionService from '../../transaction/transaction.service';
import { TCancelAppeal, TCreateAppeal } from './appeal.dto';
import * as chatService from '../../streamChat/streamChat.service';
import { getUser } from '../../../utils/walletService/userWau';
import { sendEmail } from '../../../utils/emails/sendEmail';
import { TManageCryptoAdmin } from '../../transaction';
import * as listingService from '../../listing/listing/listing.service';
import { unlockBalance } from '../../../utils/walletService/amountUnlock';
import { deleteAd } from '../../../utils/walletService/cancelAd';
import * as bestPriceService from '../../bestPrice/bestPrice.service';
import { createNotification } from '../../../utils/avilaServices/createNotification';

export async function findOne(
  filter?: FilterQuery<IAppeal>,
  projection?: ProjectionType<IAppeal> | null,
  options?: QueryOptions<IAppeal> | null
) {
  return Appeal.findOne(filter, projection, options).exec();
}

export async function find(
  filter?: FilterQuery<IAppeal>,
  projection?: ProjectionType<IAppeal> | null,
  options?: QueryOptions<IAppeal> | null
) {
  return Appeal.find(filter, projection, options).exec();
}

function getAppealReason(reason) {
  switch (reason) {
    case 'notConfirmed':
      return 'Pago no confirmado';
    case 'confirmedNotReceived':
      return 'Cripto no recibido';
    case 'confirmedNotReleased':
      return 'Cripto no liberado';
    default:
      return 'Pago confirmado, dinero no recibido';
  }
}

export async function findAppeal(
  token: string,
  filter?: FilterQuery<IAppeal>,
  projection?: ProjectionType<IAppeal> | null,
  options?: QueryOptions<IAppeal> | null
) {
  const appealData = await Appeal.findOne(filter, projection, options).populate(
    {
      path: 'transaction',
      model: 'Transaction',
      populate: {
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
        ],
      },
    }
  );
  const reason = getAppealReason(appealData?.reason);
  return {
    ...(appealData as any)._doc,
    reason,
  };
}

export async function getAllAppealInfo(
  token: string,
  filter?: FilterQuery<IAppeal>,
  projection?: ProjectionType<IAppeal> | null,
  options?: QueryOptions<IAppeal> | null
) {
  const appealsData = await Appeal.find(filter, projection, options)
    .populate({
      path: 'transaction',
      model: 'Transaction',
      populate: {
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
        ],
      },
    })
    .exec();
  const appeals = [];
  for (const appeal of appealsData) {
    const reason = getAppealReason(appeal?.reason);
    const formData = {
      ...(appeal as any)?._doc,
      reason,
    };
    appeals.push(formData);
  }
  return appeals;
}

export async function updateOne(
  filter: FilterQuery<IAppeal>,
  update: UpdateQuery<IAppeal> | UpdateWithAggregationPipeline,
  options?: QueryOptions<IAppeal> | null
) {
  return Appeal.updateOne(filter, update, options).exec();
}

export async function create(body: TCreateAppeal, token: string) {
  const { data: user } = await getUser(token);

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    // const countryAvailable = await countryService.findOne({
    //   code: user.country,
    //   active: true,
    //   disabled: false,
    // });
    // if (!countryAvailable)
    //   throw new NoSentryError(
    //     'Access denied, the country is disabled to the app'
    //   );
    const transaction = await transactionService.findOne(
      {
        _id: body.transaction,
      },
      null,
      { session }
    );

    const STATUS_APPEAL = 'active';

    const appealOwner = {
      id: user.id,
      email: user.email,
      name: user?.metamapStatus?.dni_firstName ?? user?.name,
      lastname: user?.metamapStatus?.dni_lastName ?? user?.lastname,
    };

    const createdAppeal = await Appeal.create(
      [
        {
          transaction: transaction._id,
          description: body.description,
          paymentReceipt: body.paymentReceipt,
          status: STATUS_APPEAL,
          reason: body.reason,
          appealOwner,
        },
      ],
      { session }
    );

    transaction.appealed = true;
    transaction.appealedBy = appealOwner;
    await transaction.save();

    const userMakerName = transaction?.maker?.name;

    const userMakerLastName = transaction?.maker?.lastname;

    const variablesMaker = {
      name: `${userMakerName} ${userMakerLastName}`,
    };

    const userMaker = transaction?.maker?.email;

    await sendEmail(
      'transaction_appeal_filed',
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
      'transaction_appeal_filed',
      token,
      variablesTaker,
      null,
      userTaker
    );

    const channel = await chatService.getChannelById({
      channelId: createdAppeal[0].transaction._id.toString(),
    });
    const text = 'An appeal has been created';
    const message = {
      text,
      user: { id: user.id },
      type: 'system',
    };
    await channel.sendMessage(message);

    await session.commitTransaction();

    await createNotification(
      // notification Transacción en apelación
      {
        messageTemplateId: '65a8348c2d07da37baf04e27',
        model: 'transaction',
        module: 'exchange',
        object: transaction?._id,
        recipientId:
          user?.id === transaction?.maker.id
            ? transaction?.taker.id
            : transaction?.maker.id,
        senderId: user?.id,
      },
      token
    );

    return createdAppeal[0];
  } catch (error) {
    await session.abortTransaction();
    throw new NoSentryError(error);
  } finally {
    session.endSession();
  }
}

export async function cancelAppeal(body: TCancelAppeal, token: string) {
  const { data: user } = await getUser(token);

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    // const countryAvailable = await countryService.findOne({
    //   code: user.country,
    //   active: true,
    //   disabled: false,
    // });
    // if (!countryAvailable)
    //   throw new NoSentryError(
    //     'Access denied, the country is disabled to the app'
    //   );

    const STATUS_APPEAL_CANCELED = 'canceled';

    const appeal = await Appeal.findOne(
      {
        transaction: body.transactionId,
      },
      null,
      { session }
    );

    const transaction = await transactionService.findOne(
      {
        _id: body.transactionId,
      },
      null,
      { session }
    );

    if (appeal?.appealOwner?.id !== user?.id)
      throw new NoSentryError('Invalid user for appeal');

    appeal.status = STATUS_APPEAL_CANCELED;
    await appeal.save();

    transaction.appealed = false;
    await transaction.save();

    const channel = await chatService.getChannelById({
      channelId: appeal.transaction._id.toString(),
    });
    const text = 'An appeal has been canceled';
    const message = {
      text,
      user: { id: user.id },
      type: 'system',
    };
    await channel.sendMessage(message);

    await session.commitTransaction();

    await createNotification(
      // notification Apelación resuelta
      {
        messageTemplateId: '65a834962d07da37baf04e2a',
        model: 'transaction',
        module: 'exchange',
        object: transaction?._id,
        recipientId:
          user?.id === transaction?.maker.id
            ? transaction?.taker.id
            : transaction?.maker.id,
        senderId: user?.id,
      },
      token
    );

    return appeal;
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
  filter?: FilterQuery<IAppeal>,
  projection?: ProjectionType<IAppeal> | null,
  options?: QueryOptions<IAppeal> | null
) {
  return paginateModel(page, perPage, Appeal, filter, projection, options);
}

export async function manageCryptoAdmin(body: TManageCryptoAdmin) {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const transaction = await transactionService.findOne(
      {
        _id: body.transactionId,
      },
      null,
      { session }
    );

    const appealFound = await findOne(
      {
        transaction: body.transactionId,
      },
      null,
      { session }
    );

    if (!transaction) throw new NoSentryError('Transaction not found');

    const listing = await listingService.findOne(
      { _id: transaction.listing },
      null,
      { session }
    );

    const token = process.env.TOKEN_ADMIN_SUNI;

    if (body?.decisionType === 'release') {
      if (listing?.type === 'sale') {
        await unlockBalance({
          token,
          toWallet: transaction?.selectedWallet,
          amount: transaction?.amount,
          takerFee: transaction.takerFee,
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

      await createNotification(
        // notification Apelación resuelta
        // message: se han liberado los fondos a tu wallet...
        {
          messageTemplateId: '65babeb547c63c8a202c771b',
          model: 'transaction',
          module: 'exchange',
          object: transaction?._id,
          recipientId:
            listing?.type === 'sale'
              ? transaction?.taker?.id
              : listing?.maker?.id,
        },
        token
      );

      await createNotification(
        // notification Apelación resuelta
        // message: se han liberado los fondos a tu contraparte..
        {
          messageTemplateId: '65bbe2e2f4f20ca3bfbdcc85',
          model: 'transaction',
          module: 'exchange',
          object: transaction?._id,
          recipientId:
            listing?.type === 'sale'
              ? transaction?.maker?.id
              : transaction?.taker?.id,
        },
        token
      );

      transaction.status = 'successful';
    } else {
      let listingPrice: number = listing?.price;

      if (listing?.bestPricePercentage) {
        const bestPrice = await bestPriceService.findOne({
          currencyId: listing?.currency._id,
          assetId: listing?.asset._id,
        });
        if (listing?.type === 'sale')
          listingPrice = listing.bestPricePercentage * bestPrice.saleBestPrice;
        else
          listingPrice =
            listing.bestPricePercentage * bestPrice.purchaseBestPrice;
      }
      if (listing?.type === 'purchase') {
        await deleteAd(token, transaction?.loanAdId);
      }
      listing.amount += transaction.amount; // aumentamos el amount de el listing ya que se devolvieron los fondos
      listing.maxAmountAsset =
        listing.maxAmountAsset + transaction.amount >
        listing.originalMaxAssetAmount
          ? listing.originalMaxAssetAmount
          : listing.maxAmountAsset + transaction.amount;
      listing.maxAmount = listing.maxAmountAsset * listingPrice;
      listing.active = true; // para no hacer condicional si esta en false el listing por si entro en default se cambia a true

      await createNotification(
        // notification Apelación resuelta devolución
        // message: se han devuelto los fondos a tu wallet...
        {
          messageTemplateId: '65bbe4c8f4f20ca3bfbdcc8a',
          model: 'transaction',
          module: 'exchange',
          object: transaction?._id,
          recipientId:
            listing?.type === 'sale'
              ? listing?.maker?.id
              : transaction?.taker?.id,
        },
        token
      );

      await createNotification(
        // notification Apelación resuelta devolución
        // message: se han devuelto los fondos a tu contraparte...
        {
          messageTemplateId: '65bbe8f1f4f20ca3bfbdcc8f',
          model: 'transaction',
          module: 'exchange',
          object: transaction?._id,
          recipientId:
            listing?.type === 'sale'
              ? transaction?.taker?.id
              : listing?.maker?.id,
        },
        token
      );

      transaction.status = 'cancelled';
    }
    await transaction.save();

    appealFound.status = 'resolved';
    await appealFound.save();

    listing.status =
      listing?.amount < listing?.minAmountAsset ? 'default' : 'active';
    await listing.save();

    await session.commitTransaction();

    return transaction;
  } catch (error) {
    await session.abortTransaction();
    throw new NoSentryError(error);
  } finally {
    session.endSession();
  }
}
