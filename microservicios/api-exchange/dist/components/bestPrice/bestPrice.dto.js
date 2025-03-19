"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetBestPriceInput = exports.BestPriceTypeNonNull = exports.BestPriceTypePlural = exports.BestPriceType = exports.BestPriceTypeName = void 0;
const bestPrice_model_1 = require("./bestPrice.model");
exports.BestPriceTypeName = bestPrice_model_1.BestPriceTC.getTypeName();
exports.BestPriceType = bestPrice_model_1.BestPriceTC.getType();
exports.BestPriceTypePlural = bestPrice_model_1.BestPriceTC.getTypePlural().getTypeName();
exports.BestPriceTypeNonNull = bestPrice_model_1.BestPriceTC.getTypeNonNull();
exports.GetBestPriceInput = `
  input GetBestPrice {
    currencyId: MongoID!
    assetId: MongoID!
  }
`;
//# sourceMappingURL=bestPrice.dto.js.map