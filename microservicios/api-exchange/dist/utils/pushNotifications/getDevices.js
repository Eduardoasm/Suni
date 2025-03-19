"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDevices = void 0;
const tslib_1 = require("tslib");
const axios_1 = tslib_1.__importDefault(require("axios"));
const NoSentryError_1 = require("../NoSentryError");
/**
 *@param userId id from user
 *@param token token received from app
 */
function getDevices(token, userId) {
    var _a;
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        try {
            if (!token) {
                throw new NoSentryError_1.NoSentryError('Token not provided');
            }
            const config = {
                method: 'get',
                baseURL: process.env.SERVICE_URL,
                url: `/device/${userId}`,
                headers: {
                    authorization: `Bearer ${token}`,
                },
            };
            const { data } = yield (0, axios_1.default)(config);
            if (!data.success) {
                throw new NoSentryError_1.NoSentryError('Error in get devices from user');
            }
            return data.data;
        }
        catch (error) {
            console.log('Error in get devices');
            throw new NoSentryError_1.NoSentryError(`Error in get devices: ${(_a = error.message) !== null && _a !== void 0 ? _a : error}`);
        }
    });
}
exports.getDevices = getDevices;
//# sourceMappingURL=getDevices.js.map