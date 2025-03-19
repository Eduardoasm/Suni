"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomGetOneNotificationType = exports.CustomGetOneNotificationInput = exports.CreateNotificationInput = exports.ReadNotificationInput = exports.DeleteNotificationInput = exports.GetNotificationsInput = exports.NotificationTypeNotNull = exports.NotificationTypePlural = exports.NotificationType = exports.NotificationTypeName = void 0;
const notification_model_1 = require("./notification.model");
exports.NotificationTypeName = notification_model_1.NotificationTC.getTypeName();
exports.NotificationType = notification_model_1.NotificationTC.getType();
exports.NotificationTypePlural = notification_model_1.NotificationTC.getTypePlural().getTypeName();
exports.NotificationTypeNotNull = notification_model_1.NotificationTC.getTypeNonNull();
exports.GetNotificationsInput = `
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
exports.DeleteNotificationInput = `
  input DeleteNotification {
    notificationId: MongoID!
  }
`;
exports.ReadNotificationInput = `
  input ReadNotification {
    notificationId: MongoID!
  }
`;
exports.CreateNotificationInput = `
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
exports.CustomGetOneNotificationInput = `
  input CustomGetOne {
    _id: MongoID!
  }
`;
// relationObject es de type JSON ya que podria venir de diferentes models: contract, loanRequest, loanOffer etc.
// por lo tanto el JSON retornara el objeto completo
exports.CustomGetOneNotificationType = `
  type CustomGetOneNotification {
    notification: ${exports.NotificationType}
    relationObject: JSON
  }
`;
//# sourceMappingURL=notification.dto.js.map