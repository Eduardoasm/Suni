"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pagination = exports.create = exports.updateOne = exports.find = exports.findOne = void 0;
const tslib_1 = require("tslib");
const message_model_1 = require("./message.model");
const utils_1 = require("../../utils");
function findOne(filter, projection, options) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return message_model_1.Message.findOne(filter, projection, options).exec();
    });
}
exports.findOne = findOne;
function find(filter, projection, options) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return message_model_1.Message.find(filter, projection, options).exec();
    });
}
exports.find = find;
function updateOne(filter, update, options) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return message_model_1.Message.updateOne(filter, update, options).exec();
    });
}
exports.updateOne = updateOne;
function create(message) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return message_model_1.Message.create(message);
    });
}
exports.create = create;
function pagination(page, perPage, filter, projection, options) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return (0, utils_1.paginateModel)(page, perPage, message_model_1.Message, filter, projection, options);
    });
}
exports.pagination = pagination;
//# sourceMappingURL=message.service.js.map