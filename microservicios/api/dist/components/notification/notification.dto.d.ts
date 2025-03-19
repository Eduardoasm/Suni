import { Types } from 'mongoose';
export declare const NotificationTypeName: string;
export declare const NotificationType: import("graphql").GraphQLObjectType<any, any>;
export declare const NotificationTypePlural: string;
export declare const NotificationTypeNotNull: import("graphql-compose").NonNullComposer<import("graphql-compose").ObjectTypeComposer<import("./notification.model").NotificationDocument, any>>;
export type TGetNotifications = {
    page: number;
    perPage: number;
};
export declare const GetNotificationsInput = "\n  input GetNotifications {\n    page: Int\n    perPage: Int\n  }\n";
export declare const CreateNotificationInput = "\n  input CreateNotification {\n    collectionName: String\n    subject: String\n    message: String\n    active: Boolean\n  }\n";
export type TCancelNotification = {
    _id: Types.ObjectId;
};
export declare const CancelNotificationInput = "\n  input CancelNotification{\n    _id: MongoID!\n  }\n";
//# sourceMappingURL=notification.dto.d.ts.map