"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.messageMutations = exports.messageQueries = exports.pagination = exports.updateOne = exports.createOne = exports.getOne = exports.getAll = void 0;
const tslib_1 = require("tslib");
const message_model_1 = require("./message.model");
const messageService = tslib_1.__importStar(require("./message.service"));
const messageQueries = {
    message: message_model_1.MessageTC.mongooseResolvers.findOne(),
    messages: message_model_1.MessageTC.mongooseResolvers.findMany({
        limit: { defaultValue: 1000000 },
    }),
    messagePagination: message_model_1.MessageTC.mongooseResolvers.pagination(),
};
exports.messageQueries = messageQueries;
const messageMutations = {
    createMessage: message_model_1.MessageTC.mongooseResolvers.createOne(),
    updateMessage: message_model_1.MessageTC.mongooseResolvers.updateOne(),
};
exports.messageMutations = messageMutations;
// REST Controller
function getAll(req, res, next) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        try {
            const messages = yield messageService.find({});
            return res.status(200).json({ success: true, messages });
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
            const message = yield messageService.findOne({
                _id: req.params._id,
            });
            return res.status(200).json({ success: true, message });
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
            const message = yield messageService.create(req.body);
            return res.status(200).json({ success: true, message });
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
            const message = yield messageService.updateOne({ _id: req.params._id }, req.body);
            return res.status(200).json({ success: true, message });
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
            const data = yield messageService.pagination(Number(req.params.page), Number(req.params.perPage));
            return res.status(200).json({ success: true, pagination: data });
        }
        catch (err) {
            res.status(500).json({ err: 'Internal server error', success: false });
        }
    });
}
exports.pagination = pagination;
//# sourceMappingURL=message.controller.js.map