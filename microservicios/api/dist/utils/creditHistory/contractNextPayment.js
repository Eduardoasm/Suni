"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.contractNextPayment = void 0;
const tslib_1 = require("tslib");
const contractService = tslib_1.__importStar(require("../../components/contract/contract/contract.service"));
function contractNextPayment(userId) {
    var _a;
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const contract = yield contractService.aggregate([
            {
                $unwind: '$paymentPlan',
            },
            {
                $match: {
                    borrower: userId,
                    'paymentPlan.status': 'next_payment',
                },
            },
            {
                $limit: 1,
            },
            {
                $sort: {
                    'paymentPlan.paymentDate': 1,
                },
            },
        ]);
        return (_a = contract[0]) === null || _a === void 0 ? void 0 : _a.paymentPlan.paymentDate;
    });
}
exports.contractNextPayment = contractNextPayment;
//# sourceMappingURL=contractNextPayment.js.map