"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pagination = exports.create = exports.updateOne = exports.find = exports.findOne = void 0;
const tslib_1 = require("tslib");
const utils_1 = require("../../../utils");
const paymentMethodInput_model_1 = require("./paymentMethodInput.model");
function findOne(filter, projection, options) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return paymentMethodInput_model_1.PaymentMethodInput.findOne(filter, projection, options).exec();
    });
}
exports.findOne = findOne;
function find(filter, projection, options) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return paymentMethodInput_model_1.PaymentMethodInput.find(filter, projection, options).exec();
    });
}
exports.find = find;
function updateOne(filter, update, options) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return paymentMethodInput_model_1.PaymentMethodInput.updateOne(filter, update, options).exec();
    });
}
exports.updateOne = updateOne;
function create(paymentMethodInput) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return paymentMethodInput_model_1.PaymentMethodInput.create(paymentMethodInput);
    });
}
exports.create = create;
function pagination(page, perPage, filter, projection, options) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return (0, utils_1.paginateModel)(page, perPage, paymentMethodInput_model_1.PaymentMethodInput, filter, projection, options);
    });
}
exports.pagination = pagination;
//# sourceMappingURL=paymentMethodInput.service.js.map