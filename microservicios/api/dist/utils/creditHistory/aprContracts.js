"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAprUserContracts = void 0;
const tslib_1 = require("tslib");
const contractService = tslib_1.__importStar(require("../../components/contract/contract/contract.service"));
function getAprUserContracts(userId) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const aprContracts = yield contractService.aggregate([
            {
                $match: {
                    borrower: userId,
                },
            },
            {
                $group: {
                    _id: null,
                    apr: {
                        $avg: '$rate',
                    },
                },
            },
        ]);
        return aprContracts[0].apr.toFixed(2);
    });
}
exports.getAprUserContracts = getAprUserContracts;
//# sourceMappingURL=aprContracts.js.map