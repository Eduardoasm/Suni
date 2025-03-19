"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assetMutations = exports.assetQueries = exports.getAssets = void 0;
const tslib_1 = require("tslib");
const graphql_compose_1 = require("graphql-compose");
const asset_model_1 = require("./asset.model");
const asset_dto_1 = require("./asset.dto");
const assetService = tslib_1.__importStar(require("./asset.service"));
exports.getAssets = graphql_compose_1.schemaComposer.createResolver({
    name: 'getAssets',
    kind: 'query',
    description: 'get active assets ordered by custom index',
    type: asset_dto_1.AssetTypePlural,
    resolve() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return assetService.getAssets();
        });
    },
});
const assetMutations = {
    createAsset: asset_model_1.AssetTC.mongooseResolvers.createOne(),
    updateAsset: asset_model_1.AssetTC.mongooseResolvers.updateOne(),
};
exports.assetMutations = assetMutations;
const assetQueries = {
    asset: asset_model_1.AssetTC.mongooseResolvers.findOne(),
    assets: asset_model_1.AssetTC.mongooseResolvers.findMany(),
    totalAsset: asset_model_1.AssetTC.mongooseResolvers.count(),
    getAssets: exports.getAssets,
};
exports.assetQueries = assetQueries;
//# sourceMappingURL=asset.controller.js.map