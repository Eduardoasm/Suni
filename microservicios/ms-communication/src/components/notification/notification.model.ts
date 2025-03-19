import { Schema, Document, Types, Model, model } from 'mongoose';
import { composeMongoose } from 'graphql-compose-mongoose';
import {
  IMessageTemplate,
  MessageTemplateTC,
} from '../messageTemplate/messageTemplate.model';
import { IMessage, messageSchema } from '../message/message.model';

export type ModelEnum =
  | 'contract'
  | 'loanRequest'
  | 'loanOffer'
  | 'listing'
  | 'transaction'
  | 'wallet';

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

export type NotificationDocument = Document<
  Types.ObjectId,
  any,
  INotification
> &
  INotification;

const notificationSchema = new Schema<INotification>(
  {
    message: {
      type: Schema.Types.ObjectId,
      ref: 'MessageTemplate',
    },
    senderId: {
      type: String,
    },
    senderFirstName: {
      type: String,
    },
    senderLastName: {
      type: String,
    },
    recipientId: {
      type: String,
    },
    model: {
      type: String,
      enum: [
        'loanRequest',
        'loanOffer',
        'contract',
        'listing',
        'transaction',
        'wallet',
      ],
    },
    object: {
      type: String,
    },
    module: {
      type: String,
      enum: ['wallet', 'loans', 'exchange', 'kyc'],
    },
    read: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    receivedMessages: [messageSchema],
  },
  { timestamps: true }
);

export const Notification = model<INotification, Model<INotification>>(
  'Notification',
  notificationSchema
);

export const NotificationTC = composeMongoose<NotificationDocument>(
  Notification as any
);

NotificationTC.addRelation('message', {
  resolver: () =>
    MessageTemplateTC.mongooseResolvers.dataLoader({ lean: true }),
  prepareArgs: {
    _id: (source) => source.message,
  },
  projection: { message: 1 },
});
