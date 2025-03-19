"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePaymentMethod = exports.cancelPaymentMethod = exports.pagination = exports.findPaymentMethod = exports.create = exports.updateMany = exports.updateOne = exports.find = exports.findOne = void 0;
const tslib_1 = require("tslib");
const utils_1 = require("../../utils");
const paymentMethod_model_1 = require("./paymentMethod.model");
const paymentMethodValueService = tslib_1.__importStar(require("../paymentMethodValue/paymentMethodValue.service"));
const paymentMethodCategoryService = tslib_1.__importStar(require("../paymentMethodCategory/paymentMethodCategory.service"));
const userWau_1 = require("../../utils/walletService/userWau");
const transactionService = tslib_1.__importStar(require("../transaction/transaction.service"));
const listingService = tslib_1.__importStar(require("../listing/listing/listing.service"));
function findOne(filter, projection, options) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return paymentMethod_model_1.PaymentMethod.findOne(filter, projection, options).exec();
    });
}
exports.findOne = findOne;
function find(filter, projection, options) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return paymentMethod_model_1.PaymentMethod.find(filter, projection, options).exec();
    });
}
exports.find = find;
function updateOne(filter, update, options) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return paymentMethod_model_1.PaymentMethod.updateOne(filter, update, options).exec();
    });
}
exports.updateOne = updateOne;
function updateMany(filter, update, options) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return paymentMethod_model_1.PaymentMethod.updateMany(filter, update, options);
    });
}
exports.updateMany = updateMany;
function create(body, token) {
    var _a, _b, _c, _d;
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const { data: user } = yield (0, userWau_1.getUser)(token);
        const value = yield paymentMethodValueService.insertMany(body.values);
        const valuesId = value.map((idValue) => idValue._id);
        const paymentMethod = yield paymentMethod_model_1.PaymentMethod.create({
            type: body.type,
            user: {
                id: user === null || user === void 0 ? void 0 : user.id,
                name: (_b = (_a = user === null || user === void 0 ? void 0 : user.metamapStatus) === null || _a === void 0 ? void 0 : _a.dni_firstName) !== null && _b !== void 0 ? _b : user === null || user === void 0 ? void 0 : user.name,
                email: user === null || user === void 0 ? void 0 : user.email,
                lastname: (_d = (_c = user === null || user === void 0 ? void 0 : user.metamapStatus) === null || _c === void 0 ? void 0 : _c.dni_lastName) !== null && _d !== void 0 ? _d : user === null || user === void 0 ? void 0 : user.lastname,
            },
            values: valuesId,
        });
        return paymentMethod;
    });
}
exports.create = create;
function findPaymentMethod(body, token) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const { data: user } = yield (0, userWau_1.getUser)(token);
        const typeUser = yield paymentMethodCategoryService.find({
            currency: body.currency ? body.currency : { $ne: null },
            active: true,
        });
        const paymentMethodUser = yield paymentMethod_model_1.PaymentMethod.find({
            type: typeUser,
            'user.id': user === null || user === void 0 ? void 0 : user.id,
            active: true,
        });
        return paymentMethodUser;
    });
}
exports.findPaymentMethod = findPaymentMethod;
function pagination(page, perPage, filter, projection, options) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return (0, utils_1.paginateModel)(page, perPage, paymentMethod_model_1.PaymentMethod, filter, projection, options);
    });
}
exports.pagination = pagination;
function cancelPaymentMethod(body, token) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const { data: user } = yield (0, userWau_1.getUser)(token);
        // const countryAvailable = await countryService.findOne({
        //   code: user.country,
        //   active: true,
        //   disabled: false,
        // });
        // if (!countryAvailable)
        //   throw new NoSentryError(
        //     'Access denied, the country is disabled to the app'
        //   );
        const paymentMethod = yield paymentMethod_model_1.PaymentMethod.findOne({
            $and: [{ _id: body.paymentMethodId }, { 'user.id': user === null || user === void 0 ? void 0 : user.id }],
        });
        if (!paymentMethod) {
            throw new utils_1.NoSentryError('Error in delete paymentMethod');
        }
        const transaction = yield transactionService.find({
            $and: [
                { paymentMethod: paymentMethod._id },
                { active: true },
                {
                    status: {
                        $in: [
                            'pending',
                            'payment_executed',
                            'payment_received',
                            'default',
                            'appealed',
                        ],
                    },
                },
            ],
        });
        if (transaction.length) {
            throw new utils_1.NoSentryError('Error in delete paymentMethod, please finish the transaction');
        }
        const listing = yield listingService.find({
            $and: [{ paymentMethods: paymentMethod._id }, { status: 'active' }],
        });
        if (listing.length === 1) {
            throw new utils_1.NoSentryError('Error in delete paymentMethod, please delete de listing');
        }
        paymentMethod.active = false;
        yield paymentMethod.save();
        return {
            success: true,
            paymentMethod,
        };
    });
}
exports.cancelPaymentMethod = cancelPaymentMethod;
function updatePaymentMethod(body, token) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const { data: user } = yield (0, userWau_1.getUser)(token);
        // const countryAvailable = await countryService.findOne({
        //   code: user.country,
        //   active: true,
        //   disabled: false,
        // });
        // if (!countryAvailable)
        //   throw new NoSentryError(
        //     'Access denied, the country is disabled to the app'
        //   );
        const paymentMethodUser = yield paymentMethod_model_1.PaymentMethod.findOne({
            $and: [{ _id: body.paymentMethodId }, { 'user.id': user.id }],
        });
        if (!paymentMethodUser) {
            throw new utils_1.NoSentryError('Error in update Payment Method');
        }
        const transaction = yield transactionService.find({
            $and: [
                { paymentMethod: paymentMethodUser._id },
                { active: true },
                {
                    status: {
                        $in: [
                            'pending',
                            'payment_executed',
                            'payment_received',
                            'default',
                            'appealed',
                        ],
                    },
                },
            ],
        });
        if (transaction.length) {
            throw new utils_1.NoSentryError('Error in update paymentMethod, please finish the transaction');
        }
        const type = yield paymentMethodCategoryService.findOne({ _id: body === null || body === void 0 ? void 0 : body.type });
        const value = yield paymentMethodValueService.insertMany(body === null || body === void 0 ? void 0 : body.values);
        const valuesId = value.map((idValue) => idValue._id);
        const paymentUpdate = yield paymentMethod_model_1.PaymentMethod.updateOne({
            _id: paymentMethodUser._id,
            'user.id': user === null || user === void 0 ? void 0 : user.id,
        }, {
            type: type === null || type === void 0 ? void 0 : type._id,
            values: valuesId,
            requiredInfo: body === null || body === void 0 ? void 0 : body.requiredInfo,
        });
        const paymentMethod = yield paymentMethod_model_1.PaymentMethod.findOne({
            _id: body.paymentMethodId,
        });
        return paymentMethod;
    });
}
exports.updatePaymentMethod = updatePaymentMethod;
//# sourceMappingURL=paymentMethod.service.js.map