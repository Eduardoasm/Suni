import { Schema } from 'mongoose';
import { schemaComposer } from 'graphql-compose';
import { convertSchemaToGraphQL } from 'graphql-compose-mongoose';

export type feeTypeEnum = 'fixed' | 'percentage';

export interface IContractFeeSettings {
  _id?: any;
  moraFee: {
    value: number;
    type: feeTypeEnum;
  };
  lenderFee: {
    value: number;
    type: feeTypeEnum;
  };
  borrowerFee: {
    value: number;
    type: feeTypeEnum;
  };
  borrowerRequestFee: {
    value: number;
    type: feeTypeEnum;
  };
}

export const contractFeeSettingsSchema = new Schema<IContractFeeSettings>({
  moraFee: {
    value: {
      type: Number,
    },
    type: {
      type: String,
      enum: ['fixed', 'percentage'],
    },
  },
  lenderFee: {
    value: {
      type: Number,
    },
    type: {
      type: String,
      enum: ['fixed', 'percentage'],
    },
  },
  borrowerFee: {
    value: {
      type: Number,
    },
    type: {
      type: String,
      enum: ['fixed', 'percentage'],
    },
  },
  borrowerRequestFee: {
    value: {
      type: Number,
    },
    type: {
      type: String,
      enum: ['fixed', 'percentage'],
    },
  },
});

convertSchemaToGraphQL(
  contractFeeSettingsSchema,
  'ContractFeeSettings',
  schemaComposer
);
