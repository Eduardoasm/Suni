import { NextFunction, Request, Response } from 'express';
import createHttpError from 'http-errors';
import { schemaComposer } from 'graphql-compose';
import { CurrencyTC } from './currency.model';
import * as currencyService from './currency.service';
import { GetAssetWalletsInput, userWalletsType } from './currency.dto';

export async function getAll(req: Request, res: Response, next: NextFunction) {
  try {
    const currencies = await currencyService.find();
    return res.status(200).json(currencies);
  } catch (error) {
    next(createHttpError(500, error.message, { err: error.message }));
  }
}

export const getWalletsUser = schemaComposer.createResolver<any>({
  name: 'getWalletsUser',
  kind: 'query',
  description: 'get wallets from user',
  type: userWalletsType,
  async resolve({ context }) {
    const token = context?.req?.headers?.authorization;
    const wallets = await currencyService.getUserWallets(token);
    return {
      wallets,
    };
  },
});

export const getAssetWalletsUser = schemaComposer.createResolver<any>({
  name: 'getWalletsUser',
  kind: 'query',
  description: 'get asset wallets from user',
  type: userWalletsType,
  args: {
    data: GetAssetWalletsInput,
  },
  async resolve({ args, context }) {
    const token = context?.req?.headers?.authorization;
    const wallets = await currencyService.getUserAssetWallets(
      args?.data,
      token
    );
    return {
      wallets,
    };
  },
});

const currencyMutations = {
  createCurrency: CurrencyTC.mongooseResolvers.createOne(),
  updateCurrency: CurrencyTC.mongooseResolvers.updateOne(),
};

const currencyQueries = {
  currency: CurrencyTC.mongooseResolvers.findOne(),
  currencies: CurrencyTC.mongooseResolvers.findMany(),
  totalCurrency: CurrencyTC.mongooseResolvers.count(),
  getWalletsUser,
  getAssetWalletsUser,
};

export { currencyQueries, currencyMutations };
