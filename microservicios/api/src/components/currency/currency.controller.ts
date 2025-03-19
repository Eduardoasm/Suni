import type { Request, Response, NextFunction } from 'express';
import { schemaComposer } from 'graphql-compose';
import {
  TCreateCurrencyInput,
  CreateCurrencyInput,
  CurrencyType,
} from './currency.dto';
import { CurrencyTC } from './currency.model';
// eslint-disable-next-line import/no-cycle
import * as currencyService from './currency.service';

const createCurrency = schemaComposer.createResolver<
  any,
  {
    data: TCreateCurrencyInput;
  }
>({
  name: 'createCurrency',
  kind: 'mutation',
  description: 'create a currency',
  type: CurrencyType,
  args: {
    data: CreateCurrencyInput,
  },
  async resolve({ args }) {
    const currency = await currencyService.create(args?.data);
    return currency;
  },
});

const currencyQueries = {
  currency: CurrencyTC.mongooseResolvers.findOne(),
  currencies: CurrencyTC.mongooseResolvers.findMany({
    limit: { defaultValue: 1000000 },
  }),
};

const currencyMutations = {
  updateCurrency: CurrencyTC.mongooseResolvers.updateOne(),
  createCurrency,
};

// REST Controller

export async function getAll(req: Request, res: Response, next: NextFunction) {
  try {
    const currencies = await currencyService.find({});
    return res.status(200).json({ success: true, currencies });
  } catch (err) {
    res.status(500).json({ err: 'Internal server error', success: false });
  }
}

export async function getOne(req: Request, res: Response, next: NextFunction) {
  try {
    const currency = await currencyService.findOne({ _id: req.params._id });
    return res.status(200).json({ success: true, currency });
  } catch (err) {
    res.status(500).json({ err: 'Internal server error', success: false });
  }
}

export async function createOne(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const currency = await currencyService.create(req.body);
    return res.status(200).json({ success: true, currency });
  } catch (err) {
    res.status(500).json({ err: 'Internal server error', success: false });
  }
}

export async function updateOne(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const currency = await currencyService.updateOne(
      { _id: req.params._id },
      req.body
    );
    return res.status(200).json({ success: true, currency });
  } catch (err) {
    res.status(500).json({ err: 'Internal server error', success: false });
  }
}

export async function pagination(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const data = await currencyService.pagination(
      Number(req.params.page),
      Number(req.params.perPage)
    );
    return res.status(200).json({ success: true, pagination: data });
  } catch (err) {
    res.status(500).json({ err: 'Internal server error', success: false });
  }
}

export { currencyQueries, currencyMutations };
