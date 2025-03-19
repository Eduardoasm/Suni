import { schemaComposer } from 'graphql-compose';
import { NextFunction, Request, Response } from 'express';
import createHttpError from 'http-errors';
import { PaymentMethodCategoryTC } from './paymentMethodCategory.model';
import * as paymentMethodCategoryService from './paymentMethodCategory.service';
import {
  GetPaymentMethodCategoryInput,
  PaymentMethodCategoryTypePlural,
} from './paymentMethodCategory.dto';

export const getPaymentMethodCategory = schemaComposer.createResolver<any>({
  name: 'getPaymentMethodCategory',
  kind: 'query',
  description: 'get payment method types',
  type: PaymentMethodCategoryTypePlural,
  args: {
    data: GetPaymentMethodCategoryInput,
  },
  async resolve({ args, context }) {
    const token = context.req.headers.authorization;
    const paymentMethodCategory =
      await paymentMethodCategoryService.getPaymentMethodCategory(
        args?.data,
        token
      );
    return paymentMethodCategory;
  },
});

export async function getAll(req: Request, res: Response, next: NextFunction) {
  try {
    const paymentMethodCategory = await paymentMethodCategoryService.find(
      req?.body?.filter
    );
    return res.status(200).json(paymentMethodCategory);
  } catch (error) {
    next(createHttpError(500, error.message, { err: error.message }));
  }
}

export async function getAllWithCurrency(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const paymentMethodCategory =
      await paymentMethodCategoryService.findPaymentMethodWithCurrency(
        req?.body?.filter
      );
    return res.status(200).json(paymentMethodCategory);
  } catch (error) {
    next(createHttpError(500, error.message, { err: error.message }));
  }
}

export async function findOne(req: Request, res: Response, next: NextFunction) {
  try {
    const paymentMethodCategory = await paymentMethodCategoryService.findOne({
      _id: req.params._id,
    });
    return res.status(200).json(paymentMethodCategory);
  } catch (error) {
    next(createHttpError(500, error.message, { err: error.message }));
  }
}

export async function updateOne(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const updatedPaymentMethodCategory =
      await paymentMethodCategoryService.updateOne(
        req?.body?.paymentMethodType
      );
    return res.status(200).json(updatedPaymentMethodCategory);
  } catch (error) {
    next(createHttpError(500, error.message, { err: error.message }));
  }
}

export async function deleteOne(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const deletedPaymentMethodCategory =
      await paymentMethodCategoryService.deleteOne(req.params._id);
    return res.status(200).json(deletedPaymentMethodCategory);
  } catch (error) {
    next(createHttpError(500, error.message, { err: error.message }));
  }
}

export async function updateMany(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const methods = await paymentMethodCategoryService.updateMany(
      req.body.paymentMethodTypes
    );
    return res.status(200).json(methods);
  } catch (error) {
    next(createHttpError(500, error.message, { err: error.message }));
  }
}

export async function create(req: Request, res: Response, next: NextFunction) {
  try {
    const newPaymentMethodCategory = await paymentMethodCategoryService.create(
      req?.body?.paymentMethodType
    );
    return res.status(200).json(newPaymentMethodCategory);
  } catch (error) {
    next(createHttpError(500, error.message, { err: error.message }));
  }
}

const paymentMethodCategoryMutations = {
  createPaymentMethodCategory:
    PaymentMethodCategoryTC.mongooseResolvers.createOne(),
  updatePaymentMethodCategory:
    PaymentMethodCategoryTC.mongooseResolvers.updateOne(),
};

const paymentMethodCategoryQueries = {
  paymentMethodCategory: PaymentMethodCategoryTC.mongooseResolvers.findOne(),
  paymentMethodsCategory: PaymentMethodCategoryTC.mongooseResolvers.findMany(),
  totalPaymentMethodsCategory:
    PaymentMethodCategoryTC.mongooseResolvers.count(),
  getPaymentMethodCategory,
};

export { paymentMethodCategoryQueries, paymentMethodCategoryMutations };
