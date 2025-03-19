"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAmountUserContractsByMonth = void 0;
const tslib_1 = require("tslib");
const dayjs_1 = tslib_1.__importDefault(require("dayjs"));
const contractService = tslib_1.__importStar(require("../../components/contract/contract/contract.service"));
function getAmountUserContractsByMonth(year, month, userId) {
    var _a;
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const firstDayOfMonth = (0, dayjs_1.default)()
            .year(year)
            .month(month)
            .startOf('month')
            .format();
        const lastDayOfMonth = (0, dayjs_1.default)()
            .year(year)
            .month(month)
            .endOf('month')
            .format();
        const userContracts = yield contractService.aggregate([
            {
                $match: {
                    borrower: userId,
                    startDate: {
                        $gte: new Date(firstDayOfMonth),
                        $lte: new Date(lastDayOfMonth),
                    },
                },
            },
            {
                $group: {
                    _id: null,
                    sumAmountContracts: {
                        $sum: '$amountInUSDC',
                    },
                },
            },
        ]);
        return (_a = userContracts[0]) === null || _a === void 0 ? void 0 : _a.sumAmountContracts;
    });
}
exports.getAmountUserContractsByMonth = getAmountUserContractsByMonth;
//# sourceMappingURL=contractsByMonth.js.map