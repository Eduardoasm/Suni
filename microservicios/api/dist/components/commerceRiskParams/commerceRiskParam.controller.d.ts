import { NextFunction, Request, Response } from 'express';
declare const commerceRiskParamQueries: {
    commerceRiskParam: import("graphql-compose").Resolver<any, any, {
        filter?: any;
        sort?: string | string[] | Record<string, any>;
        skip?: number;
    }, import("./commerceRiskParam.model").CommerceRiskParamDocument>;
    commerceRiskParams: import("graphql-compose").Resolver<any, any, {
        filter?: any;
        limit?: number;
        skip?: number;
        sort?: string | string[] | Record<string, any>;
    }, import("./commerceRiskParam.model").CommerceRiskParamDocument>;
    commerceRiskParamPagination: import("graphql-compose").Resolver<any, any, import("graphql-compose-pagination").PaginationTArgs, import("./commerceRiskParam.model").CommerceRiskParamDocument>;
    getCommerceRiskParamsWithCreditScore: import("graphql-compose").Resolver<any, any, any, any>;
};
declare const commerceRiskParamMutations: {
    createCommerceRiskParam: import("graphql-compose").Resolver<any, any, {
        record: Record<string, any>;
    }, import("./commerceRiskParam.model").CommerceRiskParamDocument>;
    updateCommerceRiskParam: import("graphql-compose").Resolver<any, any, {
        record: any;
        filter?: any;
        skip?: number;
        sort?: string | string[] | Record<string, any>;
    }, import("./commerceRiskParam.model").CommerceRiskParamDocument>;
};
export declare function getAll(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>>;
export declare function getOne(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>>;
export declare function createOne(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>>;
export declare function updateOne(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>>;
export declare function pagination(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>>;
export { commerceRiskParamQueries, commerceRiskParamMutations };
//# sourceMappingURL=commerceRiskParam.controller.d.ts.map