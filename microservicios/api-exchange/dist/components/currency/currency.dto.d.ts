import { Types } from 'mongoose';
export declare const CurrencyTypeName: string;
export declare const CurrencyType: import("graphql").GraphQLObjectType<any, any>;
export declare const CurrencyTypePlural: string;
export declare const CurrencyTypeNonNull: import("graphql-compose").NonNullComposer<import("graphql-compose").ObjectTypeComposer<import("./currency.model").CurrencyDocument, any>>;
export declare const userWalletsType = "\n  type userWallets {\n    wallets: [properties]\n  }\n\n  type properties {\n    wallet: String\n    name: String\n    balance: Float\n    error: String\n    blocked_balance: Float\n    available_balance: Float\n  }\n";
export type TGetAssetWallets = {
    asset: Types.ObjectId;
};
export declare const GetAssetWalletsInput = "\n  input GetAssetWallets {\n    asset: MongoID!\n  }\n";
//# sourceMappingURL=currency.dto.d.ts.map