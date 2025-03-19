/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
import { Schema, Document, Types, Model } from 'mongoose';
import { ILanguage } from '../language/language.model';
export interface IMessage {
    _id?: any;
    language: Types.ObjectId | ILanguage;
    title: string;
    content: string;
    isActive?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}
export type MessageDocument = Document<Types.ObjectId, any, IMessage> & IMessage;
export declare const messageSchema: Schema<IMessage, Model<IMessage, any, any, any, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, IMessage>;
export declare const Message: Model<IMessage, {}, {}, {}, any>;
export declare const MessageTC: import("graphql-compose-mongoose").ObjectTypeComposerWithMongooseResolvers<MessageDocument, any>;
//# sourceMappingURL=message.model.d.ts.map