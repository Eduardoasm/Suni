import { Types } from 'mongoose';
import { ListingStatusEnum, ListingTypeEnum, PriceTypeEnum, priceReferenceTypeEnum } from './listing.model';
import { ITakerConditions } from '../takerConditions';
export declare const ListingTypeName: string;
export declare const ListingType: import("graphql").GraphQLObjectType<any, any>;
export declare const ListingTypePlural: string;
export declare const ListingTypeNonNull: import("graphql-compose").NonNullComposer<import("graphql-compose").ObjectTypeComposer<import("./listing.model").ListingDocument, any>>;
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
export declare const getListingFilterInput = "\n  input getListingFilter {\n    type: String!\n    amount: Float\n    currency: MongoID\n    asset: MongoID\n    paymentMethods: MongoID\n    page: Int!\n    perPage: Int!\n    order: ListingOrder\n  }\n\n  enum ListingOrder {\n    order\n    completionRate\n    price\n  }\n";
export type TGetListingFilterUser = {
    type: string;
    asset: Types.ObjectId;
    status: ListingStatusEnum;
    page: number;
    perPage: number;
};
export declare const getListingFilterUserInput = "\n  input getListingFilterUser {\n    type: String\n    asset: MongoID\n    status: String\n    page: Int!\n    perPage: Int!\n  }\n";
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
export declare const CreateListingInput = "\n  input createListingSale {\n    currency: MongoID!\n    amount: Float!\n    asset: MongoID!\n    price: Float\n    walletUser: String!\n    comments: String\n    autoReply: String\n    paymentMethods: [MongoID]\n    maxAmount: Float!\n    minAmount: Float!\n    takerConditions: [takerCond]\n    priceType: String\n    timeMinutes: Int!\n    pricePercentage: Float\n    amountInAsset: Boolean!\n    bestPricePercentage: Float\n    priceReferenceType: PriceReference\n  }\n\n  input takerCond {\n    conditionName: String\n    conditionValue: String\n  }\n\n  enum PriceReference {\n    suni\n    market\n  }\n  \n";
export type TGetBestPricesListing = {
    currency: Types.ObjectId;
    asset: Types.ObjectId;
    type: ListingTypeEnum;
    pricetype?: PriceTypeEnum;
};
export declare const GetBestPriceListingInput = "\n  input GetBestPriceListing {\n    currency: MongoID!\n    asset: MongoID!\n    type: String!\n    pricetype: String\n  }\n";
export declare const GetPricesListingType = "\n  type GetPricesListingType {\n    median: Float!\n    bestPrice: Float!\n  }\n";
export declare const listingsPaginationType: string;
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
export declare const UpdateListingUserInput = "\n  input UpdateListingUser {\n    listing: MongoID!\n    currency: MongoID\n    asset: MongoID\n    amount: Float\n    price: Float\n    priceType: String\n    comments: String\n    autoReply: String\n    paymentMethods:[MongoID]\n    maxAmount: Float\n    minAmount: Float\n    selectedWallet: String\n    type: String\n    takerConditions: [String]\n    timeMinutes: Int\n    pricePercentage: Float\n    amountInAsset: Boolean\n    bestPricePercentage: Float\n    priceReferenceType: PriceReference\n  }\n";
export type TDeleteListing = {
    listing: Types.ObjectId;
};
export declare const DeleteListingInput = "\n  input DeleteListing {\n    listing: MongoID!\n  }\n";
export declare const DeleteListingType = "\n  type TypeDeleteListing {\n    success: Boolean!\n  }\n";
export type TCancelListing = {
    listing: Types.ObjectId;
};
export declare const CancelListingInput = "\n  input CancelListing {\n    listing: MongoID!\n  }\n";
export type TGetKpiMarketPrice = {
    asset: string;
    fiat: string;
};
export declare const GetKpiMarketPriceInput = "\n  input GetKpiMarketPrice {\n    asset: String\n    fiat: String\n  }\n";
export declare const GetKpiMarketPriceType = "\n  type GetKpiMarketPriceType {\n    rate: Float\n  }\n";
//# sourceMappingURL=listing.dto.d.ts.map