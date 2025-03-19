/* eslint-disable import/no-cycle */
import type {
  FilterQuery,
  ProjectionType,
  QueryOptions,
  UpdateQuery,
  UpdateWithAggregationPipeline,
} from 'mongoose';
import { paginateModel } from '../../../utils';
import {
  IPaymentMethodInput,
  PaymentMethodInput,
  PaymentMethodInputDocument,
} from './paymentMethodInput.model';

export async function findOne(
  filter?: FilterQuery<IPaymentMethodInput>,
  projection?: ProjectionType<IPaymentMethodInput> | null,
  options?: QueryOptions<IPaymentMethodInput> | null
) {
  return PaymentMethodInput.findOne(filter, projection, options).exec();
}

export async function find(
  filter?: FilterQuery<IPaymentMethodInput>,
  projection?: ProjectionType<IPaymentMethodInput> | null,
  options?: QueryOptions<IPaymentMethodInput> | null
) {
  return PaymentMethodInput.find(filter, projection, options).exec();
}

export async function updateOne(
  filter: FilterQuery<IPaymentMethodInput>,
  update: UpdateQuery<IPaymentMethodInput> | UpdateWithAggregationPipeline,
  options?: QueryOptions<IPaymentMethodInput> | null
) {
  return PaymentMethodInput.updateOne(filter, update, options).exec();
}

export async function create(paymentMethodInput: PaymentMethodInputDocument) {
  return PaymentMethodInput.create(paymentMethodInput);
}

export async function pagination(
  page: number,
  perPage: number,
  filter?: FilterQuery<IPaymentMethodInput>,
  projection?: ProjectionType<IPaymentMethodInput> | null,
  options?: QueryOptions<IPaymentMethodInput> | null
) {
  return paginateModel(
    page,
    perPage,
    PaymentMethodInput,
    filter,
    projection,
    options
  );
}
