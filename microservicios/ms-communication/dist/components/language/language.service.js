"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pagination = exports.create = exports.updateOne = exports.find = exports.findOne = void 0;
const tslib_1 = require("tslib");
const language_model_1 = require("./language.model");
const utils_1 = require("../../utils");
function findOne(filter, projection, options) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return language_model_1.Language.findOne(filter, projection, options).exec();
    });
}
exports.findOne = findOne;
function find(filter, projection, options) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return language_model_1.Language.find(filter, projection, options).exec();
    });
}
exports.find = find;
function updateOne(filter, update, options) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return language_model_1.Language.updateOne(filter, update, options).exec();
    });
}
exports.updateOne = updateOne;
function create(language) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return language_model_1.Language.create(language);
    });
}
exports.create = create;
function pagination(page, perPage, filter, projection, options) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return (0, utils_1.paginateModel)(page, perPage, language_model_1.Language, filter, projection, options);
    });
}
exports.pagination = pagination;
//# sourceMappingURL=language.service.js.map