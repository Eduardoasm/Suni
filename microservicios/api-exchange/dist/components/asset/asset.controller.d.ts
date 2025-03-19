export declare const getAssets: import("graphql-compose").Resolver<any, any, any, any>;
declare const assetMutations: {
    createAsset: import("graphql-compose").Resolver<any, any, {
        record: Record<string, any>;
    }, import("./asset.model").AssetDocument>;
    updateAsset: import("graphql-compose").Resolver<any, any, {
        record: any;
        filter?: any;
        skip?: number;
        sort?: string | string[] | Record<string, any>;
    }, import("./asset.model").AssetDocument>;
};
declare const assetQueries: {
    asset: import("graphql-compose").Resolver<any, any, {
        filter?: any;
        sort?: string | string[] | Record<string, any>;
        skip?: number;
    }, import("./asset.model").AssetDocument>;
    assets: import("graphql-compose").Resolver<any, any, {
        filter?: any;
        limit?: number;
        skip?: number;
        sort?: string | string[] | Record<string, any>;
    }, import("./asset.model").AssetDocument>;
    totalAsset: import("graphql-compose").Resolver<any, any, {
        filter?: any;
    }, import("./asset.model").AssetDocument>;
    getAssets: import("graphql-compose").Resolver<any, any, any, any>;
};
export { assetQueries, assetMutations };
//# sourceMappingURL=asset.controller.d.ts.map