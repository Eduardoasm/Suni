import { Types, Document, Model } from 'mongoose';
export interface ICurrency {
    _id?: any;
    name: string;
    symbol: string;
    network: string;
    decimals: number;
    active: boolean;
    createdAt: Date;
    updatedAt: Date;
    conversionRateToUsd?: number;
}
export type CurrencyDocument = Document<Types.ObjectId, any, ICurrency> & ICurrency;
export declare const Currency: Model<ICurrency, {}, {}, {}, any>;
export declare const CurrencyTC: import("graphql-compose-mongoose").ObjectTypeComposerWithMongooseResolvers<CurrencyDocument, any>;
//# sourceMappingURL=currency.model.d.ts.map