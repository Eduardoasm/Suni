import { Types } from 'mongoose';
export declare const WalletTypeName: string;
export declare const WalletType: import("graphql").GraphQLObjectType<any, any>;
export declare const WalletTypePlural: string;
export declare const WalletTypeNotNull: import("graphql-compose").NonNullComposer<import("graphql-compose").ObjectTypeComposer<import("./wallet.model").WalletDocument, any>>;
export type TCreateWalletInput = {
    name: string;
    address: string;
    currency: Types.ObjectId;
    owner: string;
};
export declare const CreateWalletInput = "\n  input CreateWalletInput {\n    name: String!\n    address: String!\n    currency: MongoID!\n    owner: String\n  }\n";
//# sourceMappingURL=wallet.dto.d.ts.map