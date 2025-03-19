"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.amountToAsset = void 0;
// se añadio la propiedad price ya que con el nuevo feature de pricePercentage
// en algunas ocasiones no vendra el price en el body y se calculara
function amountToAsset(body, price, asset, listing) {
    const listingPrice = (body === null || body === void 0 ? void 0 : body.price) ? price : listing.price;
    if (asset.toLowerCase() === 'lnd') {
        body.amount = Math.trunc(body.amount / listingPrice) + 1;
    }
    if (asset.toLowerCase() === 'btc') {
        body.amount = Number((body.amount / listingPrice).toFixed(8));
    }
    return body.amount;
}
exports.amountToAsset = amountToAsset;
//# sourceMappingURL=amountToAsset.js.map