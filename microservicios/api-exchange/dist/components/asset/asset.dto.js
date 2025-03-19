"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssetTypeNonNull = exports.AssetTypePlural = exports.AssetType = exports.AssetTypeName = void 0;
const asset_model_1 = require("./asset.model");
exports.AssetTypeName = asset_model_1.AssetTC.getTypeName();
exports.AssetType = asset_model_1.AssetTC.getType();
exports.AssetTypePlural = asset_model_1.AssetTC.getTypePlural().getTypeName();
exports.AssetTypeNonNull = asset_model_1.AssetTC.getTypeNonNull();
//# sourceMappingURL=asset.dto.js.map