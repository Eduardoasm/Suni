import { Types } from 'mongoose';
import {
  ListingStatusEnum,
  ListingTC,
  ListingTypeEnum,
  PriceTypeEnum,
  priceReferenceTypeEnum,
} from './listing.model';
import { ITakerConditions } from '../takerConditions';

export const ListingTypeName = ListingTC.getTypeName();
export const ListingType = ListingTC.getType();
export const ListingTypePlural = ListingTC.getTypePlural().getTypeName();
export const ListingTypeNonNull = ListingTC.getTypeNonNull();

export type TGetListingFilter = {
  type: string;
  amount: number;
  currency: Types.ObjectId;
  asset: Types.ObjectId;
  paymentMethods: Types.ObjectId;
  page: number;
  perPage: number;
  order?: string;
};

export const getListingFilterInput = `
  input getListingFilter {
    type: String!
    amount: Float
    currency: MongoID
    asset: MongoID
    paymentMethods: MongoID
    page: Int!
    perPage: Int!
    order: ListingOrder
  }

  enum ListingOrder {
    order
    completionRate
    price
  }
`;

export type TGetListingFilterUser = {
  type: string;
  asset: Types.ObjectId;
  status: ListingStatusEnum;
  page: number;
  perPage: number;
};

export const getListingFilterUserInput = `
  input getListingFilterUser {
    type: String
    asset: MongoID
    status: String
    page: Int!
    perPage: Int!
  }
`;

export type TCreateListing = {
  currency: Types.ObjectId;
  amount: number;
  asset: Types.ObjectId;
  price?: number;
  priceType: PriceTypeEnum;
  comments?: string;
  autoReply?: string;
  paymentMethods: Array<Types.ObjectId>;
  maxAmount: number;
  minAmount: number;
  walletUser: string;
  takerConditions?: Array<ITakerConditions>;
  timeMinutes: number;
  pricePercentage: number;
  amountInAsset: boolean;
  bestPricePercentage?: number;
  priceReferenceType?: priceReferenceTypeEnum;
};

export const CreateListingInput = `
  input createListingSale {
    currency: MongoID!
    amount: Float!
    asset: MongoID!
    price: Float
    walletUser: String!
    comments: String
    autoReply: String
    paymentMethods: [MongoID]
    maxAmount: Float!
    minAmount: Float!
    takerConditions: [takerCond]
    priceType: String
    timeMinutes: Int!
    pricePercentage: Float
    amountInAsset: Boolean!
    bestPricePercentage: Float
    priceReferenceType: PriceReference
  }

  input takerCond {
    conditionName: String
    conditionValue: String
  }

  enum PriceReference {
    suni
    market
  }
  
`;

export type TGetBestPricesListing = {
  currency: Types.ObjectId;
  asset: Types.ObjectId;
  type: ListingTypeEnum;
  pricetype?: PriceTypeEnum;
};

export const GetBestPriceListingInput = `
  input GetBestPriceListing {
    currency: MongoID!
    asset: MongoID!
    type: String!
    pricetype: String
  }
`;

export const GetPricesListingType = `
  type GetPricesListingType {
    median: Float!
    bestPrice: Float!
  }
`;

export const listingsPaginationType = `
  type Pagination {
    count: Int!
    items: [${ListingType}]
    pageInfo: PageInfo!
  }
  type PageInfo {
    currentPage: Int
    perPage: Int
    itemCount: Int
    pageCount: Int
    hasPreviousPage: Boolean
    hasNextPage: Boolean
  }
`;

export type TUpdateListingUser = {
  listing: Types.ObjectId;
  currency: Types.ObjectId;
  asset: Types.ObjectId;
  amount: number;
  price?: number;
  priceType: PriceTypeEnum;
  comments: string;
  autoReply: string;
  paymentMethods: Array<Types.ObjectId>;
  maxAmount: number;
  minAmount: number;
  selectedWallet: string;
  type: ListingTypeEnum;
  takerConditions: Array<string>;
  timeMinutes: number;
  pricePercentage: number;
  amountInAsset: boolean;
  bestPricePercentage?: number;
  priceReferenceType?: priceReferenceTypeEnum;
};

export const UpdateListingUserInput = `
  input UpdateListingUser {
    listing: MongoID!
    currency: MongoID
    asset: MongoID
    amount: Float
    price: Float
    priceType: String
    comments: String
    autoReply: String
    paymentMethods:[MongoID]
    maxAmount: Float
    minAmount: Float
    selectedWallet: String
    type: String
    takerConditions: [String]
    timeMinutes: Int
    pricePercentage: Float
    amountInAsset: Boolean
    bestPricePercentage: Float
    priceReferenceType: PriceReference
  }
`;

export type TDeleteListing = {
  listing: Types.ObjectId;
};

export const DeleteListingInput = `
  input DeleteListing {
    listing: MongoID!
  }
`;

export const DeleteListingType = `
  type TypeDeleteListing {
    success: Boolean!
  }
`;

export type TCancelListing = {
  listing: Types.ObjectId;
};

export const CancelListingInput = `
  input CancelListing {
    listing: MongoID!
  }
`;

export type TGetKpiMarketPrice = {
  asset: string;
  fiat: string;
};

export const GetKpiMarketPriceInput = `
  input GetKpiMarketPrice {
    asset: String
    fiat: String
  }
`;

export const GetKpiMarketPriceType = `
  type GetKpiMarketPriceType {
    rate: Float
  }
`;
