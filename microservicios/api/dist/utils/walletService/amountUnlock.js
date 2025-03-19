"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.unlockBalance = void 0;
const tslib_1 = require("tslib");
const axios_1 = tslib_1.__importDefault(require("axios"));
const NoSentryError_1 = require("../NoSentryError");
/**
 *
 * @param token token received from app
 * @param toWalletId wallet id that receives amount
 * @param amount blocked amount
 * @param destServiceFee fee to take from destination
 * @param blockId blocked amount id
 */
function unlockBalance(body) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const { token, toWalletId, amount, destServiceFee, blockId } = body;
        if (!token) {
            throw new NoSentryError_1.NoSentryError('Token not provided');
        }
        const config = {
            method: 'post',
            baseURL: process.env.SERVICE_URL,
            url: `/wallet/unblock/${blockId}`,
            headers: {
                authorization: `Bearer ${token}`,
            },
            data: {
                toWalletId,
                amount,
                destServiceFee,
            },
        };
        try {
            const { data } = yield (0, axios_1.default)(config);
            if (!data.success)
                throw new NoSentryError_1.NoSentryError('Error unblocking amount in wallet');
            return data;
        }
        catch (error) {
            console.log(error, 'Error unblocking amount in wallet');
            throw new NoSentryError_1.NoSentryError(`Error unblocking amount in wallet ${error}`);
        }
    });
}
exports.unlockBalance = unlockBalance;
//# sourceMappingURL=amountUnlock.js.map