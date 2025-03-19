import { TransactionHistoryTC } from './transactionHistory.model';

export const TransactionHistoryType = TransactionHistoryTC.getType();
export const TransactionHistoryTypeName = TransactionHistoryTC.getTypeName();
export const TransactionHistoryTypePlural =
  TransactionHistoryTC.getTypePlural().getTypeName();
export const TransactionHistoryTypeNotNull =
  TransactionHistoryTC.getTypeNonNull().getTypeName();
