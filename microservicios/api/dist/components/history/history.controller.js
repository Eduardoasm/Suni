"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.historyMutations = exports.historyQueries = void 0;
const history_model_1 = require("./history.model");
const historyQueries = {
    history: history_model_1.HistoryTC.mongooseResolvers.findOne(),
    histories: history_model_1.HistoryTC.mongooseResolvers.findMany({
        limit: { defaultValue: 1000000 },
    }),
    historyPagination: history_model_1.HistoryTC.mongooseResolvers.pagination(),
};
exports.historyQueries = historyQueries;
const historyMutations = {
    createHistory: history_model_1.HistoryTC.mongooseResolvers.createOne(),
    updateHistory: history_model_1.HistoryTC.mongooseResolvers.updateOne(),
};
exports.historyMutations = historyMutations;
//# sourceMappingURL=history.controller.js.map