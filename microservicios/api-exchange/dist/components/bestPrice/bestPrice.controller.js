"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bestPriceMutations = exports.bestPriceQueries = exports.getBestPrice = void 0;
const tslib_1 = require("tslib");
const graphql_compose_1 = require("graphql-compose");
const bestPrice_model_1 = require("./bestPrice.model");
const bestPrice_dto_1 = require("./bestPrice.dto");
const bestPriceService = tslib_1.__importStar(require("./bestPrice.service"));
exports.getBestPrice = graphql_compose_1.schemaComposer.createResolver({
    name: 'best listing price',
    kind: 'query',
    description: 'get best purchase and sale listing price',
    type: bestPrice_dto_1.BestPriceType,
    args: {
        data: bestPrice_dto_1.GetBestPriceInput,
    },
    resolve({ args }) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const bestPrice = yield bestPriceService.getBestPrice(args === null || args === void 0 ? void 0 : args.data);
            return bestPrice;
        });
    },
});
const bestPriceMutations = {
    createBestPrice: bestPrice_model_1.BestPriceTC.mongooseResolvers.createOne(),
    updateBestPrice: bestPrice_model_1.BestPriceTC.mongooseResolvers.updateOne(),
};
exports.bestPriceMutations = bestPriceMutations;
const bestPriceQueries = {
    bestPrice: bestPrice_model_1.BestPriceTC.mongooseResolvers.findOne(),
    bestPrices: bestPrice_model_1.BestPriceTC.mongooseResolvers.findMany(),
    totalBestPrice: bestPrice_model_1.BestPriceTC.mongooseResolvers.count(),
    getBestPrice: exports.getBestPrice,
};
exports.bestPriceQueries = bestPriceQueries;
//# sourceMappingURL=bestPrice.controller.js.map