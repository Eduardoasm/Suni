export declare const TransactionType: import("graphql").GraphQLObjectType<any, any>;
export declare const TransactionTypeName: string;
export declare const TransactionTypePlural: string;
export declare const TransactionTypeNonNull: import("graphql-compose").NonNullComposer<import("graphql-compose").ObjectTypeComposer<import("./transaction.model").TransactionDocument, any>>;
export declare const borrowerCreditHistoryType: string;
export type userTransactionEnum = 'borrower' | 'lender';
export type dateTransactionEnum = '1D' | '7D' | '2W' | '1M' | '6M' | '1Y';
export declare const lenderCreditHistoryType: string;
export declare const dateTransactionInput = "\n  input dateTransaction {\n    date: String\n  }\n";
//# sourceMappingURL=transaction.dto.d.ts.map