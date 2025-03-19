"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAmountInSats = void 0;
const tslib_1 = require("tslib");
const apiPriceBtc_1 = require("./apiPriceBtc");
const NoSentryError_1 = require("./NoSentryError");
const btcValueInSats = 100000000;
function getAmountInSats(amount) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        try {
            return (amount / (yield (0, apiPriceBtc_1.apiPriceBtc)())) * btcValueInSats;
        }
        catch (error) {
            throw new NoSentryError_1.NoSentryError(error.message);
        }
    });
}
exports.getAmountInSats = getAmountInSats;
//# sourceMappingURL=getAmountInSats.js.map