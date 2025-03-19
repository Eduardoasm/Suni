import type { Request, Response, NextFunction } from 'express';
export declare const getCreditScoreUser: import("graphql-compose").Resolver<any, any, any, any>;
export declare const getClientsWithCreditScore: import("graphql-compose").Resolver<any, any, any, any>;
export declare const getClientWithCreditScore: import("graphql-compose").Resolver<any, any, any, any>;
export declare const createCreditScoreUser: import("graphql-compose").Resolver<any, any, any, any>;
declare const creditScoreQueries: {
    creditScore: import("graphql-compose").Resolver<any, any, {
        filter?: any;
        sort?: string | string[] | Record<string, any>;
        skip?: number;
    }, import("./creditScore.model").CreditScoreDocument>;
    creditScores: import("graphql-compose").Resolver<any, any, {
        filter?: any;
        limit?: number;
        skip?: number;
        sort?: string | string[] | Record<string, any>;
    }, import("./creditScore.model").CreditScoreDocument>;
    creditScorePagination: import("graphql-compose").Resolver<any, any, import("graphql-compose-pagination").PaginationTArgs, import("./creditScore.model").CreditScoreDocument>;
    getCreditScoreUser: import("graphql-compose").Resolver<any, any, any, any>;
    getClientsWithCreditScore: import("graphql-compose").Resolver<any, any, any, any>;
    getClientWithCreditScore: import("graphql-compose").Resolver<any, any, any, any>;
};
declare const creditScoreMutations: {
    updatecreditScore: import("graphql-compose").Resolver<any, any, {
        record: any;
        filter?: any;
        skip?: number;
        sort?: string | string[] | Record<string, any>;
    }, import("./creditScore.model").CreditScoreDocument>;
    createCreditScoreUser: import("graphql-compose").Resolver<any, any, any, any>;
};
export declare function getAll(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>>;
export declare function getOne(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>>;
export declare function createOne(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>>;
export declare function updateOne(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>>;
export declare function pagination(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>>;
export { creditScoreQueries, creditScoreMutations };
//# sourceMappingURL=creditScore.controller.d.ts.map