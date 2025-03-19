import { Types, model, Document, Model, Schema } from 'mongoose';
import { composeMongoose } from 'graphql-compose-mongoose';

export interface ICountry {
  _id?: any;
  name: string;
  code: string;
  flag: string;
  disabled: boolean;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export type CountryDocument = Document<Types.ObjectId, any, ICountry> &
  ICountry;

const countrySchema = new Schema<ICountry>(
  {
    name: {
      type: String,
      trim: true,
    },
    code: {
      type: String,
      trim: true,
    },
    flag: {
      type: String,
      trim: true,
    },
    active: {
      type: Boolean,
      default: true,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export const Country = model<ICountry, Model<ICountry>>(
  'Country',
  countrySchema
);

export const CountryTC = composeMongoose<CountryDocument>(Country as any);
