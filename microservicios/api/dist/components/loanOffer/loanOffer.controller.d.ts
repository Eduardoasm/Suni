import type { Request, Response, NextFunction } from 'express';
export declare const getMyLoanOffers: import("graphql-compose").Resolver<any, any, any, any>;
declare const loanOfferQueries: {
    loanOffer: import("graphql-compose").Resolver<any, any, {
        filter?: any;
        sort?: string | string[] | Record<string, any>;
        skip?: number;
    }, import("./loanOffer.model").LoanOfferDocument>;
    loanOffers: import("graphql-compose").Resolver<any, any, {
        filter?: any;
        limit?: number;
        skip?: number;
        sort?: string | string[] | Record<string, any>;
    }, import("./loanOffer.model").LoanOfferDocument>;
    loanOfferPagination: import("graphql-compose").Resolver<any, any, import("graphql-compose-pagination").PaginationTArgs, import("./loanOffer.model").LoanOfferDocument>;
    getAllLoansOffered: import("graphql-compose").Resolver<any, any, any, any>;
    getMyLoanOffers: import("graphql-compose").Resolver<any, any, any, any>;
};
declare const loanOfferMutations: {
    updateloanOffer: import("graphql-compose").Resolver<any, any, {
        record: any;
        filter?: any;
        skip?: number;
        sort?: string | string[] | Record<string, any>;
    }, import("./loanOffer.model").LoanOfferDocument>;
    cancelLoanOffer: import("graphql-compose").Resolver<any, any, any, any>;
};
export declare function getAll(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>>;
export declare function getOne(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>>;
export declare function updateOne(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>>;
export declare function pagination(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>>;
export { loanOfferQueries, loanOfferMutations };
//# sourceMappingURL=loanOffer.controller.d.ts.map