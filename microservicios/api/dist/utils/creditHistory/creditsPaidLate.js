"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserCreditsPaidLate = void 0;
const tslib_1 = require("tslib");
const contractService = tslib_1.__importStar(require("../../components/contract/contract/contract.service"));
function getUserCreditsPaidLate(userId) {
    var _a;
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const creditsPaidLate = yield contractService.aggregate([
            {
                $match: {
                    borrower: userId,
                    onDefault: true,
                },
            },
            {
                $count: 'contracts',
            },
        ]);
        return (_a = creditsPaidLate[0]) === null || _a === void 0 ? void 0 : _a.contracts;
    });
}
exports.getUserCreditsPaidLate = getUserCreditsPaidLate;
//# sourceMappingURL=creditsPaidLate.js.map