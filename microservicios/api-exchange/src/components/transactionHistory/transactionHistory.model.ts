import { Schema, Document, Types, Model, model } from 'mongoose';
import { composeMongoose } from 'graphql-compose-mongoose';
import { ITransaction } from '../transaction/transaction.model';

export interface ITransactionHistory {
  _id?: any;
  transaction: Types.ObjectId | ITransaction;
  assetAmount: number;
  currencyAmount: number;
  price: number;
  active: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export type TransactionHistoryDocument = Document<
  Types.ObjectId,
  any,
  ITransactionHistory
> &
  ITransactionHistory;

const transactionHistorySchema = new Schema<ITransactionHistory>(
  {
    transaction: {
      type: Schema.Types.ObjectId,
      ref: 'Transaction',
    },
    assetAmount: {
      type: Number,
    },
    currencyAmount: {
      type: Number,
    },
    price: {
      type: Number,
    },
  },
  { timestamps: true }
);

export const TransactionHistory = model<
  TransactionHistoryDocument,
  Model<TransactionHistoryDocument>
>('TransactionHistory', transactionHistorySchema);

export const TransactionHistoryTC = composeMongoose<TransactionHistoryDocument>(
  TransactionHistory as any
);
