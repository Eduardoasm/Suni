import { Types } from 'mongoose';
export declare const BestPriceTypeName: string;
export declare const BestPriceType: import("graphql").GraphQLObjectType<any, any>;
export declare const BestPriceTypePlural: string;
export declare const BestPriceTypeNonNull: import("graphql-compose").NonNullComposer<import("graphql-compose").ObjectTypeComposer<import("./bestPrice.model").BestPriceDocument, any>>;
export type TGetBestPrice = {
    currencyId: Types.ObjectId;
    assetId: Types.ObjectId;
};
export declare const GetBestPriceInput = "\n  input GetBestPrice {\n    currencyId: MongoID!\n    assetId: MongoID!\n  }\n";
//# sourceMappingURL=bestPrice.dto.d.ts.map