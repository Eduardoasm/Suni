import { schemaComposer } from 'graphql-compose';
import type { Request, Response, NextFunction } from 'express';
import { TransactionTC } from './transaction.model';
import * as transactionService from './transaction.service';
import {
  borrowerCreditHistoryType,
  dateTransactionInput,
  lenderCreditHistoryType,
} from './transaction.dto';

const borrowerCreditHistory = schemaComposer.createResolver<any>({
  name: 'borrower graphic of credit history',
  description: 'get graphics for credit limit and credit received of borrower',
  kind: 'query',
  type: borrowerCreditHistoryType,
  async resolve({ args, context }) {
    const token = context?.req?.headers?.authorization;
    const creditHistory = await transactionService.getBorrowerCreditHistory(
      token
    );
    return creditHistory;
  },
});

const lenderCreditHistory = schemaComposer.createResolver<any>({
  name: 'lender graphic of credit history',
  description: 'get lender credit history',
  kind: 'query',
  type: lenderCreditHistoryType,
  args: {
    data: dateTransactionInput,
  },
  async resolve({ args, context }) {
    const token = context?.req?.headers?.authorization;
    const creditHistory = await transactionService.getLenderCreditHistory(
      token,
      args?.data?.date
    );
    return creditHistory;
  },
});

const transactionQueries = {
  transaction: TransactionTC.mongooseResolvers.findOne(),
  transactions: TransactionTC.mongooseResolvers.findMany({
    limit: { defaultValue: 1000000 },
  }),
  borrowerCreditHistory,
  lenderCreditHistory,
};

const transactionMutations = {
  updateTransactions: TransactionTC.mongooseResolvers.updateOne(),
  createTransaction: TransactionTC.mongooseResolvers.createOne(),
};

// REST Controller

export async function getAll(req: Request, res: Response, next: NextFunction) {
  try {
    const transactions = await transactionService.find({});
    return res.status(200).json({ success: true, transactions });
  } catch (err) {
    res.status(500).json({ err: 'Internal server error', success: false });
  }
}

export async function getOne(req: Request, res: Response, next: NextFunction) {
  try {
    const transaction = await transactionService.findOne({
      _id: req.params._id,
    });
    return res.status(200).json({ success: true, transaction });
  } catch (err) {
    res.status(500).json({ err: 'Internal server error', success: false });
  }
}

export async function createOne(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const transaction = await transactionService.create(req.body);
    return res.status(200).json({ success: true, transaction });
  } catch (err) {
    res.status(500).json({ err: 'Internal server error', success: false });
  }
}

export async function updateOne(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const transaction = await transactionService.updateOne(
      { _id: req.params._id },
      req.body
    );
    return res.status(200).json({ success: true, transaction });
  } catch (err) {
    res.status(500).json({ err: 'Internal server error', success: false });
  }
}

export async function pagination(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const data = await transactionService.pagination(
      Number(req.params.page),
      Number(req.params.perPage)
    );
    return res.status(200).json({ success: true, pagination: data });
  } catch (err) {
    res.status(500).json({ err: 'Internal server error', success: false });
  }
}

export async function createTransaction(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const transaction = await transactionService.createTransaction(
      req.body.transaction,
      req.params.borrowerId,
      req.params.lenderId
    );
    return res.status(200).json({ success: true, transaction });
  } catch (error) {
    res.status(500).json({ err: 'Internal server error', success: false });
  }
}

export { transactionQueries, transactionMutations };
