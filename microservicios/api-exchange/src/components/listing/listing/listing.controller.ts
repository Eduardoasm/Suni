/* eslint-disable dot-notation */
import { NextFunction, Request, Response } from 'express';
import { schemaComposer } from 'graphql-compose';
import {
  CreateListingInput,
  GetBestPriceListingInput,
  GetPricesListingType,
  ListingType,
  TCreateListing,
  TDeleteListing,
  TUpdateListingUser,
  UpdateListingUserInput,
  getListingFilterInput,
  getListingFilterUserInput,
  CancelListingInput,
  listingsPaginationType,
  GetKpiMarketPriceType,
  GetKpiMarketPriceInput,
} from './listing.dto';
import { ListingTC } from './listing.model';
import * as listingService from './listing.service';
import { buildPaginationType } from '../../../utils';

export const getListingFilters = schemaComposer.createResolver<any>({
  name: 'getListingFilter',
  kind: 'query',
  description: 'get listings filters',
  type: listingsPaginationType,
  args: {
    data: getListingFilterInput,
  },
  async resolve({ args, context }) {
    const token = context.req.headers.authorization;
    const listings = await listingService.getListingFilter(args?.data, token);
    return listings;
  },
});

export const getListingFiltersUser = schemaComposer.createResolver<any>({
  name: 'getListingFilterUser',
  kind: 'query',
  description: 'get listings filters by user',
  type: listingsPaginationType,
  args: {
    data: getListingFilterUserInput,
  },
  async resolve({ args, context }) {
    const token = context.req.headers.authorization;
    const listings = await listingService.getListingFilterUser(
      args?.data,
      token
    );
    return listings;
  },
});

export const createListingSale = schemaComposer.createResolver<
  any,
  {
    data: TCreateListing;
  }
>({
  name: 'createListingSale',
  kind: 'mutation',
  description: 'create listing for sale',
  type: ListingType,
  args: {
    data: CreateListingInput,
  },
  async resolve({ args, context }) {
    const token = context.req.headers?.['authorization'];
    const listings = await listingService.createListingSale(token, args?.data);
    return listings;
  },
});

export const cancelListing = schemaComposer.createResolver<
  any,
  {
    data: TDeleteListing;
  }
>({
  name: 'cancelListing',
  kind: 'mutation',
  description: 'cancel listing',
  type: ListingType,
  args: {
    data: CancelListingInput,
  },
  async resolve({ args, context }) {
    const token = context.req.headers?.['authorization'];
    const listings = await listingService.cancelListing(args?.data, token);
    return listings;
  },
});

export const updateListingUserCustom = schemaComposer.createResolver<
  any,
  {
    data: TUpdateListingUser;
  }
>({
  name: 'updateListingUserCustom',
  kind: 'mutation',
  description: 'update listing',
  type: ListingType,
  args: {
    data: UpdateListingUserInput,
  },
  async resolve({ args, context }) {
    const token = context.req.headers?.['authorization'];
    const listings = await listingService.updateListingUser(args?.data, token);
    return listings;
  },
});

export const getBestPricesListings = schemaComposer.createResolver<any>({
  name: 'getBestPricesListings',
  kind: 'query',
  description: 'get best prices listings',
  type: GetPricesListingType,
  args: {
    data: GetBestPriceListingInput,
  },
  async resolve({ args }) {
    const listings = await listingService.bestPricesListings(args?.data);
    return listings;
  },
});

export const createListingPurchase = schemaComposer.createResolver<
  any,
  {
    data: TCreateListing;
  }
>({
  name: 'createListingPurchase',
  kind: 'mutation',
  description: 'create listing for purchase',
  type: ListingType,
  args: {
    data: CreateListingInput,
  },
  async resolve({ args, context }) {
    const token = context.req.headers?.['authorization'];
    const listings = await listingService.createListingPurchase(
      token,
      args?.data
    );
    return listings;
  },
});

export const getKpiMarketPrice = schemaComposer.createResolver<any>({
  name: 'getKpiMarketPrice',
  kind: 'query',
  description: 'get kpi market price',
  type: GetKpiMarketPriceType,
  args: {
    data: GetKpiMarketPriceInput,
  },
  async resolve({ args, context }) {
    const token = context.req.headers?.['authorization'];
    const marketPrice = await listingService.getKpiMarketPrice(
      args?.data,
      token
    );
    return marketPrice;
  },
});

export const addReferenceNumber = schemaComposer.createResolver<any>({
  name: 'addReferenceNumber',
  kind: 'query',
  description: 'add referenceNumber in all listings',
  type: 'Boolean',
  async resolve() {
    const listings = await listingService.addReferenceNumber();
    return listings;
  },
});

const listingMutations = {
  createListing: ListingTC.mongooseResolvers.createOne(),
  updateListing: ListingTC.mongooseResolvers.updateOne(),
  createListingPurchase,
  createListingSale,
  updateListingUserCustom,
  cancelListing,
  addReferenceNumber,
};

const listingQueries = {
  listing: ListingTC.mongooseResolvers.findOne(),
  listings: ListingTC.mongooseResolvers.findMany(),
  totalListing: ListingTC.mongooseResolvers.count(),
  getListingFilters,
  getBestPricesListings,
  getListingFiltersUser,
  getKpiMarketPrice,
};

export { listingQueries, listingMutations };

export async function getOne(req: Request, res: Response, next: NextFunction) {
  try {
    const listing = await listingService.findOne({
      _id: req.params._id,
    });
    return res.status(200).json({ success: true, listing });
  } catch (err) {
    res.status(500).json({ err: 'Internal server error', success: false });
  }
}
