/* eslint-disable import/no-cycle */
import type {
  FilterQuery,
  ProjectionType,
  QueryOptions,
  UpdateQuery,
  UpdateWithAggregationPipeline,
} from 'mongoose';
import { paginateModel } from '../../utils';
import { IBestPrice, BestPrice } from './bestPrice.model';
import * as listingService from '../listing/listing/listing.service';
import { TGetBestPrice } from './bestPrice.dto';

export async function findOne(
  filter?: FilterQuery<IBestPrice>,
  projection?: ProjectionType<IBestPrice> | null,
  options?: QueryOptions<IBestPrice> | null
) {
  return BestPrice.findOne(filter, projection, options).exec();
}

export async function find(
  filter?: FilterQuery<IBestPrice>,
  projection?: ProjectionType<IBestPrice> | null,
  options?: QueryOptions<IBestPrice> | null
) {
  return BestPrice.find(filter, projection, options).exec();
}

export async function updateOne(
  filter: FilterQuery<IBestPrice>,
  update: UpdateQuery<IBestPrice> | UpdateWithAggregationPipeline,
  options?: QueryOptions<IBestPrice> | null
) {
  return BestPrice.updateOne(filter, update, options).exec();
}

export async function create(bestPrice: IBestPrice) {
  return BestPrice.create(bestPrice);
}

export async function pagination(
  page: number,
  perPage: number,
  filter?: FilterQuery<IBestPrice>,
  projection?: ProjectionType<IBestPrice> | null,
  options?: QueryOptions<IBestPrice> | null
) {
  return paginateModel(page, perPage, BestPrice, filter, projection, options);
}

export async function getBestPrice(body: TGetBestPrice) {
  const bestPricePurchaseListing = await listingService.findOne(
    {
      currency: body.currencyId,
      asset: body.assetId,
      price: { $ne: null },
    },
    {},
    {
      sort: {
        price: -1,
      },
    }
  );

  const bestPriceSaleListing = await listingService.findOne(
    {
      currency: body.currencyId,
      asset: body.assetId,
      price: { $ne: null },
    },
    {},
    {
      sort: {
        price: 1,
      },
    }
  );
  // upsert busqueda de bestPrice filtrando por currency y asset
  // si consigue un modelBestPrice con el mismo currency o asset lo updatea si no, lo crea
  const bestPrice = await BestPrice.findOneAndUpdate(
    { currency: body.currencyId, asset: body.assetId },
    {
      purchaseBestPrice: bestPricePurchaseListing?.price,
      saleBestPrice: bestPriceSaleListing?.price,
    },
    {
      upsert: true,
      new: true,
    }
  );

  return bestPrice;
}
