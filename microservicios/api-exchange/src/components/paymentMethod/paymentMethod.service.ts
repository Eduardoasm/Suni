/* eslint-disable import/no-cycle */
import type {
  FilterQuery,
  ProjectionType,
  QueryOptions,
  UpdateQuery,
  UpdateWithAggregationPipeline,
} from 'mongoose';
import { NoSentryError, paginateModel } from '../../utils';
import { IPaymentMethod, PaymentMethod } from './paymentMethod.model';
import {
  TCancelPaymentMethod,
  TCreatePaymentMethodUser,
  TGetPaymentMethodUser,
  TUpdatePaymentMethod,
} from './paymentMethod.dto';
import * as paymentMethodValueService from '../paymentMethodValue/paymentMethodValue.service';
import * as paymentMethodCategoryService from '../paymentMethodCategory/paymentMethodCategory.service';
import { getUser } from '../../utils/walletService/userWau';
import * as transactionService from '../transaction/transaction.service';
import * as listingService from '../listing/listing/listing.service';
import * as countryService from '../country/country.service';

export async function findOne(
  filter?: FilterQuery<IPaymentMethod>,
  projection?: ProjectionType<IPaymentMethod> | null,
  options?: QueryOptions<IPaymentMethod> | null
) {
  return PaymentMethod.findOne(filter, projection, options).exec();
}

export async function find(
  filter?: FilterQuery<IPaymentMethod>,
  projection?: ProjectionType<IPaymentMethod> | null,
  options?: QueryOptions<IPaymentMethod> | null
) {
  return PaymentMethod.find(filter, projection, options).exec();
}

export async function updateOne(
  filter: FilterQuery<IPaymentMethod>,
  update: UpdateQuery<IPaymentMethod> | UpdateWithAggregationPipeline,
  options?: QueryOptions<IPaymentMethod> | null
) {
  return PaymentMethod.updateOne(filter, update, options).exec();
}

export async function updateMany(
  filter: FilterQuery<IPaymentMethod>,
  update: UpdateQuery<IPaymentMethod> | UpdateWithAggregationPipeline,
  options?: QueryOptions<IPaymentMethod> | null
) {
  return PaymentMethod.updateMany(filter, update, options);
}

export async function create(
  body: TCreatePaymentMethodUser,
  token: string
): Promise<IPaymentMethod> {
  const { data: user } = await getUser(token);
  const value = await paymentMethodValueService.insertMany(body.values);

  const valuesId = value.map((idValue) => idValue._id);

  const paymentMethod = await PaymentMethod.create({
    type: body.type,
    user: {
      id: user?.id,
      name: user?.metamapStatus?.dni_firstName ?? user?.name,
      email: user?.email,
      lastname: user?.metamapStatus?.dni_lastName ?? user?.lastname,
    },
    values: valuesId,
  });

  return paymentMethod;
}

export async function findPaymentMethod(
  body: TGetPaymentMethodUser,
  token: string
): Promise<IPaymentMethod[]> {
  const { data: user } = await getUser(token);

  const typeUser = await paymentMethodCategoryService.find({
    currency: body.currency ? body.currency : { $ne: null },
    active: true,
  });

  const paymentMethodUser = await PaymentMethod.find({
    type: typeUser,
    'user.id': user?.id,
    active: true,
  });

  return paymentMethodUser;
}

export async function pagination(
  page: number,
  perPage: number,
  filter?: FilterQuery<IPaymentMethod>,
  projection?: ProjectionType<IPaymentMethod> | null,
  options?: QueryOptions<IPaymentMethod> | null
) {
  return paginateModel(
    page,
    perPage,
    PaymentMethod,
    filter,
    projection,
    options
  );
}

export async function cancelPaymentMethod(
  body: TCancelPaymentMethod,
  token: string
) {
  const { data: user } = await getUser(token);

  // const countryAvailable = await countryService.findOne({
  //   code: user.country,
  //   active: true,
  //   disabled: false,
  // });
  // if (!countryAvailable)
  //   throw new NoSentryError(
  //     'Access denied, the country is disabled to the app'
  //   );

  const paymentMethod = await PaymentMethod.findOne({
    $and: [{ _id: body.paymentMethodId }, { 'user.id': user?.id }],
  });

  if (!paymentMethod) {
    throw new NoSentryError('Error in delete paymentMethod');
  }

  const transaction = await transactionService.find({
    $and: [
      { paymentMethod: paymentMethod._id },
      { active: true },
      {
        status: {
          $in: [
            'pending',
            'payment_executed',
            'payment_received',
            'default',
            'appealed',
          ],
        },
      },
    ],
  });

  if (transaction.length) {
    throw new NoSentryError(
      'Error in delete paymentMethod, please finish the transaction'
    );
  }

  const listing = await listingService.find({
    $and: [{ paymentMethods: paymentMethod._id }, { status: 'active' }],
  });

  if (listing.length === 1) {
    throw new NoSentryError(
      'Error in delete paymentMethod, please delete de listing'
    );
  }

  paymentMethod.active = false;
  await paymentMethod.save();

  return {
    success: true,
    paymentMethod,
  };
}

export async function updatePaymentMethod(
  body: TUpdatePaymentMethod,
  token: string
) {
  const { data: user } = await getUser(token);

  // const countryAvailable = await countryService.findOne({
  //   code: user.country,
  //   active: true,
  //   disabled: false,
  // });
  // if (!countryAvailable)
  //   throw new NoSentryError(
  //     'Access denied, the country is disabled to the app'
  //   );

  const paymentMethodUser = await PaymentMethod.findOne({
    $and: [{ _id: body.paymentMethodId }, { 'user.id': user.id }],
  });

  if (!paymentMethodUser) {
    throw new NoSentryError('Error in update Payment Method');
  }

  const transaction = await transactionService.find({
    $and: [
      { paymentMethod: paymentMethodUser._id },
      { active: true },
      {
        status: {
          $in: [
            'pending',
            'payment_executed',
            'payment_received',
            'default',
            'appealed',
          ],
        },
      },
    ],
  });

  if (transaction.length) {
    throw new NoSentryError(
      'Error in update paymentMethod, please finish the transaction'
    );
  }

  const type = await paymentMethodCategoryService.findOne({ _id: body?.type });

  const value = await paymentMethodValueService.insertMany(body?.values);

  const valuesId = value.map((idValue) => idValue._id);

  const paymentUpdate = await PaymentMethod.updateOne(
    {
      _id: paymentMethodUser._id,
      'user.id': user?.id,
    },
    {
      type: type?._id,
      values: valuesId,
      requiredInfo: body?.requiredInfo,
    }
  );

  const paymentMethod = await PaymentMethod.findOne({
    _id: body.paymentMethodId,
  });

  return paymentMethod;
}
