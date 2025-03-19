"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.balanceLock = void 0;
const tslib_1 = require("tslib");
const axios_1 = tslib_1.__importDefault(require("axios"));
const NoSentryError_1 = require("../NoSentryError");
/**
 *
 * @param token token received from app
 * @param walletId wallet received from app
 * @param amount amount to block
 * @param expiresAt block expiration date
 * @param serviceFee fee to take from wallet
 */
function balanceLock(body) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const { token, walletId, amount, expiresAt, serviceFee } = body;
        if (!token) {
            throw new NoSentryError_1.NoSentryError('Token not provided');
        }
        const config = {
            method: 'post',
            baseURL: process.env.SERVICE_URL,
            url: `/wallet/block/${walletId}`,
            headers: {
                authorization: `Bearer ${token}`,
            },
            data: {
                amount,
                expiresAt,
                service: 'loan',
                serviceFee,
            },
        };
        try {
            const { data } = yield (0, axios_1.default)(config);
            if (!data.success)
                throw new NoSentryError_1.NoSentryError('Error blocking amount in wallet');
            return data;
        }
        catch (error) {
            console.log(error, 'Error blocking amount in wallet');
            throw new NoSentryError_1.NoSentryError('Error blocking amount in wallet');
        }
    });
}
exports.balanceLock = balanceLock;
//# sourceMappingURL=userBalanceLock.js.map