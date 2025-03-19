"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loanOfferMutations = exports.loanOfferQueries = exports.pagination = exports.updateOne = exports.getOne = exports.getAll = exports.getMyLoanOffers = void 0;
const tslib_1 = require("tslib");
const graphql_compose_1 = require("graphql-compose");
const loanOffer_model_1 = require("./loanOffer.model");
const loanOfferService = tslib_1.__importStar(require("./loanOffer.service"));
const loanOffer_dto_1 = require("./loanOffer.dto");
const pagination_1 = require("../../utils/pagination");
const LoanOffersPaginationType = (0, pagination_1.buildPaginationType)('LoanOffer');
const getAllLoansOffered = graphql_compose_1.schemaComposer.createResolver({
    name: 'getAllLoansOffered',
    kind: 'query',
    description: 'get all loans offereds',
    type: loanOffer_dto_1.LoanOfferTypePlural,
    resolve({ context }) {
        var _a;
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const token = (_a = context.req.headers) === null || _a === void 0 ? void 0 : _a.authorization;
            const loansOffered = yield loanOfferService.getAllLoanOffers(token);
            return loansOffered;
        });
    },
});
const cancelLoanOffer = graphql_compose_1.schemaComposer.createResolver({
    name: 'cancelLoanOffer',
    kind: 'mutation',
    description: 'cancel Loan offer',
    type: loanOffer_dto_1.LoanOfferType,
    args: {
        data: loanOffer_dto_1.CancelLoanOfferInput,
    },
    resolve({ args, context }) {
        var _a;
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const token = (_a = context.req.headers) === null || _a === void 0 ? void 0 : _a.authorization;
            const loansOffered = yield loanOfferService.cancelOffer(args === null || args === void 0 ? void 0 : args.data, token);
            return loansOffered;
        });
    },
});
exports.getMyLoanOffers = graphql_compose_1.schemaComposer.createResolver({
    name: 'getMyLoanOffers',
    kind: 'query',
    description: 'get all loan offers of user',
    type: LoanOffersPaginationType,
    args: {
        data: loanOffer_dto_1.GetMyLoanOffersInput,
    },
    resolve({ args, context }) {
        var _a;
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const token = (_a = context.req.headers) === null || _a === void 0 ? void 0 : _a.authorization;
            const loanOffers = yield loanOfferService.getMyLoanOffers(args === null || args === void 0 ? void 0 : args.data, token);
            return loanOffers;
        });
    },
});
const loanOfferQueries = {
    loanOffer: loanOffer_model_1.LoanOfferTC.mongooseResolvers.findOne(),
    loanOffers: loanOffer_model_1.LoanOfferTC.mongooseResolvers.findMany({
        limit: { defaultValue: 1000000 },
    }),
    loanOfferPagination: loanOffer_model_1.LoanOfferTC.mongooseResolvers.pagination(),
    getAllLoansOffered,
    getMyLoanOffers: exports.getMyLoanOffers,
};
exports.loanOfferQueries = loanOfferQueries;
const loanOfferMutations = {
    updateloanOffer: loanOffer_model_1.LoanOfferTC.mongooseResolvers.updateOne(),
    cancelLoanOffer,
};
exports.loanOfferMutations = loanOfferMutations;
// REST Controller
function getAll(req, res, next) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        try {
            const loanOffer = yield loanOfferService.find({});
            return res.status(200).json({ success: true, loanOffer });
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
            const loanOffer = yield loanOfferService.findOne({
                _id: req.params._id,
            });
            return res.status(200).json({ success: true, loanOffer });
        }
        catch (err) {
            res.status(500).json({ err: 'Internal server error', success: false });
        }
    });
}
exports.getOne = getOne;
function updateOne(req, res, next) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        try {
            const loanOffer = yield loanOfferService.updateOne({ _id: req.params._id }, req.body);
            return res.status(200).json({ success: true, loanOffer });
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
            const data = yield loanOfferService.pagination(Number(req.params.page), Number(req.params.perPage));
            return res.status(200).json({ success: true, pagination: data });
        }
        catch (err) {
            res.status(500).json({ err: 'Internal server error', success: false });
        }
    });
}
exports.pagination = pagination;
//# sourceMappingURL=loanOffer.controller.js.map