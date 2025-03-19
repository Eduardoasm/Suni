import { NextFunction, Request, Response } from 'express';
import { schemaComposer } from 'graphql-compose';
import { TransactionTC } from './transaction.model';
import * as transactionService from './transaction.service';
import {
  GetTransactionUserInput,
  InProgressTransactionType,
  TransactionType,
  TGetTransactionUser,
  CreateTransactionInput,
  CancelTransactionInput,
  NotifyPaymentInput,
  ReleaseCryptoInput,
  TransactionPaginationType,
  GetFeeType,
  GetFeeInput,
} from './transaction.dto';

export const getInProgressTransactions = schemaComposer.createResolver<any>({
  name: 'getInProgressTransactions',
  kind: 'query',
  description: 'get in progress transactions for user',
  type: InProgressTransactionType,
  args: {},
  async resolve({ args, context }) {
    const token = context.req?.headers?.authorization;
    const transactions = await transactionService.getInProgressTransactions(
      token
    );
    return transactions;
  },
});

export const getTransactionsUser = schemaComposer.createResolver<
  any,
  {
    data: TGetTransactionUser;
  }
>({
  name: 'getTransactionsUser',
  kind: 'query',
  description: 'get in transactions user',
  type: TransactionPaginationType,
  args: {
    data: GetTransactionUserInput,
  },
  async resolve({ args, context }) {
    const token = context.req?.headers?.authorization;
    const transactions = await transactionService.getTransactionUser(
      args?.data,
      token
    );
    return transactions;
  },
});

const createTransaction = schemaComposer.createResolver<any>({
  name: 'createTransaction',
  kind: 'mutation',
  description: 'create a transaction',
  type: TransactionType,
  args: {
    data: CreateTransactionInput,
  },
  async resolve({ args, context }) {
    const token = context.req.headers?.authorization;
    const transaction = await transactionService.create(args?.data, token);
    return transaction;
  },
});

const cancelTransaction = schemaComposer.createResolver<any>({
  name: 'cancelTransaction',
  kind: 'mutation',
  description: 'cancel a transaction',
  type: TransactionType,
  args: {
    data: CancelTransactionInput,
  },
  async resolve({ args, context }) {
    const token = context.req.headers?.authorization;
    const transaction = await transactionService.cancel(args?.data, token);
    return transaction;
  },
});

const notifyPayment = schemaComposer.createResolver<any>({
  name: 'notifyPayment',
  kind: 'mutation',
  description: 'notify payment done to maker',
  type: TransactionType,
  args: {
    data: NotifyPaymentInput,
  },
  async resolve({ args, context }) {
    const token = context.req.headers?.authorization;
    const transaction = await transactionService.notifyPayment(
      args?.data,
      token
    );
    return transaction;
  },
});

const releaseCrypto = schemaComposer.createResolver<any>({
  name: 'releaseCrypto',
  kind: 'mutation',
  description: 'release transaction crypto amount to buyer',
  type: TransactionType,
  args: {
    data: ReleaseCryptoInput,
  },
  async resolve({ args, context }) {
    const token = context.req.headers?.authorization;
    const transaction = await transactionService.releaseCrypto(
      args?.data,
      token
    );
    return transaction;
  },
});

const getFee = schemaComposer.createResolver<any>({
  name: 'getFee',
  kind: 'query',
  description: 'get total fee amount for a specific transaction amount',
  type: GetFeeType,
  args: {
    data: GetFeeInput,
  },
  async resolve({ args }) {
    const fee = await transactionService.getFee(args?.data);
    return fee;
  },
});

const transactionQueries = {
  transaction: TransactionTC.mongooseResolvers.findOne(),
  transactions: TransactionTC.mongooseResolvers.findMany(),
  transactionPagination: TransactionTC.mongooseResolvers.pagination(),
  totalTransactions: TransactionTC.mongooseResolvers.count(),
  getInProgressTransactions,
  getTransactionsUser,
  getFee,
};

const transactionMutations = {
  updateTransaction: TransactionTC.mongooseResolvers.updateOne(),
  createTransaction,
  cancelTransaction,
  notifyPayment,
  releaseCrypto,
};

export async function customFindOne(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const transaction = await transactionService.customFindOne({
      _id: req.params._id,
    });

    return res.status(200).json({ success: true, transaction });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, msg: 'Internal server error ' });
  }
}

export { transactionQueries, transactionMutations };
