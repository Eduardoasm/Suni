import mongoose from 'mongoose';
import type {
  FilterQuery,
  ProjectionType,
  QueryOptions,
  UpdateQuery,
  UpdateWithAggregationPipeline,
} from 'mongoose';
import { IMessageTemplate, MessageTemplate } from './messageTemplate.model';
import { paginateModel } from '../../utils';
import { Message } from '../message/message.model';
import { TCreateMessageTemplate } from './messageTemplate.dto';
import { Language } from '../language/language.model';

export async function findOne(
  filter?: FilterQuery<IMessageTemplate>,
  projection?: ProjectionType<IMessageTemplate> | null,
  options?: QueryOptions<IMessageTemplate> | null
) {
  return MessageTemplate.findOne(filter, projection, options)
    .populate('messages')
    .exec();
}

export async function find(
  filter?: FilterQuery<IMessageTemplate>,
  projection?: ProjectionType<IMessageTemplate> | null,
  options?: QueryOptions<IMessageTemplate> | null
) {
  return MessageTemplate.find(filter, projection, options).exec();
}

export async function updateOne(
  filter: FilterQuery<IMessageTemplate>,
  update: UpdateQuery<IMessageTemplate> | UpdateWithAggregationPipeline,
  options?: QueryOptions<IMessageTemplate> | null
) {
  return MessageTemplate.updateOne(filter, update, options).exec();
}

export async function create(messageTemplate: IMessageTemplate) {
  return MessageTemplate.create(messageTemplate);
}

export async function pagination(
  page: number,
  perPage: number,
  filter?: FilterQuery<IMessageTemplate>,
  projection?: ProjectionType<IMessageTemplate> | null,
  options?: QueryOptions<IMessageTemplate> | null
) {
  return paginateModel(
    page,
    perPage,
    MessageTemplate,
    filter,
    projection,
    options
  );
}

export async function customCreateMessageTemplate(
  body: Array<TCreateMessageTemplate>
) {
  const messages = await Message.insertMany(body);

  const messageTemplate = await MessageTemplate.create({
    messages,
  });

  return messageTemplate;
}
