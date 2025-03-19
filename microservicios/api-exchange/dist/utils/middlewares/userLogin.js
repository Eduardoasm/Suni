"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userInfo = void 0;
const tslib_1 = require("tslib");
const axios_1 = tslib_1.__importDefault(require("axios"));
const graphql_shield_1 = require("graphql-shield");
const NoSentryError_1 = require("../NoSentryError");
/**
 * authorization for the user in the app
 */
exports.userInfo = (0, graphql_shield_1.rule)()((parent, args, context, info) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const token = context.req.headers.authorization;
    if (!token) {
        throw new NoSentryError_1.NoSentryError('Token not provided');
    }
    const config = {
        method: 'get',
        baseURL: process.env.SERVICE_URL,
        url: '/auth/userinfo',
        headers: {
            authorization: `Bearer ${token}`,
        },
    };
    const { data } = yield (0, axios_1.default)(config);
    if (!data) {
        throw new NoSentryError_1.NoSentryError('error obtaining data');
    }
    return true;
}));
//# sourceMappingURL=userLogin.js.map