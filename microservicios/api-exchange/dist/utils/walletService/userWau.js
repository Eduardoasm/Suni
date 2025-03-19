"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUser = void 0;
const tslib_1 = require("tslib");
const axios_1 = tslib_1.__importDefault(require("axios"));
const NoSentryError_1 = require("../NoSentryError");
/**
 * function to search wallet in the wallet services from WAU
 * @param {string} token received token from app
 * @returns userId
 */
function getUser(token) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        if (!token) {
            throw new NoSentryError_1.NoSentryError('Token not provided');
        }
        try {
            const config = {
                method: 'get',
                baseURL: process.env.SERVICE_URL,
                url: '/auth/userinfo',
                headers: {
                    authorization: `Bearer ${token}`,
                },
            };
            const { data } = yield (0, axios_1.default)(config);
            if (!data.success) {
                throw new NoSentryError_1.NoSentryError('Error getting user info');
            }
            return data;
        }
        catch (error) {
            console.log(error);
            throw new NoSentryError_1.NoSentryError(error.message);
        }
    });
}
exports.getUser = getUser;
//# sourceMappingURL=userWau.js.map