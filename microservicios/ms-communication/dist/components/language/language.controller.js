"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.languageMutations = exports.languageQueries = exports.pagination = exports.updateOne = exports.createOne = exports.getOne = exports.getAll = void 0;
const tslib_1 = require("tslib");
const language_model_1 = require("./language.model");
const languageService = tslib_1.__importStar(require("./language.service"));
const languageQueries = {
    language: language_model_1.LanguageTC.mongooseResolvers.findOne(),
    languages: language_model_1.LanguageTC.mongooseResolvers.findMany({
        limit: { defaultValue: 1000000 },
    }),
    languagePagination: language_model_1.LanguageTC.mongooseResolvers.pagination(),
};
exports.languageQueries = languageQueries;
const languageMutations = {
    createLanguage: language_model_1.LanguageTC.mongooseResolvers.createOne(),
    updateLanguage: language_model_1.LanguageTC.mongooseResolvers.updateOne(),
};
exports.languageMutations = languageMutations;
// REST Controller
function getAll(req, res, next) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        try {
            const languages = yield languageService.find({});
            return res.status(200).json({ success: true, languages });
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
            const language = yield languageService.findOne({
                _id: req.params._id,
            });
            return res.status(200).json({ success: true, language });
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
            const language = yield languageService.create(req.body);
            return res.status(200).json({ success: true, language });
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
            const language = yield languageService.updateOne({ _id: req.params._id }, req.body);
            return res.status(200).json({ success: true, language });
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
            const data = yield languageService.pagination(Number(req.params.page), Number(req.params.perPage));
            return res.status(200).json({ success: true, pagination: data });
        }
        catch (err) {
            res.status(500).json({ err: 'Internal server error', success: false });
        }
    });
}
exports.pagination = pagination;
//# sourceMappingURL=language.controller.js.map