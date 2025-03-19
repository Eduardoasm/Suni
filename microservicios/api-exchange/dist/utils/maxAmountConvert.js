"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.maxAmountConvert = void 0;
function maxAmountConvert(asset, listing, listingPrice) {
    if (asset.toLowerCase() === 'lnd') {
        listing.maxAmountAsset = listing.amount - 1;
        listing.maxAmount = listing.maxAmountAsset * listingPrice;
    }
    return listing;
}
exports.maxAmountConvert = maxAmountConvert;
//# sourceMappingURL=maxAmountConvert.js.map