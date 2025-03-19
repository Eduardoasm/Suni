import { Types, Document, Model } from 'mongoose';
import { ICurrency } from '../currency';
import { IAsset } from '../asset';
export interface IBestPrice {
    _id?: any;
    currency: Types.ObjectId | ICurrency;
    asset: Types.ObjectId | IAsset;
    saleBestPrice: number;
    purchaseBestPrice: number;
    active?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}
export type BestPriceDocument = Document<Types.ObjectId, any, IBestPrice> & IBestPrice;
export declare const BestPrice: Model<IBestPrice, {}, {}, {}, any>;
export declare const BestPriceTC: import("graphql-compose-mongoose").ObjectTypeComposerWithMongooseResolvers<BestPriceDocument, any>;
//# sourceMappingURL=bestPrice.model.d.ts.map