import { schemaComposer } from 'graphql-compose';
import { NextFunction, Request, Response } from 'express';
import createHttpError from 'http-errors';
import { PaymentMethodTC } from './paymentMethod.model';
import {
  CreatePaymentMethodUserInput,
  TCreatePaymentMethodUser,
  PaymentMethodType,
  GetPaymentMethodUserInput,
  PaymentMethodTypePlural,
  TCancelPaymentMethod,
  CancelPaymentMethodType,
  CancelPaymentMethodInput,
  UpdatePaymentMethodInput,
  TUpdatePaymentMethod,
} from './paymentMethod.dto';
import * as paymentMethodService from './paymentMethod.service';
import { getUser } from '../../utils/walletService/userWau';

export const createPaymentMethod = schemaComposer.createResolver<
  any,
  {
    data: TCreatePaymentMethodUser;
  }
>({
  name: 'createPaymentMethod',
  kind: 'mutation',
  description: 'create payment Method',
  type: PaymentMethodType,
  args: {
    data: CreatePaymentMethodUserInput,
  },
  async resolve({ args, context }) {
    const token = context.req?.headers?.authorization;
    const paymentMethod = await paymentMethodService.create(args?.data, token);
    return paymentMethod;
  },
});

export const cancelPaymentMethod = schemaComposer.createResolver<
  any,
  {
    data: TCancelPaymentMethod;
  }
>({
  name: 'cancelPaymentMethod',
  kind: 'mutation',
  description: 'cancel payment Method',
  type: CancelPaymentMethodType,
  args: {
    data: CancelPaymentMethodInput,
  },
  async resolve({ args, context }) {
    const token = context.req?.headers?.authorization;
    const paymentMethod = await paymentMethodService.cancelPaymentMethod(
      args?.data,
      token
    );
    return {
      success: paymentMethod.success,
      paymentMethod: paymentMethod.paymentMethod,
    };
  },
});

export const updatePaymentMethodUser = schemaComposer.createResolver<
  any,
  {
    data: TUpdatePaymentMethod;
  }
>({
  name: 'updatePaymentMethod',
  kind: 'mutation',
  description: 'cancel payment Method',
  type: PaymentMethodType,
  args: {
    data: UpdatePaymentMethodInput,
  },
  async resolve({ args, context }) {
    const token = context.req?.headers?.authorization;
    const paymentMethod = await paymentMethodService.updatePaymentMethod(
      args?.data,
      token
    );
    return paymentMethod;
  },
});

export const getPaymentMethodCurrency = schemaComposer.createResolver<any>({
  name: 'getPaymentMethodUser',
  kind: 'query',
  description: 'get payment Method for currency',
  type: PaymentMethodTypePlural,
  args: {
    data: GetPaymentMethodUserInput,
  },
  async resolve({ args, context }) {
    const token = context.req?.headers?.authorization;
    const paymentMethod = await paymentMethodService.findPaymentMethod(
      args?.data,
      token
    );
    return paymentMethod;
  },
});

export async function updateMany(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const updatedPaymentMethods = await paymentMethodService.updateMany(
      req.body.filter,
      req.body.paymentMethodType
    );
    return res.status(200).json(updatedPaymentMethods);
  } catch (error) {
    next(createHttpError(500, error.message, { err: error.message }));
  }
}

const paymentMethodMutations = {
  createPaymentMethod,
  updatePaymentMethod: PaymentMethodTC.mongooseResolvers.updateOne(),
  cancelPaymentMethod,
  updatePaymentMethodUser,
};

const paymentMethodQueries = {
  paymentMethod: PaymentMethodTC.mongooseResolvers.findOne(),
  paymentMethods: PaymentMethodTC.mongooseResolvers.findMany(),
  totalPaymentMethods: PaymentMethodTC.mongooseResolvers.count(),
  getPaymentMethodCurrency,
};

export { paymentMethodQueries, paymentMethodMutations };
