"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userMutations = exports.userQueries = exports.pagination = exports.updateOne = exports.createOne = exports.getOne = exports.getAll = void 0;
const tslib_1 = require("tslib");
const user_model_1 = require("./user.model");
const userService = tslib_1.__importStar(require("./user.service"));
const userQueries = {
    user: user_model_1.UserTC.mongooseResolvers.findOne(),
    users: user_model_1.UserTC.mongooseResolvers.findMany(),
    userPagination: user_model_1.UserTC.mongooseResolvers.pagination(),
    totalUsers: user_model_1.UserTC.mongooseResolvers.count(),
};
exports.userQueries = userQueries;
const userMutations = {
    createUser: user_model_1.UserTC.mongooseResolvers.createOne(),
    updateUser: user_model_1.UserTC.mongooseResolvers.updateOne(),
};
exports.userMutations = userMutations;
// REST Controller
function getAll(req, res, next) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        try {
            const users = yield userService.find({});
            return res.status(200).json({ success: true, users });
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
            const user = yield userService.findOne({
                _id: req.params._id,
            });
            return res.status(200).json({ success: true, user });
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
            const user = yield userService.create(req.body);
            return res.status(200).json({ success: true, user });
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
            const user = yield userService.updateOne({ _id: req.params._id }, req.body);
            return res.status(200).json({ success: true, user });
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
            const data = yield userService.pagination(Number(req.params.page), Number(req.params.perPage));
            return res.status(200).json({ success: true, pagination: data });
        }
        catch (err) {
            res.status(500).json({ err: 'Internal server error', success: false });
        }
    });
}
exports.pagination = pagination;
//# sourceMappingURL=user.controller.js.map