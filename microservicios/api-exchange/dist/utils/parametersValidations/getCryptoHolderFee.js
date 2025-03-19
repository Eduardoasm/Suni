"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCryptoHolderFee = void 0;
const tslib_1 = require("tslib");
function getCryptoHolderFee(body, settings) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        if (body.assetNetwork.toLowerCase() === 'btc') {
            if (body.transactionAmount <= settings.btc.transBreakPoint) {
                return Number((settings.btc.cryptoHolderServiceFeeUnderBreakPoint.type === 'fixed'
                    ? settings.btc.cryptoHolderServiceFeeUnderBreakPoint.value
                    : (settings.btc.cryptoHolderServiceFeeUnderBreakPoint.value *
                        body.transactionAmount) /
                        100).toFixed(8));
            }
            return Number((settings.btc.cryptoHolderServiceFeeOverBreakPoint.type === 'fixed'
                ? settings.btc.cryptoHolderServiceFeeOverBreakPoint.value
                : (settings.btc.cryptoHolderServiceFeeOverBreakPoint.value *
                    body.transactionAmount) /
                    100).toFixed(8));
        }
        if (body.assetNetwork.toLocaleLowerCase() === 'lnd') {
            return Math.trunc(((body.userRole === 'maker' ? settings.makerFee : settings.takerFee) *
                body.transactionAmount) /
                100);
        }
        return (((body.userRole === 'maker' ? settings.makerFee : settings.takerFee) *
            body.transactionAmount) /
            100);
    });
}
exports.getCryptoHolderFee = getCryptoHolderFee;
//# sourceMappingURL=getCryptoHolderFee.js.map