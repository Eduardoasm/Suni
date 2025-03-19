import type { FilterQuery, ProjectionType, QueryOptions, UpdateQuery, UpdateWithAggregationPipeline } from 'mongoose';
import mongoose from 'mongoose';
import { ILoanRequest } from './loanRequest.model';
import { TCreateLoanRequest, TCreateLoanOffer, TGetLoanOfferRequest, TGetLoanRequest, TGetMyLoanRequest, TGetMarketLoanRequests, TGetCostsOfRequest, TCancelLoanRequest, TGetUserRequestAmount, TValidateForLoanRequest } from './loanRequest.dto';
import { ILoanOffer } from '../loanOffer';
import { ISettings } from '../settings/settings';
export declare function findOne(filter?: FilterQuery<ILoanRequest>, projection?: ProjectionType<ILoanRequest> | null, options?: QueryOptions<ILoanRequest> | null): Promise<mongoose.Document<unknown, any, ILoanRequest> & ILoanRequest & {
    _id: mongoose.Types.ObjectId;
}>;
export declare function find(filter?: FilterQuery<ILoanRequest>, projection?: ProjectionType<ILoanRequest> | null, options?: QueryOptions<ILoanRequest> | null): Promise<(mongoose.Document<unknown, any, ILoanRequest> & ILoanRequest & {
    _id: mongoose.Types.ObjectId;
})[]>;
export declare function updateOne(filter: FilterQuery<ILoanRequest>, update: UpdateQuery<ILoanRequest> | UpdateWithAggregationPipeline, options?: QueryOptions<ILoanRequest> | null): Promise<import("mongodb").UpdateResult>;
export declare function create(body: TCreateLoanRequest, token: string): Promise<mongoose.Document<unknown, any, ILoanRequest> & ILoanRequest & {
    _id: mongoose.Types.ObjectId;
}>;
export declare function pagination(page: number, perPage: number, filter?: FilterQuery<ILoanRequest>, projection?: ProjectionType<ILoanRequest> | null, options?: QueryOptions<ILoanRequest> | null): Promise<import("../../utils").Pagination<mongoose.Document<any, any, any>>>;
export declare function getMarketLoanRequests(body: TGetMarketLoanRequests, token: string): Promise<import("../../utils").Pagination<mongoose.Document<any, any, any>>>;
interface LoanOfferForRequest {
    loanRequest: ILoanRequest;
    loanOffer: ILoanOffer;
}
export declare function createLoanOffer(body: TCreateLoanOffer, token: string): Promise<LoanOfferForRequest>;
export declare function getLoanOffersForRequest(body: TGetLoanRequest, token: string): Promise<{
    loanOffers: (mongoose.Types.ObjectId | ILoanOffer)[];
}>;
export declare function getOneLoanOfferForRequest(body: TGetLoanOfferRequest, token: string): Promise<LoanOfferForRequest>;
export declare function getMyLoanRequests(body: TGetMyLoanRequest, token: string): Promise<import("../../utils").Pagination<mongoose.Document<any, any, any>>>;
export declare function getUserRequestAmounts(token: string, body: TGetUserRequestAmount): Promise<{
    amounts: any[];
    minAmount?: undefined;
    maxAmount?: undefined;
    availableCredit?: undefined;
} | {
    minAmount: any;
    maxAmount: any;
    availableCredit: number;
    amounts?: undefined;
}>;
export declare function getCostsOfRequest(body: TGetCostsOfRequest, token: string): Promise<any>;
export declare function cancelRequest(body: TCancelLoanRequest, token: string): Promise<mongoose.Document<unknown, any, ILoanRequest> & ILoanRequest & {
    _id: mongoose.Types.ObjectId;
}>;
export declare function validateForLoanRequest(token: string, user: any, serviceFee: number, userLoanRequest: ILoanRequest, settings: ISettings, body: TValidateForLoanRequest): Promise<{
    isAllowed: boolean;
    message: any;
}>;
export {};
//# sourceMappingURL=loanRequest.service.d.ts.map