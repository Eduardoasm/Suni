"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCryptoHolderTransFee = void 0;
const tslib_1 = require("tslib");
function getCryptoHolderTransFee(body, settings) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        if (body.assetNetwork.toLowerCase() === 'btc') {
            if (body.transactionAmount <= settings.btc.transBreakPoint) {
                return Number((settings.btc.cryptoHolderTransFeeUnderBreakPoint.type === 'fixed'
                    ? settings.btc.cryptoHolderTransFeeUnderBreakPoint.value
                    : (settings.btc.cryptoHolderTransFeeUnderBreakPoint.value *
                        body.transactionAmount) /
                        100).toFixed(8));
            }
            return Number((settings.btc.cryptoHolderTransFeeOverBreakPoint.type === 'fixed'
                ? settings.btc.cryptoHolderTransFeeOverBreakPoint.value
                : (settings.btc.cryptoHolderTransFeeOverBreakPoint.value *
                    body.transactionAmount) /
                    100).toFixed(8));
        }
        if (body.assetNetwork.toLocaleLowerCase() === 'lnd') {
            return Math.trunc((settings.transactionFee * body.transactionAmount) / 100);
        }
        return (settings.transactionFee * body.transactionAmount) / 100;
    });
}
exports.getCryptoHolderTransFee = getCryptoHolderTransFee;
//# sourceMappingURL=getCryptoHolderTransFee.js.map