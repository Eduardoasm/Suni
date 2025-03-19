"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getActiveSetting = exports.updateSettings = exports.pagination = exports.updateInternalCreditScoreValue = exports.updateSettingsCreditScoreParams = exports.create = exports.updateOne = exports.find = exports.findOne = void 0;
const tslib_1 = require("tslib");
const jsonwebtoken_1 = tslib_1.__importDefault(require("jsonwebtoken"));
const utils_1 = require("../../../utils");
const settings_model_1 = require("./settings.model");
const userService = tslib_1.__importStar(require("../../user/user/user.service"));
function findOne(filter, projection, options) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return settings_model_1.Settings.findOne(filter, projection, options).exec();
    });
}
exports.findOne = findOne;
function find(filter, projection, options) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return settings_model_1.Settings.find(filter, projection, options).exec();
    });
}
exports.find = find;
function updateOne(filter, update, options) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return settings_model_1.Settings.updateOne(filter, update, options).exec();
    });
}
exports.updateOne = updateOne;
function create(settings) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return settings_model_1.Settings.create(settings);
    });
}
exports.create = create;
function updateSettingsCreditScoreParams(body) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const setting = settings_model_1.Settings.findOneAndUpdate({
            _id: body._id,
        }, {
            $push: {
                creditScoreParams: body.creditScoreParams,
            },
        }, {
            new: true,
            runValidators: true,
        });
        return setting;
    });
}
exports.updateSettingsCreditScoreParams = updateSettingsCreditScoreParams;
function updateInternalCreditScoreValue(body) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const creditScore = settings_model_1.Settings.findOneAndUpdate({ _id: body._id }, { $set: { 'creditScoreParams.$[crs].value': body.value } }, { arrayFilters: [{ 'crs.name': { $eq: body.name } }] });
        return creditScore;
    });
}
exports.updateInternalCreditScoreValue = updateInternalCreditScoreValue;
function pagination(page, perPage, filter, projection, options) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return (0, utils_1.paginateModel)(page, perPage, settings_model_1.Settings, filter, projection, options);
    });
}
exports.pagination = pagination;
function updateSettings(body, token) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        if (!token) {
            return null;
        }
        const payload = jsonwebtoken_1.default.decode(token);
        const userSuperAdmin = yield userService.findOne({
            _id: payload.id,
            active: true,
        });
        if (!userSuperAdmin.userRole.includes('superadmin')) {
            throw new utils_1.NoSentryError('El usuario no cuenta con los permisos suficientes');
        }
        const interestRate = settings_model_1.Settings.findOneAndUpdate({
            id: body._id,
        }, {
            $set: {
                interestRate: body.interestRate,
                offerExpiration: body.offerExpiration,
                lenderFee: body.contractFees.lenderFee,
                borrowerFee: body.contractFees.borrowerFee,
            },
        });
        return interestRate;
    });
}
exports.updateSettings = updateSettings;
function getActiveSetting() {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const setting = yield settings_model_1.Settings.findOne({ active: true });
        return setting;
    });
}
exports.getActiveSetting = getActiveSetting;
//# sourceMappingURL=settings.service.js.map