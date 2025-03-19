"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBestPrice = exports.pagination = exports.create = exports.updateOne = exports.find = exports.findOne = void 0;
const tslib_1 = require("tslib");
const utils_1 = require("../../utils");
const bestPrice_model_1 = require("./bestPrice.model");
const listingService = tslib_1.__importStar(require("../listing/listing/listing.service"));
function findOne(filter, projection, options) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return bestPrice_model_1.BestPrice.findOne(filter, projection, options).exec();
    });
}
exports.findOne = findOne;
function find(filter, projection, options) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return bestPrice_model_1.BestPrice.find(filter, projection, options).exec();
    });
}
exports.find = find;
function updateOne(filter, update, options) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return bestPrice_model_1.BestPrice.updateOne(filter, update, options).exec();
    });
}
exports.updateOne = updateOne;
function create(bestPrice) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return bestPrice_model_1.BestPrice.create(bestPrice);
    });
}
exports.create = create;
function pagination(page, perPage, filter, projection, options) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return (0, utils_1.paginateModel)(page, perPage, bestPrice_model_1.BestPrice, filter, projection, options);
    });
}
exports.pagination = pagination;
function getBestPrice(body) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const bestPricePurchaseListing = yield listingService.findOne({
            currency: body.currencyId,
            asset: body.assetId,
            price: { $ne: null },
        }, {}, {
            sort: {
                price: -1,
            },
        });
        const bestPriceSaleListing = yield listingService.findOne({
            currency: body.currencyId,
            asset: body.assetId,
            price: { $ne: null },
        }, {}, {
            sort: {
                price: 1,
            },
        });
        // upsert busqueda de bestPrice filtrando por currency y asset
        // si consigue un modelBestPrice con el mismo currency o asset lo updatea si no, lo crea
        const bestPrice = yield bestPrice_model_1.BestPrice.findOneAndUpdate({ currency: body.currencyId, asset: body.assetId }, {
            purchaseBestPrice: bestPricePurchaseListing === null || bestPricePurchaseListing === void 0 ? void 0 : bestPricePurchaseListing.price,
            saleBestPrice: bestPriceSaleListing === null || bestPriceSaleListing === void 0 ? void 0 : bestPriceSaleListing.price,
        }, {
            upsert: true,
            new: true,
        });
        return bestPrice;
    });
}
exports.getBestPrice = getBestPrice;
//# sourceMappingURL=bestPrice.service.js.map