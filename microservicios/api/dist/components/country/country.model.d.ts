import { Types, Document, Model } from 'mongoose';
export interface ICountry {
    _id?: any;
    name: string;
    code: string;
    flag: string;
    disabled: boolean;
    active: boolean;
    createdAt: Date;
    updatedAt: Date;
}
export type CountryDocument = Document<Types.ObjectId, any, ICountry> & ICountry;
export declare const Country: Model<ICountry, {}, {}, {}, any>;
export declare const CountryTC: import("graphql-compose-mongoose").ObjectTypeComposerWithMongooseResolvers<CountryDocument, any>;
//# sourceMappingURL=country.model.d.ts.map