"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.settingsMutations = exports.settingsQueries = exports.pagination = exports.updateOne = exports.getActiveSetting = exports.updateSettings = exports.createOne = exports.getOne = exports.getAll = void 0;
const tslib_1 = require("tslib");
const http_errors_1 = tslib_1.__importDefault(require("http-errors"));
const settings_model_1 = require("./settings.model");
const settingsService = tslib_1.__importStar(require("./settings.service"));
const settingsQueries = {
    setting: settings_model_1.SettingsTC.mongooseResolvers.findOne(),
    settings: settings_model_1.SettingsTC.mongooseResolvers.findMany(),
};
exports.settingsQueries = settingsQueries;
const settingsMutations = {
    updateSettings: settings_model_1.SettingsTC.mongooseResolvers.updateOne(),
    createSettings: settings_model_1.SettingsTC.mongooseResolvers.createOne(),
};
exports.settingsMutations = settingsMutations;
// REST Controller
function getAll(req, res, next) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        try {
            const settings = yield settingsService.find({});
            return res.status(200).json({ success: true, settings });
        }
        catch (error) {
            next((0, http_errors_1.default)(500, error.message, { err: error.message }));
        }
    });
}
exports.getAll = getAll;
function getOne(req, res, next) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        try {
            const setting = yield settingsService.findOne({ _id: req.params._id });
            return res.status(200).json({ success: true, setting });
        }
        catch (error) {
            next((0, http_errors_1.default)(500, error.message, { err: error.message }));
        }
    });
}
exports.getOne = getOne;
function createOne(req, res, next) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        try {
            const setting = yield settingsService.create(req.body);
            return res.status(200).json({ success: true, setting });
        }
        catch (error) {
            next((0, http_errors_1.default)(500, error.message, { err: error.message }));
        }
    });
}
exports.createOne = createOne;
function updateSettings(req, res, next) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        try {
            const settings = yield settingsService.updateSettings(req === null || req === void 0 ? void 0 : req.body);
            return res.status(200).json({ success: true, settings });
        }
        catch (error) {
            next((0, http_errors_1.default)(500, error.message, { err: error.message }));
        }
    });
}
exports.updateSettings = updateSettings;
function getActiveSetting(req, res, next) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        try {
            const setting = yield settingsService.getActiveSetting();
            return res.status(200).json({ success: true, setting });
        }
        catch (error) {
            next((0, http_errors_1.default)(500, error.message, { err: error.message }));
        }
    });
}
exports.getActiveSetting = getActiveSetting;
function updateOne(req, res, next) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        try {
            const setting = yield settingsService.updateOne({ _id: req.params._id }, req.body);
            return res.status(200).json({ success: true, setting });
        }
        catch (error) {
            next((0, http_errors_1.default)(500, error.message, { err: error.message }));
        }
    });
}
exports.updateOne = updateOne;
function pagination(req, res, next) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        try {
            const data = yield settingsService.pagination(Number(req.params.page), Number(req.params.perPage));
            return res.status(200).json({ success: true, pagination: data });
        }
        catch (error) {
            next((0, http_errors_1.default)(500, error.message, { err: error.message }));
        }
    });
}
exports.pagination = pagination;
//# sourceMappingURL=settings.controller.js.map