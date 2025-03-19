"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRequestFee = exports.getValidAmounts = void 0;
const tslib_1 = require("tslib");
const loanRequest_1 = require("../../components/loanRequest");
const contractService = tslib_1.__importStar(require("../../components/contract/contract/contract.service"));
const apiPriceBtc_1 = require("../apiPriceBtc");
const convertFromUSDC_1 = require("../coinConversion/convertFromUSDC");
function getValidAmounts(userId, maxNumberBlocks, blockAmount) {
    var _a, _b, _c, _d, _e, _f, _g;
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const contractsUser = yield contractService.aggregate([
            {
                $match: {
                    $and: [
                        {
                            borrower: userId,
                        },
                        {
                            status: 'concluded',
                        },
                    ],
                    $nor: [
                        {
                            preCancel: true,
                        },
                    ],
                },
            },
            {
                $count: 'count',
            },
        ]);
        const sumAmountContractActive = yield contractService.aggregate([
            {
                $match: {
                    $and: [
                        {
                            borrower: userId,
                        },
                        {
                            status: 'active',
                        },
                    ],
                },
            },
            {
                $group: {
                    _id: null,
                    amount: {
                        $sum: '$amountInUSDC',
                    },
                },
            },
        ]);
        const sumAmountLoanRequestActive = yield loanRequest_1.LoanRequest.aggregate([
            {
                $match: {
                    $and: [
                        {
                            borrower: userId,
                        },
                        {
                            status: 'active',
                        },
                    ],
                },
            },
            {
                $group: {
                    _id: null,
                    amount: {
                        $sum: '$amountInUSDC',
                    },
                },
            },
        ]);
        const sumContractsRequestAmount = ((_b = (_a = sumAmountContractActive[0]) === null || _a === void 0 ? void 0 : _a.amount) !== null && _b !== void 0 ? _b : 0) +
            ((_d = (_c = sumAmountLoanRequestActive[0]) === null || _c === void 0 ? void 0 : _c.amount) !== null && _d !== void 0 ? _d : 0);
        const arrOfAmounts = [];
        const blocksAvailable = ((_e = contractsUser === null || contractsUser === void 0 ? void 0 : contractsUser[0]) === null || _e === void 0 ? void 0 : _e.count) > maxNumberBlocks
            ? maxNumberBlocks !== null && maxNumberBlocks !== void 0 ? maxNumberBlocks : 0
            : (_g = (_f = contractsUser === null || contractsUser === void 0 ? void 0 : contractsUser[0]) === null || _f === void 0 ? void 0 : _f.count) !== null && _g !== void 0 ? _g : 0;
        for (let i = 1; i <= blocksAvailable + 1; i += 1) {
            const amount = (blockAmount !== null && blockAmount !== void 0 ? blockAmount : 0) * i;
            arrOfAmounts.push(amount);
        }
        return { arrOfAmounts, sumContractsRequestAmount };
    });
}
exports.getValidAmounts = getValidAmounts;
function validateRequestFee(currency, settings, amount, user) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const btcPrice = yield (0, apiPriceBtc_1.apiPriceBtc)();
        const serviceFee = yield (0, convertFromUSDC_1.convertFromUSDC)(currency.toLowerCase(), btcPrice, settings.contractFees.borrowerRequestFee.type === 'percentage'
            ? (settings.contractFees.borrowerRequestFee.value * amount) / 100
            : settings.contractFees.borrowerRequestFee.value);
        const userLoanRequest = yield loanRequest_1.LoanRequest.findOne({ borrower: user.id });
        return { userLoanRequest, serviceFee };
    });
}
exports.validateRequestFee = validateRequestFee;
//# sourceMappingURL=request.js.map