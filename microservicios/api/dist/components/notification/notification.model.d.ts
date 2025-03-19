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
import { Schema, Model, Types, Document } from 'mongoose';
export type CollectionNameEnum = 'user' | 'creditScore' | 'loan' | 'contract' | 'paymentPlan';
export interface INotification {
    collectionName: CollectionNameEnum;
    subject: string;
    message: string;
    active: boolean;
    user: string;
}
export type NotificationDocument = Document<Types.ObjectId, any, INotification> & INotification;
export declare const notificationSchema: Schema<INotification, Model<INotification, any, any, any, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, INotification>;
export declare const Notification: Model<INotification, {}, {}, {}, any>;
export declare const NotificationTC: import("graphql-compose-mongoose").ObjectTypeComposerWithMongooseResolvers<NotificationDocument, any>;
//# sourceMappingURL=notification.model.d.ts.map