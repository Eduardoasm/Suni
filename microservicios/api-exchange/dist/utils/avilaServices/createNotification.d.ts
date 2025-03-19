import { TNotification } from '../../types/notification';
/**
 * @param {object} notification
 * @param {ObjectId} notification.messageTemplateId - message template id
 * @param {string} notification.model - model of notification: contract | loanRequest | loanOffer | listing | transaction
 * @param {string} notification.module - module of services: wallet | loans | exchange
 * @param {ObjectId | string} notification.object - id of object model
 * @param {string} notification.recipientId - id of recipient
 * @param {string} [notification.senderId ]- id of sender
 * @param {object} [notification.variables] - object dynamic variable thath will be changed
 * @return notification created
 */
export declare function createNotification(notification: TNotification, token: string): Promise<any>;
//# sourceMappingURL=createNotification.d.ts.map