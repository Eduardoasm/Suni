import { composeMongoose } from 'graphql-compose-mongoose';
import { Schema, Model, Types, Document, model } from 'mongoose';

export type CollectionNameEnum =
  | 'user'
  | 'creditScore'
  | 'loan'
  | 'contract'
  | 'paymentPlan';

export interface INotification {
  collectionName: CollectionNameEnum;
  subject: string;
  message: string;
  active: boolean;
  user: string;
}

export type NotificationDocument = Document<
  Types.ObjectId,
  any,
  INotification
> &
  INotification;

export const notificationSchema = new Schema<INotification>(
  {
    collectionName: {
      type: String,
      enum: ['user', 'creditScore', 'loan', 'contract', 'paymentPlan'],
    },
    user: {
      type: String,
    },
    subject: {
      type: String,
    },
    message: {
      type: String,
    },
    active: {
      type: Boolean,
    },
  },
  {
    timestamps: true,
  }
);

export const Notification = model<INotification, Model<INotification>>(
  'Notification',
  notificationSchema
);

export const NotificationTC = composeMongoose<NotificationDocument>(
  Notification as any
);
