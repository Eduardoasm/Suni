import { Schema, Document, Types, Model, model } from 'mongoose';
import { composeMongoose } from 'graphql-compose-mongoose';
import { CurrencyTC, ICurrency } from '../currency';

export interface IWallet {
  _id?: any;
  name: string;
  address: string;
  currency: Types.ObjectId | ICurrency;
  owner: string;
  active?: boolean;
}

export type WalletDocument = Document<Types.ObjectId, any, IWallet> & IWallet;

const walletSchema = new Schema<IWallet>(
  {
    name: {
      type: String,
    },
    address: {
      type: String,
    },
    currency: {
      type: Schema.Types.ObjectId,
      ref: 'Currency',
    },
    owner: {
      type: String, // Ref to user in SUNIs
    },
  },
  { timestamps: true }
);

export const Wallet = model<IWallet, Model<IWallet>>('Wallet', walletSchema);

export const WalletTC = composeMongoose<WalletDocument>(Wallet as any);

WalletTC.addRelation('currency', {
  resolver: () => CurrencyTC.mongooseResolvers.dataLoader({ lean: true }),
  prepareArgs: {
    _id: (source) => source.currency,
  },
  projection: { currency: 1 },
});
