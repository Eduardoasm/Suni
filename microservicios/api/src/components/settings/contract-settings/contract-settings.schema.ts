import { Schema } from 'mongoose';
import { schemaComposer } from 'graphql-compose';
import { convertSchemaToGraphQL } from 'graphql-compose-mongoose';

export interface IContractSettings {
  _id?: any;
  minMonthlyPayments: number;
  maxMonthlyPayments: number;
  maxAccumulatedDebtor: number;
  maxAccumulatedDebtorWithCreditor: number;
  allowedBlocks: number; // max number of blocks
  amountOfBlocksAllowed: number; // amount of each block in USDC
  templateContent: string;
}

export const contractSettingsSchema = new Schema<IContractSettings>({
  minMonthlyPayments: {
    type: Number,
  },
  maxMonthlyPayments: {
    type: Number,
  },
  maxAccumulatedDebtor: {
    type: Number,
  },
  maxAccumulatedDebtorWithCreditor: {
    type: Number,
  },
  allowedBlocks: {
    type: Number,
  },
  amountOfBlocksAllowed: {
    type: Number,
  },
  templateContent: {
    type: String,
  },
});

convertSchemaToGraphQL(
  contractSettingsSchema,
  'ContractSettings',
  schemaComposer
);
