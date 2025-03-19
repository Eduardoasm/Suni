import type {
  FilterQuery,
  ProjectionType,
  QueryOptions,
  UpdateQuery,
  UpdateWithAggregationPipeline,
} from 'mongoose';
import { IHistory, History } from './history.model';

export async function findOne(
  filter?: FilterQuery<IHistory>,
  projection?: ProjectionType<IHistory> | null,
  options?: QueryOptions<IHistory> | null
) {
  return History.findOne(filter, projection, options).exec();
}

export async function find(
  filter?: FilterQuery<IHistory>,
  projection?: ProjectionType<IHistory> | null,
  options?: QueryOptions<IHistory> | null
) {
  return History.find(filter, projection, options).exec();
}

export async function updateOne(
  filter: FilterQuery<IHistory>,
  update: UpdateQuery<IHistory> | UpdateWithAggregationPipeline,
  options?: QueryOptions<IHistory> | null
) {
  return History.updateOne(filter, update, options).exec();
}

export async function create(history: IHistory) {
  return History.create(history);
}
