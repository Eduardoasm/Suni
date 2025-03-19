import { Types } from 'mongoose';
import { ProviderEnum } from './creditScore.model';
export declare const CreditScoreTypeName: string;
export declare const CreditScoreType: import("graphql").GraphQLObjectType<any, any>;
export declare const CreditScoreTypePlural: string;
export declare const CreditScoreTypeNotNull: import("graphql-compose").NonNullComposer<import("graphql-compose").ObjectTypeComposer<import("./creditScore.model").CreditScoreDocument, any>>;
export type TCredolabData = {
    data: string;
    realIp: string;
};
export declare const CredolabDataInput = "\n  input CredolabData {\n    data: String!\n    realIp: String!\n  }\n";
export declare const CredolabDataType = "\n  type CredolabDataInfo {\n    success: Boolean\n  }\n";
export type TGetCreditScoreUser = {
    _id: Types.ObjectId;
    provider: ProviderEnum;
    startDate: Date;
    endDate: Date;
};
export declare const GetCreditScoreUserInput = "\n  input GetCreditScore {\n    _id: MongoID\n    provider: String\n    startDate: Date\n    endDate: Date\n  }\n";
//# sourceMappingURL=creditScore.dto.d.ts.map