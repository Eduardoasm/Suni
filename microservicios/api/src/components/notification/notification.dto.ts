import { Types } from 'mongoose';
import { NotificationTC } from './notification.model';

export const NotificationTypeName = NotificationTC.getTypeName();
export const NotificationType = NotificationTC.getType();
export const NotificationTypePlural =
  NotificationTC.getTypePlural().getTypeName();
export const NotificationTypeNotNull = NotificationTC.getTypeNonNull();

export type TGetNotifications = {
  page: number;
  perPage: number;
};

export const GetNotificationsInput = `
  input GetNotifications {
    page: Int
    perPage: Int
  }
`;

export const CreateNotificationInput = `
  input CreateNotification {
    collectionName: String
    subject: String
    message: String
    active: Boolean
  }
`;

export type TCancelNotification = {
  _id: Types.ObjectId;
};

export const CancelNotificationInput = `
  input CancelNotification{
    _id: MongoID!
  }
`;
