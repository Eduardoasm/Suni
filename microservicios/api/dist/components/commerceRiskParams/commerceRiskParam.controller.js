"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commerceRiskParamMutations = exports.commerceRiskParamQueries = exports.pagination = exports.updateOne = exports.createOne = exports.getOne = exports.getAll = void 0;
const tslib_1 = require("tslib");
const graphql_compose_1 = require("graphql-compose");
const commerceRiskParam_model_1 = require("./commerceRiskParam.model");
const commerceRiskParamService = tslib_1.__importStar(require("./commerceRiskParam.service"));
const commerceRiskParam_dto_1 = require("./commerceRiskParam.dto");
const utils_1 = require("../../utils");
const CommerceRiskParamsPaginationType = (0, utils_1.buildPaginationType)('CommerceRiskParam');
const getCommerceRiskParamsWithCreditScore = graphql_compose_1.schemaComposer.createResolver({
    name: 'get commerce risk params with user credit score',
    description: 'get all commerce risk params that match with user credit score',
    kind: 'query',
    type: CommerceRiskParamsPaginationType,
    args: {
        data: commerceRiskParam_dto_1.GetCommerceRiskParamsWithCreditScoreInput,
    },
    resolve({ args, context }) {
        var _a;
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const token = yield ((_a = context.req.headers) === null || _a === void 0 ? void 0 : _a.authorization);
            const commerceRiskParams = yield commerceRiskParamService.getCommerceRiskParamsWithCreditScore(args === null || args === void 0 ? void 0 : args.data, token);
            return commerceRiskParams;
        });
    },
});
const commerceRiskParamQueries = {
    commerceRiskParam: commerceRiskParam_model_1.CommerceRiskParamTC.mongooseResolvers.findOne(),
    commerceRiskParams: commerceRiskParam_model_1.CommerceRiskParamTC.mongooseResolvers.findMany({
        limit: { defaultValue: 1000000 },
    }),
    commerceRiskParamPagination: commerceRiskParam_model_1.CommerceRiskParamTC.mongooseResolvers.pagination(),
    getCommerceRiskParamsWithCreditScore,
};
exports.commerceRiskParamQueries = commerceRiskParamQueries;
const commerceRiskParamMutations = {
    createCommerceRiskParam: commerceRiskParam_model_1.CommerceRiskParamTC.mongooseResolvers.createOne(),
    updateCommerceRiskParam: commerceRiskParam_model_1.CommerceRiskParamTC.mongooseResolvers.updateOne(),
};
exports.commerceRiskParamMutations = commerceRiskParamMutations;
// REST Controller
function getAll(req, res, next) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        try {
            const commerceRiskParam = yield commerceRiskParamService.find({});
            return res.status(200).json({ success: true, commerceRiskParam });
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
            const commerceRiskParam = yield commerceRiskParamService.findOne({
                _id: req.params._id,
            });
            return res.status(200).json({ success: true, commerceRiskParam });
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
            const commerceRiskParam = yield commerceRiskParamService.create(req.body);
            return res.status(200).json({ success: true, commerceRiskParam });
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
            const commerceRiskParam = yield commerceRiskParamService.updateOne({ _id: req.params._id }, req.body);
            return res.status(200).json({ success: true, commerceRiskParam });
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
            const data = yield commerceRiskParamService.pagination(Number(req.params.page), Number(req.params.perPage));
            return res.status(200).json({ success: true, pagination: data });
        }
        catch (err) {
            res.status(500).json({ err: 'Internal server error', success: false });
        }
    });
}
exports.pagination = pagination;
//# sourceMappingURL=commerceRiskParam.controller.js.map