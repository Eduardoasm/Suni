"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertFromUSDC = void 0;
const tslib_1 = require("tslib");
const NoSentryError_1 = require("../NoSentryError");
const btcValueInSats = 100000000;
function convertFromUSDC(coin, btcPrice, amount) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        if (coin.toLowerCase() === 'lnd')
            return Math.round((amount / btcPrice) * btcValueInSats);
        throw new NoSentryError_1.NoSentryError('Currency must be lnd');
    });
}
exports.convertFromUSDC = convertFromUSDC;
//# sourceMappingURL=convertFromUSDC.js.map