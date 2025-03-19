import type { Request, Response, NextFunction } from 'express';
export declare const getContractInfo: import("graphql-compose").Resolver<any, any, any, any>;
export declare const createContract: import("graphql-compose").Resolver<any, any, any, any>;
export declare const preCancel: import("graphql-compose").Resolver<any, any, any, any>;
export declare const addOriginalValues: import("graphql-compose").Resolver<any, any, any, any>;
export declare const getTransactionsByLenderOrBorrower: import("graphql-compose").Resolver<any, any, any, any>;
export declare const getContractsFilterByStatus: import("graphql-compose").Resolver<any, any, any, any>;
export declare const getContractsByStatus: import("graphql-compose").Resolver<any, any, any, any>;
export declare const getContractsFilterByStatusByClient: import("graphql-compose").Resolver<any, any, any, any>;
export declare const totalIncome: import("graphql-compose").Resolver<any, any, any, any>;
export declare const totalIncomes: import("graphql-compose").Resolver<any, any, any, any>;
export declare const interestRate: import("graphql-compose").Resolver<any, any, any, any>;
export declare const getIncomeByDate: import("graphql-compose").Resolver<any, any, any, any>;
export declare const getLoansByDate: import("graphql-compose").Resolver<any, any, any, any>;
export declare const getDefaultPaymentContractsByMonth: import("graphql-compose").Resolver<any, any, any, any>;
export declare const getDefaultPaymentContractsByDate: import("graphql-compose").Resolver<any, any, any, any>;
export declare const getDefaultAndSuccessfulPayment: import("graphql-compose").Resolver<any, any, any, any>;
export declare const amortization: import("graphql-compose").Resolver<any, any, any, any>;
export declare const contractEarning: import("graphql-compose").Resolver<any, any, any, any>;
export declare const getMyContracts: import("graphql-compose").Resolver<any, any, any, any>;
export declare const getContractsFilterByStatusByUser: import("graphql-compose").Resolver<any, any, any, any>;
export declare const getPreCancelInfo: import("graphql-compose").Resolver<any, any, any, any>;
export declare const getUserStats: import("graphql-compose").Resolver<any, any, any, any>;
declare const contractQueries: {
    contract: import("graphql-compose").Resolver<any, any, {
        filter?: any;
        sort?: string | string[] | Record<string, any>;
        skip?: number;
    }, import("./contract.model").ContractDocument>;
    contracts: import("graphql-compose").Resolver<any, any, {
        filter?: any;
        limit?: number;
        skip?: number;
        sort?: string | string[] | Record<string, any>;
    }, import("./contract.model").ContractDocument>;
    contractPagination: import("graphql-compose").Resolver<any, any, import("graphql-compose-pagination").PaginationTArgs, import("./contract.model").ContractDocument>;
    totalLoans: import("graphql-compose").Resolver<any, any, {
        filter?: any;
    }, import("./contract.model").ContractDocument>;
    totalIncome: import("graphql-compose").Resolver<any, any, any, any>;
    interestRate: import("graphql-compose").Resolver<any, any, any, any>;
    getContractsFilterByStatus: import("graphql-compose").Resolver<any, any, any, any>;
    getContractsByStatus: import("graphql-compose").Resolver<any, any, any, any>;
    getContractsFilterByStatusByClient: import("graphql-compose").Resolver<any, any, any, any>;
    getTransactionsByLenderOrBorrower: import("graphql-compose").Resolver<any, any, any, any>;
    getIncomeByDate: import("graphql-compose").Resolver<any, any, any, any>;
    totalIncomes: import("graphql-compose").Resolver<any, any, any, any>;
    getLoansByDate: import("graphql-compose").Resolver<any, any, any, any>;
    getDefaultPaymentContractsByMonth: import("graphql-compose").Resolver<any, any, any, any>;
    getDefaultPaymentContractsByDate: import("graphql-compose").Resolver<any, any, any, any>;
    getDefaultAndSuccessfulPayment: import("graphql-compose").Resolver<any, any, any, any>;
    amortization: import("graphql-compose").Resolver<any, any, any, any>;
    contractEarning: import("graphql-compose").Resolver<any, any, any, any>;
    getMyContracts: import("graphql-compose").Resolver<any, any, any, any>;
    getContractsFilterByStatusByUser: import("graphql-compose").Resolver<any, any, any, any>;
    getPreCancelInfo: import("graphql-compose").Resolver<any, any, any, any>;
    getUserStats: import("graphql-compose").Resolver<any, any, any, any>;
    getContractInfo: import("graphql-compose").Resolver<any, any, any, any>;
};
declare const contractMutations: {
    updateContract: import("graphql-compose").Resolver<any, any, {
        record: any;
        filter?: any;
        skip?: number;
        sort?: string | string[] | Record<string, any>;
    }, import("./contract.model").ContractDocument>;
    createContract: import("graphql-compose").Resolver<any, any, any, any>;
    preCancel: import("graphql-compose").Resolver<any, any, any, any>;
    addOriginalValues: import("graphql-compose").Resolver<any, any, any, any>;
};
export declare function getAll(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>>;
export declare function getOne(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>>;
export declare function createOne(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>>;
export declare function updateOne(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>>;
export declare function pagination(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>>;
export declare function getContractAndCreditScoreDetails(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>>;
export { contractQueries, contractMutations };
//# sourceMappingURL=contract.controller.d.ts.map