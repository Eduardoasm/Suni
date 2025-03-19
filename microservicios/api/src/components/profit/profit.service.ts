/* eslint-disable import/no-cycle */
import type {
  FilterQuery,
  ProjectionType,
  QueryOptions,
  UpdateQuery,
  UpdateWithAggregationPipeline,
} from 'mongoose';
import { paginateModel } from '../../utils';
import { IProfit, Profit } from './profit.model';

export async function findOne(
  filter?: FilterQuery<IProfit>,
  projection?: ProjectionType<IProfit> | null,
  options?: QueryOptions<IProfit> | null
) {
  return Profit.findOne(filter, projection, options).exec();
}

export async function find(
  filter?: FilterQuery<IProfit>,
  projection?: ProjectionType<IProfit> | null,
  options?: QueryOptions<IProfit> | null
) {
  return Profit.find(filter, projection, options).exec();
}

export async function updateOne(
  filter: FilterQuery<IProfit>,
  update: UpdateQuery<IProfit> | UpdateWithAggregationPipeline,
  options?: QueryOptions<IProfit> | null
) {
  return Profit.updateOne(filter, update, options).exec();
}

export async function create(profit: IProfit) {
  return Profit.create(profit);
}

export async function pagination(
  page: number,
  perPage: number,
  filter?: FilterQuery<IProfit>,
  projection?: ProjectionType<IProfit> | null,
  options?: QueryOptions<IProfit> | null
) {
  return paginateModel(page, perPage, Profit, filter, projection, options);
}
