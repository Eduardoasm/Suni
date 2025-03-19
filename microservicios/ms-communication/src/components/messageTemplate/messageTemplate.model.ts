import { Schema, Document, Types, Model, model } from 'mongoose';
import { composeMongoose } from 'graphql-compose-mongoose';
import { IMessage, MessageTC } from '../message/message.model';

export interface IMessageTemplate {
  _id?: any;
  messages: Array<Types.ObjectId | IMessage>;
  isActive?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export type MessageTemplateDocument = Document<
  Types.ObjectId,
  any,
  IMessageTemplate
> &
  IMessageTemplate;

const messageTemplateSchema = new Schema<IMessageTemplate>(
  {
    messages: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Message',
      },
    ],
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export const MessageTemplate = model<IMessageTemplate, Model<IMessageTemplate>>(
  'MessageTemplate',
  messageTemplateSchema
);

export const MessageTemplateTC = composeMongoose<MessageTemplateDocument>(
  MessageTemplate as any
);

MessageTemplateTC.addRelation('messages', {
  resolver: () => MessageTC.mongooseResolvers.dataLoaderMany(),
  prepareArgs: {
    _ids: (source) => source.messages,
  },
  projection: { messages: 1 },
});
