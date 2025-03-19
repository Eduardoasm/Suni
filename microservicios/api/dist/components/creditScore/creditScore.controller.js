"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.creditScoreMutations = exports.creditScoreQueries = exports.pagination = exports.updateOne = exports.createOne = exports.getOne = exports.getAll = exports.getCreditScoreUser = void 0;
const tslib_1 = require("tslib");
const graphql_compose_1 = require("graphql-compose");
const creditScore_model_1 = require("./creditScore.model");
const creditScoreService = tslib_1.__importStar(require("./creditScore.service"));
const creditScore_dto_1 = require("./creditScore.dto");
exports.getCreditScoreUser = graphql_compose_1.schemaComposer.createResolver({
    name: 'getCreditScoreUser',
    description: 'get credit score credolab or suni for user',
    kind: 'query',
    type: creditScore_dto_1.CreditScoreType,
    args: {
        data: creditScore_dto_1.GetCreditScoreUserInput,
    },
    resolve({ args, context }) {
        var _a;
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const token = (_a = context.req.headers) === null || _a === void 0 ? void 0 : _a.authorization;
            const creditScore = yield creditScoreService.getCreditScoreUser(args === null || args === void 0 ? void 0 : args.data, token);
            return creditScore;
        });
    }
});
// export const uploadCreditScore = schemaComposer.createResolver<
// any,
// {
//   data: TCredolabData,
// }
// >({
//   name: 'uploadCreditScore',
//   description: 'upload the credit score in credolab',
//   kind: 'mutation',
//   type: CredolabDataType,
//   args: {
//     data: CredolabDataInput,
//   },
//   async resolve ({ args, context }) {
//     const token = 
//     context.req.cookies?.token ?? context.req.headers['x-token'];
//     const creditScore = await creditScoreService.credolab(token, args.data)
//     return creditScore
//   }
// })
// export const userCreditScore = schemaComposer.createResolver<
// any
// >({
//   name: 'userCreditScore',
//   kind: 'query',
//   description: 'get creditScore in user',
//   type: CreditScoreType,
//   async resolve({ context }) {
//     const token = 
//     context?.req.cookies?.token ?? context.req.headers['x-token'];
//     const creditScore = await creditScoreService.getCreditScoreCredolab(token)
//     return creditScore;
//   }
// })
const creditScoreQueries = {
    creditScore: creditScore_model_1.CreditScoreTC.mongooseResolvers.findOne(),
    creditScores: creditScore_model_1.CreditScoreTC.mongooseResolvers.findMany({
        limit: { defaultValue: 1000000 },
    }),
    creditScorePagination: creditScore_model_1.CreditScoreTC.mongooseResolvers.pagination(),
    // userCreditScore,
};
exports.creditScoreQueries = creditScoreQueries;
const creditScoreMutations = {
    updatecreditScore: creditScore_model_1.CreditScoreTC.mongooseResolvers.updateOne(),
    createcreditScore: creditScore_model_1.CreditScoreTC.mongooseResolvers.createOne(),
    // uploadCreditScore,
};
exports.creditScoreMutations = creditScoreMutations;
// REST Controller
function getAll(req, res, next) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        try {
            const creditScore = yield creditScoreService.find({});
            return res.status(200).json({ success: true, creditScore });
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
            const creditScore = yield creditScoreService.findOne({
                _id: req.params._id,
            });
            return res.status(200).json({ success: true, creditScore });
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
            const creditScore = yield creditScoreService.create(req.body);
            return res.status(200).json({ success: true, creditScore });
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
            const creditScore = yield creditScoreService.updateOne({ _id: req.params._id }, req.body);
            return res.status(200).json({ success: true, creditScore });
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
            const data = yield creditScoreService.pagination(Number(req.params.page), Number(req.params.perPage));
            return res.status(200).json({ success: true, pagination: data });
        }
        catch (err) {
            res.status(500).json({ err: 'Internal server error', success: false });
        }
    });
}
exports.pagination = pagination;
//# sourceMappingURL=creditScore.controller.js.map