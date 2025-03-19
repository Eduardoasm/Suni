import type {
  FilterQuery,
  ProjectionType,
  QueryOptions,
  UpdateQuery,
} from 'mongoose';
// eslint-disable-next-line import/no-cycle
import { paginateModel } from '../../utils';
import { ICurrency, Currency } from './currency.model';

export async function findOne(
  filter?: FilterQuery<ICurrency>,
  projection?: ProjectionType<ICurrency> | null,
  options?: QueryOptions<ICurrency> | null
) {
  return Currency.findOne(filter, projection, options).exec();
}

export async function find(
  filter?: FilterQuery<ICurrency>,
  projection?: ProjectionType<ICurrency> | null,
  options?: QueryOptions<ICurrency> | null
) {
  return Currency.find(filter, projection, options).exec();
}

export async function updateOne(
  filter?: FilterQuery<ICurrency>,
  update?: UpdateQuery<ICurrency> | null,
  options?: QueryOptions<ICurrency> | null
) {
  return Currency.updateOne(filter, update, options).exec();
}

export async function create(currency: ICurrency) {
  return Currency.create(currency);
}

export async function pagination(
  page: number,
  perPage: number,
  filter?: FilterQuery<ICurrency>,
  projection?: ProjectionType<ICurrency> | null,
  options?: QueryOptions<ICurrency> | null
) {
  return paginateModel(page, perPage, Currency, filter, projection, options);
}
