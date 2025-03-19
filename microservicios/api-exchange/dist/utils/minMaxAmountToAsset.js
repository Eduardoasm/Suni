"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.minMaxAmountToAsset = void 0;
function minMaxAmountToAsset(minAmount, maxAmount, asset, priceAsset) {
    if (asset.toLowerCase() === 'lnd') {
        const minAmountAsset = Math.trunc(minAmount / priceAsset) - 1;
        const maxAmountAsset = Math.trunc(maxAmount / priceAsset) + 1;
        return {
            minAmountAsset,
            maxAmountAsset,
        };
    }
}
exports.minMaxAmountToAsset = minMaxAmountToAsset;
//# sourceMappingURL=minMaxAmountToAsset.js.map