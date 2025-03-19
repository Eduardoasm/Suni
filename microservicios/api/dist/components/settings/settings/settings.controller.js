"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.settingsMutations = exports.settingsQueries = exports.pagination = exports.updateOne = exports.createOne = exports.getOne = exports.getAll = exports.updateSettingsService = exports.updateInternalCreditScoreValue = exports.updateSettingsCreditScoreParams = exports.createSettings = void 0;
const tslib_1 = require("tslib");
const graphql_compose_1 = require("graphql-compose");
const settings_dto_1 = require("./settings.dto");
const settings_model_1 = require("./settings.model");
const settingsService = tslib_1.__importStar(require("./settings.service"));
exports.createSettings = graphql_compose_1.schemaComposer.createResolver({
    name: 'createSettings',
    kind: 'mutation',
    type: settings_dto_1.SettingsType,
    args: {
        data: settings_dto_1.CreateSettingsInput,
    },
    resolve({ args }) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const settings = yield settingsService.create(args.data);
            return settings;
        });
    },
});
exports.updateSettingsCreditScoreParams = graphql_compose_1.schemaComposer.createResolver({
    name: 'updateSettingsCreditScoreParams',
    kind: 'mutation',
    type: settings_dto_1.SettingsType,
    args: {
        data: settings_dto_1.updateSettingsCreditScoreParamsInput,
    },
    resolve({ args }) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const settings = yield settingsService.updateSettingsCreditScoreParams(args.data);
            return settings;
        });
    },
});
exports.updateInternalCreditScoreValue = graphql_compose_1.schemaComposer.createResolver({
    name: 'updateInternalCreditScoreValue',
    kind: 'mutation',
    type: settings_dto_1.SettingsType,
    args: {
        data: settings_dto_1.updateInternalCreditScoreValueInput,
    },
    resolve({ args }) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const settings = yield settingsService.updateInternalCreditScoreValue(args.data);
            return settings;
        });
    },
});
exports.updateSettingsService = graphql_compose_1.schemaComposer.createResolver({
    name: 'updateSettings',
    kind: 'mutation',
    type: settings_dto_1.SettingsType,
    args: {
        data: settings_dto_1.updateSettingsInput,
    },
    resolve({ args, context }) {
        var _a, _b, _c;
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const token = (_b = (_a = context.req.cookies) === null || _a === void 0 ? void 0 : _a.token) !== null && _b !== void 0 ? _b : (_c = context.req.headers) === null || _c === void 0 ? void 0 : _c['x-token'];
            const settings = yield settingsService.updateSettings(args.data, token);
            return settings;
        });
    },
});
const settingsQueries = {
    setting: settings_model_1.SettingsTC.mongooseResolvers.findOne(),
    settings: settings_model_1.SettingsTC.mongooseResolvers.findMany(),
};
exports.settingsQueries = settingsQueries;
const settingsMutations = {
    updateSettings: settings_model_1.SettingsTC.mongooseResolvers.updateOne(),
    createSettings: exports.createSettings,
    updateSettingsCreditScoreParams: exports.updateSettingsCreditScoreParams,
    updateInternalCreditScoreValue: exports.updateInternalCreditScoreValue,
    updateSettingsService: exports.updateSettingsService,
};
exports.settingsMutations = settingsMutations;
// REST Controller
function getAll(req, res, next) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        try {
            const currencies = yield settingsService.find({});
            return res.status(200).json({ success: true, currencies });
        }
        catch (err) {
            res.status(500).json({ err: 'Internal server error', success: false });
        }
    });
}
exports.getAll = getAll;
function getOne(req, res, next) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        try {
            const currency = yield settingsService.findOne({ _id: req.params._id });
            return res.status(200).json({ success: true, currency });
        }
        catch (err) {
            res.status(500).json({ err: 'Internal server error', success: false });
        }
    });
}
exports.getOne = getOne;
function createOne(req, res, next) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        try {
            const currency = yield settingsService.create(req.body);
            return res.status(200).json({ success: true, currency });
        }
        catch (err) {
            res.status(500).json({ err: 'Internal server error', success: false });
        }
    });
}
exports.createOne = createOne;
function updateOne(req, res, next) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        try {
            const currency = yield settingsService.updateOne({ _id: req.params._id }, req.body);
            return res.status(200).json({ success: true, currency });
        }
        catch (err) {
            res.status(500).json({ err: 'Internal server error', success: false });
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
        catch (err) {
            res.status(500).json({ err: 'Internal server error', success: false });
        }
    });
}
exports.pagination = pagination;
//# sourceMappingURL=settings.controller.js.map