import type {
  FilterQuery,
  ProjectionType,
  QueryOptions,
  UpdateQuery,
  UpdateWithAggregationPipeline,
} from 'mongoose';
import { ILanguage, Language } from './language.model';
import { paginateModel } from '../../utils';

export async function findOne(
  filter?: FilterQuery<ILanguage>,
  projection?: ProjectionType<ILanguage> | null,
  options?: QueryOptions<ILanguage> | null
) {
  return Language.findOne(filter, projection, options).exec();
}

export async function find(
  filter?: FilterQuery<ILanguage>,
  projection?: ProjectionType<ILanguage> | null,
  options?: QueryOptions<ILanguage> | null
) {
  return Language.find(filter, projection, options).exec();
}

export async function updateOne(
  filter: FilterQuery<ILanguage>,
  update: UpdateQuery<ILanguage> | UpdateWithAggregationPipeline,
  options?: QueryOptions<ILanguage> | null
) {
  return Language.updateOne(filter, update, options).exec();
}

export async function create(language: ILanguage) {
  return Language.create(language);
}

export async function pagination(
  page: number,
  perPage: number,
  filter?: FilterQuery<ILanguage>,
  projection?: ProjectionType<ILanguage> | null,
  options?: QueryOptions<ILanguage> | null
) {
  return paginateModel(page, perPage, Language, filter, projection, options);
}
