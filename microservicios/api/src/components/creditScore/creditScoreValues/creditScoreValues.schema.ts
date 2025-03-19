import { Schema } from 'mongoose';
import { schemaComposer } from 'graphql-compose';
import { convertSchemaToGraphQL } from 'graphql-compose-mongoose';

export type ProviderEnum = 'credolab' | 'suni';

export interface ICreditScoreValues {
  _id?: any;
  referenceNumber: string;
  value: number;
  provider: ProviderEnum;
  active?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export const creditScoreValuesSchema = new Schema<ICreditScoreValues>(
  {
    referenceNumber: {
      type: String,
    },
    value: {
      type: Number,
    },
    provider: {
      type: String,
      enum: ['credolab', 'suni'],
    },
  },
  { timestamps: true }
);

convertSchemaToGraphQL(
  creditScoreValuesSchema,
  'CreditScoreValues',
  schemaComposer
);
