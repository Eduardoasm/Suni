/* eslint-disable import/no-cycle */
import type {
  FilterQuery,
  ProjectionType,
  QueryOptions,
  UpdateQuery,
  UpdateWithAggregationPipeline,
} from 'mongoose';
import { paginateModel } from '../../utils';
import {
  ITransactionHistory,
  TransactionHistory,
} from './transactionHistory.model';

export async function findOne(
  filter?: FilterQuery<ITransactionHistory>,
  projection?: ProjectionType<ITransactionHistory> | null,
  options?: QueryOptions<ITransactionHistory> | null
) {
  return TransactionHistory.findOne(filter, projection, options).exec();
}

export async function find(
  filter?: FilterQuery<ITransactionHistory>,
  projection?: ProjectionType<ITransactionHistory> | null,
  options?: QueryOptions<ITransactionHistory> | null
) {
  return TransactionHistory.find(filter, projection, options).exec();
}

export async function updateOne(
  filter: FilterQuery<ITransactionHistory>,
  update: UpdateQuery<ITransactionHistory> | UpdateWithAggregationPipeline,
  options?: QueryOptions<ITransactionHistory> | null
) {
  return TransactionHistory.updateOne(filter, update, options).exec();
}

export async function create(transactionHistory: ITransactionHistory) {
  return TransactionHistory.create(transactionHistory);
}

export async function pagination(
  page: number,
  perPage: number,
  filter?: FilterQuery<ITransactionHistory>,
  projection?: ProjectionType<ITransactionHistory> | null,
  options?: QueryOptions<ITransactionHistory> | null
) {
  return paginateModel(
    page,
    perPage,
    TransactionHistory,
    filter,
    projection,
    options
  );
}
