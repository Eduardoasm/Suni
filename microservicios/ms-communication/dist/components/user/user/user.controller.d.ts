import type { Request, Response, NextFunction } from 'express';
declare const userQueries: {
    user: import("graphql-compose").Resolver<any, any, {
        filter?: any;
        sort?: string | string[] | Record<string, any>;
        skip?: number;
    }, import("./user.model").UserDocument>;
    users: import("graphql-compose").Resolver<any, any, {
        filter?: any;
        limit?: number;
        skip?: number;
        sort?: string | string[] | Record<string, any>;
    }, import("./user.model").UserDocument>;
    userPagination: import("graphql-compose").Resolver<any, any, import("graphql-compose-pagination").PaginationTArgs, import("./user.model").UserDocument>;
    totalUsers: import("graphql-compose").Resolver<any, any, {
        filter?: any;
    }, import("./user.model").UserDocument>;
};
declare const userMutations: {
    createUser: import("graphql-compose").Resolver<any, any, {
        record: Record<string, any>;
    }, import("./user.model").UserDocument>;
    updateUser: import("graphql-compose").Resolver<any, any, {
        record: any;
        filter?: any;
        skip?: number;
        sort?: string | string[] | Record<string, any>;
    }, import("./user.model").UserDocument>;
};
export declare function getAll(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>>;
export declare function getOne(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>>;
export declare function createOne(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>>;
export declare function updateOne(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>>;
export declare function pagination(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>>;
export { userQueries, userMutations };
//# sourceMappingURL=user.controller.d.ts.map