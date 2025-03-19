import type { Request, Response, NextFunction } from 'express';
declare const settingsQueries: {
    setting: import("graphql-compose").Resolver<any, any, {
        filter?: any;
        sort?: string | string[] | Record<string, any>;
        skip?: number;
    }, import("./settings.model").SettingDocument>;
    settings: import("graphql-compose").Resolver<any, any, {
        filter?: any;
        limit?: number;
        skip?: number;
        sort?: string | string[] | Record<string, any>;
    }, import("./settings.model").SettingDocument>;
};
declare const settingsMutations: {
    updateSettings: import("graphql-compose").Resolver<any, any, {
        record: any;
        filter?: any;
        skip?: number;
        sort?: string | string[] | Record<string, any>;
    }, import("./settings.model").SettingDocument>;
    createSettings: import("graphql-compose").Resolver<any, any, {
        record: Record<string, any>;
    }, import("./settings.model").SettingDocument>;
};
export declare function getAll(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>>;
export declare function getOne(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>>;
export declare function createOne(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>>;
export declare function updateSettings(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>>;
export declare function getActiveSetting(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>>;
export declare function updateOne(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>>;
export declare function pagination(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>>;
export { settingsQueries, settingsMutations };
//# sourceMappingURL=settings.controller.d.ts.map