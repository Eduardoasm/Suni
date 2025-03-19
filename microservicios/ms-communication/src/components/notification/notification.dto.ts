import { Types } from 'mongoose';
import { ModelEnum, ModuleEnum, NotificationTC } from './notification.model';

export const NotificationTypeName = NotificationTC.getTypeName();
export const NotificationType = NotificationTC.getType();
export const NotificationTypePlural =
  NotificationTC.getTypePlural().getTypeName();
export const NotificationTypeNotNull = NotificationTC.getTypeNonNull();

export type TGetNotifications = {
  page: number;
  perPage: number;
  module: ModuleEnum;
};

export const GetNotificationsInput = `
  input GetNotifications {
    page: Int!
    perPage: Int!
    module: moduleNotifications
  }

  enum moduleNotifications {
    wallet
    loans
    exchange
  }
`;

export type TDeleteNotification = {
  notificationId: Types.ObjectId;
};

export const DeleteNotificationInput = `
  input DeleteNotification {
    notificationId: MongoID!
  }
`;

export type TReadNotification = {
  notificationId: Types.ObjectId;
};

export const ReadNotificationInput = `
  input ReadNotification {
    notificationId: MongoID!
  }
`;

export type TCreateNotification = {
  messageTemplateId: Types.ObjectId;
  recipientId: string;
  model?: ModelEnum;
  module: ModuleEnum;
  object?: string;
  senderId?: string;
  variables?: object;
};

export const CreateNotificationInput = `
  input CreateNotification {
    messageTemplateId: MongoID
    recipientId: String
    model: Model
    module: Module
    object: String
  }

  enum Model {
    contract
    loanRequest
    loanOffer
    listing
    transaction
    wallet
  }

  enum Module {
    wallet
    loans
    exchange
    kyc
  }
`;

export type TCustomNotification = {
  _id: Types.ObjectId;
};

export const CustomGetOneNotificationInput = `
  input CustomGetOne {
    _id: MongoID!
  }
`;
// relationObject es de type JSON ya que podria venir de diferentes models: contract, loanRequest, loanOffer etc.
// por lo tanto el JSON retornara el objeto completo
export const CustomGetOneNotificationType = `
  type CustomGetOneNotification {
    notification: ${NotificationType}
    relationObject: JSON
  }
`;
