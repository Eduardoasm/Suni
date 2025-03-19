"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendNotifications = void 0;
const tslib_1 = require("tslib");
const axios_1 = tslib_1.__importDefault(require("axios"));
const NoSentryError_1 = require("../NoSentryError");
function sendNotifications(bodyNotifications) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const { userId, title, message, token } = bodyNotifications;
        try {
            if (!token) {
                throw new NoSentryError_1.NoSentryError('Token not provided');
            }
            const config = {
                method: 'post',
                baseURL: process.env.SERVICE_URL,
                url: '/push',
                headers: {
                    authorization: `Bearer ${token}`,
                },
                data: {
                    userId,
                    // devicesId,
                    title,
                    message,
                    // imageUrl,
                    // url,
                    // appData,
                },
            };
            const response = yield (0, axios_1.default)(config);
            if (!response.data.success) {
                console.log('Error sending notifications');
            }
            return response;
        }
        catch (error) {
            console.log(error, 'Error sending notifications');
        }
    });
}
exports.sendNotifications = sendNotifications;
//# sourceMappingURL=sendNotification.js.map