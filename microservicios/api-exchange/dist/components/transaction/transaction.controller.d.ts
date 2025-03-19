import { NextFunction, Request, Response } from 'express';
export declare const getInProgressTransactions: import("graphql-compose").Resolver<any, any, any, any>;
export declare const getTransactionsUser: import("graphql-compose").Resolver<any, any, any, any>;
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
    transactionPagination: import("graphql-compose").Resolver<any, any, import("graphql-compose-pagination").PaginationTArgs, import("./transaction.model").TransactionDocument>;
    totalTransactions: import("graphql-compose").Resolver<any, any, {
        filter?: any;
    }, import("./transaction.model").TransactionDocument>;
    getInProgressTransactions: import("graphql-compose").Resolver<any, any, any, any>;
    getTransactionsUser: import("graphql-compose").Resolver<any, any, any, any>;
    getFee: import("graphql-compose").Resolver<any, any, any, any>;
};
declare const transactionMutations: {
    updateTransaction: import("graphql-compose").Resolver<any, any, {
        record: any;
        filter?: any;
        skip?: number;
        sort?: string | string[] | Record<string, any>;
    }, import("./transaction.model").TransactionDocument>;
    createTransaction: import("graphql-compose").Resolver<any, any, any, any>;
    cancelTransaction: import("graphql-compose").Resolver<any, any, any, any>;
    notifyPayment: import("graphql-compose").Resolver<any, any, any, any>;
    releaseCrypto: import("graphql-compose").Resolver<any, any, any, any>;
};
export declare function customFindOne(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>>;
export { transactionQueries, transactionMutations };
//# sourceMappingURL=transaction.controller.d.ts.map