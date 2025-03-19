import { Schema } from 'mongoose';
import { schemaComposer } from 'graphql-compose';
import { convertSchemaToGraphQL } from 'graphql-compose-mongoose';

export interface ICreditScoreRange {
  _id?: any;
  color: string;
  initial: number;
  final: number;
}

export const creditScoreRangeSchema = new Schema<ICreditScoreRange>(
  {
    color: {
      type: String,
      trim: true,
    },
    initial: {
      type: Number,
    },
    final: {
      type: Number,
    },
  },
  { timestamps: false }
);

convertSchemaToGraphQL(
  creditScoreRangeSchema,
  'CreditScoreRange',
  schemaComposer
);
