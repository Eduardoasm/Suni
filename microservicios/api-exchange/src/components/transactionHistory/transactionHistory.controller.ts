import { TransactionHistoryTC } from './transactionHistory.model';

const transactionHistoryQueries = {
  transactionHistory: TransactionHistoryTC.mongooseResolvers.findOne(),
  transactionHistories: TransactionHistoryTC.mongooseResolvers.findMany(),
  transactionHistoryPagination:
    TransactionHistoryTC.mongooseResolvers.pagination(),
  totalTransactionHistory: TransactionHistoryTC.mongooseResolvers.count(),
};

const transactionHistoryMutations = {
  createTransactionHistory: TransactionHistoryTC.mongooseResolvers.createOne(),
  updateTransactionHistory: TransactionHistoryTC.mongooseResolvers.updateOne(),
};

export { transactionHistoryQueries, transactionHistoryMutations };
