"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserWallet = void 0;
const tslib_1 = require("tslib");
const axios_1 = tslib_1.__importDefault(require("axios"));
const NoSentryError_1 = require("../NoSentryError");
function getUserWallet(token, walletId) {
    var _a, _b, _c;
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const config = {
            method: 'get',
            baseURL: process.env.SERVICE_URL,
            url: `/wallet/user-balances/${walletId}`,
            headers: {
                authorization: `Bearer ${token}`,
            },
        };
        try {
            const response = yield (0, axios_1.default)(config);
            if (!((_a = response.data) === null || _a === void 0 ? void 0 : _a.success)) {
                throw new NoSentryError_1.NoSentryError('Error getting user wallet');
            }
            return (_c = (_b = response.data) === null || _b === void 0 ? void 0 : _b.data) === null || _c === void 0 ? void 0 : _c[0];
        }
        catch (error) {
            throw new NoSentryError_1.NoSentryError(`Error in get user wallet ${error.message}`);
        }
    });
}
exports.getUserWallet = getUserWallet;
//# sourceMappingURL=userWallet.js.map