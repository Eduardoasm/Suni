"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createNotification = void 0;
const tslib_1 = require("tslib");
const axios_1 = tslib_1.__importDefault(require("axios"));
const NoSentryError_1 = require("../NoSentryError");
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
function createNotification(notification, token) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        if (!token) {
            throw new NoSentryError_1.NoSentryError('token not provided');
        }
        const config = {
            method: 'post',
            baseURL: process.env.COMMUNICATION_URL,
            url: `/api/v1/notification`,
            headers: {
                authorization: token,
            },
            data: notification,
        };
        try {
            const { data } = yield (0, axios_1.default)(config);
            if (!data.success) {
                throw new NoSentryError_1.NoSentryError('Error in create notification');
            }
            return data;
        }
        catch (error) {
            console.log('Error in create notification');
            throw new NoSentryError_1.NoSentryError(error);
        }
    });
}
exports.createNotification = createNotification;
//# sourceMappingURL=createNotification.js.map