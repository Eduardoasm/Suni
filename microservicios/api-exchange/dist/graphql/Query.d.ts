declare const Query: {
    bestPrice: import("graphql-compose").Resolver<any, any, {
        filter?: any;
        sort?: string | string[] | Record<string, any>;
        skip?: number;
    }, import("../components/bestPrice/bestPrice.model").BestPriceDocument>;
    bestPrices: import("graphql-compose").Resolver<any, any, {
        filter?: any;
        limit?: number;
        skip?: number;
        sort?: string | string[] | Record<string, any>;
    }, import("../components/bestPrice/bestPrice.model").BestPriceDocument>;
    totalBestPrice: import("graphql-compose").Resolver<any, any, {
        filter?: any;
    }, import("../components/bestPrice/bestPrice.model").BestPriceDocument>;
    getBestPrice: import("graphql-compose").Resolver<any, any, any, any>;
    country: import("graphql-compose").Resolver<any, any, {
        filter?: any;
        sort?: string | string[] | Record<string, any>;
        skip?: number;
    }, import("../components/country").CountryDocument>;
    countries: import("graphql-compose").Resolver<any, any, {
        filter?: any;
        limit?: number;
        skip?: number;
        sort?: string | string[] | Record<string, any>;
    }, import("../components/country").CountryDocument>;
    totalCountries: import("graphql-compose").Resolver<any, any, {
        filter?: any;
    }, import("../components/country").CountryDocument>;
    setting: import("graphql-compose").Resolver<any, any, {
        filter?: any;
        sort?: string | string[] | Record<string, any>;
        skip?: number;
    }, import("../components/settings").SettingDocument>;
    settings: import("graphql-compose").Resolver<any, any, {
        filter?: any;
        limit?: number;
        skip?: number;
        sort?: string | string[] | Record<string, any>;
    }, import("../components/settings").SettingDocument>;
    streamChatAuth: import("graphql-compose").Resolver<any, any, any, any>;
    paymentMethodCategory: import("graphql-compose").Resolver<any, any, {
        filter?: any;
        sort?: string | string[] | Record<string, any>;
        skip?: number;
    }, import("../components/paymentMethodCategory").PaymentMethodCategoryDocument>;
    paymentMethodsCategory: import("graphql-compose").Resolver<any, any, {
        filter?: any;
        limit?: number;
        skip?: number;
        sort?: string | string[] | Record<string, any>;
    }, import("../components/paymentMethodCategory").PaymentMethodCategoryDocument>;
    totalPaymentMethodsCategory: import("graphql-compose").Resolver<any, any, {
        filter?: any;
    }, import("../components/paymentMethodCategory").PaymentMethodCategoryDocument>;
    getPaymentMethodCategory: import("graphql-compose").Resolver<any, any, any, any>;
    paymentMethodInput: import("graphql-compose").Resolver<any, any, {
        filter?: any;
        sort?: string | string[] | Record<string, any>;
        skip?: number;
    }, import("../components/paymentMethodInput/paymentMethodInput").PaymentMethodInputDocument>;
    paymentMethodsInput: import("graphql-compose").Resolver<any, any, {
        filter?: any;
        limit?: number;
        skip?: number;
        sort?: string | string[] | Record<string, any>;
    }, import("../components/paymentMethodInput/paymentMethodInput").PaymentMethodInputDocument>;
    totalPaymentMethodsInput: import("graphql-compose").Resolver<any, any, {
        filter?: any;
    }, import("../components/paymentMethodInput/paymentMethodInput").PaymentMethodInputDocument>;
    appeal: import("graphql-compose").Resolver<any, any, {
        filter?: any;
        sort?: string | string[] | Record<string, any>;
        skip?: number;
    }, import("../components/appeal/appeal").AppealDocument>;
    appeals: import("graphql-compose").Resolver<any, any, {
        filter?: any;
        limit?: number;
        skip?: number;
        sort?: string | string[] | Record<string, any>;
    }, import("../components/appeal/appeal").AppealDocument>;
    totalAppeal: import("graphql-compose").Resolver<any, any, {
        filter?: any;
    }, import("../components/appeal/appeal").AppealDocument>;
    transactionHistory: import("graphql-compose").Resolver<any, any, {
        filter?: any;
        sort?: string | string[] | Record<string, any>;
        skip?: number;
    }, import("../components/transactionHistory").TransactionHistoryDocument>;
    transactionHistories: import("graphql-compose").Resolver<any, any, {
        filter?: any;
        limit?: number;
        skip?: number;
        sort?: string | string[] | Record<string, any>;
    }, import("../components/transactionHistory").TransactionHistoryDocument>;
    transactionHistoryPagination: import("graphql-compose").Resolver<any, any, import("graphql-compose-pagination").PaginationTArgs, import("../components/transactionHistory").TransactionHistoryDocument>;
    totalTransactionHistory: import("graphql-compose").Resolver<any, any, {
        filter?: any;
    }, import("../components/transactionHistory").TransactionHistoryDocument>;
    transaction: import("graphql-compose").Resolver<any, any, {
        filter?: any;
        sort?: string | string[] | Record<string, any>;
        skip?: number;
    }, import("../components/transaction").TransactionDocument>;
    transactions: import("graphql-compose").Resolver<any, any, {
        filter?: any;
        limit?: number;
        skip?: number;
        sort?: string | string[] | Record<string, any>;
    }, import("../components/transaction").TransactionDocument>;
    transactionPagination: import("graphql-compose").Resolver<any, any, import("graphql-compose-pagination").PaginationTArgs, import("../components/transaction").TransactionDocument>;
    totalTransactions: import("graphql-compose").Resolver<any, any, {
        filter?: any;
    }, import("../components/transaction").TransactionDocument>;
    getInProgressTransactions: import("graphql-compose").Resolver<any, any, any, any>;
    getTransactionsUser: import("graphql-compose").Resolver<any, any, any, any>;
    getFee: import("graphql-compose").Resolver<any, any, any, any>;
    paymentMethodValue: import("graphql-compose").Resolver<any, any, {
        filter?: any;
        sort?: string | string[] | Record<string, any>;
        skip?: number;
    }, import("../components/paymentMethodValue").PaymentMethodValueDocument>;
    paymentMethodsValue: import("graphql-compose").Resolver<any, any, {
        filter?: any;
        limit?: number;
        skip?: number;
        sort?: string | string[] | Record<string, any>;
    }, import("../components/paymentMethodValue").PaymentMethodValueDocument>;
    totalPaymentMethodsValue: import("graphql-compose").Resolver<any, any, {
        filter?: any;
    }, import("../components/paymentMethodValue").PaymentMethodValueDocument>;
    paymentMethod: import("graphql-compose").Resolver<any, any, {
        filter?: any;
        sort?: string | string[] | Record<string, any>;
        skip?: number;
    }, import("../components/paymentMethod").PaymentMethodDocument>;
    paymentMethods: import("graphql-compose").Resolver<any, any, {
        filter?: any;
        limit?: number;
        skip?: number;
        sort?: string | string[] | Record<string, any>;
    }, import("../components/paymentMethod").PaymentMethodDocument>;
    totalPaymentMethods: import("graphql-compose").Resolver<any, any, {
        filter?: any;
    }, import("../components/paymentMethod").PaymentMethodDocument>;
    getPaymentMethodCurrency: import("graphql-compose").Resolver<any, any, any, any>;
    currency: import("graphql-compose").Resolver<any, any, {
        filter?: any;
        sort?: string | string[] | Record<string, any>;
        skip?: number;
    }, import("../components/currency").CurrencyDocument>;
    currencies: import("graphql-compose").Resolver<any, any, {
        filter?: any;
        limit?: number;
        skip?: number;
        sort?: string | string[] | Record<string, any>;
    }, import("../components/currency").CurrencyDocument>;
    totalCurrency: import("graphql-compose").Resolver<any, any, {
        filter?: any;
    }, import("../components/currency").CurrencyDocument>;
    getWalletsUser: import("graphql-compose").Resolver<any, any, any, any>;
    getAssetWalletsUser: import("graphql-compose").Resolver<any, any, any, any>;
    asset: import("graphql-compose").Resolver<any, any, {
        filter?: any;
        sort?: string | string[] | Record<string, any>;
        skip?: number;
    }, import("../components/asset").AssetDocument>;
    assets: import("graphql-compose").Resolver<any, any, {
        filter?: any;
        limit?: number;
        skip?: number;
        sort?: string | string[] | Record<string, any>;
    }, import("../components/asset").AssetDocument>;
    totalAsset: import("graphql-compose").Resolver<any, any, {
        filter?: any;
    }, import("../components/asset").AssetDocument>;
    getAssets: import("graphql-compose").Resolver<any, any, any, any>;
    listing: import("graphql-compose").Resolver<any, any, {
        filter?: any;
        sort?: string | string[] | Record<string, any>;
        skip?: number;
    }, import("../components/listing/listing").ListingDocument>;
    listings: import("graphql-compose").Resolver<any, any, {
        filter?: any;
        limit?: number;
        skip?: number;
        sort?: string | string[] | Record<string, any>;
    }, import("../components/listing/listing").ListingDocument>;
    totalListing: import("graphql-compose").Resolver<any, any, {
        filter?: any;
    }, import("../components/listing/listing").ListingDocument>;
    getListingFilters: import("graphql-compose").Resolver<any, any, any, any>;
    getBestPricesListings: import("graphql-compose").Resolver<any, any, any, any>;
    getListingFiltersUser: import("graphql-compose").Resolver<any, any, any, any>;
    getKpiMarketPrice: import("graphql-compose").Resolver<any, any, any, any>;
};
export default Query;
//# sourceMappingURL=Query.d.ts.map