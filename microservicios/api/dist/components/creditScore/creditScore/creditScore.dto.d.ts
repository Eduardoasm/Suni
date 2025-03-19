import { ProviderEnum } from '../creditScoreValues';
export declare const CreditScoreTypeName: string;
export declare const CreditScoreType: import("graphql").GraphQLObjectType<any, any>;
export declare const CreditScoreTypePlural: string;
export declare const CreditScoreTypeNotNull: import("graphql-compose").NonNullComposer<import("graphql-compose").ObjectTypeComposer<import("./creditScore.model").CreditScoreDocument, any>>;
export type TGetClientWithCreditScoreInput = {
    id: string;
};
export declare const GetClientWithCreditScoreInput = "\n  input GetClientWithCreditScoreInput {\n    id: String!\n  }\n";
export type TCreditScoreValues = {
    referenceNumber: string;
    value: number;
    provider: ProviderEnum;
};
export type TCreateCreditScore = {
    values: TCreditScoreValues;
};
export declare const CreateCreditScoreUserInput = "\n  input CreateCreditScore {\n    values: creditScoreValues\n  }\n\n  input creditScoreValues {\n    referenceNumber: String\n    value: Float\n    provider: String\n  }\n";
export type TGetCreditScoreUser = {
    userId: string;
    startDate: Date;
    endDate: Date;
};
export declare const GetCreditScoreUserInput = "\n  input GetCreditScore {\n    userId: String\n    startDate: Date\n    endDate: Date\n  }\n";
export declare const GetClientsWithCreditScoreType: string;
export declare const GetClientWithCreditScoreType: string;
//# sourceMappingURL=creditScore.dto.d.ts.map