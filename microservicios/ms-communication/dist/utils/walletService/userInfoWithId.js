"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserInfoWithId = void 0;
const tslib_1 = require("tslib");
/* eslint-disable import/no-extraneous-dependencies */
const axios_1 = tslib_1.__importDefault(require("axios"));
const NoSentryError_1 = require("../NoSentryError");
/**
 * function to search wallet in the wallet services from WAU
 * @param {string} token received token from app
 * @param {string} userId received userId from app
 * @returns user
 */
function getUserInfoWithId(token, userId) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        if (!token) {
            throw new NoSentryError_1.NoSentryError('Token not provided');
        }
        const config = {
            method: 'get',
            baseURL: process.env.SERVICE_URL,
            url: `/user/${userId}`,
            headers: {
                authorization: `Bearer ${token}`,
            },
        };
        try {
            const { data } = yield (0, axios_1.default)(config);
            if (!data.success) {
                throw new NoSentryError_1.NoSentryError('Unauthenticated');
            }
            return data;
        }
        catch (error) {
            console.log(error);
            throw new NoSentryError_1.NoSentryError('Unauthenticated');
        }
    });
}
exports.getUserInfoWithId = getUserInfoWithId;
//# sourceMappingURL=userInfoWithId.js.map