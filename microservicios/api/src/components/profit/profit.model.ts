import { Schema, Document, Types, Model, model } from 'mongoose';
import { composeMongoose } from 'graphql-compose-mongoose';
import { ContractTC, IContract } from '../contract/contract';

export interface IProfit {
  _id?: any;
  contract: Types.ObjectId | IContract;
  amount: number;
  active: boolean;
}

export type ProfitDocument = Document<Types.ObjectId, any, IProfit> & IProfit;

const profitSchema = new Schema<IProfit>(
  {
    contract: {
      type: Schema.Types.ObjectId,
      ref: 'Contract',
    },
    amount: {
      type: Number,
    },
    active: {
      type: Boolean,
    },
  },
  { timestamps: true }
);

export const Profit = model<IProfit, Model<IProfit>>('Profit', profitSchema);

export const ProfitTC = composeMongoose<ProfitDocument>(Profit as any);

ProfitTC.addRelation('contract', {
  resolver: () => ContractTC.mongooseResolvers.dataLoader({ lean: true }),
  prepareArgs: {
    _id: (source) => source.contract,
  },
  projection: { contract: 1 },
});
