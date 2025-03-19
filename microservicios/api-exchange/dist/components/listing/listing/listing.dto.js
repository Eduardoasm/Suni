"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetKpiMarketPriceType = exports.GetKpiMarketPriceInput = exports.CancelListingInput = exports.DeleteListingType = exports.DeleteListingInput = exports.UpdateListingUserInput = exports.listingsPaginationType = exports.GetPricesListingType = exports.GetBestPriceListingInput = exports.CreateListingInput = exports.getListingFilterUserInput = exports.getListingFilterInput = exports.ListingTypeNonNull = exports.ListingTypePlural = exports.ListingType = exports.ListingTypeName = void 0;
const listing_model_1 = require("./listing.model");
exports.ListingTypeName = listing_model_1.ListingTC.getTypeName();
exports.ListingType = listing_model_1.ListingTC.getType();
exports.ListingTypePlural = listing_model_1.ListingTC.getTypePlural().getTypeName();
exports.ListingTypeNonNull = listing_model_1.ListingTC.getTypeNonNull();
exports.getListingFilterInput = `
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
exports.getListingFilterUserInput = `
  input getListingFilterUser {
    type: String
    asset: MongoID
    status: String
    page: Int!
    perPage: Int!
  }
`;
exports.CreateListingInput = `
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
exports.GetBestPriceListingInput = `
  input GetBestPriceListing {
    currency: MongoID!
    asset: MongoID!
    type: String!
    pricetype: String
  }
`;
exports.GetPricesListingType = `
  type GetPricesListingType {
    median: Float!
    bestPrice: Float!
  }
`;
exports.listingsPaginationType = `
  type Pagination {
    count: Int!
    items: [${exports.ListingType}]
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
exports.UpdateListingUserInput = `
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
exports.DeleteListingInput = `
  input DeleteListing {
    listing: MongoID!
  }
`;
exports.DeleteListingType = `
  type TypeDeleteListing {
    success: Boolean!
  }
`;
exports.CancelListingInput = `
  input CancelListing {
    listing: MongoID!
  }
`;
exports.GetKpiMarketPriceInput = `
  input GetKpiMarketPrice {
    asset: String
    fiat: String
  }
`;
exports.GetKpiMarketPriceType = `
  type GetKpiMarketPriceType {
    rate: Float
  }
`;
//# sourceMappingURL=listing.dto.js.map