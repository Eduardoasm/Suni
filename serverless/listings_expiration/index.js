const mongoose = require('mongoose');
const dayjs = require('dayjs');
const utc = require('dayjs/plugin/utc');
const timezone = require('dayjs/plugin/timezone');
const sendNotifications = require('./sendNotification');
const createNotification = require('./createNotification');
const consultDevices = require('./consultDevices');
const deleteAd = require('./deleteBlock');

dayjs.extend(utc);
dayjs.extend(timezone);

const { Schema } = mongoose;

require('./db');

const userSchema = new Schema(
  {
    id: {
      type: String,
    },
    email: {
      type: String,
    },
    name: {
      type: String,
    },
    lastname: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const takerConditionsSchema = new Schema(
  {
    conditionName: {
      type: String,
    },
    conditionValue: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const walletSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, 'Please enter a name of wallet'],
    },
    address: {
      type: String,
      required: [true, 'Please enter a address of wallet'],
    },
  },
  {
    timestamps: true,
  }
);

const listingSchema = new Schema(
  {
    currency: {
      type: Schema.Types.ObjectId,
      ref: 'Currency',
      required: [true, 'Please insert a currency id'],
    },
    asset: {
      type: Schema.Types.ObjectId,
      ref: 'Asset',
      required: [true, 'Please insert an asset id'],
    },
    amount: {
      type: Number,
      required: [true, 'Please insert an amount'],
    },
    price: {
      type: Number,
    },
    priceType: {
      type: String,
      enum: ['fixed', 'dynamic'],
    },
    comments: {
      type: String,
    },
    autoReply: {
      type: String,
    },
    paymentMethods: [
      {
        type: Schema.Types.ObjectId,
        ref: 'PaymentMethod',
      },
    ],
    maxAmount: {
      type: Number,
      required: [true, 'Please enter the maximum price of the ad'],
    },
    minAmount: {
      type: Number,
      required: [true, 'Please enter the minimum price of the ad'],
    },
    originalMaxAssetAmount: {
      type: Number,
    },
    maxAmountAsset: {
      type: Number,
    },
    minAmountAsset: {
      type: Number,
    },
    type: {
      type: String,
      enum: ['purchase', 'sale'],
      required: [true, 'Please enter the ad type'],
      trim: true,
    },
    maker: {
      type: userSchema,
      required: [true, 'Please enter the maker'],
    },
    status: {
      type: String,
      enum: ['active', 'taker_assigned', 'canceled', 'default'],
      required: [true, 'Please enter the ad type'],
      trim: true,
    },
    takerConditions: [takerConditionsSchema],
    fee: {
      type: Number,
    },
    selectedWallet: walletSchema,
    timeMinutes: {
      type: Number,
      required: [true, 'Please enter a Time for listing'],
    },
    pricePercentage: {
      type: Number,
    },
    loanAdId: {
      type: String,
    },
    transactionsMaker: {
      type: Number,
    },
    transactionsMakerCompleted: {
      type: Number,
    },
    active: {
      type: Boolean,
      default: true,
    },
    bestPricePercentage: {
      type: Number,
    },
    bestPrice: {
      type: Schema.Types.ObjectId,
      model: 'BestPrice',
    },
    referenceNumber: {
      type: Number,
      unique: true,
    },
    priceReferenceType: {
      type: String,
      enum: ['suni', 'market'],
    },
  },
  { timestamps: true }
);

const transactionSchema = new Schema(
  {
    listing: {
      type: Schema.Types.ObjectId,
      ref: 'Listing',
    },
    taker: {
      type: userSchema,
      required: [true, 'Por favor inserta un user'],
    },
    maker: {
      type: userSchema,
      required: [true, 'Por favor inserta un user'],
    },
    amount: {
      type: Number,
    },
    status: {
      type: String,
      enum: [
        'pending',
        'payment_executed',
        'payment_received',
        'successful',
        'default',
        'cancelled',
      ],
      default: 'pending',
    },
    appealed: {
      type: Boolean,
      default: false,
    },
    appealedBy: {
      type: userSchema,
    },
    paymentMethod: {
      type: Schema.Types.ObjectId,
      ref: 'PaymentMethod',
    },
    referenceNumber: {
      type: Number,
      unique: true,
    },
    selectedWallet: {
      type: String,
    },
    loanAdId: {
      type: String,
    },
    active: {
      type: Boolean,
      default: true,
    },
    amountUsd: {
      type: Number,
      required: [true, 'Please insert an amount in Usd'],
    },
    makerFee: {
      type: Number,
    },
    takerFee: {
      type: Number,
    },
    fiatAmount: {
      type: Number,
    },
  },
  { timestamps: true }
);

const Listing = mongoose.model('Listing', listingSchema);
const Transaction = mongoose.model('Transaction', transactionSchema);

async function defaultExpiredListing() {
  const twoDaysBefore = dayjs().subtract(2, 'days').format();

  const listingsExpired = await Listing.find({
    status: 'active',
    updatedAt: {
      $lte: twoDaysBefore
    }
  });

  const promises = [];

  for (const listing of listingsExpired) {
    const transactionActive = await Transaction.findOne(
      {
        listing: listing._id,
        active: true,
        status: { $in: ['pending', 'payment_executed', 'payment_received', 'appealed']} 
      }
    )
    if (!transactionActive) {
      listing.status = 'default';
      listing.active = false;
      promises.push(listing.save());
      if (listing.type === 'sale') {
        promises.push(deleteAd(listing.loanAdId))
      }
    } else {
      const makerDevices = await consultDevices(listing?.maker);
      if ((makerDevices?.length ?? 0) > 0) {
        promises.push(
          sendNotifications(
            listing?.maker?.id,
            '¡Importante! Tu anuncio está a punto de expirar',
            `Tienes una transacción activa asociada a tu anuncio. Por favor,
            asegúrate de completar la transacción para evitar cualquier inconveniente. ¡Gracias!`
            )
          );
        }
      promises.push(
        createNotification(
          '704047097473004',
          'listing',
          'exchange',
          listing?._id,
          listing?.maker?.id,
          null,
          null
        )
      );
    }
  }

  await Promise.allSettled(promises)

  return {
    status: 200,
    body: {
      success: true,
    },
  }; 
}

module.exports.main = defaultExpiredListing;
