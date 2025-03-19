import { NextFunction, Request, Response } from 'express';
export declare const createAppeal: import("graphql-compose").Resolver<any, any, any, any>;
export declare const cancelAppealUser: import("graphql-compose").Resolver<any, any, any, any>;
declare const appealMutations: {
    createAppeal: import("graphql-compose").Resolver<any, any, any, any>;
    updateAppeal: import("graphql-compose").Resolver<any, any, {
        record: any;
        filter?: any;
        skip?: number;
        sort?: string | string[] | Record<string, any>;
    }, import("./appeal.model").AppealDocument>;
    cancelAppealUser: import("graphql-compose").Resolver<any, any, any, any>;
    manageCryptoAdmin: import("graphql-compose").Resolver<any, any, any, any>;
};
declare const appealQueries: {
    appeal: import("graphql-compose").Resolver<any, any, {
        filter?: any;
        sort?: string | string[] | Record<string, any>;
        skip?: number;
    }, import("./appeal.model").AppealDocument>;
    appeals: import("graphql-compose").Resolver<any, any, {
        filter?: any;
        limit?: number;
        skip?: number;
        sort?: string | string[] | Record<string, any>;
    }, import("./appeal.model").AppealDocument>;
    totalAppeal: import("graphql-compose").Resolver<any, any, {
        filter?: any;
    }, import("./appeal.model").AppealDocument>;
};
export { appealQueries, appealMutations };
export declare function getAll(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>>;
export declare function findOne(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>>;
export declare function manageCryptoAdminApi(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>>;
//# sourceMappingURL=appeal.controller.d.ts.map