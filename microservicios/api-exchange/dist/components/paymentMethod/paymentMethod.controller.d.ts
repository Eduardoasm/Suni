import { NextFunction, Request, Response } from 'express';
export declare const createPaymentMethod: import("graphql-compose").Resolver<any, any, any, any>;
export declare const cancelPaymentMethod: import("graphql-compose").Resolver<any, any, any, any>;
export declare const updatePaymentMethodUser: import("graphql-compose").Resolver<any, any, any, any>;
export declare const getPaymentMethodCurrency: import("graphql-compose").Resolver<any, any, any, any>;
export declare function updateMany(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>>;
declare const paymentMethodMutations: {
    createPaymentMethod: import("graphql-compose").Resolver<any, any, any, any>;
    updatePaymentMethod: import("graphql-compose").Resolver<any, any, {
        record: any;
        filter?: any;
        skip?: number;
        sort?: string | string[] | Record<string, any>;
    }, import("./paymentMethod.model").PaymentMethodDocument>;
    cancelPaymentMethod: import("graphql-compose").Resolver<any, any, any, any>;
    updatePaymentMethodUser: import("graphql-compose").Resolver<any, any, any, any>;
};
declare const paymentMethodQueries: {
    paymentMethod: import("graphql-compose").Resolver<any, any, {
        filter?: any;
        sort?: string | string[] | Record<string, any>;
        skip?: number;
    }, import("./paymentMethod.model").PaymentMethodDocument>;
    paymentMethods: import("graphql-compose").Resolver<any, any, {
        filter?: any;
        limit?: number;
        skip?: number;
        sort?: string | string[] | Record<string, any>;
    }, import("./paymentMethod.model").PaymentMethodDocument>;
    totalPaymentMethods: import("graphql-compose").Resolver<any, any, {
        filter?: any;
    }, import("./paymentMethod.model").PaymentMethodDocument>;
    getPaymentMethodCurrency: import("graphql-compose").Resolver<any, any, any, any>;
};
export { paymentMethodQueries, paymentMethodMutations };
//# sourceMappingURL=paymentMethod.controller.d.ts.map