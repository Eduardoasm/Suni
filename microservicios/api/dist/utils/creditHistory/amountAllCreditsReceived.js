"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.amountAllCreditsReceived = void 0;
const tslib_1 = require("tslib");
const contractService = tslib_1.__importStar(require("../../components/contract/contract/contract.service"));
function amountAllCreditsReceived(userId) {
    var _a;
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const contracts = yield contractService.aggregate([
            {
                $match: {
                    borrower: userId,
                },
            },
            {
                $group: {
                    _id: null,
                    allAmount: {
                        $sum: '$amountInUSDC',
                    },
                },
            },
        ]);
        return (_a = contracts[0]) === null || _a === void 0 ? void 0 : _a.allAmount;
    });
}
exports.amountAllCreditsReceived = amountAllCreditsReceived;
//# sourceMappingURL=amountAllCreditsReceived.js.map