/* eslint-disable import/no-cycle */
import type {
  FilterQuery,
  ProjectionType,
  QueryOptions,
  UpdateQuery,
  UpdateWithAggregationPipeline,
} from 'mongoose';
import { NoSentryError, paginateModel } from '../../utils';
import {
  IPaymentMethodValue,
  PaymentMethodValue,
} from './paymentMethodValue.model';
import { TUpdatesManyValues } from './paymentMethodValue.dto';
import * as PaymentMethodService from '../paymentMethod/paymentMethod.service';

export async function findOne(
  filter?: FilterQuery<IPaymentMethodValue>,
  projection?: ProjectionType<IPaymentMethodValue> | null,
  options?: QueryOptions<IPaymentMethodValue> | null
) {
  return PaymentMethodValue.findOne(filter, projection, options).exec();
}

export async function find(
  filter?: FilterQuery<IPaymentMethodValue>,
  projection?: ProjectionType<IPaymentMethodValue> | null,
  options?: QueryOptions<IPaymentMethodValue> | null
) {
  return PaymentMethodValue.find(filter, projection, options).exec();
}

export async function updateOne(
  filter: FilterQuery<IPaymentMethodValue>,
  update: UpdateQuery<IPaymentMethodValue> | UpdateWithAggregationPipeline,
  options?: QueryOptions<IPaymentMethodValue> | null
) {
  return PaymentMethodValue.updateOne(filter, update, options).exec();
}

export async function create(paymentMethodValue: IPaymentMethodValue) {
  return PaymentMethodValue.create(paymentMethodValue);
}

export async function pagination(
  page: number,
  perPage: number,
  filter?: FilterQuery<IPaymentMethodValue>,
  projection?: ProjectionType<IPaymentMethodValue> | null,
  options?: QueryOptions<IPaymentMethodValue> | null
) {
  return paginateModel(
    page,
    perPage,
    PaymentMethodValue,
    filter,
    projection,
    options
  );
}
export function insertMany(body: IPaymentMethodValue[]) {
  return PaymentMethodValue.insertMany(body);
}

export function updateMany(
  filter: FilterQuery<IPaymentMethodValue>,
  update: UpdateQuery<IPaymentMethodValue> | UpdateWithAggregationPipeline,
  options?: QueryOptions<IPaymentMethodValue> | null
) {
  return PaymentMethodValue.updateMany(filter, update, options).exec();
}

export async function updateManyValuesUser(body: TUpdatesManyValues) {
  const values = body?.items?.map(async (el) => {
    const updateValues = PaymentMethodValue.updateOne(
      { _id: el._id },
      { value: el.value }
    );
    return updateValues;
  });

  const updates = await Promise.all(values);

  return true;
}
