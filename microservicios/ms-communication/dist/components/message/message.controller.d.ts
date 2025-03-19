import { NextFunction, Request, Response } from 'express';
declare const messageQueries: {
    message: import("graphql-compose").Resolver<any, any, {
        filter?: any;
        sort?: string | string[] | Record<string, any>;
        skip?: number;
    }, import("./message.model").MessageDocument>;
    messages: import("graphql-compose").Resolver<any, any, {
        filter?: any;
        limit?: number;
        skip?: number;
        sort?: string | string[] | Record<string, any>;
    }, import("./message.model").MessageDocument>;
    messagePagination: import("graphql-compose").Resolver<any, any, import("graphql-compose-pagination").PaginationTArgs, import("./message.model").MessageDocument>;
};
declare const messageMutations: {
    createMessage: import("graphql-compose").Resolver<any, any, {
        record: Record<string, any>;
    }, import("./message.model").MessageDocument>;
    updateMessage: import("graphql-compose").Resolver<any, any, {
        record: any;
        filter?: any;
        skip?: number;
        sort?: string | string[] | Record<string, any>;
    }, import("./message.model").MessageDocument>;
};
export declare function getAll(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>>;
export declare function getOne(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>>;
export declare function createOne(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>>;
export declare function updateOne(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>>;
export declare function pagination(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>>;
export { messageQueries, messageMutations };
//# sourceMappingURL=message.controller.d.ts.map