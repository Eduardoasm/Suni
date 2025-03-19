"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.profitMutations = exports.profitQueries = exports.pagination = exports.updateOne = exports.createOne = exports.getOne = exports.getAll = void 0;
const tslib_1 = require("tslib");
const profit_model_1 = require("./profit.model");
const profitService = tslib_1.__importStar(require("./profit.service"));
const profitQueries = {
    profit: profit_model_1.ProfitTC.mongooseResolvers.findOne(),
    profits: profit_model_1.ProfitTC.mongooseResolvers.findMany({
        limit: { defaultValue: 1000000 },
    }),
    profitPagination: profit_model_1.ProfitTC.mongooseResolvers.pagination(),
};
exports.profitQueries = profitQueries;
const profitMutations = {
    updateProfit: profit_model_1.ProfitTC.mongooseResolvers.updateOne(),
    createProfit: profit_model_1.ProfitTC.mongooseResolvers.createOne(),
};
exports.profitMutations = profitMutations;
// REST Controller
function getAll(req, res, next) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        try {
            const profit = yield profitService.find({});
            return res.status(200).json({ success: true, profit });
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
            const profit = yield profitService.findOne({
                _id: req.params._id,
            });
            return res.status(200).json({ success: true, profit });
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
            const profit = yield profitService.create(req.body);
            return res.status(200).json({ success: true, profit });
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
            const profit = yield profitService.updateOne({ _id: req.params._id }, req.body);
            return res.status(200).json({ success: true, profit });
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
            const data = yield profitService.pagination(Number(req.params.page), Number(req.params.perPage));
            return res.status(200).json({ success: true, pagination: data });
        }
        catch (err) {
            res.status(500).json({ err: 'Internal server error', success: false });
        }
    });
}
exports.pagination = pagination;
//# sourceMappingURL=profit.controller.js.map