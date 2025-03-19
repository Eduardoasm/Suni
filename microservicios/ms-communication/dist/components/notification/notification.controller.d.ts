import { NextFunction, Request, Response } from 'express';
declare const notificationQueries: {
    notification: import("graphql-compose").Resolver<any, any, {
        filter?: any;
        sort?: string | string[] | Record<string, any>;
        skip?: number;
    }, import("./notification.model").NotificationDocument>;
    notifications: import("graphql-compose").Resolver<any, any, {
        filter?: any;
        limit?: number;
        skip?: number;
        sort?: string | string[] | Record<string, any>;
    }, import("./notification.model").NotificationDocument>;
    notificationPagination: import("graphql-compose").Resolver<any, any, import("graphql-compose-pagination").PaginationTArgs, import("./notification.model").NotificationDocument>;
    getNotifications: import("graphql-compose").Resolver<any, any, any, any>;
    customGetOne: import("graphql-compose").Resolver<any, any, any, any>;
};
declare const notificationMutations: {
    createNotification: import("graphql-compose").Resolver<any, any, {
        record: Record<string, any>;
    }, import("./notification.model").NotificationDocument>;
    updateNotification: import("graphql-compose").Resolver<any, any, {
        record: any;
        filter?: any;
        skip?: number;
        sort?: string | string[] | Record<string, any>;
    }, import("./notification.model").NotificationDocument>;
    deleteNotification: import("graphql-compose").Resolver<any, any, any, any>;
    readOneNotification: import("graphql-compose").Resolver<any, any, any, any>;
    readManyNotifications: import("graphql-compose").Resolver<any, any, any, any>;
    customCreateNotification: import("graphql-compose").Resolver<any, any, any, any>;
    unreadNotification: import("graphql-compose").Resolver<any, any, any, any>;
};
export declare function getAll(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>>;
export declare function getOne(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>>;
export declare function createOne(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>>;
export declare function updateOne(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>>;
export declare function pagination(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>>;
export declare function getAllWithPagination(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>>;
export declare function softDeleteNotification(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>>;
export declare function readNotification(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>>;
export declare function readManyNotification(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>>;
export declare function createNotification(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>>;
export declare function customFindOne(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>>;
export { notificationQueries, notificationMutations };
//# sourceMappingURL=notification.controller.d.ts.map