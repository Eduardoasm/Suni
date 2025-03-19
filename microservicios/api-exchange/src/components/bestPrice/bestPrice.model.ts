import { Types, model, Document, Model, Schema } from 'mongoose';
import { composeMongoose } from 'graphql-compose-mongoose';
import { CurrencyTC, ICurrency } from '../currency';
import { AssetTC, IAsset } from '../asset';

export interface IBestPrice {
  _id?: any;
  currency: Types.ObjectId | ICurrency;
  asset: Types.ObjectId | IAsset;
  saleBestPrice: number;
  purchaseBestPrice: number;
  active?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export type BestPriceDocument = Document<Types.ObjectId, any, IBestPrice> &
  IBestPrice;

const bestPriceSchema = new Schema<IBestPrice>(
  {
    currency: {
      type: Schema.Types.ObjectId,
      model: 'Currency',
    },
    asset: {
      type: Schema.Types.ObjectId,
      model: 'Asset',
    },
    saleBestPrice: {
      type: Number,
    },
    purchaseBestPrice: {
      type: Number,
    },
  },
  { timestamps: true }
);

export const BestPrice = model<IBestPrice, Model<IBestPrice>>(
  'BestPrice',
  bestPriceSchema
);

export const BestPriceTC = composeMongoose<BestPriceDocument>(BestPrice as any);

BestPriceTC.addRelation('currency', {
  resolver: () => CurrencyTC.mongooseResolvers.dataLoader({ lean: true }),
  prepareArgs: {
    _id: (source) => source.currency,
  },
  projection: { currency: 1 },
});

BestPriceTC.addRelation('asset', {
  resolver: () => AssetTC.mongooseResolvers.dataLoader({ lean: true }),
  prepareArgs: {
    _id: (source) => source.asset,
  },
  projection: { asset: 1 },
});
