declare const historyQueries: {
    history: import("graphql-compose").Resolver<any, any, {
        filter?: any;
        sort?: string | string[] | Record<string, any>;
        skip?: number;
    }, import("./history.model").HistoryDocument>;
    histories: import("graphql-compose").Resolver<any, any, {
        filter?: any;
        limit?: number;
        skip?: number;
        sort?: string | string[] | Record<string, any>;
    }, import("./history.model").HistoryDocument>;
    historyPagination: import("graphql-compose").Resolver<any, any, import("graphql-compose-pagination").PaginationTArgs, import("./history.model").HistoryDocument>;
};
declare const historyMutations: {
    createHistory: import("graphql-compose").Resolver<any, any, {
        record: Record<string, any>;
    }, import("./history.model").HistoryDocument>;
    updateHistory: import("graphql-compose").Resolver<any, any, {
        record: any;
        filter?: any;
        skip?: number;
        sort?: string | string[] | Record<string, any>;
    }, import("./history.model").HistoryDocument>;
};
export { historyQueries, historyMutations };
//# sourceMappingURL=history.controller.d.ts.map