"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.customCreateMessageTemplate = exports.pagination = exports.create = exports.updateOne = exports.find = exports.findOne = void 0;
const tslib_1 = require("tslib");
const messageTemplate_model_1 = require("./messageTemplate.model");
const utils_1 = require("../../utils");
const message_model_1 = require("../message/message.model");
function findOne(filter, projection, options) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return messageTemplate_model_1.MessageTemplate.findOne(filter, projection, options)
            .populate('messages')
            .exec();
    });
}
exports.findOne = findOne;
function find(filter, projection, options) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return messageTemplate_model_1.MessageTemplate.find(filter, projection, options).exec();
    });
}
exports.find = find;
function updateOne(filter, update, options) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return messageTemplate_model_1.MessageTemplate.updateOne(filter, update, options).exec();
    });
}
exports.updateOne = updateOne;
function create(messageTemplate) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return messageTemplate_model_1.MessageTemplate.create(messageTemplate);
    });
}
exports.create = create;
function pagination(page, perPage, filter, projection, options) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return (0, utils_1.paginateModel)(page, perPage, messageTemplate_model_1.MessageTemplate, filter, projection, options);
    });
}
exports.pagination = pagination;
function customCreateMessageTemplate(body) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const messages = yield message_model_1.Message.insertMany(body);
        const messageTemplate = yield messageTemplate_model_1.MessageTemplate.create({
            messages,
        });
        return messageTemplate;
    });
}
exports.customCreateMessageTemplate = customCreateMessageTemplate;
//# sourceMappingURL=messageTemplate.service.js.map