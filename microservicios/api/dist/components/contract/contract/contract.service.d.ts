import mongoose from 'mongoose';
import type { AggregateOptions, FilterQuery, PipelineStage, ProjectionType, QueryOptions, UpdateQuery, UpdateWithAggregationPipeline } from 'mongoose';
import { TGetContractsFilterByStatus, TGetContractsFilterByStatusByClient, TGetByDate, TCreateContract, TGetAmortization, TGetContractsByStatusInput, TGetContractEarning, TGetMyContracts, TSendContract, TGetTransactionsByLenderOrBorrower, TGetContractsFilterByStatusByUser, TGetPreCancelInfo, TPreCancel, TGetUserStats, TGetContractInfo } from './contract.dto';
import { IContract } from './contract.model';
import { IPaymentPlan } from '../payment-plan';
export declare function findOne(filter?: FilterQuery<IContract>, projection?: ProjectionType<IContract> | null, options?: QueryOptions<IContract> | null): Promise<mongoose.Document<unknown, any, IContract> & IContract & {
    _id: mongoose.Types.ObjectId;
}>;
export declare function find(filter?: FilterQuery<IContract>, projection?: ProjectionType<IContract> | null, options?: QueryOptions<IContract> | null): Promise<(mongoose.Document<unknown, any, IContract> & IContract & {
    _id: mongoose.Types.ObjectId;
})[]>;
export declare function updateOne(filter: FilterQuery<IContract>, update: UpdateQuery<IContract> | UpdateWithAggregationPipeline, options?: QueryOptions<IContract> | null): Promise<import("mongodb").UpdateResult>;
export declare function aggregate(pipeline?: PipelineStage[] | null, options?: AggregateOptions | null): Promise<any[]>;
export declare function getContractInfo(body: TGetContractInfo): Promise<{
    contract: mongoose.Document<unknown, any, IContract> & IContract & {
        _id: mongoose.Types.ObjectId;
    };
    clientsInfo: {
        lender: {
            name: any;
            lastName: any;
            country: any;
            email: any;
        };
        borrower: {
            name: any;
            lastName: any;
            country: any;
            email: any;
        };
    };
}>;
export declare function create(body: TCreateContract, token: string): Promise<IContract>;
export declare function getTransactionsByLenderOrBorrower(body: TGetTransactionsByLenderOrBorrower): Promise<{
    contracts: (mongoose.Document<unknown, any, IContract> & IContract & {
        _id: mongoose.Types.ObjectId;
    })[];
    loanRequests: (mongoose.Document<unknown, any, IContract> & IContract & {
        _id: mongoose.Types.ObjectId;
    })[];
}>;
export declare function getContractsFilterByStatus(body: TGetContractsFilterByStatus, token: string): Promise<(mongoose.Document<unknown, any, IContract> & IContract & {
    _id: mongoose.Types.ObjectId;
})[]>;
export declare function getContractsByStatus(body: TGetContractsByStatusInput, token: string): Promise<{
    active: (mongoose.Document<unknown, any, IContract> & IContract & {
        _id: mongoose.Types.ObjectId;
    })[];
    concluded: (mongoose.Document<unknown, any, IContract> & IContract & {
        _id: mongoose.Types.ObjectId;
    })[];
    onDefault: (mongoose.Document<unknown, any, IContract> & IContract & {
        _id: mongoose.Types.ObjectId;
    })[];
    contracts: (mongoose.Document<unknown, any, IContract> & IContract & {
        _id: mongoose.Types.ObjectId;
    })[];
}>;
export declare function getContractsFilterByStatusByClient(body: TGetContractsFilterByStatusByClient, token: string): Promise<(mongoose.Document<unknown, any, IContract> & IContract & {
    _id: mongoose.Types.ObjectId;
})[]>;
export declare function pagination(page: number, perPage: number, filter?: FilterQuery<IContract>, projection?: ProjectionType<IContract> | null, options?: QueryOptions<IContract> | null): Promise<import("../../../utils").Pagination<mongoose.Document<any, any, any>>>;
export declare function incomes(): Promise<{
    date: any;
    income: {
        usd: number;
        btc: number;
        sat: number;
    };
    count: any;
}[]>;
export declare function income(): Promise<{
    usd: number;
    satoshi: number;
    btc: number;
}>;
export declare function interestRate(): Promise<{
    maxInterest: any;
    medInterest: number;
    minInterest: any;
}>;
export declare function getIncomeByDate(body: TGetByDate): Promise<{
    contractsIncomeByDate: any[];
}>;
export declare function getLoansByDate(body: TGetByDate): Promise<{
    contractsLoansByDate: any[];
}>;
export declare function getDefaultPaymentContractsByMonth(): Promise<{
    defaultPaymentContractsByMonth: any[];
}>;
export declare function getDefaultPaymentContractsByDate(body: TGetByDate): Promise<{
    defaultPaymentContractsByDate: any[];
}>;
interface Indicators {
    satoshiBalance: number;
    totalLoans: number;
    onDefault: number;
    concluded: number;
}
export declare function indicators(): Promise<Indicators>;
export declare function userEarnings(body: TGetContractEarning): {
    earning: number;
};
export declare function getPaymentPlan(amount: number, interest: number, months: number): Promise<IPaymentPlan[]>;
export declare function amortization(body: TGetAmortization): Promise<{
    getAmortization: IPaymentPlan[];
}>;
export declare function getMyContracts(body: TGetMyContracts, token: string): Promise<import("../../../utils").Pagination<mongoose.Document<any, any, any>>>;
export declare function sendContract(body: TSendContract, token: string): Promise<void>;
export declare function getContractsFilterByStatusByUser(body: TGetContractsFilterByStatusByUser, token: string): Promise<import("../../../utils").Pagination<mongoose.Document<any, any, any>>>;
export declare function getPreCancelInfo(body: TGetPreCancelInfo, token: string): Promise<{
    amountToPay: number;
    amountToPayInSats: number;
    userWallet: {
        name: any;
        wallet: any;
        balance: any;
        balanceInUSDC: number;
        blockedBalance: any;
        blockedBalanceInUSDC: number;
        availableBalance: any;
        availableBalanceInUSDC: number;
        currency: any;
    };
}>;
export declare function preCancel(body: TPreCancel, token: string): Promise<mongoose.Document<unknown, any, IContract> & IContract & {
    _id: mongoose.Types.ObjectId;
}>;
export declare function getUserStats(body: TGetUserStats, token: string): Promise<{
    minAmount: any;
    maxAmount: any;
    creditsReceived: any;
    creditsPaidOnTime: any;
    creditsPaidLate: any;
    availableCredit: number;
}>;
export declare function addOriginalValues(): Promise<(mongoose.Document<unknown, any, IContract> & IContract & {
    _id: mongoose.Types.ObjectId;
})[]>;
export declare function contractAndCreditScoreDetails(): Promise<boolean>;
export {};
//# sourceMappingURL=contract.service.d.ts.map