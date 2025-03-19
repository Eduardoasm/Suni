"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPaymentMethodCategory = exports.pagination = exports.deleteOne = exports.updateMany = exports.create = exports.updateOne = exports.findPaymentMethodWithCurrency = exports.find = exports.findOne = void 0;
const tslib_1 = require("tslib");
const utils_1 = require("../../utils");
const paymentMethodCategory_model_1 = require("./paymentMethodCategory.model");
const paymentMethodInputService = tslib_1.__importStar(require("../paymentMethodInput/paymentMethodInput/paymentMethodInput.service"));
const paymentMethodService = tslib_1.__importStar(require("../paymentMethod/paymentMethod.service"));
const userWau_1 = require("../../utils/walletService/userWau");
function findOne(filter, projection, options) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return paymentMethodCategory_model_1.PaymentMethodCategory.findOne(filter, projection, options).populate({
            path: 'paymentMethodInputs',
            model: 'PaymentMethodInput',
            populate: {
                path: 'options',
                model: 'Options',
            },
        });
    });
}
exports.findOne = findOne;
function find(filter, projection, options) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return paymentMethodCategory_model_1.PaymentMethodCategory.find(filter, projection, options).exec();
    });
}
exports.find = find;
function findPaymentMethodWithCurrency(filter, projection, options) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return paymentMethodCategory_model_1.PaymentMethodCategory.find(filter, projection, options)
            .populate({
            path: 'currency',
            model: 'Currency',
        })
            .exec();
    });
}
exports.findPaymentMethodWithCurrency = findPaymentMethodWithCurrency;
function updateOne(paymentMethodCategory) {
    var _a, _b;
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const paymentMethodInputs = [];
        for (const input of paymentMethodCategory.paymentMethodInputs) {
            const [inputExists] = yield Promise.allSettled([
                paymentMethodInputService.findOne({
                    _id: input === null || input === void 0 ? void 0 : input._id,
                }),
            ]);
            if ((inputExists === null || inputExists === void 0 ? void 0 : inputExists.status) === 'fulfilled') {
                paymentMethodInputService.updateOne({ _id: String(input === null || input === void 0 ? void 0 : input._id) }, {
                    name: input === null || input === void 0 ? void 0 : input.name,
                    placeholder: input === null || input === void 0 ? void 0 : input.placeholder,
                    options: (_a = input === null || input === void 0 ? void 0 : input.options) !== null && _a !== void 0 ? _a : [],
                    requested: input === null || input === void 0 ? void 0 : input.requested,
                    type: input === null || input === void 0 ? void 0 : input.type,
                });
                paymentMethodInputs === null || paymentMethodInputs === void 0 ? void 0 : paymentMethodInputs.push(input === null || input === void 0 ? void 0 : input._id);
            }
            else {
                const newInputData = {
                    name: input === null || input === void 0 ? void 0 : input.name,
                    placeholder: input === null || input === void 0 ? void 0 : input.placeholder,
                    options: (_b = input === null || input === void 0 ? void 0 : input.options) !== null && _b !== void 0 ? _b : [],
                    requested: input === null || input === void 0 ? void 0 : input.requested,
                    type: input === null || input === void 0 ? void 0 : input.type,
                };
                const newInput = yield paymentMethodInputService.create(newInputData);
                paymentMethodInputs.push(newInput === null || newInput === void 0 ? void 0 : newInput._id);
            }
        }
        const updatedMethod = {
            currency: paymentMethodCategory === null || paymentMethodCategory === void 0 ? void 0 : paymentMethodCategory.currency,
            name: paymentMethodCategory === null || paymentMethodCategory === void 0 ? void 0 : paymentMethodCategory.name,
            selected: paymentMethodCategory === null || paymentMethodCategory === void 0 ? void 0 : paymentMethodCategory.selected,
            paymentMethodInputs,
        };
        return paymentMethodCategory_model_1.PaymentMethodCategory.updateOne({ _id: paymentMethodCategory === null || paymentMethodCategory === void 0 ? void 0 : paymentMethodCategory._id }, Object.assign({}, updatedMethod)).exec();
    });
}
exports.updateOne = updateOne;
function create(paymentMethodCategory) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const paymentMethodInputs = [];
        for (const input of paymentMethodCategory.paymentMethodInputs) {
            const newInput = yield paymentMethodInputService.create(input);
            paymentMethodInputs.push(newInput === null || newInput === void 0 ? void 0 : newInput._id);
        }
        return paymentMethodCategory_model_1.PaymentMethodCategory.create(Object.assign(Object.assign({}, paymentMethodCategory), { paymentMethodInputs }));
    });
}
exports.create = create;
function updateMany(paymentMethodCategories) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const methods = [];
        for (const paymentMethod of paymentMethodCategories) {
            const updatedMethod = yield paymentMethodCategory_model_1.PaymentMethodCategory.findByIdAndUpdate(paymentMethod === null || paymentMethod === void 0 ? void 0 : paymentMethod._id, paymentMethod);
            updatedMethod.active = paymentMethod === null || paymentMethod === void 0 ? void 0 : paymentMethod.active;
            methods.push(updatedMethod);
        }
        return methods;
    });
}
exports.updateMany = updateMany;
function deleteOne(paymentMethodCategoryId) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        yield paymentMethodService.updateMany({
            type: paymentMethodCategoryId,
        }, { active: false });
        return paymentMethodCategory_model_1.PaymentMethodCategory.updateOne({ _id: paymentMethodCategoryId }, { active: false });
    });
}
exports.deleteOne = deleteOne;
function pagination(page, perPage, filter, projection, options) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return (0, utils_1.paginateModel)(page, perPage, paymentMethodCategory_model_1.PaymentMethodCategory, filter, projection, options);
    });
}
exports.pagination = pagination;
function getPaymentMethodCategory(body, token) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        yield (0, userWau_1.getUser)(token);
        const options = {
            sort: {
                name: 1,
            },
        };
        const filters = {
            active: true,
        };
        if (body === null || body === void 0 ? void 0 : body.name) {
            filters.name = body.name;
        }
        if (body === null || body === void 0 ? void 0 : body.currency) {
            filters.currency = body.currency;
        }
        const paymentMethodCategory = yield paymentMethodCategory_model_1.PaymentMethodCategory.find(filters, null, options);
        return paymentMethodCategory;
    });
}
exports.getPaymentMethodCategory = getPaymentMethodCategory;
//# sourceMappingURL=paymentMethodCategory.service.js.map