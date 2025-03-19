"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateWalletInput = exports.WalletTypeNotNull = exports.WalletTypePlural = exports.WalletType = exports.WalletTypeName = void 0;
const wallet_model_1 = require("./wallet.model");
exports.WalletTypeName = wallet_model_1.WalletTC.getTypeName();
exports.WalletType = wallet_model_1.WalletTC.getType();
exports.WalletTypePlural = wallet_model_1.WalletTC.getTypePlural().getTypeName();
exports.WalletTypeNotNull = wallet_model_1.WalletTC.getTypeNonNull();
exports.CreateWalletInput = `
  input CreateWalletInput {
    name: String!
    address: String!
    currency: MongoID!
    owner: String
  }
`;
//# sourceMappingURL=wallet.dto.js.map