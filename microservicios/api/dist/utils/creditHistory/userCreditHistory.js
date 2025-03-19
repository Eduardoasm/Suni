"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserCreditHistory = void 0;
const tslib_1 = require("tslib");
const contractService = tslib_1.__importStar(require("../../components/contract/contract/contract.service"));
function getUserCreditHistory(user) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const creditsReceived = yield contractService.find({
            borrower: user === null || user === void 0 ? void 0 : user.id,
        });
        const creditsPaidOnTime = yield contractService.find({
            borrower: user === null || user === void 0 ? void 0 : user.id,
            status: 'concluded',
            onDefault: false,
        });
        const creditsPaidLate = yield contractService.find({
            borrower: user === null || user === void 0 ? void 0 : user.id,
            onDefault: true,
        });
        return {
            creditsReceived: creditsReceived.length,
            creditsPaidOnTime: creditsPaidOnTime.length,
            creditsPaidLate: creditsPaidLate.length,
        };
    });
}
exports.getUserCreditHistory = getUserCreditHistory;
//# sourceMappingURL=userCreditHistory.js.map