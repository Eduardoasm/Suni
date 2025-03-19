"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatWallet = void 0;
const tslib_1 = require("tslib");
const convertToUSDC_1 = require("./coinConversion/convertToUSDC");
function formatWallet(wallet, btcPrice) {
    var _a, _b, _c, _d;
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const balanceInUSDC = (0, convertToUSDC_1.convertToUSDC)((_a = wallet === null || wallet === void 0 ? void 0 : wallet.type) === null || _a === void 0 ? void 0 : _a.toLowerCase(), btcPrice, wallet === null || wallet === void 0 ? void 0 : wallet.balance);
        const blockedBalanceInUSDC = (0, convertToUSDC_1.convertToUSDC)((_b = wallet === null || wallet === void 0 ? void 0 : wallet.type) === null || _b === void 0 ? void 0 : _b.toLowerCase(), btcPrice, wallet === null || wallet === void 0 ? void 0 : wallet.blocked_balance);
        const availableBalanceInUSDC = (0, convertToUSDC_1.convertToUSDC)((_c = wallet === null || wallet === void 0 ? void 0 : wallet.type) === null || _c === void 0 ? void 0 : _c.toLowerCase(), btcPrice, wallet === null || wallet === void 0 ? void 0 : wallet.available_balance);
        return {
            name: wallet === null || wallet === void 0 ? void 0 : wallet.name,
            wallet: wallet === null || wallet === void 0 ? void 0 : wallet.wallet,
            balance: wallet === null || wallet === void 0 ? void 0 : wallet.balance,
            balanceInUSDC,
            blockedBalance: wallet === null || wallet === void 0 ? void 0 : wallet.blocked_balance,
            blockedBalanceInUSDC,
            availableBalance: wallet === null || wallet === void 0 ? void 0 : wallet.available_balance,
            availableBalanceInUSDC,
            currency: (_d = wallet === null || wallet === void 0 ? void 0 : wallet.type) === null || _d === void 0 ? void 0 : _d.toLowerCase(),
        };
    });
}
exports.formatWallet = formatWallet;
//# sourceMappingURL=formatWallet.js.map