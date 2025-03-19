import { Document, Types, Model } from 'mongoose';
import { IMessageTemplate } from '../messageTemplate/messageTemplate.model';
import { IMessage } from '../message/message.model';
export type ModelEnum = 'contract' | 'loanRequest' | 'loanOffer' | 'listing' | 'transaction' | 'wallet';
export type ModuleEnum = 'wallet' | 'loans' | 'exchange' | 'kyc';
export interface INotification {
    _id?: any;
    message: Types.ObjectId | IMessageTemplate;
    senderId?: string;
    senderFirstName?: string;
    senderLastName?: string;
    recipientId: string;
    model?: ModelEnum;
    object?: string;
    module: ModuleEnum;
    read: boolean;
    receivedMessages?: Array<IMessage>;
    isActive?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}
export type NotificationDocument = Document<Types.ObjectId, any, INotification> & INotification;
export declare const Notification: Model<INotification, {}, {}, {}, any>;
export declare const NotificationTC: import("graphql-compose-mongoose").ObjectTypeComposerWithMongooseResolvers<NotificationDocument, any>;
//# sourceMappingURL=notification.model.d.ts.map