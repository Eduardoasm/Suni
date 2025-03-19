"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.manageCryptoAdminApi = exports.findOne = exports.getAll = exports.appealMutations = exports.appealQueries = exports.cancelAppealUser = exports.createAppeal = void 0;
const tslib_1 = require("tslib");
const http_errors_1 = tslib_1.__importDefault(require("http-errors"));
const graphql_compose_1 = require("graphql-compose");
const appeal_dto_1 = require("./appeal.dto");
const appealService = tslib_1.__importStar(require("./appeal.service"));
const appeal_model_1 = require("./appeal.model");
const transaction_1 = require("../../transaction");
exports.createAppeal = graphql_compose_1.schemaComposer.createResolver({
    name: 'createAppeal',
    kind: 'mutation',
    description: 'create appeal',
    type: appeal_dto_1.AppealType,
    args: {
        data: appeal_dto_1.CreateAppealInput,
    },
    resolve({ args, context }) {
        var _a;
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const token = (_a = context.req.headers) === null || _a === void 0 ? void 0 : _a.authorization;
            const appeal = yield appealService.create(args === null || args === void 0 ? void 0 : args.data, token);
            return appeal;
        });
    },
});
exports.cancelAppealUser = graphql_compose_1.schemaComposer.createResolver({
    name: 'CancelAppealUser',
    kind: 'mutation',
    description: 'Cancel Appeal from user',
    type: appeal_dto_1.AppealType,
    args: {
        data: appeal_dto_1.CancelAppealInput,
    },
    resolve({ args, context }) {
        var _a;
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const token = (_a = context.req.headers) === null || _a === void 0 ? void 0 : _a.authorization;
            const appeal = yield appealService.cancelAppeal(args === null || args === void 0 ? void 0 : args.data, token);
            return appeal;
        });
    },
});
const manageCryptoAdmin = graphql_compose_1.schemaComposer.createResolver({
    name: 'releaseCryptoAdmin',
    kind: 'mutation',
    description: 'release transaction crypto amount by admin to buyer',
    type: transaction_1.TransactionType,
    args: {
        data: transaction_1.ManageCryptoAdminInput,
    },
    resolve({ args }) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const transaction = yield appealService.manageCryptoAdmin(args === null || args === void 0 ? void 0 : args.data);
            return transaction;
        });
    },
});
const appealMutations = {
    createAppeal: exports.createAppeal,
    updateAppeal: appeal_model_1.AppealTC.mongooseResolvers.updateOne(),
    cancelAppealUser: exports.cancelAppealUser,
    manageCryptoAdmin,
};
exports.appealMutations = appealMutations;
const appealQueries = {
    appeal: appeal_model_1.AppealTC.mongooseResolvers.findOne(),
    appeals: appeal_model_1.AppealTC.mongooseResolvers.findMany(),
    totalAppeal: appeal_model_1.AppealTC.mongooseResolvers.count(),
};
exports.appealQueries = appealQueries;
function getAll(req, res, next) {
    var _a, _b;
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        try {
            const token = (_a = req === null || req === void 0 ? void 0 : req.headers) === null || _a === void 0 ? void 0 : _a.authorization;
            const appeals = yield appealService.getAllAppealInfo(token, (_b = req === null || req === void 0 ? void 0 : req.body) === null || _b === void 0 ? void 0 : _b.filter);
            return res.status(200).json({ appeals });
        }
        catch (error) {
            next((0, http_errors_1.default)(500, error.message, { err: error.message }));
        }
    });
}
exports.getAll = getAll;
function findOne(req, res, next) {
    var _a, _b;
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        try {
            const token = (_a = req === null || req === void 0 ? void 0 : req.headers) === null || _a === void 0 ? void 0 : _a.authorization;
            const appeal = yield appealService.findAppeal(token, {
                _id: (_b = req === null || req === void 0 ? void 0 : req.params) === null || _b === void 0 ? void 0 : _b._id,
            });
            return res.status(200).json({ appeal });
        }
        catch (error) {
            next((0, http_errors_1.default)(500, error.message, { err: error.message }));
        }
    });
}
exports.findOne = findOne;
function manageCryptoAdminApi(req, res, next) {
    var _a;
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        try {
            const transaction = yield appealService.manageCryptoAdmin((_a = req === null || req === void 0 ? void 0 : req.body) === null || _a === void 0 ? void 0 : _a.data);
            return res.status(200).json({ transaction });
        }
        catch (error) {
            console.log(error, 'ERROR');
            next((0, http_errors_1.default)(500, error.message, { err: error.message }));
        }
    });
}
exports.manageCryptoAdminApi = manageCryptoAdminApi;
//# sourceMappingURL=appeal.controller.js.map