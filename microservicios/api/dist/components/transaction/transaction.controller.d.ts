import type { Request, Response, NextFunction } from 'express';
declare const transactionQueries: {
    transaction: import("graphql-compose").Resolver<any, any, {
        filter?: any;
        sort?: string | string[] | Record<string, any>;
        skip?: number;
    }, import("./transaction.model").TransactionDocument>;
    transactions: import("graphql-compose").Resolver<any, any, {
        filter?: any;
        limit?: number;
        skip?: number;
        sort?: string | string[] | Record<string, any>;
    }, import("./transaction.model").TransactionDocument>;
    borrowerCreditHistory: import("graphql-compose").Resolver<any, any, any, any>;
    lenderCreditHistory: import("graphql-compose").Resolver<any, any, any, any>;
};
declare const transactionMutations: {
    updateTransactions: import("graphql-compose").Resolver<any, any, {
        record: any;
        filter?: any;
        skip?: number;
        sort?: string | string[] | Record<string, any>;
    }, import("./transaction.model").TransactionDocument>;
    createTransaction: import("graphql-compose").Resolver<any, any, {
        record: Record<string, any>;
    }, import("./transaction.model").TransactionDocument>;
};
export declare function getAll(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>>;
export declare function getOne(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>>;
export declare function createOne(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>>;
export declare function updateOne(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>>;
export declare function pagination(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>>;
export declare function createTransaction(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>>;
export { transactionQueries, transactionMutations };
//# sourceMappingURL=transaction.controller.d.ts.map