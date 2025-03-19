import { Schema } from 'mongoose';
import { schemaComposer } from 'graphql-compose';
import { convertSchemaToGraphQL } from 'graphql-compose-mongoose';

export interface ICreditScoreParams {
  _id?: any;
  name: string;
  value: number;
}

export const creditScoreParamsSchema = new Schema<ICreditScoreParams>(
  {
    name: {
      type: String,
      trim: true,
    },
    value: {
      type: Number,
    },
  },
  { timestamps: false }
);

convertSchemaToGraphQL(
  creditScoreParamsSchema,
  'CreditScoreParams',
  schemaComposer
);
