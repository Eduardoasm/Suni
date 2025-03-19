import type {
  FilterQuery,
  ProjectionType,
  QueryOptions,
  UpdateQuery,
  UpdateWithAggregationPipeline,
} from 'mongoose';
import { IMessage, Message } from './message.model';
import { paginateModel } from '../../utils';

export async function findOne(
  filter?: FilterQuery<IMessage>,
  projection?: ProjectionType<IMessage> | null,
  options?: QueryOptions<IMessage> | null
) {
  return Message.findOne(filter, projection, options).exec();
}

export async function find(
  filter?: FilterQuery<IMessage>,
  projection?: ProjectionType<IMessage> | null,
  options?: QueryOptions<IMessage> | null
) {
  return Message.find(filter, projection, options).exec();
}

export async function updateOne(
  filter: FilterQuery<IMessage>,
  update: UpdateQuery<IMessage> | UpdateWithAggregationPipeline,
  options?: QueryOptions<IMessage> | null
) {
  return Message.updateOne(filter, update, options).exec();
}

export async function create(message: IMessage) {
  return Message.create(message);
}

export async function pagination(
  page: number,
  perPage: number,
  filter?: FilterQuery<IMessage>,
  projection?: ProjectionType<IMessage> | null,
  options?: QueryOptions<IMessage> | null
) {
  return paginateModel(page, perPage, Message, filter, projection, options);
}
