"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CancelNotificationInput = exports.CreateNotificationInput = exports.GetNotificationsInput = exports.NotificationTypeNotNull = exports.NotificationTypePlural = exports.NotificationType = exports.NotificationTypeName = void 0;
const notification_model_1 = require("./notification.model");
exports.NotificationTypeName = notification_model_1.NotificationTC.getTypeName();
exports.NotificationType = notification_model_1.NotificationTC.getType();
exports.NotificationTypePlural = notification_model_1.NotificationTC.getTypePlural().getTypeName();
exports.NotificationTypeNotNull = notification_model_1.NotificationTC.getTypeNonNull();
exports.GetNotificationsInput = `
  input GetNotifications {
    page: Int
    perPage: Int
  }
`;
exports.CreateNotificationInput = `
  input CreateNotification {
    collectionName: String
    subject: String
    message: String
    active: Boolean
  }
`;
exports.CancelNotificationInput = `
  input CancelNotification{
    _id: MongoID!
  }
`;
//# sourceMappingURL=notification.dto.js.map