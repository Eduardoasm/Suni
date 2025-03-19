import { NextFunction, Request, Response } from 'express';
import createHttpError from 'http-errors';
import { schemaComposer } from 'graphql-compose';
import {
  AppealType,
  TCreateAppeal,
  CreateAppealInput,
  CancelAppealInput,
  TCancelAppeal,
} from './appeal.dto';
import * as appealService from './appeal.service';
import { AppealTC } from './appeal.model';
import { TransactionType, ManageCryptoAdminInput } from '../../transaction';

export const createAppeal = schemaComposer.createResolver<
  any,
  {
    data: TCreateAppeal;
  }
>({
  name: 'createAppeal',
  kind: 'mutation',
  description: 'create appeal',
  type: AppealType,
  args: {
    data: CreateAppealInput,
  },
  async resolve({ args, context }) {
    const token = context.req.headers?.authorization;
    const appeal = await appealService.create(args?.data, token);
    return appeal;
  },
});

export const cancelAppealUser = schemaComposer.createResolver<
  any,
  {
    data: TCancelAppeal;
  }
>({
  name: 'CancelAppealUser',
  kind: 'mutation',
  description: 'Cancel Appeal from user',
  type: AppealType,
  args: {
    data: CancelAppealInput,
  },
  async resolve({ args, context }) {
    const token = context.req.headers?.authorization;
    const appeal = await appealService.cancelAppeal(args?.data, token);
    return appeal;
  },
});

const manageCryptoAdmin = schemaComposer.createResolver<any>({
  name: 'releaseCryptoAdmin',
  kind: 'mutation',
  description: 'release transaction crypto amount by admin to buyer',
  type: TransactionType,
  args: {
    data: ManageCryptoAdminInput,
  },
  async resolve({ args }) {
    const transaction = await appealService.manageCryptoAdmin(args?.data);
    return transaction;
  },
});

const appealMutations = {
  createAppeal,
  updateAppeal: AppealTC.mongooseResolvers.updateOne(),
  cancelAppealUser,
  manageCryptoAdmin,
};

const appealQueries = {
  appeal: AppealTC.mongooseResolvers.findOne(),
  appeals: AppealTC.mongooseResolvers.findMany(),
  totalAppeal: AppealTC.mongooseResolvers.count(),
};

export { appealQueries, appealMutations };

export async function getAll(req: Request, res: Response, next: NextFunction) {
  try {
    const token = req?.headers?.authorization;
    const appeals = await appealService.getAllAppealInfo(
      token,
      req?.body?.filter
    );
    return res.status(200).json({ appeals });
  } catch (error) {
    next(createHttpError(500, error.message, { err: error.message }));
  }
}

export async function findOne(req: Request, res: Response, next: NextFunction) {
  try {
    const token = req?.headers?.authorization;
    const appeal = await appealService.findAppeal(token, {
      _id: req?.params?._id,
    });
    return res.status(200).json({ appeal });
  } catch (error) {
    next(createHttpError(500, error.message, { err: error.message }));
  }
}

export async function manageCryptoAdminApi(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const transaction = await appealService.manageCryptoAdmin(req?.body?.data);
    return res.status(200).json({ transaction });
  } catch (error) {
    console.log(error, 'ERROR');
    next(createHttpError(500, error.message, { err: error.message }));
  }
}
