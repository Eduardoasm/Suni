import { Document, Types, Model } from 'mongoose';
export interface ICurrency {
    _id?: any;
    name: string;
    symbol: string;
    active?: boolean;
}
export type CurrencyDocument = Document<Types.ObjectId, any, ICurrency> & ICurrency;
export declare const Currency: Model<ICurrency, {}, {}, {}, any>;
export declare const CurrencyTC: import("graphql-compose-mongoose").ObjectTypeComposerWithMongooseResolvers<CurrencyDocument, any>;
//# sourceMappingURL=currency.model.d.ts.map