import { Types, model, Document, Model, Schema } from 'mongoose';
import { composeMongoose } from 'graphql-compose-mongoose';
import { ICurrency, CurrencyTC } from '../../currency';
import { IAsset, AssetTC } from '../../asset';
import { ITakerConditions, takerConditionsSchema } from '../takerConditions';
import { IPaymentMethod, PaymentMethodTC } from '../../paymentMethod';
import { IWallet, walletSchema } from '../../wallet';
import { IUser, userSchema } from '../../user/user.schema';
import { IBestPrice, BestPriceTC } from '../../bestPrice/bestPrice.model';

export type PriceTypeEnum = 'fixed' | 'dynamic';

export type ListingTypeEnum = 'purchase' | 'sale';

export type ListingStatusEnum =
  | 'active'
  | 'taker_assigned'
  | 'canceled'
  | 'default';

export type priceReferenceTypeEnum = 'suni' | 'market';

export interface IListing {
  _id?: any;
  currency: Types.ObjectId | ICurrency;
  asset: Types.ObjectId | IAsset;
  amount: number;
  price?: number;
  priceType: PriceTypeEnum;
  comments?: string;
  autoReply?: string;
  paymentMethods: Array<Types.ObjectId | IPaymentMethod>;
  maxAmount: number;
  minAmount: number;
  originalMaxAssetAmount?: number;
  maxAmountAsset: number;
  minAmountAsset: number;
  selectedWallet: IWallet;
  type: ListingTypeEnum;
  maker: IUser;
  status: ListingStatusEnum;
  takerConditions?: Array<ITakerConditions>;
  fee: number;
  timeMinutes: number;
  pricePercentage?: number;
  transactionsMaker: number;
  transactionsMakerCompleted: number;
  bestPricePercentage?: number;
  bestPrice?: Types.ObjectId | IBestPrice;
  referenceNumber: number;
  priceReferenceType?: priceReferenceTypeEnum;
  active?: boolean;
  createdAt: Date;
  updatedAt: Date;
  loanAdId: string;
}

export type ListingDocument = Document<Types.ObjectId, any, IListing> &
  IListing;

const listingSchema = new Schema<IListing>(
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

listingSchema.pre('save', async function (next) {
  if (!this.referenceNumber) {
    // Buscar el número de referencia más alto en la colección y sumarle 1
    const highest = await Listing.findOne().sort('-referenceNumber').exec();
    this.referenceNumber = (highest && highest.referenceNumber + 1) || 100000;
  }
  next();
});

export const Listing = model<IListing, Model<IListing>>(
  'Listing',
  listingSchema
);

export const ListingTC = composeMongoose<ListingDocument>(Listing as any);

ListingTC.addRelation('currency', {
  resolver: () => CurrencyTC.mongooseResolvers.dataLoader({ lean: true }),
  prepareArgs: {
    _id: (source) => source.currency,
  },
  projection: { currency: 1 },
});

ListingTC.addRelation('asset', {
  resolver: () => AssetTC.mongooseResolvers.dataLoader({ lean: true }),
  prepareArgs: {
    _id: (source) => source.asset,
  },
  projection: { asset: 1 },
});

ListingTC.addRelation('paymentMethods', {
  resolver: () => PaymentMethodTC.mongooseResolvers.dataLoaderMany(),
  prepareArgs: {
    _ids: (source) => source.paymentMethods,
  },
  projection: { paymentMethods: 1 },
});

ListingTC.addRelation('bestPrice', {
  resolver: () => BestPriceTC.mongooseResolvers.dataLoader(),
  prepareArgs: {
    _id: (source) => source.bestPrice,
  },
  projection: { bestPrice: 1 },
});
