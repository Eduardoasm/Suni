export declare const CurrencyTypeName: string;
export declare const CurrencyType: import("graphql").GraphQLObjectType<any, any>;
export declare const CurrencyTypePlural: string;
export declare const CurrencyTypeNotNull: import("graphql-compose").NonNullComposer<import("graphql-compose").ObjectTypeComposer<import("./currency.model").CurrencyDocument, any>>;
export type TCreateCurrencyInput = {
    name: string;
    symbol: string;
};
export declare const CreateCurrencyInput = "\n  input CreateCurrencyInput {\n    name: String!\n    symbol: String!\n  }\n";
//# sourceMappingURL=currency.dto.d.ts.map