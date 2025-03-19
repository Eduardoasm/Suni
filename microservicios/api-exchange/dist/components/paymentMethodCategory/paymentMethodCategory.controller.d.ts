import { NextFunction, Request, Response } from 'express';
export declare const getPaymentMethodCategory: import("graphql-compose").Resolver<any, any, any, any>;
export declare function getAll(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>>;
export declare function getAllWithCurrency(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>>;
export declare function findOne(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>>;
export declare function updateOne(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>>;
export declare function deleteOne(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>>;
export declare function updateMany(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>>;
export declare function create(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>>;
declare const paymentMethodCategoryMutations: {
    createPaymentMethodCategory: import("graphql-compose").Resolver<any, any, {
        record: Record<string, any>;
    }, import("./paymentMethodCategory.model").PaymentMethodCategoryDocument>;
    updatePaymentMethodCategory: import("graphql-compose").Resolver<any, any, {
        record: any;
        filter?: any;
        skip?: number;
        sort?: string | string[] | Record<string, any>;
    }, import("./paymentMethodCategory.model").PaymentMethodCategoryDocument>;
};
declare const paymentMethodCategoryQueries: {
    paymentMethodCategory: import("graphql-compose").Resolver<any, any, {
        filter?: any;
        sort?: string | string[] | Record<string, any>;
        skip?: number;
    }, import("./paymentMethodCategory.model").PaymentMethodCategoryDocument>;
    paymentMethodsCategory: import("graphql-compose").Resolver<any, any, {
        filter?: any;
        limit?: number;
        skip?: number;
        sort?: string | string[] | Record<string, any>;
    }, import("./paymentMethodCategory.model").PaymentMethodCategoryDocument>;
    totalPaymentMethodsCategory: import("graphql-compose").Resolver<any, any, {
        filter?: any;
    }, import("./paymentMethodCategory.model").PaymentMethodCategoryDocument>;
    getPaymentMethodCategory: import("graphql-compose").Resolver<any, any, any, any>;
};
export { paymentMethodCategoryQueries, paymentMethodCategoryMutations };
//# sourceMappingURL=paymentMethodCategory.controller.d.ts.map