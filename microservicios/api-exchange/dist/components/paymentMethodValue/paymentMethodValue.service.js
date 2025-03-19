"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateManyValuesUser = exports.updateMany = exports.insertMany = exports.pagination = exports.create = exports.updateOne = exports.find = exports.findOne = void 0;
const tslib_1 = require("tslib");
const utils_1 = require("../../utils");
const paymentMethodValue_model_1 = require("./paymentMethodValue.model");
function findOne(filter, projection, options) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return paymentMethodValue_model_1.PaymentMethodValue.findOne(filter, projection, options).exec();
    });
}
exports.findOne = findOne;
function find(filter, projection, options) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return paymentMethodValue_model_1.PaymentMethodValue.find(filter, projection, options).exec();
    });
}
exports.find = find;
function updateOne(filter, update, options) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return paymentMethodValue_model_1.PaymentMethodValue.updateOne(filter, update, options).exec();
    });
}
exports.updateOne = updateOne;
function create(paymentMethodValue) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return paymentMethodValue_model_1.PaymentMethodValue.create(paymentMethodValue);
    });
}
exports.create = create;
function pagination(page, perPage, filter, projection, options) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return (0, utils_1.paginateModel)(page, perPage, paymentMethodValue_model_1.PaymentMethodValue, filter, projection, options);
    });
}
exports.pagination = pagination;
function insertMany(body) {
    return paymentMethodValue_model_1.PaymentMethodValue.insertMany(body);
}
exports.insertMany = insertMany;
function updateMany(filter, update, options) {
    return paymentMethodValue_model_1.PaymentMethodValue.updateMany(filter, update, options).exec();
}
exports.updateMany = updateMany;
function updateManyValuesUser(body) {
    var _a;
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const values = (_a = body === null || body === void 0 ? void 0 : body.items) === null || _a === void 0 ? void 0 : _a.map((el) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            const updateValues = paymentMethodValue_model_1.PaymentMethodValue.updateOne({ _id: el._id }, { value: el.value });
            return updateValues;
        }));
        const updates = yield Promise.all(values);
        return true;
    });
}
exports.updateManyValuesUser = updateManyValuesUser;
//# sourceMappingURL=paymentMethodValue.service.js.map