"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAssets = exports.pagination = exports.create = exports.updateOne = exports.find = exports.findOne = void 0;
const tslib_1 = require("tslib");
const utils_1 = require("../../utils");
const asset_model_1 = require("./asset.model");
function findOne(filter, projection, options) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return asset_model_1.Asset.findOne(filter, projection, options).exec();
    });
}
exports.findOne = findOne;
function find(filter, projection, options) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return asset_model_1.Asset.find(filter, projection, options).exec();
    });
}
exports.find = find;
function updateOne(filter, update, options) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return asset_model_1.Asset.updateOne(filter, update, options).exec();
    });
}
exports.updateOne = updateOne;
function create(asset) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return asset_model_1.Asset.create(asset);
    });
}
exports.create = create;
function pagination(page, perPage, filter, projection, options) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return (0, utils_1.paginateModel)(page, perPage, asset_model_1.Asset, filter, projection, options);
    });
}
exports.pagination = pagination;
function getAssets() {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return asset_model_1.Asset.aggregate([
            { $match: { active: true } },
            { $sort: { index: 1 } },
        ]);
    });
}
exports.getAssets = getAssets;
//# sourceMappingURL=asset.service.js.map