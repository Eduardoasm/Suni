import { Schema, Document, Types, Model, model } from 'mongoose';
import { composeMongoose } from 'graphql-compose-mongoose';

export interface ICurrency {
  _id?: any;
  name: string;
  symbol: string;
  active?: boolean;
}

export type CurrencyDocument = Document<Types.ObjectId, any, ICurrency> &
  ICurrency;

const currencySchema = new Schema<ICurrency>({
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
  active: {
    type: Boolean,
    default: true,
  },
});

export const Currency = model<ICurrency, Model<ICurrency>>(
  'Currency',
  currencySchema
);

export const CurrencyTC = composeMongoose<CurrencyDocument>(Currency as any);
