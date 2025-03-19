import { Document, Types, Model } from 'mongoose';
export interface ILanguage {
    _id?: any;
    code: string;
    name: string;
    isActive?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}
export type LanguageDocument = Document<Types.ObjectId, any, ILanguage> & ILanguage;
export declare const Language: Model<ILanguage, {}, {}, {}, any>;
export declare const LanguageTC: import("graphql-compose-mongoose").ObjectTypeComposerWithMongooseResolvers<LanguageDocument, any>;
//# sourceMappingURL=language.model.d.ts.map