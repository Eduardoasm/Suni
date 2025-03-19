"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTransaction = exports.getBorrowerLastTransaction = exports.getLenderCreditHistory = exports.getTransactionsByDate = exports.getBorrowerCreditHistory = exports.getPreviousContractsReceived = exports.getPreviousCreditLimits = exports.getDueAmount = exports.getAmountAllCreditsActive = exports.nextPayment = exports.getAprUserContracts = exports.pagination = exports.create = exports.updateOne = exports.find = exports.findOne = void 0;
const tslib_1 = require("tslib");
const dayjs_1 = tslib_1.__importDefault(require("dayjs"));
const utils_1 = require("../../utils");
const transaction_model_1 = require("./transaction.model");
const contractService = tslib_1.__importStar(require("../contract/contract/contract.service"));
const userInfo_1 = require("../../utils/walletService/userInfo");
const settings_1 = require("../settings/settings");
const creditsReceived_1 = require("../../utils/creditHistory/creditsReceived");
const request_1 = require("../../utils/validations/request");
const settingsService = tslib_1.__importStar(require("../settings/settings/settings.service"));
function findOne(filter, projection, options) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return transaction_model_1.Transaction.findOne(filter, projection, options).exec();
    });
}
exports.findOne = findOne;
function find(filter, projection, options) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return transaction_model_1.Transaction.find(filter, projection, options).exec();
    });
}
exports.find = find;
function updateOne(filter, update, options) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return transaction_model_1.Transaction.updateOne(filter, update, options).exec();
    });
}
exports.updateOne = updateOne;
function create(transaction, session) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return transaction_model_1.Transaction.create([transaction], { session });
    });
}
exports.create = create;
function pagination(page, perPage, filter, projection, options) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return (0, utils_1.paginateModel)(page, perPage, transaction_model_1.Transaction, filter, projection, options);
    });
}
exports.pagination = pagination;
function getAprUserContracts(userId, userType) {
    var _a, _b;
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const aprContracts = yield contractService.aggregate([
            {
                $match: {
                    [userType]: userId,
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
        return (_b = (_a = aprContracts[0]) === null || _a === void 0 ? void 0 : _a.apr.toFixed(2)) !== null && _b !== void 0 ? _b : 0;
    });
}
exports.getAprUserContracts = getAprUserContracts;
function nextPayment(userId, userType) {
    var _a;
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        // como la funcion es busqueda basica y no tiene muchas complejidades con la otra busqueda, se indica un enum
        // como lender o borrower para no duplicar codigo y solo el cambio se matchea por type
        const contract = yield contractService.aggregate([
            {
                $unwind: '$paymentPlan',
            },
            {
                $match: {
                    [userType]: userId,
                    status: 'active',
                    'paymentPlan.paid': false,
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
        return (_a = contract[0]) === null || _a === void 0 ? void 0 : _a.paymentPlan;
    });
}
exports.nextPayment = nextPayment;
function getAmountAllCreditsActive(userId, userType) {
    var _a, _b;
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const contracts = yield contractService.aggregate([
            {
                $match: {
                    [userType]: userId,
                    status: 'active',
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
        return (_b = (_a = contracts[0]) === null || _a === void 0 ? void 0 : _a.allAmount) !== null && _b !== void 0 ? _b : 0;
    });
}
exports.getAmountAllCreditsActive = getAmountAllCreditsActive;
function getDueAmount(userId, userType) {
    var _a, _b;
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        // como la funcion es busqueda basica y no tiene muchas complejidades con la otra busqueda, se indica un enum
        // como lender o borrower para no duplicar codigo y solo el cambio se matchea por type
        const amount = yield contractService.aggregate([
            {
                $unwind: '$paymentPlan',
            },
            {
                $match: {
                    [userType]: userId,
                    status: 'active',
                    'paymentPlan.paid': false,
                },
            },
            {
                $group: {
                    _id: 0,
                    allAmount: {
                        $sum: '$paymentPlan.amount',
                    },
                },
            },
        ]);
        return (_b = (_a = amount[0]) === null || _a === void 0 ? void 0 : _a.allAmount.toFixed(2)) !== null && _b !== void 0 ? _b : 0;
    });
}
exports.getDueAmount = getDueAmount;
function getPreviousCreditLimits(userId) {
    var _a, _b;
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const dateOldMonth = (0, dayjs_1.default)().subtract(11, 'month');
        const userCreditLimits = [];
        const previousMonths = 11;
        const settings = yield settings_1.Settings.findOne({ active: true });
        for (let i = 0; i <= previousMonths; i += 1) {
            // loop para buscar los 12 meses anteriores
            const month = dateOldMonth.add(i, 'month').get('month');
            const year = dateOldMonth.add(i, 'month').get('year');
            const firstDayOfMonth = (0, dayjs_1.default)()
                .year(year)
                .month(month)
                .startOf('month')
                .utc()
                .format();
            const lastDayOfMonth = (0, dayjs_1.default)()
                .year(year)
                .month(month)
                .endOf('month')
                .utc()
                .format();
            // aqui se hace un findOne ya que si no encuentra la transaction, no realizo algun pago en el mes entra en default
            // y el creditLimit seria el minBlockAmount de settings
            const userTransactionMonthly = yield findOne({
                from: userId,
                type: 'payment',
                createdAt: {
                    // se hace la busqueda mediante createdAt
                    $lte: new Date(lastDayOfMonth),
                },
            }, {}, {
                sort: {
                    createdAt: -1,
                },
            });
            userCreditLimits.push({
                month: new Date(firstDayOfMonth),
                // si no hay transacciones en el mes, se realiza la busqueda de el min amount block en settings ya que tenemos 2 opciones
                // si no realizo transaccion no tiene un contrato activo o no realizo el pago, y en las 2 opciones entraria en el minBlockAmount
                borrowerCreditLimit: (_a = userTransactionMonthly === null || userTransactionMonthly === void 0 ? void 0 : userTransactionMonthly.borrowerCreditLimit) !== null && _a !== void 0 ? _a : (_b = settings === null || settings === void 0 ? void 0 : settings.contract) === null || _b === void 0 ? void 0 : _b.amountOfBlocksAllowed,
            });
        }
        return userCreditLimits;
    });
}
exports.getPreviousCreditLimits = getPreviousCreditLimits;
function getPreviousContractsReceived(userId) {
    var _a;
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const dateOldMonth = (0, dayjs_1.default)().subtract(11, 'month');
        const userCreditLimits = [];
        const previousMonths = 11;
        for (let i = 0; i <= previousMonths; i += 1) {
            // loop para buscar los 12 meses anteriores
            const month = dateOldMonth.add(i, 'month').get('month');
            const year = dateOldMonth.add(i, 'month').get('year');
            const firstDayOfMonth = (0, dayjs_1.default)()
                .year(year)
                .month(month)
                .startOf('month')
                .utc()
                .format();
            const lastDayOfMonth = (0, dayjs_1.default)()
                .year(year)
                .month(month)
                .endOf('month')
                .utc()
                .format();
            const userTransactionMonthly = yield findOne({
                $or: [
                    {
                        to: userId,
                        type: 'investment',
                    },
                    {
                        from: userId,
                        type: 'payment',
                    },
                ],
                createdAt: {
                    $lte: new Date(lastDayOfMonth),
                },
            }, {}, {
                sort: {
                    createdAt: -1,
                },
            });
            userCreditLimits.push({
                month: new Date(firstDayOfMonth),
                borrowed: (_a = userTransactionMonthly === null || userTransactionMonthly === void 0 ? void 0 : userTransactionMonthly.borrowedByBorrower) !== null && _a !== void 0 ? _a : 0, // como son creditos recibidos, si no ha recibido nada ese mes, se le indica 0
            });
        }
        return userCreditLimits;
    });
}
exports.getPreviousContractsReceived = getPreviousContractsReceived;
function getBorrowerCreditHistory(token) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const { data: user } = yield (0, userInfo_1.getUserInfo)(token);
        const previousCreditsLimit = getPreviousCreditLimits(user === null || user === void 0 ? void 0 : user.id);
        const previousCreditsReceived = getPreviousContractsReceived(user === null || user === void 0 ? void 0 : user.id);
        const borrowerLastTransaction = getBorrowerLastTransaction(user === null || user === void 0 ? void 0 : user.id);
        return {
            creditsLimit: previousCreditsLimit,
            creditsReceived: previousCreditsReceived,
            borrowerLastTransaction,
        };
    });
}
exports.getBorrowerCreditHistory = getBorrowerCreditHistory;
function getTransactionsByDate(userId, date) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        // validación por el tema de los enum con graphql no acepta numero de primero y letras despues
        const dateValidations = ['1D', '7D', '2W', '1M', '6M', '1Y'];
        if (!dateValidations.includes(date)) {
            throw new utils_1.NoSentryError('Invalid date parameter');
        }
        const currentDate = (0, dayjs_1.default)().utc().format();
        // hago comparacion en variables para no calcular todos los dates y el objeto para no realizar if else
        const oneDayAgo = date === '1D' && (0, dayjs_1.default)().startOf('day').subtract(1, 'day').utc().format();
        const oneWeekAgo = date === '7D' && (0, dayjs_1.default)().startOf('day').subtract(1, 'week').utc().format();
        const twoWeeksAgo = date === '2W' && (0, dayjs_1.default)().startOf('day').subtract(2, 'weeks').utc().format();
        const oneMonthAgo = date === '1M' && (0, dayjs_1.default)().startOf('day').subtract(1, 'month').utc().format();
        const sixMonthsAgo = date === '6M' &&
            (0, dayjs_1.default)().startOf('day').subtract(6, 'months').utc().format();
        const oneYearAgo = date === '1Y' && (0, dayjs_1.default)().startOf('day').subtract(1, 'year').utc().format();
        // filtro dependiendo de lo que nos envie el front, un objeto para no hacer varios if o un switch en caso de
        const filter = {
            '1D': oneDayAgo,
            '7D': oneWeekAgo,
            '2W': twoWeeksAgo,
            '1M': oneMonthAgo,
            '6M': sixMonthsAgo,
            '1Y': oneYearAgo,
        };
        const transactions = yield find({
            $or: [
                {
                    to: userId,
                    type: 'payment',
                },
                {
                    from: userId,
                    type: 'investment',
                },
            ],
            $and: [
                {
                    createdAt: {
                        $gte: new Date(filter[date]),
                    },
                },
                {
                    createdAt: {
                        $lte: new Date(currentDate),
                    },
                },
            ],
        }, {}, {
            sort: {
                createdAt: 1,
            },
        });
        return transactions;
    });
}
exports.getTransactionsByDate = getTransactionsByDate;
function getLenderCreditHistory(token, date) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const { data: user } = yield (0, userInfo_1.getUserInfo)(token);
        const transactionsByDate = getTransactionsByDate(user === null || user === void 0 ? void 0 : user.id, date);
        return {
            transactionsByDate,
        };
    });
}
exports.getLenderCreditHistory = getLenderCreditHistory;
function getBorrowerLastTransaction(userId) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const borrowerLastTransaction = yield transaction_model_1.Transaction.aggregate([
            {
                $match: {
                    $or: [
                        { $and: [{ to: userId }, { type: 'investment' }] },
                        { $and: [{ from: userId }, { type: 'payment' }] },
                    ],
                },
            },
            {
                $sort: {
                    createdAt: -1,
                },
            },
            {
                $limit: 1,
            },
        ]);
        return borrowerLastTransaction === null || borrowerLastTransaction === void 0 ? void 0 : borrowerLastTransaction[0];
    });
}
exports.getBorrowerLastTransaction = getBorrowerLastTransaction;
function createTransaction(transaction, borrowerId, lenderId, session) {
    var _a, _b;
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const settings = yield settingsService.findOne({ active: true });
        const { arrOfAmounts } = yield (0, request_1.getValidAmounts)(borrowerId, (_a = settings === null || settings === void 0 ? void 0 : settings.contract) === null || _a === void 0 ? void 0 : _a.allowedBlocks, (_b = settings === null || settings === void 0 ? void 0 : settings.contract) === null || _b === void 0 ? void 0 : _b.amountOfBlocksAllowed);
        const borrowerAverageRate = yield getAprUserContracts(borrowerId, 'borrower'); // averageRate
        const borrowerNextPayment = yield nextPayment(borrowerId, 'borrower'); // borrowerNextPayment
        const borrowerDueAmount = yield getDueAmount(borrowerId, 'borrower'); // borrowerDueAmount
        const borrowerActiveLoans = yield (0, creditsReceived_1.getUserCredits)(borrowerId, 'borrower', 'active'); // borrowerActiveLoans
        const borrowedByBorrower = yield getAmountAllCreditsActive(borrowerId, 'borrower');
        const lenderDueAmount = yield getDueAmount(lenderId, 'lender');
        const lenderNextPayment = yield nextPayment(lenderId, 'lender');
        const lenderActiveLoans = yield (0, creditsReceived_1.getUserCredits)(lenderId, 'lender', 'active');
        const lenderAverageRate = yield getAprUserContracts(lenderId, 'lender');
        const lendedByLender = yield getAmountAllCreditsActive(lenderId, 'lender');
        const newTransaction = yield create({
            contract: transaction.contract,
            from: transaction.from,
            to: transaction.to,
            amount: transaction.amount,
            lenderFee: transaction.lenderFee,
            borrowerFee: transaction.borrowerFee,
            interest: transaction.interest,
            type: transaction.type,
            borrowerDueAmount,
            borrowerNextPayment,
            borrowerActiveLoans,
            borrowerAverageRate,
            lenderDueAmount,
            lenderNextPayment,
            lenderActiveLoans,
            lenderAverageRate,
            borrowedByBorrower,
            borrowerCreditLimit: arrOfAmounts[arrOfAmounts.length - 1],
            lendedByLender,
            event: transaction === null || transaction === void 0 ? void 0 : transaction.event,
        }, session);
        return newTransaction;
    });
}
exports.createTransaction = createTransaction;
//# sourceMappingURL=transaction.service.js.map