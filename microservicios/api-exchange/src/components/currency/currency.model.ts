import { Types, model, Document, Model, Schema } from 'mongoose';
import { composeMongoose } from 'graphql-compose-mongoose';

export interface ICurrency {
  _id?: any;
  name: string;
  symbol: string;
  network: string;
  decimals: number;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
  conversionRateToUsd?: number;
}

export type CurrencyDocument = Document<Types.ObjectId, any, ICurrency> &
  ICurrency;

const currencySchema = new Schema<ICurrency>(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    symbol: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    network: {
      type: String,
      trim: true,
      unique: true,
    },
    decimals: {
      type: Number,
    },
    conversionRateToUsd: {
      type: Number,
    },
  },
  { timestamps: true }
);

export const Currency = model<ICurrency, Model<ICurrency>>(
  'Currency',
  currencySchema
);

export const CurrencyTC = composeMongoose<CurrencyDocument>(Currency as any);
