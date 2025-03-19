import { NextFunction, Request, Response } from 'express';
export declare const getListingFilters: import("graphql-compose").Resolver<any, any, any, any>;
export declare const getListingFiltersUser: import("graphql-compose").Resolver<any, any, any, any>;
export declare const createListingSale: import("graphql-compose").Resolver<any, any, any, any>;
export declare const cancelListing: import("graphql-compose").Resolver<any, any, any, any>;
export declare const updateListingUserCustom: import("graphql-compose").Resolver<any, any, any, any>;
export declare const getBestPricesListings: import("graphql-compose").Resolver<any, any, any, any>;
export declare const createListingPurchase: import("graphql-compose").Resolver<any, any, any, any>;
export declare const getKpiMarketPrice: import("graphql-compose").Resolver<any, any, any, any>;
export declare const addReferenceNumber: import("graphql-compose").Resolver<any, any, any, any>;
declare const listingMutations: {
    createListing: import("graphql-compose").Resolver<any, any, {
        record: Record<string, any>;
    }, import("./listing.model").ListingDocument>;
    updateListing: import("graphql-compose").Resolver<any, any, {
        record: any;
        filter?: any;
        skip?: number;
        sort?: string | string[] | Record<string, any>;
    }, import("./listing.model").ListingDocument>;
    createListingPurchase: import("graphql-compose").Resolver<any, any, any, any>;
    createListingSale: import("graphql-compose").Resolver<any, any, any, any>;
    updateListingUserCustom: import("graphql-compose").Resolver<any, any, any, any>;
    cancelListing: import("graphql-compose").Resolver<any, any, any, any>;
    addReferenceNumber: import("graphql-compose").Resolver<any, any, any, any>;
};
declare const listingQueries: {
    listing: import("graphql-compose").Resolver<any, any, {
        filter?: any;
        sort?: string | string[] | Record<string, any>;
        skip?: number;
    }, import("./listing.model").ListingDocument>;
    listings: import("graphql-compose").Resolver<any, any, {
        filter?: any;
        limit?: number;
        skip?: number;
        sort?: string | string[] | Record<string, any>;
    }, import("./listing.model").ListingDocument>;
    totalListing: import("graphql-compose").Resolver<any, any, {
        filter?: any;
    }, import("./listing.model").ListingDocument>;
    getListingFilters: import("graphql-compose").Resolver<any, any, any, any>;
    getBestPricesListings: import("graphql-compose").Resolver<any, any, any, any>;
    getListingFiltersUser: import("graphql-compose").Resolver<any, any, any, any>;
    getKpiMarketPrice: import("graphql-compose").Resolver<any, any, any, any>;
};
export { listingQueries, listingMutations };
export declare function getOne(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>>;
//# sourceMappingURL=listing.controller.d.ts.map