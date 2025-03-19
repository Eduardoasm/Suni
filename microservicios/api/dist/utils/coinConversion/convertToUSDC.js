"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertToUSDC = void 0;
const NoSentryError_1 = require("../NoSentryError");
const btcValueInSats = 100000000;
function convertToUSDC(coin, btcPrice, amount) {
    if (coin === 'lnd')
        return (amount / btcValueInSats) * btcPrice;
    throw new NoSentryError_1.NoSentryError('Currency must be lnd');
}
exports.convertToUSDC = convertToUSDC;
//# sourceMappingURL=convertToUSDC.js.map