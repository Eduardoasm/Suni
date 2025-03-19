import { Document, Types, Model } from 'mongoose';
import { IMessage } from '../message/message.model';
export interface IMessageTemplate {
    _id?: any;
    messages: Array<Types.ObjectId | IMessage>;
    templateId: string;
    isActive?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}
export type MessageTemplateDocument = Document<Types.ObjectId, any, IMessageTemplate> & IMessageTemplate;
export declare const MessageTemplate: Model<IMessageTemplate, {}, {}, {}, any>;
export declare const MessageTemplateTC: import("graphql-compose-mongoose").ObjectTypeComposerWithMongooseResolvers<MessageTemplateDocument, any>;
//# sourceMappingURL=messageTemplate.model.d.ts.map