"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.customCreateTransaction = void 0;
const tslib_1 = require("tslib");
const transactionService = tslib_1.__importStar(require("../components/transaction/transaction.service"));
function customCreateTransaction(transaction, borrowerId, lenderId, session) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const hola = yield transactionService.createTransaction(transaction, borrowerId, lenderId, session);
        return hola;
    });
}
exports.customCreateTransaction = customCreateTransaction;
//# sourceMappingURL=customCreateTransaction.js.map