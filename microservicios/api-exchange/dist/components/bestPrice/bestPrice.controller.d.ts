export declare const getBestPrice: import("graphql-compose").Resolver<any, any, any, any>;
declare const bestPriceMutations: {
    createBestPrice: import("graphql-compose").Resolver<any, any, {
        record: Record<string, any>;
    }, import("./bestPrice.model").BestPriceDocument>;
    updateBestPrice: import("graphql-compose").Resolver<any, any, {
        record: any;
        filter?: any;
        skip?: number;
        sort?: string | string[] | Record<string, any>;
    }, import("./bestPrice.model").BestPriceDocument>;
};
declare const bestPriceQueries: {
    bestPrice: import("graphql-compose").Resolver<any, any, {
        filter?: any;
        sort?: string | string[] | Record<string, any>;
        skip?: number;
    }, import("./bestPrice.model").BestPriceDocument>;
    bestPrices: import("graphql-compose").Resolver<any, any, {
        filter?: any;
        limit?: number;
        skip?: number;
        sort?: string | string[] | Record<string, any>;
    }, import("./bestPrice.model").BestPriceDocument>;
    totalBestPrice: import("graphql-compose").Resolver<any, any, {
        filter?: any;
    }, import("./bestPrice.model").BestPriceDocument>;
    getBestPrice: import("graphql-compose").Resolver<any, any, any, any>;
};
export { bestPriceQueries, bestPriceMutations };
//# sourceMappingURL=bestPrice.controller.d.ts.map