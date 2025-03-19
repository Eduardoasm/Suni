/* eslint-disable import/no-cycle */
import type { FilterQuery, ProjectionType, QueryOptions } from 'mongoose';
import { paginateModel } from '../../utils';
import {
  IPaymentMethodCategory,
  PaymentMethodCategory,
  PaymentMethodCategoryDocument,
} from './paymentMethodCategory.model';
import * as paymentMethodInputService from '../paymentMethodInput/paymentMethodInput/paymentMethodInput.service';
import * as paymentMethodService from '../paymentMethod/paymentMethod.service';
import { PaymentMethodInputDocument } from '../paymentMethodInput';
import { getUser } from '../../utils/walletService/userWau';
import { TGetPaymentMethodCategory } from './paymentMethodCategory.dto';

export async function findOne(
  filter?: FilterQuery<IPaymentMethodCategory>,
  projection?: ProjectionType<IPaymentMethodCategory> | null,
  options?: QueryOptions<IPaymentMethodCategory> | null
) {
  return PaymentMethodCategory.findOne(filter, projection, options).populate({
    path: 'paymentMethodInputs',
    model: 'PaymentMethodInput',
    populate: {
      path: 'options',
      model: 'Options',
    },
  });
}

export async function find(
  filter?: FilterQuery<IPaymentMethodCategory>,
  projection?: ProjectionType<IPaymentMethodCategory> | null,
  options?: QueryOptions<IPaymentMethodCategory> | null
) {
  return PaymentMethodCategory.find(filter, projection, options).exec();
}

export async function findPaymentMethodWithCurrency(
  filter?: FilterQuery<IPaymentMethodCategory>,
  projection?: ProjectionType<IPaymentMethodCategory> | null,
  options?: QueryOptions<IPaymentMethodCategory> | null
) {
  return PaymentMethodCategory.find(filter, projection, options)
    .populate({
      path: 'currency',
      model: 'Currency',
    })
    .exec();
}

export async function updateOne(paymentMethodCategory: IPaymentMethodCategory) {
  const paymentMethodInputs = [];
  for (const input of paymentMethodCategory.paymentMethodInputs as PaymentMethodInputDocument[]) {
    const [inputExists] = await Promise.allSettled([
      paymentMethodInputService.findOne({
        _id: input?._id,
      }),
    ]);
    if (inputExists?.status === 'fulfilled') {
      paymentMethodInputService.updateOne(
        { _id: String(input?._id) },
        {
          name: input?.name,
          placeholder: input?.placeholder,
          options: input?.options ?? [],
          requested: input?.requested,
          type: input?.type,
        }
      );
      paymentMethodInputs?.push(input?._id);
    } else {
      const newInputData = {
        name: input?.name,
        placeholder: input?.placeholder,
        options: input?.options ?? [],
        requested: input?.requested,
        type: input?.type,
      };
      const newInput = await paymentMethodInputService.create(
        newInputData as PaymentMethodInputDocument
      );
      paymentMethodInputs.push(newInput?._id);
    }
  }
  const updatedMethod = {
    currency: paymentMethodCategory?.currency,
    name: paymentMethodCategory?.name,
    selected: paymentMethodCategory?.selected,
    paymentMethodInputs,
  };
  return PaymentMethodCategory.updateOne(
    { _id: paymentMethodCategory?._id },
    { ...updatedMethod }
  ).exec();
}

export async function create(paymentMethodCategory: IPaymentMethodCategory) {
  const paymentMethodInputs = [];
  for (const input of paymentMethodCategory.paymentMethodInputs) {
    const newInput = await paymentMethodInputService.create(
      input as PaymentMethodInputDocument
    );
    paymentMethodInputs.push(newInput?._id);
  }
  return PaymentMethodCategory.create({
    ...paymentMethodCategory,
    paymentMethodInputs,
  });
}

export async function updateMany(
  paymentMethodCategories: PaymentMethodCategoryDocument[]
) {
  const methods = [];
  for (const paymentMethod of paymentMethodCategories) {
    const updatedMethod = await PaymentMethodCategory.findByIdAndUpdate(
      paymentMethod?._id,
      paymentMethod
    );
    updatedMethod.active = paymentMethod?.active;
    methods.push(updatedMethod);
  }
  return methods;
}

export async function deleteOne(paymentMethodCategoryId: string) {
  await paymentMethodService.updateMany(
    {
      type: paymentMethodCategoryId,
    },
    { active: false }
  );
  return PaymentMethodCategory.updateOne(
    { _id: paymentMethodCategoryId },
    { active: false }
  );
}

export async function pagination(
  page: number,
  perPage: number,
  filter?: FilterQuery<IPaymentMethodCategory>,
  projection?: ProjectionType<IPaymentMethodCategory> | null,
  options?: QueryOptions<IPaymentMethodCategory> | null
) {
  return paginateModel(
    page,
    perPage,
    PaymentMethodCategory,
    filter,
    projection,
    options
  );
}

export async function getPaymentMethodCategory(
  body: TGetPaymentMethodCategory,
  token: string
) {
  await getUser(token);

  const options = {
    sort: {
      name: 1,
    },
  };

  const filters: any = {
    active: true,
  };

  if (body?.name) {
    filters.name = body.name;
  }

  if (body?.currency) {
    filters.currency = body.currency;
  }

  const paymentMethodCategory = await PaymentMethodCategory.find(
    filters,
    null,
    options
  );

  return paymentMethodCategory;
}
