"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserCreditsPaidOnTime = void 0;
const tslib_1 = require("tslib");
const contractService = tslib_1.__importStar(require("../../components/contract/contract/contract.service"));
function getUserCreditsPaidOnTime(userId) {
    var _a;
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const creditsPaidOnTime = yield contractService.aggregate([
            {
                $match: {
                    borrower: userId,
                    status: 'concluded',
                    onDefault: false,
                },
            },
            {
                $count: 'contracts',
            },
        ]);
        return (_a = creditsPaidOnTime[0]) === null || _a === void 0 ? void 0 : _a.contracts;
    });
}
exports.getUserCreditsPaidOnTime = getUserCreditsPaidOnTime;
//# sourceMappingURL=creditsPaidOnTime.js.map