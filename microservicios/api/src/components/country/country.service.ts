import type {
  FilterQuery,
  ProjectionType,
  QueryOptions,
  UpdateQuery,
} from 'mongoose';
import { Country, ICountry } from './country.model';

export async function create(country: ICountry) {
  return Country.create(country);
}

export async function updateOne(
  filter: FilterQuery<ICountry>,
  update: UpdateQuery<ICountry> | null,
  options?: QueryOptions<ICountry> | null
) {
  return Country.updateOne(filter, update, options).exec();
}

export async function findOne(
  filter?: FilterQuery<ICountry>,
  projection?: ProjectionType<ICountry> | null,
  options?: QueryOptions<ICountry> | null
) {
  return Country.findOne(filter, projection, options);
}

export async function find(
  filter?: FilterQuery<ICountry>,
  projection?: ProjectionType<ICountry> | null,
  options?: QueryOptions<ICountry> | null
) {
  return Country.find(filter, projection, options).exec();
}
