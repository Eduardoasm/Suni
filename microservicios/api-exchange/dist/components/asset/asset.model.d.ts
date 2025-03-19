import { Types, Document, Model } from 'mongoose';
export interface IAsset {
    _id?: any;
    name: string;
    symbol: string;
    network: string;
    decimals: number;
    index: number;
    conversionRateToUsd?: number;
    active: boolean;
    createdAt: Date;
    updatedAt: Date;
}
export type AssetDocument = Document<Types.ObjectId, any, IAsset> & IAsset;
export declare const Asset: Model<IAsset, {}, {}, {}, any>;
export declare const AssetTC: import("graphql-compose-mongoose").ObjectTypeComposerWithMongooseResolvers<AssetDocument, any>;
//# sourceMappingURL=asset.model.d.ts.map