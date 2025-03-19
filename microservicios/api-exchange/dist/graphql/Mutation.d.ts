declare const Mutation: {
    createBestPrice: import("graphql-compose").Resolver<any, any, {
        record: Record<string, any>;
    }, import("../components/bestPrice/bestPrice.model").BestPriceDocument>;
    updateBestPrice: import("graphql-compose").Resolver<any, any, {
        record: any;
        filter?: any;
        skip?: number;
        sort?: string | string[] | Record<string, any>;
    }, import("../components/bestPrice/bestPrice.model").BestPriceDocument>;
    createCountry: import("graphql-compose").Resolver<any, any, {
        record: Record<string, any>;
    }, import("../components/country").CountryDocument>;
    updateCountry: import("graphql-compose").Resolver<any, any, {
        record: any;
        filter?: any;
        skip?: number;
        sort?: string | string[] | Record<string, any>;
    }, import("../components/country").CountryDocument>;
    updateSettings: import("graphql-compose").Resolver<any, any, {
        record: any;
        filter?: any;
        skip?: number;
        sort?: string | string[] | Record<string, any>;
    }, import("../components/settings").SettingDocument>;
    createSettings: import("graphql-compose").Resolver<any, any, {
        record: Record<string, any>;
    }, import("../components/settings").SettingDocument>;
    createPaymentMethodCategory: import("graphql-compose").Resolver<any, any, {
        record: Record<string, any>;
    }, import("../components/paymentMethodCategory").PaymentMethodCategoryDocument>;
    updatePaymentMethodCategory: import("graphql-compose").Resolver<any, any, {
        record: any;
        filter?: any;
        skip?: number;
        sort?: string | string[] | Record<string, any>;
    }, import("../components/paymentMethodCategory").PaymentMethodCategoryDocument>;
    createPaymentMethodInput: import("graphql-compose").Resolver<any, any, {
        record: Record<string, any>;
    }, import("../components/paymentMethodInput/paymentMethodInput").PaymentMethodInputDocument>;
    updatePaymentMethodInput: import("graphql-compose").Resolver<any, any, {
        record: any;
        filter?: any;
        skip?: number;
        sort?: string | string[] | Record<string, any>;
    }, import("../components/paymentMethodInput/paymentMethodInput").PaymentMethodInputDocument>;
    createAppeal: import("graphql-compose").Resolver<any, any, any, any>;
    updateAppeal: import("graphql-compose").Resolver<any, any, {
        record: any;
        filter?: any;
        skip?: number;
        sort?: string | string[] | Record<string, any>;
    }, import("../components/appeal/appeal").AppealDocument>;
    cancelAppealUser: import("graphql-compose").Resolver<any, any, any, any>;
    manageCryptoAdmin: import("graphql-compose").Resolver<any, any, any, any>;
    createTransactionHistory: import("graphql-compose").Resolver<any, any, {
        record: Record<string, any>;
    }, import("../components/transactionHistory").TransactionHistoryDocument>;
    updateTransactionHistory: import("graphql-compose").Resolver<any, any, {
        record: any;
        filter?: any;
        skip?: number;
        sort?: string | string[] | Record<string, any>;
    }, import("../components/transactionHistory").TransactionHistoryDocument>;
    updateTransaction: import("graphql-compose").Resolver<any, any, {
        record: any;
        filter?: any;
        skip?: number;
        sort?: string | string[] | Record<string, any>;
    }, import("../components/transaction").TransactionDocument>;
    createTransaction: import("graphql-compose").Resolver<any, any, any, any>;
    cancelTransaction: import("graphql-compose").Resolver<any, any, any, any>;
    notifyPayment: import("graphql-compose").Resolver<any, any, any, any>;
    releaseCrypto: import("graphql-compose").Resolver<any, any, any, any>;
    createPaymentMethodValue: import("graphql-compose").Resolver<any, any, {
        record: Record<string, any>;
    }, import("../components/paymentMethodValue").PaymentMethodValueDocument>;
    updatePaymentMethodValue: import("graphql-compose").Resolver<any, any, {
        record: any;
        filter?: any;
        skip?: number;
        sort?: string | string[] | Record<string, any>;
    }, import("../components/paymentMethodValue").PaymentMethodValueDocument>;
    updateManyPaymentMethodValue: import("graphql-compose").Resolver<any, any, {
        record: any;
        filter?: any;
        limit?: number;
        skip?: number;
        sort?: string | string[] | Record<string, any>;
    }, import("../components/paymentMethodValue").PaymentMethodValueDocument>;
    updateValuesUser: import("graphql-compose").Resolver<any, any, any, any>;
    createPaymentMethod: import("graphql-compose").Resolver<any, any, any, any>;
    updatePaymentMethod: import("graphql-compose").Resolver<any, any, {
        record: any;
        filter?: any;
        skip?: number;
        sort?: string | string[] | Record<string, any>;
    }, import("../components/paymentMethod").PaymentMethodDocument>;
    cancelPaymentMethod: import("graphql-compose").Resolver<any, any, any, any>;
    updatePaymentMethodUser: import("graphql-compose").Resolver<any, any, any, any>;
    createCurrency: import("graphql-compose").Resolver<any, any, {
        record: Record<string, any>;
    }, import("../components/currency").CurrencyDocument>;
    updateCurrency: import("graphql-compose").Resolver<any, any, {
        record: any;
        filter?: any;
        skip?: number;
        sort?: string | string[] | Record<string, any>;
    }, import("../components/currency").CurrencyDocument>;
    createAsset: import("graphql-compose").Resolver<any, any, {
        record: Record<string, any>;
    }, import("../components/asset").AssetDocument>;
    updateAsset: import("graphql-compose").Resolver<any, any, {
        record: any;
        filter?: any;
        skip?: number;
        sort?: string | string[] | Record<string, any>;
    }, import("../components/asset").AssetDocument>;
    createListing: import("graphql-compose").Resolver<any, any, {
        record: Record<string, any>;
    }, import("../components/listing/listing").ListingDocument>;
    updateListing: import("graphql-compose").Resolver<any, any, {
        record: any;
        filter?: any;
        skip?: number;
        sort?: string | string[] | Record<string, any>;
    }, import("../components/listing/listing").ListingDocument>;
    createListingPurchase: import("graphql-compose").Resolver<any, any, any, any>;
    createListingSale: import("graphql-compose").Resolver<any, any, any, any>;
    updateListingUserCustom: import("graphql-compose").Resolver<any, any, any, any>;
    cancelListing: import("graphql-compose").Resolver<any, any, any, any>;
    addReferenceNumber: import("graphql-compose").Resolver<any, any, any, any>;
    signS3: import("graphql-compose").Resolver<any, any, any, any>;
};
export default Mutation;
//# sourceMappingURL=Mutation.d.ts.map