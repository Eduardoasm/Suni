"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loanRequestMutations = exports.loanRequestQueries = exports.pagination = exports.updateOne = exports.createOne = exports.getOne = exports.getAll = exports.cancelLoanRequest = exports.getCostsOfLoanRequest = exports.createLoanRequest = void 0;
const tslib_1 = require("tslib");
const graphql_compose_1 = require("graphql-compose");
const loanRequest_dto_1 = require("./loanRequest.dto");
const loanRequest_model_1 = require("./loanRequest.model");
const loanRequestService = tslib_1.__importStar(require("./loanRequest.service"));
const pagination_1 = require("../../utils/pagination");
const userInfo_1 = require("../../utils/walletService/userInfo");
const request_1 = require("../../utils/validations/request");
const settingsService = tslib_1.__importStar(require("../settings/settings/settings.service"));
const LoanRequestPaginationType = (0, pagination_1.buildPaginationType)('LoanRequest');
const getMarketLoanRequests = graphql_compose_1.schemaComposer.createResolver({
    name: 'getAllLoanRequests',
    kind: 'query',
    description: 'get all loan requests',
    type: LoanRequestPaginationType,
    args: {
        data: loanRequest_dto_1.GetMarketLoanRequestsInput,
    },
    resolve({ args, context }) {
        var _a;
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const token = (_a = context.req.headers) === null || _a === void 0 ? void 0 : _a.authorization;
            const loanRequested = yield loanRequestService.getMarketLoanRequests(args === null || args === void 0 ? void 0 : args.data, token);
            return loanRequested;
        });
    },
});
const createLoanOffer = graphql_compose_1.schemaComposer.createResolver({
    name: 'createLoanOffer',
    description: 'create offer for a request',
    kind: 'mutation',
    type: loanRequest_dto_1.getLoanOfferRequestType,
    args: {
        data: loanRequest_dto_1.CreateLoanOfferInput,
    },
    resolve({ args, context }) {
        var _a;
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const token = (_a = context.req.headers) === null || _a === void 0 ? void 0 : _a.authorization;
            const offerRequest = yield loanRequestService.createLoanOffer(args === null || args === void 0 ? void 0 : args.data, token);
            return offerRequest;
        });
    },
});
exports.createLoanRequest = graphql_compose_1.schemaComposer.createResolver({
    name: 'createLoanRequest',
    kind: 'mutation',
    description: 'create loan request',
    type: loanRequest_dto_1.LoanRequestType,
    args: {
        data: loanRequest_dto_1.CreateLoanRequestInput,
    },
    resolve({ args, context }) {
        var _a, _b;
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const token = (_b = (_a = context === null || context === void 0 ? void 0 : context.req) === null || _a === void 0 ? void 0 : _a.headers) === null || _b === void 0 ? void 0 : _b.authorization;
            const loanRequest = yield loanRequestService.create(args === null || args === void 0 ? void 0 : args.data, token);
            return loanRequest;
        });
    },
});
const getAllOffersForRequest = graphql_compose_1.schemaComposer.createResolver({
    name: 'getAllOffersForRequest',
    kind: 'query',
    description: 'get all offers for requests',
    type: loanRequest_dto_1.getLoanOffersForRequestType,
    args: {
        data: loanRequest_dto_1.getLoanRequestInput,
    },
    resolve({ args, context }) {
        var _a;
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const token = (_a = context.req.headers) === null || _a === void 0 ? void 0 : _a.authorization;
            const loanRequested = yield loanRequestService.getLoanOffersForRequest(args === null || args === void 0 ? void 0 : args.data, token);
            return loanRequested;
        });
    },
});
const getOneOfferForRequest = graphql_compose_1.schemaComposer.createResolver({
    name: 'getAllOffersForRequest',
    kind: 'query',
    description: 'get one offer for request',
    type: loanRequest_dto_1.getLoanOfferRequestType,
    args: {
        data: loanRequest_dto_1.getOneLoanOfferRequestInput,
    },
    resolve({ args, context }) {
        var _a;
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const token = (_a = context.req.headers) === null || _a === void 0 ? void 0 : _a.authorization;
            const loanOffer = yield loanRequestService.getOneLoanOfferForRequest(args === null || args === void 0 ? void 0 : args.data, token);
            return loanOffer;
        });
    },
});
const getMyLoanRequests = graphql_compose_1.schemaComposer.createResolver({
    name: 'getMyLoanRequests',
    kind: 'query',
    description: 'get one offer for request',
    type: LoanRequestPaginationType,
    args: {
        data: loanRequest_dto_1.GetMyLoanRequestsInput,
    },
    resolve({ args, context }) {
        var _a;
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const token = (_a = context.req.headers) === null || _a === void 0 ? void 0 : _a.authorization;
            const loanRequests = yield loanRequestService.getMyLoanRequests(args === null || args === void 0 ? void 0 : args.data, token);
            return loanRequests;
        });
    },
});
const getUserRequestAmounts = graphql_compose_1.schemaComposer.createResolver({
    name: 'getUserRequestAmounts',
    kind: 'query',
    description: 'get all possible amounts a user can request',
    type: loanRequest_dto_1.getUserRequestAmountsType,
    args: {
        data: loanRequest_dto_1.GetUserRequestAmountInput,
    },
    resolve({ args, context }) {
        var _a, _b;
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const token = (_b = (_a = context === null || context === void 0 ? void 0 : context.req) === null || _a === void 0 ? void 0 : _a.headers) === null || _b === void 0 ? void 0 : _b.authorization;
            return loanRequestService.getUserRequestAmounts(token, args === null || args === void 0 ? void 0 : args.data);
        });
    },
});
const validateForLoanRequest = graphql_compose_1.schemaComposer.createResolver({
    name: 'validateForLoanRequest',
    kind: 'query',
    description: 'validate if user is allowed to make loan request',
    type: loanRequest_dto_1.validateForLoanRequestType,
    args: {
        data: loanRequest_dto_1.ValidateForLoanRequestInput,
    },
    resolve({ args, context }) {
        var _a, _b;
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const token = (_b = (_a = context === null || context === void 0 ? void 0 : context.req) === null || _a === void 0 ? void 0 : _a.headers) === null || _b === void 0 ? void 0 : _b.authorization;
            const { data: user } = yield (0, userInfo_1.getUserInfo)(token);
            const settings = yield settingsService.findOne({ active: true });
            const { userLoanRequest, serviceFee } = yield (0, request_1.validateRequestFee)(args === null || args === void 0 ? void 0 : args.data.currency, settings, args === null || args === void 0 ? void 0 : args.data.amount, user);
            return loanRequestService.validateForLoanRequest(token, user, serviceFee, userLoanRequest, settings, args === null || args === void 0 ? void 0 : args.data);
        });
    },
});
exports.getCostsOfLoanRequest = graphql_compose_1.schemaComposer.createResolver({
    name: 'createLoanRequest',
    kind: 'mutation',
    description: 'create loan request',
    type: loanRequest_dto_1.GetCostsOfRequestType,
    args: {
        data: loanRequest_dto_1.GetCostsOfRequestInput,
    },
    resolve({ args, context }) {
        var _a, _b;
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const token = (_b = (_a = context === null || context === void 0 ? void 0 : context.req) === null || _a === void 0 ? void 0 : _a.headers) === null || _b === void 0 ? void 0 : _b.authorization;
            const loanRequest = yield loanRequestService.getCostsOfRequest(args === null || args === void 0 ? void 0 : args.data, token);
            return loanRequest;
        });
    },
});
exports.cancelLoanRequest = graphql_compose_1.schemaComposer.createResolver({
    name: 'cancelLoanRequest',
    kind: 'mutation',
    description: 'cancel loan request',
    type: loanRequest_dto_1.LoanRequestType,
    args: {
        data: loanRequest_dto_1.CancelLoanRequestInput,
    },
    resolve({ args, context }) {
        var _a, _b;
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const token = (_b = (_a = context === null || context === void 0 ? void 0 : context.req) === null || _a === void 0 ? void 0 : _a.headers) === null || _b === void 0 ? void 0 : _b.authorization;
            const loanRequest = yield loanRequestService.cancelRequest(args === null || args === void 0 ? void 0 : args.data, token);
            return loanRequest;
        });
    },
});
const loanRequestQueries = {
    loanRequest: loanRequest_model_1.LoanRequestTC.mongooseResolvers.findOne(),
    loanRequests: loanRequest_model_1.LoanRequestTC.mongooseResolvers.findMany({
        limit: { defaultValue: 1000000 },
    }),
    loanRequestPagination: loanRequest_model_1.LoanRequestTC.mongooseResolvers.pagination(),
    getMarketLoanRequests,
    getAllOffersForRequest,
    getOneOfferForRequest,
    getMyLoanRequests,
    getUserRequestAmounts,
    getCostsOfLoanRequest: exports.getCostsOfLoanRequest,
    validateForLoanRequest,
};
exports.loanRequestQueries = loanRequestQueries;
const loanRequestMutations = {
    updateLoanRequest: loanRequest_model_1.LoanRequestTC.mongooseResolvers.updateOne(),
    updateManyLoan: loanRequest_model_1.LoanRequestTC.mongooseResolvers.updateMany(),
    createLoanRequest: exports.createLoanRequest,
    createLoanOffer,
    cancelLoanRequest: exports.cancelLoanRequest,
};
exports.loanRequestMutations = loanRequestMutations;
// REST Controller
function getAll(req, res, next) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        try {
            const loanRequest = yield loanRequestService.find({});
            return res.status(200).json({ success: true, loanRequest });
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
            const loanRequest = yield loanRequestService.findOne({
                _id: req.params._id,
            });
            return res.status(200).json({ success: true, loanRequest });
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
            const { token } = req.cookies;
            const loanRequest = yield loanRequestService.create(req.body, token);
            return res.status(200).json({ success: true, loanRequest });
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
            const loanRequest = yield loanRequestService.updateOne({ _id: req.params._id }, req.body);
            return res.status(200).json({ success: true, loanRequest });
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
            const data = yield loanRequestService.pagination(Number(req.params.page), Number(req.params.perPage));
            return res.status(200).json({ success: true, pagination: data });
        }
        catch (err) {
            res.status(500).json({ err: 'Internal server error', success: false });
        }
    });
}
exports.pagination = pagination;
//# sourceMappingURL=loanRequest.controller.js.map