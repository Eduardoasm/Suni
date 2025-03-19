"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendPushNotification = void 0;
const tslib_1 = require("tslib");
/* eslint-disable import/no-cycle */
const axios_1 = tslib_1.__importDefault(require("axios"));
/**
 * Sends push notification to the user's device.
 * @param {string} deviceToken The device token of the user
 * @param {string} title The title of the notification
 * @param {string} body The description of the notification
 * @param {string} priority The priority of the notification
 */
function sendPushNotification(deviceToken, title, body, priority = 'high') {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        // Create request body
        const data = JSON.stringify({
            to: deviceToken,
            notification: { title, body },
            priority,
        });
        // Create config object
        const config = {
            method: 'post',
            url: 'https://fcm.googleapis.com/fcm/send',
            headers: {
                Authorization: `key=${process.env.FCM_SERVER_KEY}`,
                'Content-Type': 'application/json',
            },
            data,
        };
        // Send request
        yield (0, axios_1.default)(config).catch((error) => console.log('error', error));
    });
}
exports.sendPushNotification = sendPushNotification;
//# sourceMappingURL=sendNotificationsPush.js.map