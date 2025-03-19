"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertSatsToUSDCPrice = exports.convertSatsToUSDC = exports.convertSatsToBtc = void 0;
const tslib_1 = require("tslib");
const apiPriceBtc_1 = require("../apiPriceBtc");
const NoSentryError_1 = require("../NoSentryError");
const btcValueInSats = 100000000;
function convertSatsToBtc(amount) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return amount / btcValueInSats;
    });
}
exports.convertSatsToBtc = convertSatsToBtc;
function convertSatsToUSDC(amount) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        try {
            return (yield convertSatsToBtc(amount)) * (yield (0, apiPriceBtc_1.apiPriceBtc)());
        }
        catch (error) {
            throw new NoSentryError_1.NoSentryError(error.message);
        }
    });
}
exports.convertSatsToUSDC = convertSatsToUSDC;
function convertSatsToUSDCPrice(amount, btcPrice) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return (amount / btcValueInSats) * btcPrice;
    });
}
exports.convertSatsToUSDCPrice = convertSatsToUSDCPrice;
//# sourceMappingURL=satsToUSDC.js.map