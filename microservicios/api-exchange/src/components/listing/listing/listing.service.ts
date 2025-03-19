import mongoose, {
  type FilterQuery,
  type ProjectionType,
  type QueryOptions,
  type UpdateQuery,
  type UpdateWithAggregationPipeline,
  type PipelineStage,
} from 'mongoose';
import { Asset } from '../../asset/asset.model';
import { NoSentryError, paginateModel, paginate } from '../../../utils';
import { getUserWallet, balanceLock } from '../../../utils/walletService';
import { IListing, Listing } from './listing.model';
import {
  TCancelListing,
  TCreateListing,
  TGetBestPricesListing,
  TGetKpiMarketPrice,
  TGetListingFilter,
  TGetListingFilterUser,
  TUpdateListingUser,
} from './listing.dto';
import * as assetService from '../../asset/asset.service';
import * as currencyService from '../../currency/currency.service';
import { getUser } from '../../../utils/walletService/userWau';
import { deleteAd } from '../../../utils/walletService/cancelAd';
import * as settingService from '../../settings/settings.service';
import * as transactionService from '../../transaction/transaction.service';
import { updateBlock } from '../../../utils/walletService/updateLock';
import * as paymentMethodCategoryService from '../../paymentMethodCategory/paymentMethodCategory.service';
import { apiPriceBtc } from '../../../utils/apiPriceBtc';
import { sendEmail } from '../../../utils/emails/sendEmail';
import { amountAssetConvert } from '../../../utils/amountAssetConvert';
import { validateBtcTransAmount } from '../../../utils/parametersValidations/validateBtcTransAmount';
import { getCryptoHolderFee } from '../../../utils/parametersValidations/getCryptoHolderFee';
import { getFiatHolderFee } from '../../../utils/parametersValidations/getFiatHolderFee';
import { minMaxAmountToAsset } from '../../../utils/minMaxAmountToAsset';
import { amountToAsset } from '../../../utils/amountToAsset';
import * as bestPriceService from '../../bestPrice/bestPrice.service';
import { IBestPrice } from '../../bestPrice/bestPrice.model';

export async function findOne(
  filter?: FilterQuery<IListing>,
  projection?: ProjectionType<IListing> | null,
  options?: QueryOptions<IListing> | null
) {
  return Listing.findOne(filter, projection, options).exec();
}

export async function find(
  filter?: FilterQuery<IListing>,
  projection?: ProjectionType<IListing> | null,
  options?: QueryOptions<IListing> | null
) {
  return Listing.find(filter, projection, options).exec();
}

export async function updateOne(
  filter: FilterQuery<IListing>,
  update: UpdateQuery<IListing> | UpdateWithAggregationPipeline,
  options?: QueryOptions<IListing> | null
) {
  return Listing.updateOne(filter, update, options).exec();
}

export async function createListingSale(
  token: string,
  listing: TCreateListing
) {
  const { data: user } = await getUser(token);

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const asset = await assetService.findOne({ _id: listing.asset });

    const currency = await currencyService.findOne({ _id: listing.currency });

    const STATUS_SUCCESSFUL = 'successful';

    const transactions = await transactionService.find({
      $or: [{ 'maker.id': user.id }, { 'taker.id': user.id }],
    });
    const transactionsSuccessful = await transactionService.find({
      status: STATUS_SUCCESSFUL,
      $or: [{ 'maker.id': user.id }, { 'taker.id': user.id }],
    });

    const wallet = await getUserWallet(token, listing.walletUser);
    if (!wallet) {
      throw new NoSentryError('Wallet doesn`t exist');
    }

    const amountPercentage = (listing.amount * 1) / 100;

    if (wallet.available_balance < listing.amount + amountPercentage) {
      throw new NoSentryError('Doesn`t have enough balance');
    }
    // el listing price se definira como el precio de el listing si no viene el bestPricePercentage
    // o en caso que venga, se calculara como bestPricePercentage para las funciones que la necesiten
    let listingPrice: number = listing?.price;

    let bestPrice: IBestPrice;

    if (listing?.bestPricePercentage) {
      if (listing?.priceReferenceType === 'suni') {
        bestPrice = await bestPriceService.findOne({
          currency: listing?.currency,
          asset: listing?.asset,
        });
        listingPrice = listing.bestPricePercentage * bestPrice.saleBestPrice;
      } else {
        listingPrice =
          listing.bestPricePercentage *
          asset.conversionRateToUsd *
          currency.conversionRateToUsd;
      }
    }

    if (!listing?.amountInAsset) {
      amountToAsset(listing, listingPrice, asset?.network);
    }

    const { minAmountAsset, maxAmountAsset } = minMaxAmountToAsset(
      listing.minAmount,
      listing.maxAmount,
      asset.network,
      listingPrice
    );

    await amountAssetConvert(listing, asset);

    const settings = await settingService.getActiveSetting();

    await validateBtcTransAmount(settings, asset, listing);

    const makerFee = await getCryptoHolderFee(
      {
        transactionAmount: listing.amount,
        assetNetwork: asset.network,
        transactionType: 'sale',
        userRole: 'maker',
      },
      settings
    );

    const type = 'sale';

    const status = 'active';

    const userName = user?.metamapStatus?.dni_firstName ?? user?.name;

    const userLastName = user?.metamapStatus?.dni_lastName ?? user?.lastname;

    const listingProperties: any = {
      type,
      status,
      maker: {
        id: user?.id,
        email: user?.email,
        name: userName,
        lastname: userLastName,
      },
      selectedWallet: { address: wallet.wallet, name: wallet.name },
      transactionsMaker: transactions.length,
      transactionsMakerCompleted: transactionsSuccessful.length,
      comments: listing?.comments,
      autoReply: listing.autoReply,
      fee: makerFee,
      minAmountAsset,
      maxAmountAsset,
      originalMaxAssetAmount: maxAmountAsset,
      bestPrice: bestPrice?._id ?? null,
    };

    const newListingSale = {
      ...listing,
      ...listingProperties,
    };

    const createdListingSale = await Listing.create([newListingSale], {
      session,
    });

    const variables = {
      name: `${userName} ${userLastName}`,
    };

    const userEmail = user?.email;

    await sendEmail('ad_registered', token, variables, null, userEmail);

    const ad = await balanceLock({
      token,
      wallet: wallet.wallet,
      amount: listing.amount,
      makerFee,
    });

    createdListingSale[0].loanAdId = ad?.data?.id;
    await createdListingSale[0].save();

    await session.commitTransaction();

    if (!listing.bestPricePercentage) {
      await bestPriceService.getBestPrice({
        assetId: listing.asset,
        currencyId: listing.currency,
      });
    }

    return createdListingSale[0];
  } catch (error) {
    await session.abortTransaction();
    console.log('General error in create listing sale');
    throw new NoSentryError(error);
  } finally {
    session.endSession();
  }
}

export async function createListingPurchase(
  token: string,
  listing: TCreateListing
) {
  const { data: user } = await getUser(token);

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const asset = await assetService.findOne({ _id: listing.asset });

    const currency = await currencyService.findOne({ _id: listing.currency });

    const STATUS_SUCCESSFUL = 'successful';

    const transactions = await transactionService.find({
      $or: [{ 'maker.id': user.id }, { 'taker.id': user.id }],
    });

    const transactionsSuccessful = await transactionService.find({
      status: STATUS_SUCCESSFUL,
      $or: [{ 'maker.id': user.id }, { 'taker.id': user.id }],
    });

    let listingPrice: number = listing?.price;

    let bestPrice: IBestPrice;

    if (listing?.bestPricePercentage) {
      if (listing?.priceReferenceType === 'suni') {
        bestPrice = await bestPriceService.findOne({
          currency: listing?.currency,
          asset: listing?.asset,
        });
        listingPrice =
          listing.bestPricePercentage * bestPrice.purchaseBestPrice;
      } else {
        listingPrice =
          listing.bestPricePercentage *
          asset.conversionRateToUsd *
          currency.conversionRateToUsd;
      }
    }

    if (!listing?.amountInAsset) {
      amountToAsset(listing, listingPrice, asset?.network);
    }

    const { minAmountAsset, maxAmountAsset } = minMaxAmountToAsset(
      listing.minAmount,
      listing.maxAmount,
      asset.network,
      listingPrice
    );

    const wallet = await getUserWallet(token, listing.walletUser);

    await amountAssetConvert(listing, asset);

    const settings = await settingService.getActiveSetting();

    await validateBtcTransAmount(settings, asset, listing);

    const type = 'purchase';

    const status = 'active';

    const fee = await getFiatHolderFee(
      {
        transactionAmount: listing.amount,
        assetNetwork: asset.network,
        transactionType: 'purchase',
        userRole: 'maker',
      },
      settings
    );

    const userName = user?.metamapStatus?.dni_firstName ?? user?.name;

    const userLastName = user?.metamapStatus?.dni_lastName ?? user?.lastname;

    const listingProperties: any = {
      type,
      status,
      maker: {
        id: user?.id,
        email: user?.email,
        name: userName,
        lastname: userLastName,
      },
      selectedWallet: { address: wallet.wallet, name: wallet.name },
      transactionsMaker: transactions.length,
      transactionsMakerCompleted: transactionsSuccessful.length,
      fee,
      minAmountAsset,
      maxAmountAsset,
      originalMaxAssetAmount: maxAmountAsset,
      bestPrice: bestPrice?._id ?? null,
    };

    const newListingPurchase = {
      ...listing,
      ...listingProperties,
    };

    const createdListingPurchase = await Listing.create([newListingPurchase], {
      session,
    });

    const variables = {
      name: `${userName} ${userLastName}`,
    };

    const userEmail = user?.email;

    await sendEmail('ad_registered', token, variables, null, userEmail);

    await session.commitTransaction();

    if (!listing.bestPricePercentage) {
      await bestPriceService.getBestPrice({
        assetId: listing?.asset,
        currencyId: listing?.currency,
      });
    }

    return createdListingPurchase[0];
  } catch (error) {
    await session.abortTransaction();
    throw new NoSentryError(error);
  } finally {
    session.endSession();
  }
}

export async function cancelListing(body: TCancelListing, token: string) {
  const { data: user } = await getUser(token);
  const takerAssigned = 'taker_assigned';

  // const countryAvailable = await countryService.findOne({
  //   code: user.country,
  //   active: true,
  //   disabled: false,
  // });
  // if (!countryAvailable)
  //   throw new NoSentryError(
  //     'Access denied, the country is disabled to the app'
  //   );
  const listing = await Listing.findOne({ _id: body.listing });

  if (!listing) throw new NoSentryError('Listing not found');

  if (user?.id !== listing?.maker?.id)
    throw new NoSentryError('User is not Listing maker');

  if (listing?.status === takerAssigned)
    throw new NoSentryError('Please finish the transaction');

  if (listing.type === 'sale') await deleteAd(token, listing.loanAdId);

  listing.status = 'canceled';
  await listing.save();

  return listing;
}

export async function pagination(
  page: number,
  perPage: number,
  filter?: FilterQuery<IListing>,
  projection?: ProjectionType<IListing> | null,
  options?: QueryOptions<IListing> | null
) {
  return paginateModel(page, perPage, Listing, filter, projection, options);
}

export async function getListingFilter(
  body: TGetListingFilter,
  token: string
): Promise<any> {
  const { data: user } = await getUser(token);

  // const countryAvailable = await countryService.findOne({
  //   code: user.country,
  //   active: true,
  //   disabled: false,
  // });
  // if (!countryAvailable)
  //   throw new NoSentryError(
  //     'Access denied, the country is disabled to the app'
  //   );

  // Obtenemos el PaymentMethod a través del type enviado desde el front-end
  const paymentMethod = await paymentMethodCategoryService.findOne({
    _id: body?.paymentMethods,
  });

  const asset = await assetService.findOne({ _id: body?.asset });

  const currency = await currencyService.findOne({ _id: body?.currency });

  const validateType = ['purchase', 'sale'];

  if (!validateType.includes(body.type)) {
    throw new NoSentryError('No is a validate Type');
  }

  const filters: PipelineStage[] = [
    {
      $lookup: {
        from: 'paymentmethods', // Nombre de la colección de PaymentMethod (en minúsculas y en plural)
        localField: 'paymentMethods',
        foreignField: '_id',
        as: 'paymentMethodsData',
      },
    },
    {
      $match: {
        status: {
          $in: ['active', 'taker_assigned'],
        },
        active: true,
        'maker.id': { $ne: user?.id },
        type: body?.type,
        asset: asset?._id ? asset?._id : { $ne: null },
        currency: currency?._id ? currency?._id : { $ne: null },
        'paymentMethodsData.type': paymentMethod?._id
          ? paymentMethod?._id
          : { $ne: null },
        amount: { $ne: 0 },
      },
    },
    {
      $addFields: {
        completeOrders: {
          $cond: {
            if: { $eq: ['$transactionsMakerCompleted', 0] },
            then: 0,
            else: {
              $multiply: [
                {
                  $divide: [
                    '$transactionsMakerCompleted',
                    '$transactionsMaker',
                  ],
                },
                100,
              ],
            },
          },
        },
      },
    },
  ];

  if (body?.amount) {
    filters.push({
      $match: {
        $and: [
          { minAmount: { $lte: body.amount } },
          { maxAmount: { $gte: body.amount } },
        ],
      },
    });
  }

  if (body?.order === 'order') {
    filters.push({
      $sort: {
        transactionsMaker: -1,
      },
    });
  } else if (body?.order === 'completionRate') {
    filters.push({
      $sort: {
        completeOrders: -1,
      },
    });
  } else {
    filters.push({
      $sort: {
        price: body.type === 'purchase' ? -1 : 1,
      },
    });
  }

  const listingsFilters = await Listing.aggregate(filters);

  return paginate(body.page, body.perPage, listingsFilters);
}

export async function getListingFilterUser(
  body: TGetListingFilterUser,
  token: string
): Promise<any> {
  const { data: user } = await getUser(token);

  // const countryAvailable = await countryService.find({
  //   code: user.country,
  //   active: true,
  //   disabled: false,
  // });
  // if (!countryAvailable)
  //   throw new NoSentryError(
  //     'Access denied, the country is disabled to the app'
  //   );

  const filters: any = {
    'maker.id': user?.id,
    active: true,
    amount: { $ne: 0 },
  };

  if (body.type) {
    filters.type = body.type;
  }

  if (body.asset) {
    filters.asset = body.asset;
  }

  if (body.status) {
    filters.status = body.status;
  }

  const options = {
    sort: {
      createdAt: -1,
    },
  };

  const listingsFilters = await Listing.find(filters, null, options);

  return paginate(body.page, body.perPage, listingsFilters);
}

export async function bestPricesListings(
  body: TGetBestPricesListing
): Promise<any> {
  const validateType = ['purchase', 'sale'];

  if (!validateType.includes(body.type)) {
    throw new NoSentryError('No is a validate Type');
  }
  const asset = await assetService.findOne({ _id: body.asset });
  const currency = await currencyService.findOne({ _id: body.currency });

  const bestPrice = await Listing.aggregate([
    {
      $match: {
        $and: [
          { active: true },
          { type: body.type },
          { asset: asset._id },
          { currency: currency._id },
        ],
      },
    },
    {
      $project: {
        _id: '$price',
        price: { $multiply: ['$price', 100] },
      },
    },
    {
      $sort: {
        price: body.type === 'purchase' ? -1 : 1,
      },
    },
    {
      $project: {
        _id: '$type',
        price: { $divide: ['$price', 100] },
      },
    },
  ]).exec();

  if (bestPrice.length === 0) {
    throw new NoSentryError('Not enought listings');
  }

  function valuesListing() {
    const listingLength = Math.floor(bestPrice.length / 2);

    // eslint-disable-next-line no-shadow
    const listingMedian =
      bestPrice.length % 2 !== 0
        ? bestPrice[listingLength].price
        : (bestPrice[listingLength - 1].price +
            bestPrice[listingLength].price) /
          2;

    // eslint-disable-next-line no-shadow
    const listingBestPrice = bestPrice[0]?.price;

    return { listingMedian, listingBestPrice };
  }

  const { listingMedian, listingBestPrice } = valuesListing();

  return {
    median: listingMedian,
    bestPrice: listingBestPrice,
  };
}

export async function updateListingUser(
  body: TUpdateListingUser,
  token: string
): Promise<IListing> {
  const { data: user } = await getUser(token);

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const LISTING_TYPE_SALE = 'sale';

    const setting = await settingService.findOne({ active: true });

    const foundListing = await Listing.findOne({ _id: body?.listing }, null, {
      session,
    });

    if (foundListing.status === 'taker_assigned')
      throw new NoSentryError('Please end the transaction');

    const foundAsset = await assetService.findOne({ _id: foundListing.asset });

    const foundCurrency = await currencyService.findOne({
      _id: foundListing.currency,
    });

    if (user?.id !== foundListing.maker.id) {
      throw new NoSentryError('You are not the owner of the listing');
    }

    const wallet = await getUserWallet(
      token,
      foundListing.selectedWallet.address
    );

    if (!wallet) {
      throw new NoSentryError('Wallet doesn`t exist');
    }

    if (body?.selectedWallet) {
      const newWallet = await getUserWallet(token, body?.selectedWallet);
      if (!newWallet) {
        throw new NoSentryError('Wallet doesn`t exist');
      }
      foundListing.selectedWallet.address = wallet.wallet;
      foundListing.selectedWallet.name = wallet.name;
      await foundListing.save();
    }

    let bestPrice;
    // guardamos el nuevo precio si lo recibimos si no, preguntamos si habia antiguo precio
    let listingPrice: number = body?.price ?? foundListing?.price;
    // si recibimos un nuevo precioPorcentaje o tomamos el precio porcentaje antiguo
    if (body?.bestPricePercentage) {
      if (body.priceReferenceType === 'suni') {
        bestPrice = await bestPriceService.findOne({
          currency: body.currency,
          asset: body.asset,
        });

        if (foundListing?.type === 'sale')
          listingPrice = body.bestPricePercentage * bestPrice.saleBestPrice;
        else
          listingPrice = body.bestPricePercentage * bestPrice.purchaseBestPrice;
      } else {
        listingPrice =
          body.bestPricePercentage *
          foundAsset.conversionRateToUsd *
          foundCurrency.conversionRateToUsd;
      }
    }

    if (!body?.amountInAsset && body.amount) {
      amountToAsset(body, listingPrice, foundAsset?.network, foundListing);
    }

    if (body?.minAmount || body?.maxAmount) {
      if (!body.amountInAsset) {
        const { minAmountAsset, maxAmountAsset } = minMaxAmountToAsset(
          body?.minAmount ? body.minAmount : foundListing.minAmount,
          body?.maxAmount ? body.maxAmount : foundListing.maxAmount,
          foundAsset?.network,
          listingPrice
        );
        foundListing.minAmountAsset = minAmountAsset;
        foundListing.maxAmountAsset = maxAmountAsset;
        await foundListing.save();
      }
    }

    const { listing, currency, asset, selectedWallet, type, ...updateBody } =
      body;

    const maker = {
      id: user?.id,
      name: user?.metamapStatus.dni_firstName ?? user?.name,
      email: user?.email,
      lastname: user?.metamapStatus.dni_firstName ?? user?.lastname,
    };

    const amountPercentage =
      ((body.amount - foundListing.amount) * 1) / 100 ?? 0;

    if (
      foundListing.type === LISTING_TYPE_SALE &&
      wallet.available_balance <
        body.amount - foundListing.amount + amountPercentage
    ) {
      throw new NoSentryError('Doesn`t have enough balance');
    }

    const updatedListing = await Listing.findOneAndUpdate(
      { _id: listing, 'maker.id': user.id },
      {
        ...updateBody,
        bestPrice: bestPrice?._id ?? null,
        maker,
        minAmountAsset: body.amountInAsset
          ? body.minAmount
          : foundListing.minAmountAsset,
        maxAmountAsset: body.amountInAsset
          ? body.maxAmount
          : foundListing.maxAmountAsset,
      },
      {
        new: true,
        session,
      }
    );

    if (foundListing.type === LISTING_TYPE_SALE) {
      const makerFee = await getCryptoHolderFee(
        {
          transactionAmount: body.amount,
          assetNetwork: foundAsset.network,
          transactionType: foundListing.type,
          userRole: 'maker',
        },
        setting
      );

      await updateBlock({
        token,
        amount: body.amount,
        makerFee,
        blockId: foundListing.loanAdId,
      });
    }

    await session.commitTransaction();

    if (!body.bestPricePercentage) {
      await bestPriceService.getBestPrice({
        currencyId: body.currency,
        assetId: body.asset,
      });
    }

    return updatedListing;
  } catch (error) {
    await session.abortTransaction();
    throw new NoSentryError(error);
  } finally {
    session.endSession();
  }
}

export async function getKpiMarketPrice(
  body: TGetKpiMarketPrice,
  token: string
) {
  const fiatUppercase = body.fiat.toUpperCase();
  const currency = await currencyService.findOne({ network: fiatUppercase });
  await getUser(token);

  // Obtenemos la conversion de la moneda en usd, el precio de sats en btc y el precio de btc en USD
  const rateFiatUsd = currency.conversionRateToUsd;
  const rateSatsBtc = 0.00000001;
  const priceBtcInUsd = await apiPriceBtc();
  // Obtener el precio de el fiat en btc y en Sats
  const rateFiatBtc = priceBtcInUsd * rateFiatUsd;
  const rateFiatSats = rateFiatBtc * rateSatsBtc;

  if (body?.asset.toLowerCase() === 'btc') {
    return {
      rate: rateFiatBtc,
    };
  }

  if (body?.asset.toLowerCase() === 'lnd') {
    return {
      rate: rateFiatSats,
    };
  }
}

export async function addReferenceNumber() {
  let referenceNumber = 100000;

  const listings = await Listing.find().sort({ createdAt: 1 });

  await Promise.all(
    listings.map((listing) => {
      listing.referenceNumber = referenceNumber;
      referenceNumber += 1;
      return listing.save();
    })
  );

  return true;
}

// const job = new CronJob(   // commented the cronjob waiting to talk to SUNI for the best market prices
//   '*/2 * * * *',
//   async function () {
//     const typeDynamic = 'dinamico';
//     console.log('You will see this message every second');
//     const listings = await Listing.find({ priceType: typeDynamic, active: true, status: 'active' })

//     const listingMap = listings.map(async(listing) => {
//       const asset = await assetService.findOne({ _id: listing.asset })
//       const currency = await currencyService.findOne({ _id: listing.currency })

//       const objListingUpdate = {
//         currency: currency._id,
//         asset: asset._id,
//         type: listing.type,
//         priceType: listing.priceType,
//       };
//           const { median } = await bestPricesListings(objListingUpdate)

//           // if (typeof median === 'number' && !Number.isNaN(median)) {
//             // median es un número válido
//             // Ejecuta acciones con median
//             console.log('median válido:', median);
//             // ...
//             console.log('priceee', median)

//             const newPrice = (median * listing.pricePercentage) / 100
//             console.log('porcentaje', listing.pricePercentage)
//             console.log('preciooo', newPrice)

//             const updateListing = await Listing.updateOne({
//               _id: listing._id,
//               asset: asset._id,
//               currency: currency._id,
//               type: listing.type,
//               priceType: listing.priceType
//             },
//             {
//               price: newPrice
//             })
//             console.log('soy median', median)

//             const findListing = await Listing.findOne(listing._id)

//             console.log('listing update', findListing)
//           // } else {
//           //   // median es NaN o no es un número
//           //   console.log('median inválido:', median);
//           // }
//         })
//     const promise = Promise.all(listingMap)

//     return promise
//   },
//   null,
//   true
//   );
