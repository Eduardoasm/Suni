import { Types, Model, model, Document, Schema } from 'mongoose';
import { composeMongoose } from 'graphql-compose-mongoose';
import { IContract } from '../contract/contract';
import { IPaymentPlan, paymentPlanSchema } from '../contract/payment-plan';

export type transactionTypeEnum = 'investment' | 'payment';

export type EventEnum = 'loanConcluded';
export interface ITransaction {
  _id?: any;
  contract: Types.ObjectId | IContract;
  from: string;
  to: string;
  amount: number; // total amount
  lenderFee: number;
  borrowerFee: number;
  interest: number;
  type: transactionTypeEnum;
  borrowerCreditLimit?: number;
  borrowerDueAmount?: number;
  borrowerNextPayment?: IPaymentPlan;
  borrowerActiveLoans?: number;
  borrowerAverageRate?: number;
  borrowedByBorrower?: number;
  event?: EventEnum;
  lenderDueAmount?: number;
  lenderNextPayment?: IPaymentPlan;
  lenderActiveLoans?: number;
  lenderAverageRate?: number;
  lendedByLender?: number;
  commerce?: string;
  commerceInterestEarnings?: number;
  commerceIssuedLoans?: number;
  isActive?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export type TransactionDocument = Document<Types.ObjectId, any, ITransaction> &
  ITransaction;

const transactionSchema = new Schema<ITransaction>(
  {
    contract: {
      type: Schema.Types.ObjectId,
      ref: 'Contract',
    },
    from: {
      type: String,
      required: [true, 'Please insert the user from'],
    },
    to: {
      type: String,
      required: [true, 'Please insert the user to'],
    },
    amount: {
      type: Number,
      required: [true, 'Please insert the amount'],
    },
    lenderFee: {
      type: Number,
      required: [true, 'Please insert the lenderFee'],
    },
    borrowerFee: {
      type: Number,
      required: [true, 'Please insert the borrowerFee'],
    },
    interest: {
      type: Number,
      required: [true, 'Please insert a interest'],
    },
    type: {
      type: String,
      required: [true, 'Please insert a type of transaction'],
      enum: ['investment', 'payment'],
    },
    borrowerCreditLimit: {
      type: Number,
    },
    borrowerDueAmount: {
      type: Number,
    },
    borrowerNextPayment: paymentPlanSchema,
    borrowerActiveLoans: {
      type: Number,
    },
    borrowerAverageRate: {
      type: Number,
    },
    borrowedByBorrower: {
      type: Number,
    },
    lenderDueAmount: {
      type: Number,
    },
    lenderNextPayment: paymentPlanSchema,
    lenderActiveLoans: {
      type: Number,
    },
    lenderAverageRate: {
      type: Number,
    },
    lendedByLender: {
      type: Number,
    },
    event: {
      type: String,
      enum: ['loanConcluded'],
    },
    isActive: {
      type: Boolean,
    },
    commerce: {
      type: String,
      trim: true,
    },
    commerceInterestEarnings: {
      type: Number,
    },
    commerceIssuedLoans: {
      type: Number,
    },
  },
  { timestamps: true }
);

export const Transaction = model<ITransaction, Model<ITransaction>>(
  'Transaction',
  transactionSchema
);

export const TransactionTC = composeMongoose<TransactionDocument>(
  Transaction as any
);
