"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transfer = void 0;
const tslib_1 = require("tslib");
const axios_1 = tslib_1.__importDefault(require("axios"));
const NoSentryError_1 = require("../NoSentryError");
function transfer(body, token) {
    var _a, _b, _c;
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const { amount, fromWalletId, toWalletId } = body;
        if (!token)
            throw new NoSentryError_1.NoSentryError('Token not provided');
        const config = {
            method: 'post',
            baseURL: process.env.SERVICE_URL,
            url: `/wallet/transfer`,
            headers: {
                authorization: `Bearer ${token}`,
            },
            data: {
                amount,
                from_wallet_id: fromWalletId,
                to_wallet_id: toWalletId,
            },
        };
        try {
            const response = yield (0, axios_1.default)(config);
            if (!((_a = response.data) === null || _a === void 0 ? void 0 : _a.success)) {
                throw new NoSentryError_1.NoSentryError('Error in transfer transaction');
            }
            return (_c = (_b = response.data) === null || _b === void 0 ? void 0 : _b.data) === null || _c === void 0 ? void 0 : _c[0];
        }
        catch (error) {
            throw new NoSentryError_1.NoSentryError(`Error in transfer transaction: ${error.message}`);
        }
    });
}
exports.transfer = transfer;
//# sourceMappingURL=transfer.js.map