"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.messageTemplateMutations = exports.messageTemplateQueries = exports.customCreateMessageTemplate = exports.pagination = exports.updateOne = exports.createOne = exports.getOne = exports.getAll = void 0;
const tslib_1 = require("tslib");
const messageTemplate_model_1 = require("./messageTemplate.model");
const messageTemplateService = tslib_1.__importStar(require("./messageTemplate.service"));
const messageTemplateQueries = {
    messageTemplate: messageTemplate_model_1.MessageTemplateTC.mongooseResolvers.findOne(),
    messageTemplates: messageTemplate_model_1.MessageTemplateTC.mongooseResolvers.findMany({
        limit: { defaultValue: 1000000 },
    }),
    messageTemplatePagination: messageTemplate_model_1.MessageTemplateTC.mongooseResolvers.pagination(),
};
exports.messageTemplateQueries = messageTemplateQueries;
const messageTemplateMutations = {
    createMessageTemplate: messageTemplate_model_1.MessageTemplateTC.mongooseResolvers.createOne(),
    updateMessageTemplate: messageTemplate_model_1.MessageTemplateTC.mongooseResolvers.updateOne(),
};
exports.messageTemplateMutations = messageTemplateMutations;
// REST Controller
function getAll(req, res, next) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        try {
            const messageTemplates = yield messageTemplateService.find({});
            return res.status(200).json({ success: true, messageTemplates });
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
            const messageTemplate = yield messageTemplateService.findOne({
                _id: req.params._id,
            });
            return res.status(200).json({ success: true, messageTemplate });
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
            const messageTemplate = yield messageTemplateService.create(req.body);
            return res.status(200).json({ success: true, messageTemplate });
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
            const messageTemplate = yield messageTemplateService.updateOne({ _id: req.params._id }, req.body);
            return res.status(200).json({ success: true, messageTemplate });
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
            const data = yield messageTemplateService.pagination(Number(req.params.page), Number(req.params.perPage));
            return res.status(200).json({ success: true, pagination: data });
        }
        catch (err) {
            res.status(500).json({ err: 'Internal server error', success: false });
        }
    });
}
exports.pagination = pagination;
function customCreateMessageTemplate(req, res, next) {
    var _a;
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        try {
            const messageTemplate = yield messageTemplateService.customCreateMessageTemplate((_a = req.body) === null || _a === void 0 ? void 0 : _a.messages);
            return res.status(200).json({ success: true, messageTemplate });
        }
        catch (error) {
            return res
                .status(500)
                .json({ success: false, msg: 'Internal server error' });
        }
    });
}
exports.customCreateMessageTemplate = customCreateMessageTemplate;
//# sourceMappingURL=messageTemplate.controller.js.map