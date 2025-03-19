"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pagination = exports.create = exports.updateOne = exports.find = exports.findOne = void 0;
const tslib_1 = require("tslib");
const utils_1 = require("../../utils");
const profit_model_1 = require("./profit.model");
function findOne(filter, projection, options) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return profit_model_1.Profit.findOne(filter, projection, options).exec();
    });
}
exports.findOne = findOne;
function find(filter, projection, options) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return profit_model_1.Profit.find(filter, projection, options).exec();
    });
}
exports.find = find;
function updateOne(filter, update, options) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return profit_model_1.Profit.updateOne(filter, update, options).exec();
    });
}
exports.updateOne = updateOne;
function create(profit) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return profit_model_1.Profit.create(profit);
    });
}
exports.create = create;
function pagination(page, perPage, filter, projection, options) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return (0, utils_1.paginateModel)(page, perPage, profit_model_1.Profit, filter, projection, options);
    });
}
exports.pagination = pagination;
//# sourceMappingURL=profit.service.js.map