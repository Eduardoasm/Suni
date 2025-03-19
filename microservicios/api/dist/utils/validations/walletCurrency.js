"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateWalletAndTransactionCurrency = void 0;
const tslib_1 = require("tslib");
const NoSentryError_1 = require("../NoSentryError");
function validateWalletAndTransactionCurrency(selectedWallet, currency) {
    var _a;
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        if (((_a = selectedWallet === null || selectedWallet === void 0 ? void 0 : selectedWallet.type) === null || _a === void 0 ? void 0 : _a.toLowerCase()) !== (currency === null || currency === void 0 ? void 0 : currency.toLowerCase()))
            throw new NoSentryError_1.NoSentryError('Wallet currency does not match transaction currency');
    });
}
exports.validateWalletAndTransactionCurrency = validateWalletAndTransactionCurrency;
//# sourceMappingURL=walletCurrency.js.map