declare const transactionHistoryQueries: {
    transactionHistory: import("graphql-compose").Resolver<any, any, {
        filter?: any;
        sort?: string | string[] | Record<string, any>;
        skip?: number;
    }, import("./transactionHistory.model").TransactionHistoryDocument>;
    transactionHistories: import("graphql-compose").Resolver<any, any, {
        filter?: any;
        limit?: number;
        skip?: number;
        sort?: string | string[] | Record<string, any>;
    }, import("./transactionHistory.model").TransactionHistoryDocument>;
    transactionHistoryPagination: import("graphql-compose").Resolver<any, any, import("graphql-compose-pagination").PaginationTArgs, import("./transactionHistory.model").TransactionHistoryDocument>;
    totalTransactionHistory: import("graphql-compose").Resolver<any, any, {
        filter?: any;
    }, import("./transactionHistory.model").TransactionHistoryDocument>;
};
declare const transactionHistoryMutations: {
    createTransactionHistory: import("graphql-compose").Resolver<any, any, {
        record: Record<string, any>;
    }, import("./transactionHistory.model").TransactionHistoryDocument>;
    updateTransactionHistory: import("graphql-compose").Resolver<any, any, {
        record: any;
        filter?: any;
        skip?: number;
        sort?: string | string[] | Record<string, any>;
    }, import("./transactionHistory.model").TransactionHistoryDocument>;
};
export { transactionHistoryQueries, transactionHistoryMutations };
//# sourceMappingURL=transactionHistory.controller.d.ts.map