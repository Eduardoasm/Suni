"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pagination = exports.getActiveSetting = exports.updateSettings = exports.create = exports.updateOne = exports.find = exports.findOne = void 0;
const tslib_1 = require("tslib");
const utils_1 = require("../../utils");
const settings_model_1 = require("./settings.model");
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
        const settingActive = yield settings_model_1.Settings.findOne({ active: true });
        settingActive.active = false;
        yield settingActive.save();
        return settings_model_1.Settings.create(settings);
    });
}
exports.create = create;
function updateSettings(update) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const setting = yield settings_model_1.Settings.findOne({ active: true });
        if (setting === null || setting === void 0 ? void 0 : setting._id) {
            const updatedSetting = yield settings_model_1.Settings.updateOne({ _id: setting === null || setting === void 0 ? void 0 : setting._id }, Object.assign({}, update));
            return updatedSetting;
        }
        const newSetting = yield settings_model_1.Settings.create(update);
        return newSetting;
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
function pagination(page, perPage, filter, projection, options) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return (0, utils_1.paginateModel)(page, perPage, settings_model_1.Settings, filter, projection, options);
    });
}
exports.pagination = pagination;
//# sourceMappingURL=settings.service.js.map