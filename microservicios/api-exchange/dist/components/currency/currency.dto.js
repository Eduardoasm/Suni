"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAssetWalletsInput = exports.userWalletsType = exports.CurrencyTypeNonNull = exports.CurrencyTypePlural = exports.CurrencyType = exports.CurrencyTypeName = void 0;
const currency_model_1 = require("./currency.model");
exports.CurrencyTypeName = currency_model_1.CurrencyTC.getTypeName();
exports.CurrencyType = currency_model_1.CurrencyTC.getType();
exports.CurrencyTypePlural = currency_model_1.CurrencyTC.getTypePlural().getTypeName();
exports.CurrencyTypeNonNull = currency_model_1.CurrencyTC.getTypeNonNull();
exports.userWalletsType = `
  type userWallets {
    wallets: [properties]
  }

  type properties {
    wallet: String
    name: String
    balance: Float
    error: String
    blocked_balance: Float
    available_balance: Float
  }
`;
exports.GetAssetWalletsInput = `
  input GetAssetWallets {
    asset: MongoID!
  }
`;
//# sourceMappingURL=currency.dto.js.map