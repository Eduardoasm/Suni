import { NextFunction, Request, Response } from 'express';
declare const messageTemplateQueries: {
    messageTemplate: import("graphql-compose").Resolver<any, any, {
        filter?: any;
        sort?: string | string[] | Record<string, any>;
        skip?: number;
    }, import("./messageTemplate.model").MessageTemplateDocument>;
    messageTemplates: import("graphql-compose").Resolver<any, any, {
        filter?: any;
        limit?: number;
        skip?: number;
        sort?: string | string[] | Record<string, any>;
    }, import("./messageTemplate.model").MessageTemplateDocument>;
    messageTemplatePagination: import("graphql-compose").Resolver<any, any, import("graphql-compose-pagination").PaginationTArgs, import("./messageTemplate.model").MessageTemplateDocument>;
};
declare const messageTemplateMutations: {
    createMessageTemplate: import("graphql-compose").Resolver<any, any, {
        record: Record<string, any>;
    }, import("./messageTemplate.model").MessageTemplateDocument>;
    updateMessageTemplate: import("graphql-compose").Resolver<any, any, {
        record: any;
        filter?: any;
        skip?: number;
        sort?: string | string[] | Record<string, any>;
    }, import("./messageTemplate.model").MessageTemplateDocument>;
};
export declare function getAll(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>>;
export declare function getOne(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>>;
export declare function createOne(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>>;
export declare function updateOne(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>>;
export declare function pagination(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>>;
export declare function customCreateMessageTemplate(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>>;
export { messageTemplateQueries, messageTemplateMutations };
//# sourceMappingURL=messageTemplate.controller.d.ts.map