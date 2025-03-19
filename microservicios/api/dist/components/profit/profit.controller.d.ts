import type { Request, Response, NextFunction } from 'express';
declare const profitQueries: {
    profit: import("graphql-compose").Resolver<any, any, {
        filter?: any;
        sort?: string | string[] | Record<string, any>;
        skip?: number;
    }, import("./profit.model").ProfitDocument>;
    profits: import("graphql-compose").Resolver<any, any, {
        filter?: any;
        limit?: number;
        skip?: number;
        sort?: string | string[] | Record<string, any>;
    }, import("./profit.model").ProfitDocument>;
    profitPagination: import("graphql-compose").Resolver<any, any, import("graphql-compose-pagination").PaginationTArgs, import("./profit.model").ProfitDocument>;
};
declare const profitMutations: {
    updateProfit: import("graphql-compose").Resolver<any, any, {
        record: any;
        filter?: any;
        skip?: number;
        sort?: string | string[] | Record<string, any>;
    }, import("./profit.model").ProfitDocument>;
    createProfit: import("graphql-compose").Resolver<any, any, {
        record: Record<string, any>;
    }, import("./profit.model").ProfitDocument>;
};
export declare function getAll(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>>;
export declare function getOne(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>>;
export declare function createOne(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>>;
export declare function updateOne(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>>;
export declare function pagination(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>>;
export { profitQueries, profitMutations };
//# sourceMappingURL=profit.controller.d.ts.map