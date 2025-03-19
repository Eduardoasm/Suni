import type { Request, Response, NextFunction } from 'express';
export declare const createLoanRequest: import("graphql-compose").Resolver<any, any, any, any>;
export declare const getCostsOfLoanRequest: import("graphql-compose").Resolver<any, any, any, any>;
export declare const cancelLoanRequest: import("graphql-compose").Resolver<any, any, any, any>;
declare const loanRequestQueries: {
    loanRequest: import("graphql-compose").Resolver<any, any, {
        filter?: any;
        sort?: string | string[] | Record<string, any>;
        skip?: number;
    }, import("./loanRequest.model").LoanRequestDocument>;
    loanRequests: import("graphql-compose").Resolver<any, any, {
        filter?: any;
        limit?: number;
        skip?: number;
        sort?: string | string[] | Record<string, any>;
    }, import("./loanRequest.model").LoanRequestDocument>;
    loanRequestPagination: import("graphql-compose").Resolver<any, any, import("graphql-compose-pagination").PaginationTArgs, import("./loanRequest.model").LoanRequestDocument>;
    getMarketLoanRequests: import("graphql-compose").Resolver<any, any, any, any>;
    getAllOffersForRequest: import("graphql-compose").Resolver<any, any, any, any>;
    getOneOfferForRequest: import("graphql-compose").Resolver<any, any, any, any>;
    getMyLoanRequests: import("graphql-compose").Resolver<any, any, any, any>;
    getUserRequestAmounts: import("graphql-compose").Resolver<any, any, any, any>;
    getCostsOfLoanRequest: import("graphql-compose").Resolver<any, any, any, any>;
    validateForLoanRequest: import("graphql-compose").Resolver<any, any, any, any>;
};
declare const loanRequestMutations: {
    updateLoanRequest: import("graphql-compose").Resolver<any, any, {
        record: any;
        filter?: any;
        skip?: number;
        sort?: string | string[] | Record<string, any>;
    }, import("./loanRequest.model").LoanRequestDocument>;
    updateManyLoan: import("graphql-compose").Resolver<any, any, {
        record: any;
        filter?: any;
        limit?: number;
        skip?: number;
        sort?: string | string[] | Record<string, any>;
    }, import("./loanRequest.model").LoanRequestDocument>;
    createLoanRequest: import("graphql-compose").Resolver<any, any, any, any>;
    createLoanOffer: import("graphql-compose").Resolver<any, any, any, any>;
    cancelLoanRequest: import("graphql-compose").Resolver<any, any, any, any>;
};
export declare function getAll(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>>;
export declare function getOne(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>>;
export declare function createOne(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>>;
export declare function updateOne(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>>;
export declare function pagination(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>>;
export { loanRequestQueries, loanRequestMutations };
//# sourceMappingURL=loanRequest.controller.d.ts.map