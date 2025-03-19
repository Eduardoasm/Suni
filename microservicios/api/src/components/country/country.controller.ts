import { NextFunction, Request, Response } from 'express';
import createHttpError from 'http-errors';
import { CountryTC } from './country.model';
import * as countryService from './country.service';

export async function create(req: Request, res: Response, next: NextFunction) {
  try {
    const newCountry = await countryService.create(req.body.country);
    return res.status(200).json(newCountry);
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
    const newCountry = await countryService.updateOne(
      req.body.filter,
      req.body.update
    );
    return res.status(200).json(newCountry);
  } catch (error) {
    next(createHttpError(500, error.message, { err: error.message }));
  }
}
export async function getAll(req: Request, res: Response, next: NextFunction) {
  try {
    const newCountry = await countryService.find();
    return res.status(200).json(newCountry);
  } catch (error) {
    next(createHttpError(500, error.message, { err: error.message }));
  }
}

export async function findOne(req: Request, res: Response, next: NextFunction) {
  try {
    const newCountry = await countryService.findOne({
      _id: req.params._id,
    });
    return res.status(200).json(newCountry);
  } catch (error) {
    next(createHttpError(500, error.message, { err: error.message }));
  }
}

const countryMutations = {
  createCountry: CountryTC.mongooseResolvers.createOne(),
  updateCountry: CountryTC.mongooseResolvers.updateOne(),
};

const countryQueries = {
  country: CountryTC.mongooseResolvers.findOne(),
  countries: CountryTC.mongooseResolvers.findMany(),
  totalCountries: CountryTC.mongooseResolvers.count(),
};

export { countryQueries, countryMutations };
