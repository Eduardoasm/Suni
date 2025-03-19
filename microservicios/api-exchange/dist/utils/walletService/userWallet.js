"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserWallet = void 0;
const tslib_1 = require("tslib");
const axios_1 = tslib_1.__importDefault(require("axios"));
const NoSentryError_1 = require("../NoSentryError");
function getUserWallet(token, walletId) {
    var _a, _b;
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        try {
            const config = {
                method: 'get',
                baseURL: process.env.SERVICE_URL,
                url: `/wallet/user-balances/${walletId}`,
                headers: {
                    authorization: `Bearer ${token}`,
                },
            };
            const response = yield (0, axios_1.default)(config);
            if (!((_a = response.data) === null || _a === void 0 ? void 0 : _a.success)) {
                throw new NoSentryError_1.NoSentryError('Error in obtaining data');
            }
            const wallet = (_b = response.data) === null || _b === void 0 ? void 0 : _b.data[0];
            return wallet;
        }
        catch (error) {
            console.log('Error in get user wallet');
            throw new NoSentryError_1.NoSentryError(`Error in get wallet: ${error}`);
        }
    });
}
exports.getUserWallet = getUserWallet;
//# sourceMappingURL=userWallet.js.map