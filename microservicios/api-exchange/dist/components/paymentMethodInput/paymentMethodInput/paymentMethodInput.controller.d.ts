declare const paymentMethodInputMutations: {
    createPaymentMethodInput: import("graphql-compose").Resolver<any, any, {
        record: Record<string, any>;
    }, import("./paymentMethodInput.model").PaymentMethodInputDocument>;
    updatePaymentMethodInput: import("graphql-compose").Resolver<any, any, {
        record: any;
        filter?: any;
        skip?: number;
        sort?: string | string[] | Record<string, any>;
    }, import("./paymentMethodInput.model").PaymentMethodInputDocument>;
};
declare const paymentMethodInputQueries: {
    paymentMethodInput: import("graphql-compose").Resolver<any, any, {
        filter?: any;
        sort?: string | string[] | Record<string, any>;
        skip?: number;
    }, import("./paymentMethodInput.model").PaymentMethodInputDocument>;
    paymentMethodsInput: import("graphql-compose").Resolver<any, any, {
        filter?: any;
        limit?: number;
        skip?: number;
        sort?: string | string[] | Record<string, any>;
    }, import("./paymentMethodInput.model").PaymentMethodInputDocument>;
    totalPaymentMethodsInput: import("graphql-compose").Resolver<any, any, {
        filter?: any;
    }, import("./paymentMethodInput.model").PaymentMethodInputDocument>;
};
export { paymentMethodInputQueries, paymentMethodInputMutations };
//# sourceMappingURL=paymentMethodInput.controller.d.ts.map