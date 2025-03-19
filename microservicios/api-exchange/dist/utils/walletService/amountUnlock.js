"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.unlockBalance = void 0;
const tslib_1 = require("tslib");
const axios_1 = tslib_1.__importDefault(require("axios"));
const NoSentryError_1 = require("../NoSentryError");
/**
 *
 * @param amount amount of listing
 * @param blockId id for service balance lock (loanAdId)
 * @param description receipt description
 * @param takerFee fee of taker
 * @param token token received from app
 * @param toWallet wallet destination
 */
function unlockBalance(body) {
    var _a;
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        if (!body.token) {
            throw new NoSentryError_1.NoSentryError('Token not provided');
        }
        try {
            const config = {
                method: 'post',
                baseURL: process.env.SERVICE_URL,
                url: `/wallet/unblock/${body.blockId}`,
                headers: {
                    authorization: `Bearer ${body.token}`,
                },
                data: {
                    toWalletId: body.toWallet,
                    amount: body.amount,
                    description: body.description,
                    destServiceFee: body.takerFee,
                },
            };
            const { data } = yield (0, axios_1.default)(config);
            if (!data.success)
                throw new NoSentryError_1.NoSentryError('Error unlocking amount in wallet');
            return data.success;
        }
        catch (error) {
            console.log(`Error unlocking amount in wallet ${error}`);
            throw new NoSentryError_1.NoSentryError((_a = error.message) !== null && _a !== void 0 ? _a : 'Error unlocking amount in wallet');
        }
    });
}
exports.unlockBalance = unlockBalance;
//# sourceMappingURL=amountUnlock.js.map