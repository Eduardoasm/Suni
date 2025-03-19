import { Types, Document, Model } from 'mongoose';
export type installmentsCadenceEnum = 'daily' | 'weekly' | 'biweekly' | 'monthly';
export interface ICommerceRiskParam {
    _id?: any;
    commerce: string;
    withCreditScoring: boolean;
    creditScoreLowerLimit: number;
    creditScoreUpperLimit: number;
    name: string;
    installmentsCadence: installmentsCadenceEnum;
    installments: number;
    minAmountUSD: number;
    maxAmountUSD: number;
    interestRate: number;
    active?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}
export type CommerceRiskParamDocument = Document<Types.ObjectId, any, ICommerceRiskParam> & ICommerceRiskParam;
export declare const CommerceRiskParam: Model<ICommerceRiskParam, {}, {}, {}, any>;
export declare const CommerceRiskParamTC: import("graphql-compose-mongoose").ObjectTypeComposerWithMongooseResolvers<CommerceRiskParamDocument, any>;
//# sourceMappingURL=commerceRiskParam.model.d.ts.map