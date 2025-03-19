import { Types } from 'mongoose';
import { ModelEnum, ModuleEnum } from './notification.model';
export declare const NotificationTypeName: string;
export declare const NotificationType: import("graphql").GraphQLObjectType<any, any>;
export declare const NotificationTypePlural: string;
export declare const NotificationTypeNotNull: import("graphql-compose").NonNullComposer<import("graphql-compose").ObjectTypeComposer<import("./notification.model").NotificationDocument, any>>;
export type TGetNotifications = {
    page: number;
    perPage: number;
    module: ModuleEnum;
};
export declare const GetNotificationsInput = "\n  input GetNotifications {\n    page: Int!\n    perPage: Int!\n    module: moduleNotifications\n  }\n\n  enum moduleNotifications {\n    wallet\n    loans\n    exchange\n  }\n";
export type TDeleteNotification = {
    notificationId: Types.ObjectId;
};
export declare const DeleteNotificationInput = "\n  input DeleteNotification {\n    notificationId: MongoID!\n  }\n";
export type TReadNotification = {
    notificationId: Types.ObjectId;
};
export declare const ReadNotificationInput = "\n  input ReadNotification {\n    notificationId: MongoID!\n  }\n";
export type TCreateNotification = {
    messageTemplateId: string;
    recipientId: string;
    model?: ModelEnum;
    module: ModuleEnum;
    object?: string;
    senderId?: string;
    variables?: object;
};
export declare const CreateNotificationInput = "\n  input CreateNotification {\n    messageTemplateId: MongoID\n    recipientId: String\n    model: Model\n    module: Module\n    object: String\n  }\n\n  enum Model {\n    contract\n    loanRequest\n    loanOffer\n    listing\n    transaction\n    wallet\n  }\n\n  enum Module {\n    wallet\n    loans\n    exchange\n    kyc\n  }\n";
export type TCustomNotification = {
    _id: Types.ObjectId;
};
export declare const CustomGetOneNotificationInput = "\n  input CustomGetOne {\n    _id: MongoID!\n  }\n";
export declare const CustomGetOneNotificationType: string;
//# sourceMappingURL=notification.dto.d.ts.map