import mongoose, { type FilterQuery, type ProjectionType, type QueryOptions, type UpdateQuery, type UpdateWithAggregationPipeline } from 'mongoose';
import { IListing } from './listing.model';
import { TCancelListing, TCreateListing, TGetBestPricesListing, TGetKpiMarketPrice, TGetListingFilter, TGetListingFilterUser, TUpdateListingUser } from './listing.dto';
export declare function findOne(filter?: FilterQuery<IListing>, projection?: ProjectionType<IListing> | null, options?: QueryOptions<IListing> | null): Promise<mongoose.Document<unknown, any, IListing> & IListing & {
    _id: mongoose.Types.ObjectId;
}>;
export declare function find(filter?: FilterQuery<IListing>, projection?: ProjectionType<IListing> | null, options?: QueryOptions<IListing> | null): Promise<(mongoose.Document<unknown, any, IListing> & IListing & {
    _id: mongoose.Types.ObjectId;
})[]>;
export declare function updateOne(filter: FilterQuery<IListing>, update: UpdateQuery<IListing> | UpdateWithAggregationPipeline, options?: QueryOptions<IListing> | null): Promise<import("mongodb").UpdateResult>;
export declare function createListingSale(token: string, listing: TCreateListing): Promise<mongoose.Document<unknown, any, IListing> & IListing & {
    _id: mongoose.Types.ObjectId;
}>;
export declare function createListingPurchase(token: string, listing: TCreateListing): Promise<mongoose.Document<unknown, any, IListing> & IListing & {
    _id: mongoose.Types.ObjectId;
}>;
export declare function cancelListing(body: TCancelListing, token: string): Promise<mongoose.Document<unknown, any, IListing> & IListing & {
    _id: mongoose.Types.ObjectId;
}>;
export declare function pagination(page: number, perPage: number, filter?: FilterQuery<IListing>, projection?: ProjectionType<IListing> | null, options?: QueryOptions<IListing> | null): Promise<import("../../../utils").Pagination<mongoose.Document<any, any, any>>>;
export declare function getListingFilter(body: TGetListingFilter, token: string): Promise<any>;
export declare function getListingFilterUser(body: TGetListingFilterUser, token: string): Promise<any>;
export declare function bestPricesListings(body: TGetBestPricesListing): Promise<any>;
export declare function updateListingUser(body: TUpdateListingUser, token: string): Promise<IListing>;
export declare function getKpiMarketPrice(body: TGetKpiMarketPrice, token: string): Promise<{
    rate: number;
}>;
export declare function addReferenceNumber(): Promise<boolean>;
//# sourceMappingURL=listing.service.d.ts.map