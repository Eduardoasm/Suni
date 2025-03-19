export declare const updateValuesUser: import("graphql-compose").Resolver<any, any, any, any>;
declare const paymentMethodValueMutations: {
    createPaymentMethodValue: import("graphql-compose").Resolver<any, any, {
        record: Record<string, any>;
    }, import("./paymentMethodValue.model").PaymentMethodValueDocument>;
    updatePaymentMethodValue: import("graphql-compose").Resolver<any, any, {
        record: any;
        filter?: any;
        skip?: number;
        sort?: string | string[] | Record<string, any>;
    }, import("./paymentMethodValue.model").PaymentMethodValueDocument>;
    updateManyPaymentMethodValue: import("graphql-compose").Resolver<any, any, {
        record: any;
        filter?: any;
        limit?: number;
        skip?: number;
        sort?: string | string[] | Record<string, any>;
    }, import("./paymentMethodValue.model").PaymentMethodValueDocument>;
    updateValuesUser: import("graphql-compose").Resolver<any, any, any, any>;
};
declare const paymentMethodValueQueries: {
    paymentMethodValue: import("graphql-compose").Resolver<any, any, {
        filter?: any;
        sort?: string | string[] | Record<string, any>;
        skip?: number;
    }, import("./paymentMethodValue.model").PaymentMethodValueDocument>;
    paymentMethodsValue: import("graphql-compose").Resolver<any, any, {
        filter?: any;
        limit?: number;
        skip?: number;
        sort?: string | string[] | Record<string, any>;
    }, import("./paymentMethodValue.model").PaymentMethodValueDocument>;
    totalPaymentMethodsValue: import("graphql-compose").Resolver<any, any, {
        filter?: any;
    }, import("./paymentMethodValue.model").PaymentMethodValueDocument>;
};
export { paymentMethodValueQueries, paymentMethodValueMutations };
//# sourceMappingURL=paymentMethodValue.controller.d.ts.map