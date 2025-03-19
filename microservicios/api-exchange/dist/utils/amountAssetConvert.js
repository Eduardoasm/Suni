"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.amountAssetConvert = void 0;
function amountAssetConvert(body, asset) {
    if (asset.network.toLowerCase() === 'lnd') {
        body.amount = Math.trunc(body.amount) + 1;
    }
    if (asset.network.toLowerCase() === 'btc') {
        body.amount = Number(body.amount.toFixed(8));
    }
    return body.amount;
}
exports.amountAssetConvert = amountAssetConvert;
//# sourceMappingURL=amountAssetConvert.js.map