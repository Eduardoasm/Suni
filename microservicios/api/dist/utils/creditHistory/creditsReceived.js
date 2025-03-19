"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserCredits = void 0;
const tslib_1 = require("tslib");
const contractService = tslib_1.__importStar(require("../../components/contract/contract/contract.service"));
// se realizo cambio de name a getUserCredits ya que se obtienen los recibidos o dados dependiendo de el usuario
function getUserCredits(userId, userType, status) {
    var _a;
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const matchStage = {
            [userType]: userId,
        };
        if (status) {
            matchStage.status = status;
        }
        const creditsReceived = yield contractService.aggregate([
            {
                $match: matchStage,
            },
            {
                $count: 'contracts',
            },
        ]);
        return (_a = creditsReceived[0]) === null || _a === void 0 ? void 0 : _a.contracts;
    });
}
exports.getUserCredits = getUserCredits;
//# sourceMappingURL=creditsReceived.js.map