"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pagination = exports.create = exports.updateOne = exports.find = exports.findOne = void 0;
const tslib_1 = require("tslib");
// eslint-disable-next-line import/no-cycle
const utils_1 = require("../../utils");
const currency_model_1 = require("./currency.model");
function findOne(filter, projection, options) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return currency_model_1.Currency.findOne(filter, projection, options).exec();
    });
}
exports.findOne = findOne;
function find(filter, projection, options) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return currency_model_1.Currency.find(filter, projection, options).exec();
    });
}
exports.find = find;
function updateOne(filter, update, options) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return currency_model_1.Currency.updateOne(filter, update, options).exec();
    });
}
exports.updateOne = updateOne;
function create(currency) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return currency_model_1.Currency.create(currency);
    });
}
exports.create = create;
function pagination(page, perPage, filter, projection, options) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return (0, utils_1.paginateModel)(page, perPage, currency_model_1.Currency, filter, projection, options);
    });
}
exports.pagination = pagination;
//# sourceMappingURL=currency.service.js.map