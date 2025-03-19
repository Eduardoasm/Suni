/* eslint-disable import/no-cycle */
import type {
  FilterQuery,
  ProjectionType,
  QueryOptions,
  UpdateQuery,
  UpdateWithAggregationPipeline,
} from 'mongoose';
import { paginateModel } from '../../utils';
import { IWallet, Wallet } from './wallet.model';

export async function findOne(
  filter?: FilterQuery<IWallet>,
  projection?: ProjectionType<IWallet> | null,
  options?: QueryOptions<IWallet> | null
) {
  return Wallet.findOne(filter, projection, options).exec();
}

export async function find(
  filter?: FilterQuery<IWallet>,
  projection?: ProjectionType<IWallet> | null,
  options?: QueryOptions<IWallet> | null
) {
  return Wallet.find(filter, projection, options).exec();
}

export async function updateOne(
  filter: FilterQuery<IWallet>,
  update: UpdateQuery<IWallet> | UpdateWithAggregationPipeline,
  options?: QueryOptions<IWallet> | null
) {
  return Wallet.updateOne(filter, update, options).exec();
}

export async function create(wallet: IWallet) {
  return Wallet.create(wallet);
}

export async function pagination(
  page: number,
  perPage: number,
  filter?: FilterQuery<IWallet>,
  projection?: ProjectionType<IWallet> | null,
  options?: QueryOptions<IWallet> | null
) {
  return paginateModel(page, perPage, Wallet, filter, projection, options);
}
