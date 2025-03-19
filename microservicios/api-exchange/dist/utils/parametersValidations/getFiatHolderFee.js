"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFiatHolderFee = void 0;
const tslib_1 = require("tslib");
function getFiatHolderFee(body, settings) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        if (body.assetNetwork.toLowerCase() === 'btc') {
            if (body.transactionAmount <= settings.btc.transBreakPoint) {
                return Number((settings.btc.fiatHolderServiceFeeUnderBreakPoint.type === 'fixed'
                    ? settings.btc.fiatHolderServiceFeeUnderBreakPoint.value
                    : (settings.btc.fiatHolderServiceFeeUnderBreakPoint.value *
                        body.transactionAmount) /
                        100).toFixed(8));
            }
            return Number((settings.btc.fiatHolderServiceFeeOverBreakPoint.type === 'fixed'
                ? settings.btc.fiatHolderServiceFeeOverBreakPoint.value
                : (settings.btc.fiatHolderServiceFeeOverBreakPoint.value *
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
exports.getFiatHolderFee = getFiatHolderFee;
//# sourceMappingURL=getFiatHolderFee.js.map