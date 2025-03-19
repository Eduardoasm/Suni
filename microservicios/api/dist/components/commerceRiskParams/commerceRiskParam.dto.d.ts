export declare const CommerceRiskParamTypeName: string;
export declare const CommerceRiskParamType: import("graphql").GraphQLObjectType<any, any>;
export declare const CommerceRiskParamTypePlural: string;
export declare const CommerceRiskParamTypeNonNull: import("graphql-compose").NonNullComposer<import("graphql-compose").ObjectTypeComposer<import("./commerceRiskParam.model").CommerceRiskParamDocument, any>>;
export type TGetCommerceRiskParamsWithCreditScore = {
    page: number;
    perPage: number;
    credolabReferenceNumber: string;
    commerce: string;
    amountUSD: number;
};
export declare const GetCommerceRiskParamsWithCreditScoreInput = "\n  input GetCommerceRiskParamsWithCreditScore {\n    page: Int!\n    perPage: Int!\n    credolabReferenceNumber: String!\n    commerce: String!\n    amountUSD: Float!\n  }\n";
//# sourceMappingURL=commerceRiskParam.dto.d.ts.map