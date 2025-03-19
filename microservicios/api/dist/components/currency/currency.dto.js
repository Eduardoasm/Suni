"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateCurrencyInput = exports.CurrencyTypeNotNull = exports.CurrencyTypePlural = exports.CurrencyType = exports.CurrencyTypeName = void 0;
const currency_model_1 = require("./currency.model");
exports.CurrencyTypeName = currency_model_1.CurrencyTC.getTypeName();
exports.CurrencyType = currency_model_1.CurrencyTC.getType();
exports.CurrencyTypePlural = currency_model_1.CurrencyTC.getTypePlural().getTypeName();
exports.CurrencyTypeNotNull = currency_model_1.CurrencyTC.getTypeNonNull();
exports.CreateCurrencyInput = `
  input CreateCurrencyInput {
    name: String!
    symbol: String!
  }
`;
//# sourceMappingURL=currency.dto.js.map