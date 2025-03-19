/* eslint-disable import/no-cycle */
import type {
  FilterQuery,
  ProjectionType,
  QueryOptions,
  UpdateQuery,
  UpdateWithAggregationPipeline,
} from 'mongoose';
import { paginateModel } from '../../utils';
import { IAsset, Asset } from './asset.model';

export async function findOne(
  filter?: FilterQuery<IAsset>,
  projection?: ProjectionType<IAsset> | null,
  options?: QueryOptions<IAsset> | null
) {
  return Asset.findOne(filter, projection, options).exec();
}

export async function find(
  filter?: FilterQuery<IAsset>,
  projection?: ProjectionType<IAsset> | null,
  options?: QueryOptions<IAsset> | null
) {
  return Asset.find(filter, projection, options).exec();
}

export async function updateOne(
  filter: FilterQuery<IAsset>,
  update: UpdateQuery<IAsset> | UpdateWithAggregationPipeline,
  options?: QueryOptions<IAsset> | null
) {
  return Asset.updateOne(filter, update, options).exec();
}

export async function create(asset: IAsset) {
  return Asset.create(asset);
}

export async function pagination(
  page: number,
  perPage: number,
  filter?: FilterQuery<IAsset>,
  projection?: ProjectionType<IAsset> | null,
  options?: QueryOptions<IAsset> | null
) {
  return paginateModel(page, perPage, Asset, filter, projection, options);
}

export async function getAssets() {
  return Asset.aggregate([
    { $match: { active: true } },
    { $sort: { index: 1 } },
  ]);
}
