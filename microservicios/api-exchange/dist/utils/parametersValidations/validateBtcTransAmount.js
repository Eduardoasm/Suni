"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateBtcTransAmount = void 0;
const tslib_1 = require("tslib");
const NoSentryError_1 = require("../NoSentryError");
function validateBtcTransAmount(settings, asset, transaction) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        if (asset.network === 'BTC' &&
            transaction.amount < settings.btc.minTransAmount) {
            throw new NoSentryError_1.NoSentryError('Invalid transaction amount.');
        }
        return transaction;
    });
}
exports.validateBtcTransAmount = validateBtcTransAmount;
//# sourceMappingURL=validateBtcTransAmount.js.map