import { composeMongoose } from 'graphql-compose-mongoose';
import { Schema, Model, Types, Document, model } from 'mongoose';
import {
  ICreditScoreValues,
  creditScoreValuesSchema,
} from '../creditScoreValues/creditScoreValues.schema';

export interface ICreditScore {
  _id?: any;
  user: string;
  values: [ICreditScoreValues];
  active?: boolean;
}

export type CreditScoreDocument = Document<Types.ObjectId, any, ICreditScore> &
  ICreditScore;

export const creditScoreSchema = new Schema<ICreditScore>(
  {
    user: {
      type: String,
    },
    values: [creditScoreValuesSchema],
  },
  {
    timestamps: true,
  }
);

export const CreditScore = model<ICreditScore, Model<ICreditScore>>(
  'CreditScore',
  creditScoreSchema
);

export const CreditScoreTC = composeMongoose<CreditScoreDocument>(
  CreditScore as any
);
