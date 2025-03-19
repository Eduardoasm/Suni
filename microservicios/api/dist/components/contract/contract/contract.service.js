"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.contractAndCreditScoreDetails = exports.addOriginalValues = exports.getUserStats = exports.preCancel = exports.getPreCancelInfo = exports.getContractsFilterByStatusByUser = exports.sendContract = exports.getMyContracts = exports.amortization = exports.getPaymentPlan = exports.userEarnings = exports.indicators = exports.getDefaultPaymentContractsByDate = exports.getDefaultPaymentContractsByMonth = exports.getLoansByDate = exports.getIncomeByDate = exports.interestRate = exports.income = exports.incomes = exports.pagination = exports.getContractsFilterByStatusByClient = exports.getContractsByStatus = exports.getContractsFilterByStatus = exports.getTransactionsByLenderOrBorrower = exports.create = exports.getContractInfo = exports.aggregate = exports.updateOne = exports.find = exports.findOne = void 0;
const tslib_1 = require("tslib");
/* eslint-disable no-nested-ternary */
/* eslint-disable import/no-extraneous-dependencies */
const mongoose_1 = tslib_1.__importDefault(require("mongoose"));
const excel4node_1 = tslib_1.__importDefault(require("excel4node"));
const financejs_1 = require("financejs");
const axios_1 = tslib_1.__importDefault(require("axios"));
const dayjs_1 = tslib_1.__importDefault(require("dayjs"));
const html_to_pdfmake_1 = tslib_1.__importDefault(require("html-to-pdfmake"));
const pdfmake_1 = tslib_1.__importDefault(require("pdfmake/build/pdfmake"));
const vfs_fonts_1 = tslib_1.__importDefault(require("pdfmake/build/vfs_fonts"));
const jsdom_1 = tslib_1.__importDefault(require("jsdom"));
const fs_1 = tslib_1.__importDefault(require("fs"));
const utils_1 = require("../../../utils");
const NoSentryError_1 = require("../../../utils/NoSentryError");
const apiPriceBtc_1 = require("../../../utils/apiPriceBtc");
const contract_model_1 = require("./contract.model");
const settingService = tslib_1.__importStar(require("../../settings/settings/settings.service"));
const loanRequestService = tslib_1.__importStar(require("../../loanRequest/loanRequest.service"));
const loanOfferService = tslib_1.__importStar(require("../../loanOffer/loanOffer.service"));
const getDay_1 = require("../../../utils/getDay");
const userInfo_1 = require("../../../utils/walletService/userInfo");
const amountUnlock_1 = require("../../../utils/walletService/amountUnlock");
const convertFromUSDC_1 = require("../../../utils/coinConversion/convertFromUSDC");
const currencyService = tslib_1.__importStar(require("../../currency/currency.service"));
const walletService_1 = require("../../../utils/walletService");
const signS3Service = tslib_1.__importStar(require("../../s3/s3.service"));
const wauEmail_1 = require("../../../utils/emails/wauEmail");
const country_1 = require("../../../utils/country");
const date_1 = require("../../../utils/date");
const notificationService = tslib_1.__importStar(require("../../notification/notification.service"));
const formatWallet_1 = require("../../../utils/formatWallet");
const rejectOffers_1 = require("../../../utils/rejectOffers");
const sendNotification_1 = require("../../../utils/pushNotifications/sendNotification");
const transfer_1 = require("../../../utils/walletService/transfer");
const request_1 = require("../../../utils/validations/request");
const creditsReceived_1 = require("../../../utils/creditHistory/creditsReceived");
const creditsPaidOnTime_1 = require("../../../utils/creditHistory/creditsPaidOnTime");
const creditsPaidLate_1 = require("../../../utils/creditHistory/creditsPaidLate");
const transactionService = tslib_1.__importStar(require("../../transaction/transaction.service"));
const userService = tslib_1.__importStar(require("../../user/user/user.service"));
const createNotification_1 = require("../../../utils/avilaServices/createNotification");
const creditScoreService = tslib_1.__importStar(require("../../creditScore/creditScore/creditScore.service"));
function findOne(filter, projection, options) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return contract_model_1.Contract.findOne(filter, projection, options).exec();
    });
}
exports.findOne = findOne;
function find(filter, projection, options) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return contract_model_1.Contract.find(filter, projection, options).exec();
    });
}
exports.find = find;
function updateOne(filter, update, options) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return contract_model_1.Contract.updateOne(filter, update, options).exec();
    });
}
exports.updateOne = updateOne;
function aggregate(pipeline, options) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return contract_model_1.Contract.aggregate(pipeline, options);
    });
}
exports.aggregate = aggregate;
function getContractInfo(body) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6, _7, _8, _9, _10, _11, _12, _13, _14, _15, _16, _17, _18, _19, _20, _21, _22, _23, _24, _25, _26, _27;
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const contract = yield contract_model_1.Contract.findById(body === null || body === void 0 ? void 0 : body.contractId);
        const [lenderInfo, borrowerInfo] = yield Promise.all([
            userService.getWAOClient(contract === null || contract === void 0 ? void 0 : contract.lender),
            userService.getWAOClient(contract === null || contract === void 0 ? void 0 : contract.borrower),
        ]);
        const clientsInfo = {
            lender: {
                name: ((_d = (_c = (_b = (_a = lenderInfo === null || lenderInfo === void 0 ? void 0 : lenderInfo.data) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.metamapStatus) === null || _c === void 0 ? void 0 : _c.metamapStatus) === null || _d === void 0 ? void 0 : _d.dni_firstName)
                    ? (_g = (_f = (_e = lenderInfo === null || lenderInfo === void 0 ? void 0 : lenderInfo.data) === null || _e === void 0 ? void 0 : _e.data) === null || _f === void 0 ? void 0 : _f.metamapStatus) === null || _g === void 0 ? void 0 : _g.dni_firstName
                    : (_k = (_j = (_h = lenderInfo === null || lenderInfo === void 0 ? void 0 : lenderInfo.data) === null || _h === void 0 ? void 0 : _h.data) === null || _j === void 0 ? void 0 : _j.name) !== null && _k !== void 0 ? _k : '',
                lastName: ((_o = (_m = (_l = lenderInfo === null || lenderInfo === void 0 ? void 0 : lenderInfo.data) === null || _l === void 0 ? void 0 : _l.data) === null || _m === void 0 ? void 0 : _m.metamapStatus) === null || _o === void 0 ? void 0 : _o.dni_lastName)
                    ? (_r = (_q = (_p = lenderInfo === null || lenderInfo === void 0 ? void 0 : lenderInfo.data) === null || _p === void 0 ? void 0 : _p.data) === null || _q === void 0 ? void 0 : _q.metamapStatus) === null || _r === void 0 ? void 0 : _r.dni_lastName
                    : (_u = (_t = (_s = lenderInfo === null || lenderInfo === void 0 ? void 0 : lenderInfo.data) === null || _s === void 0 ? void 0 : _s.data) === null || _t === void 0 ? void 0 : _t.lastname) !== null && _u !== void 0 ? _u : '',
                country: (_y = (_x = (_w = (_v = lenderInfo === null || lenderInfo === void 0 ? void 0 : lenderInfo.data) === null || _v === void 0 ? void 0 : _v.data) === null || _w === void 0 ? void 0 : _w.metamapStatus) === null || _x === void 0 ? void 0 : _x.country) !== null && _y !== void 0 ? _y : '',
                email: (_1 = (_0 = (_z = lenderInfo === null || lenderInfo === void 0 ? void 0 : lenderInfo.data) === null || _z === void 0 ? void 0 : _z.data) === null || _0 === void 0 ? void 0 : _0.email) !== null && _1 !== void 0 ? _1 : '',
            },
            borrower: {
                name: ((_5 = (_4 = (_3 = (_2 = borrowerInfo === null || borrowerInfo === void 0 ? void 0 : borrowerInfo.data) === null || _2 === void 0 ? void 0 : _2.data) === null || _3 === void 0 ? void 0 : _3.metamapStatus) === null || _4 === void 0 ? void 0 : _4.metamapStatus) === null || _5 === void 0 ? void 0 : _5.dni_firstName)
                    ? (_8 = (_7 = (_6 = borrowerInfo === null || borrowerInfo === void 0 ? void 0 : borrowerInfo.data) === null || _6 === void 0 ? void 0 : _6.data) === null || _7 === void 0 ? void 0 : _7.metamapStatus) === null || _8 === void 0 ? void 0 : _8.dni_firstName
                    : (_11 = (_10 = (_9 = borrowerInfo === null || borrowerInfo === void 0 ? void 0 : borrowerInfo.data) === null || _9 === void 0 ? void 0 : _9.data) === null || _10 === void 0 ? void 0 : _10.name) !== null && _11 !== void 0 ? _11 : '',
                lastName: ((_14 = (_13 = (_12 = borrowerInfo === null || borrowerInfo === void 0 ? void 0 : borrowerInfo.data) === null || _12 === void 0 ? void 0 : _12.data) === null || _13 === void 0 ? void 0 : _13.metamapStatus) === null || _14 === void 0 ? void 0 : _14.dni_lastName)
                    ? (_17 = (_16 = (_15 = borrowerInfo === null || borrowerInfo === void 0 ? void 0 : borrowerInfo.data) === null || _15 === void 0 ? void 0 : _15.data) === null || _16 === void 0 ? void 0 : _16.metamapStatus) === null || _17 === void 0 ? void 0 : _17.dni_lastName
                    : (_20 = (_19 = (_18 = borrowerInfo === null || borrowerInfo === void 0 ? void 0 : borrowerInfo.data) === null || _18 === void 0 ? void 0 : _18.data) === null || _19 === void 0 ? void 0 : _19.lastname) !== null && _20 !== void 0 ? _20 : '',
                country: (_24 = (_23 = (_22 = (_21 = borrowerInfo === null || borrowerInfo === void 0 ? void 0 : borrowerInfo.data) === null || _21 === void 0 ? void 0 : _21.data) === null || _22 === void 0 ? void 0 : _22.metamapStatus) === null || _23 === void 0 ? void 0 : _23.country) !== null && _24 !== void 0 ? _24 : '',
                email: (_27 = (_26 = (_25 = borrowerInfo === null || borrowerInfo === void 0 ? void 0 : borrowerInfo.data) === null || _25 === void 0 ? void 0 : _25.data) === null || _26 === void 0 ? void 0 : _26.email) !== null && _27 !== void 0 ? _27 : '',
            },
        };
        return { contract, clientsInfo };
    });
}
exports.getContractInfo = getContractInfo;
function create(body, token) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x;
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const { data: user } = yield (0, userInfo_1.getUserInfo)(token);
        const session = yield mongoose_1.default.startSession();
        try {
            session.startTransaction();
            const settings = yield settingService.findOne({
                active: true,
            });
            const loanRequest = yield (yield loanRequestService.findOne({
                offers: { $in: [body.loanOffer] },
            }, null, { session })).populate({
                path: 'offers',
                model: 'LoanOffer',
            });
            if (!loanRequest) {
                throw new NoSentryError_1.NoSentryError('Loan request does not exist');
            }
            const borrowerWallet = yield (0, walletService_1.getUserWallet)(token, loanRequest.selectedWallet);
            const loanOffer = yield loanOfferService.findOne({ _id: body.loanOffer }, null, { session });
            if (!loanOffer)
                throw new NoSentryError_1.NoSentryError('Loan offer does not exist');
            if (loanRequest.borrower !== user.id) {
                throw new NoSentryError_1.NoSentryError('Contract can only be created by the borrower');
            }
            const belongs = (_a = loanRequest === null || loanRequest === void 0 ? void 0 : loanRequest.offers) === null || _a === void 0 ? void 0 : _a.find((offer) => offer._id.toString() === body.loanOffer.toString());
            if (!belongs) {
                throw new NoSentryError_1.NoSentryError('Offer does not belong to request');
            }
            const borrowerFee = settings.contractFees.borrowerFee.type === 'percentage'
                ? (settings.contractFees.borrowerFee.value * loanRequest.amountInUSDC) /
                    100
                : settings.contractFees.borrowerFee.value;
            const currency = yield currencyService.findOne({
                _id: loanRequest.selectedWalletCurrency,
            });
            const btcPrice = yield (0, apiPriceBtc_1.apiPriceBtc)();
            const destServiceFee = yield (0, convertFromUSDC_1.convertFromUSDC)(currency.symbol.toLowerCase(), btcPrice, borrowerFee);
            const paymentPlan = yield getPaymentPlan(loanRequest.amountInUSDC, loanOffer.interestRate, loanRequest.installments);
            const createdContract = yield contract_model_1.Contract.create([
                {
                    loanRequest: loanRequest._id,
                    loanOffer: loanOffer._id,
                    lender: loanOffer.lender,
                    borrower: loanRequest.borrower,
                    walletTransactionsCurrency: loanRequest.selectedWalletCurrency,
                    amountInUSDC: loanRequest.amountInUSDC,
                    amountReceivedInWalletTransactionsCurrency: loanOffer.blockedAmountInWalletCurrency,
                    rate: loanOffer.interestRate,
                    startDate: new Date(),
                    paymentPlan,
                    lenderFeeInUSDC: loanOffer.lenderFeeInUSDC,
                    lenderFeeInWalletTransactionsCurrency: loanOffer.lenderFeeInWalletCurrency,
                    borrowerFeeInUSDC: borrowerFee,
                    borrowerFeeInWalletTransactionsCurrency: destServiceFee,
                },
            ], { session });
            loanRequest.status = 'closed';
            yield loanRequest.save();
            loanOffer.status = 'approved';
            yield loanOffer.save();
            yield Promise.all((0, rejectOffers_1.rejectOffers)(loanRequest, token, loanOffer, session));
            const notificationLender = yield notificationService.create({
                user: loanOffer.lender,
                collectionName: 'contract',
                message: `Número de contrato: ${createdContract[0].referenceNumber}`,
                subject: 'Se ha creado un contrato',
                active: true,
            }, session);
            const notificationBorrower = yield notificationService.create({
                user: loanOffer.borrower,
                collectionName: 'contract',
                message: `Número de contrato: ${createdContract[0].referenceNumber}`,
                subject: 'Se ha creado un contrato',
                active: true,
            }, session);
            const paramsPush = {
                token,
                userId: loanOffer.lender,
                title: 'Oferta de préstamo aceptada',
                message: `Tu oferta ${loanOffer.referenceNumber} ha sido aceptada,
      se ha creado el contrato ${createdContract[0].referenceNumber} exitosamente`,
            };
            yield (0, sendNotification_1.sendNotifications)(paramsPush);
            yield (0, createNotification_1.createNotification)(
            // notification Oferta aceptada
            {
                messageTemplateId: '65a8341b2d07da37baf04e0c',
                model: 'contract',
                module: 'loans',
                object: (_b = createdContract[0]) === null || _b === void 0 ? void 0 : _b._id,
                recipientId: loanOffer === null || loanOffer === void 0 ? void 0 : loanOffer.lender,
                senderId: user === null || user === void 0 ? void 0 : user.id,
            }, token);
            try {
                yield sendContract({
                    lenderName: (_c = loanOffer === null || loanOffer === void 0 ? void 0 : loanOffer.lenderInfo) === null || _c === void 0 ? void 0 : _c.name,
                    lenderLastName: (_d = loanOffer === null || loanOffer === void 0 ? void 0 : loanOffer.lenderInfo) === null || _d === void 0 ? void 0 : _d.lastName,
                    lenderCountry: (0, country_1.getCountryFullName)((_e = loanOffer === null || loanOffer === void 0 ? void 0 : loanOffer.lenderInfo) === null || _e === void 0 ? void 0 : _e.country),
                    lenderDni: (_g = (_f = loanOffer === null || loanOffer === void 0 ? void 0 : loanOffer.lenderInfo) === null || _f === void 0 ? void 0 : _f.dni) !== null && _g !== void 0 ? _g : '',
                    lenderEmail: (_h = loanOffer === null || loanOffer === void 0 ? void 0 : loanOffer.lenderInfo) === null || _h === void 0 ? void 0 : _h.email,
                    borrowerName: (_k = (_j = user === null || user === void 0 ? void 0 : user.metamapStatus) === null || _j === void 0 ? void 0 : _j.dni_firstName) !== null && _k !== void 0 ? _k : user === null || user === void 0 ? void 0 : user.name,
                    borrowerLastName: (_m = (_l = user === null || user === void 0 ? void 0 : user.metamapStatus) === null || _l === void 0 ? void 0 : _l.dni_lastName) !== null && _m !== void 0 ? _m : user === null || user === void 0 ? void 0 : user.lastname,
                    borrowerCountry: (0, country_1.getCountryFullName)((_o = user === null || user === void 0 ? void 0 : user.metamapStatus) === null || _o === void 0 ? void 0 : _o.country),
                    borrowerDni: (_q = (_p = user === null || user === void 0 ? void 0 : user.metamapStatus) === null || _p === void 0 ? void 0 : _p.dni_value) !== null && _q !== void 0 ? _q : '',
                    borrowerEmail: user === null || user === void 0 ? void 0 : user.email,
                    amountInUSDC: (_r = createdContract[0]) === null || _r === void 0 ? void 0 : _r.amountInUSDC,
                    installments: loanRequest === null || loanRequest === void 0 ? void 0 : loanRequest.installments,
                    firstPaymentDate: (_s = paymentPlan === null || paymentPlan === void 0 ? void 0 : paymentPlan[0]) === null || _s === void 0 ? void 0 : _s.paymentDate,
                    interestRate: (_t = createdContract[0]) === null || _t === void 0 ? void 0 : _t.rate,
                    moraFee: (_v = (_u = settings === null || settings === void 0 ? void 0 : settings.contractFees) === null || _u === void 0 ? void 0 : _u.moraFee) === null || _v === void 0 ? void 0 : _v.value,
                    templateContent: (_w = settings === null || settings === void 0 ? void 0 : settings.contract) === null || _w === void 0 ? void 0 : _w.templateContent,
                    currentDay: (0, dayjs_1.default)().date().toString(),
                    currentMonth: (0, date_1.getMonthString)((0, dayjs_1.default)().month()),
                    currentYear: (0, dayjs_1.default)().year().toString(),
                    requestId: (_x = loanRequest === null || loanRequest === void 0 ? void 0 : loanRequest._id) === null || _x === void 0 ? void 0 : _x.toString(),
                    offerReferenceNumber: loanOffer === null || loanOffer === void 0 ? void 0 : loanOffer.referenceNumber,
                }, token);
                yield (0, amountUnlock_1.unlockBalance)({
                    token,
                    toWalletId: loanRequest.selectedWallet,
                    amount: loanOffer.blockedAmountInWalletCurrency,
                    destServiceFee,
                    blockId: loanOffer.blockId,
                });
            }
            catch (error) {
                throw new NoSentryError_1.NoSentryError(`Error in send contract ${error.message}`);
            }
            yield session.commitTransaction();
            yield transactionService.createTransaction({
                contract: createdContract[0]._id,
                from: createdContract[0].lender,
                to: createdContract[0].borrower,
                amount: createdContract[0].amountInUSDC,
                lenderFee: createdContract[0].lenderFeeInUSDC,
                borrowerFee: createdContract[0].borrowerFeeInUSDC,
                interest: 0,
                type: 'investment',
            }, createdContract[0].borrower, createdContract[0].lender);
            return createdContract[0];
        }
        catch (error) {
            yield session.abortTransaction();
            throw new NoSentryError_1.NoSentryError(error);
        }
        finally {
            session.endSession();
        }
    });
}
exports.create = create;
function getTransactionsByLenderOrBorrower(body) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const contracts = yield contract_model_1.Contract.find({
            $or: [{ lender: body === null || body === void 0 ? void 0 : body.user }, { borrower: body === null || body === void 0 ? void 0 : body.user }],
        });
        const loanRequests = yield contract_model_1.Contract.find({
            borrower: body === null || body === void 0 ? void 0 : body.user,
        });
        return { contracts, loanRequests };
    });
}
exports.getTransactionsByLenderOrBorrower = getTransactionsByLenderOrBorrower;
function getContractsFilterByStatus(body, token) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const { data: user } = yield (0, userInfo_1.getUserInfo)(token);
        if (!user) {
            throw new NoSentryError_1.NoSentryError('Invalid user');
        }
        const STATUS = ['active', 'concluded'];
        if (!body.status) {
            throw new NoSentryError_1.NoSentryError('Please insert a valid status');
        }
        if (!STATUS.includes(body.status)) {
            throw new NoSentryError_1.NoSentryError('Please insert a valid status');
        }
        const contracts = contract_model_1.Contract.find({
            status: body.status,
        });
        return contracts;
    });
}
exports.getContractsFilterByStatus = getContractsFilterByStatus;
function getContractsByStatus(body, token) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const { data: user } = yield (0, userInfo_1.getUserInfo)(token);
        if (!user) {
            throw new NoSentryError_1.NoSentryError('Invalid user');
        }
        const active = yield contract_model_1.Contract.find({
            status: 'active',
            lender: (user === null || user === void 0 ? void 0 : user.id) ? user === null || user === void 0 ? void 0 : user.id : { $ne: null },
        });
        const concluded = yield contract_model_1.Contract.find({
            status: 'concluded',
            lender: (user === null || user === void 0 ? void 0 : user.id) ? user === null || user === void 0 ? void 0 : user.id : { $ne: null },
        });
        const onDefault = yield contract_model_1.Contract.find({
            onDefault: true,
            lender: (user === null || user === void 0 ? void 0 : user.id) ? user === null || user === void 0 ? void 0 : user.id : { $ne: null },
        });
        const contracts = yield contract_model_1.Contract.find({
            lender: (user === null || user === void 0 ? void 0 : user.id) ? user === null || user === void 0 ? void 0 : user.id : { $ne: null },
        });
        return {
            active,
            concluded,
            onDefault,
            contracts,
        };
    });
}
exports.getContractsByStatus = getContractsByStatus;
function getContractsFilterByStatusByClient(body, token) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const { data: user } = yield (0, userInfo_1.getUserInfo)(token);
        if (!user) {
            throw new NoSentryError_1.NoSentryError('Invalid user');
        }
        const userContracts = contract_model_1.Contract.find({
            $or: [{ lender: user === null || user === void 0 ? void 0 : user.id }, { borrower: user === null || user === void 0 ? void 0 : user.id }],
        });
        return userContracts;
    });
}
exports.getContractsFilterByStatusByClient = getContractsFilterByStatusByClient;
function pagination(page, perPage, filter, projection, options) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return (0, utils_1.paginateModel)(page, perPage, contract_model_1.Contract, filter, projection, options);
    });
}
exports.pagination = pagination;
function incomes() {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const contractsData = yield contract_model_1.Contract.aggregate([
            {
                $unwind: '$paymentPlan',
            },
            {
                $group: {
                    _id: { $dateToString: { format: '%Y-%m-%d', date: '$startDate' } },
                    count: { $sum: 1 },
                    lenderFee: {
                        $sum: '$lenderFeeInUSDC',
                    },
                    borrowerFee: {
                        $sum: '$borrowerFeeInUSDC',
                    },
                    paymentPlanFees: {
                        $sum: '$paymentPlan.fees',
                    },
                },
            },
            { $sort: { _id: 1 } },
        ]);
        const btcPriceInUsd = yield (0, apiPriceBtc_1.apiPriceBtc)();
        const btcPriceInSatoshi = 100000000;
        const contracts = contractsData === null || contractsData === void 0 ? void 0 : contractsData.map((contract) => {
            var _a, _b, _c;
            const clientsFeeInUsd = ((_a = contract === null || contract === void 0 ? void 0 : contract.lenderFee) !== null && _a !== void 0 ? _a : 0) + ((_b = contract === null || contract === void 0 ? void 0 : contract.borrowerFee) !== null && _b !== void 0 ? _b : 0);
            const clientsFeeInBtc = clientsFeeInUsd / btcPriceInUsd;
            const clientsFeeInSat = clientsFeeInBtc * btcPriceInSatoshi;
            const paymentPlanFeesInUSD = (_c = contract === null || contract === void 0 ? void 0 : contract.paymentPlanFees) !== null && _c !== void 0 ? _c : 0;
            const paymentPlanFeesInBtc = paymentPlanFeesInUSD === 0 ? 0 : contract.paymentPlanFees / btcPriceInUsd;
            const paymentPlanFeesInSat = paymentPlanFeesInBtc * btcPriceInSatoshi;
            return {
                date: contract === null || contract === void 0 ? void 0 : contract._id,
                income: {
                    usd: Number(clientsFeeInUsd + paymentPlanFeesInUSD),
                    btc: clientsFeeInBtc + paymentPlanFeesInBtc,
                    sat: clientsFeeInSat + paymentPlanFeesInSat,
                },
                count: contract === null || contract === void 0 ? void 0 : contract.count,
            };
        });
        return contracts;
    });
}
exports.incomes = incomes;
function income() {
    var _a, _b, _c, _d, _e, _f;
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const contracts = yield contract_model_1.Contract.aggregate([
            {
                $unwind: '$paymentPlan',
            },
            {
                $group: {
                    _id: '$null',
                    lenderFee: {
                        $sum: '$lenderFee',
                    },
                    borrowerFee: {
                        $sum: '$borrowerFee',
                    },
                    paymentPlanFees: {
                        $sum: '$paymentPlan.fees',
                    },
                },
            },
        ]);
        const btcPriceInUsd = yield (0, apiPriceBtc_1.apiPriceBtc)();
        const btcPriceInSatoshi = 100000000;
        const paymentPlanFees = Number.isNaN(Number((_a = contracts[0]) === null || _a === void 0 ? void 0 : _a.paymentPlanFees))
            ? 0
            : (_b = contracts[0]) === null || _b === void 0 ? void 0 : _b.paymentPlanFees;
        const lenderFee = Number.isNaN(Number((_c = contracts[0]) === null || _c === void 0 ? void 0 : _c.lenderFee))
            ? 0
            : (_d = contracts[0]) === null || _d === void 0 ? void 0 : _d.lenderFee;
        const borrowerFee = Number.isNaN(Number((_e = contracts[0]) === null || _e === void 0 ? void 0 : _e.borrowerFee))
            ? 0
            : (_f = contracts[0]) === null || _f === void 0 ? void 0 : _f.borrowerFee;
        const lenderAndBorrowerFee = lenderFee + borrowerFee;
        const incomeInSatoshi = paymentPlanFees + lenderAndBorrowerFee;
        const incomeInBtc = incomeInSatoshi / btcPriceInSatoshi;
        const incomeInUsd = btcPriceInUsd * incomeInBtc;
        return {
            usd: incomeInUsd,
            satoshi: incomeInSatoshi,
            btc: incomeInBtc,
        };
    });
}
exports.income = income;
function interestRate() {
    var _a, _b, _c, _d, _e, _f;
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const contracts = yield contract_model_1.Contract.aggregate([
            {
                $sort: {
                    'paymentPlan.interest': 1,
                },
            },
            {
                $group: {
                    _id: '$null',
                    interest: {
                        $push: '$$CURRENT',
                    },
                },
            },
            {
                $project: {
                    max: {
                        $arrayElemAt: ['$interest', -1],
                    },
                    min: {
                        $arrayElemAt: ['$interest', 0],
                    },
                },
            },
        ]);
        const maxInterest = (_c = (_b = (_a = contracts[0]) === null || _a === void 0 ? void 0 : _a.max) === null || _b === void 0 ? void 0 : _b.paymentPlan) === null || _c === void 0 ? void 0 : _c.map((max) => max.interest);
        const minInterest = (_f = (_e = (_d = contracts[0]) === null || _d === void 0 ? void 0 : _d.min) === null || _e === void 0 ? void 0 : _e.paymentPlan) === null || _f === void 0 ? void 0 : _f.map((min) => min.interest);
        const mediaValue = maxInterest[0] + minInterest[0];
        const medInterest = mediaValue / 2;
        return {
            maxInterest: maxInterest[0],
            medInterest,
            minInterest: minInterest[0],
        };
    });
}
exports.interestRate = interestRate;
function getIncomeByDate(body) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const monday = (0, getDay_1.getDay)(body.startDate, 1, 6);
        const sunday = (0, getDay_1.getDay)(body.startDate, 7, 0);
        const contractsIncomeByDate = yield contract_model_1.Contract.aggregate([
            {
                $match: {
                    startDate: {
                        $gte: monday,
                        $lte: sunday,
                    },
                },
            },
            {
                $unwind: '$paymentPlan',
            },
            {
                $group: {
                    _id: '$startDate',
                    fees: {
                        $sum: '$paymentPlan.fees',
                    },
                },
            },
            {
                $sort: {
                    _id: 1,
                },
            },
        ]);
        return { contractsIncomeByDate };
    });
}
exports.getIncomeByDate = getIncomeByDate;
// export async function getIncomeByMonth(body: TGetByDate) {
//   const firstDay = new Date(
//     body.startDate.getFullYear(),
//     body.startDate.getMonth(),
//     1
//   );
//   const lastDay = new Date(
//     body.startDate.getFullYear(),
//     body.startDate.getMonth() + 1,
//     0
//   );
//   const incomesByMonth = await Contract.aggregate([
//     {
//       $unwind: '$paymentPlan',
//     },
//     {
//       $match: {
//         startDate: {
//           $gte: firstDay,
//           $lte: lastDay,
//         },
//       },
//     },
//     {
//       $group: {
//         _id: '$paymentPlan.paymentDate',
//         paymentPlanFees: {
//           $sum: '$paymentPlan.fees',
//         },
//         total: {
//           $sum: 1,
//         },
//       },
//     },
//   ]);
//   const weeks = {
//     days0To7: [],
//     days8To14: [],
//     days15To21: [],
//     days21ToEnd: [],
//   };
//   const distributeByWeeks = incomesByMonth?.map((e) => {
//     if (e._id.getDate().toString() <= 6) {
//       return weeks.days0To7.push(e);
//     }
//     if (e._id.getDate().toString() <= 13 && e._id.getDate().toString() >= 7) {
//       return weeks.days8To14.push(e);
//     }
//     if (e._id.getDate().toString() <= 20 && e._id.getDate().toString() >= 14) {
//       return weeks.days15To21.push(e);
//     }
//     return weeks.days21ToEnd.push(e);
//   });
//   console.log('soy incomes', incomesByMonth)
//   return weeks;
// }
function getLoansByDate(body) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const monday = (0, getDay_1.getDay)(body.startDate, 1, 6);
        const sunday = (0, getDay_1.getDay)(body.startDate, 7, 0);
        const contractsLoansByDate = yield contract_model_1.Contract.aggregate([
            {
                $match: {
                    startDate: {
                        $gte: monday,
                        $lte: sunday,
                    },
                },
            },
            {
                $group: {
                    _id: '$startDate',
                    loans: {
                        $sum: 1,
                    },
                },
            },
            {
                $sort: {
                    _id: 1,
                },
            },
        ]);
        return { contractsLoansByDate };
    });
}
exports.getLoansByDate = getLoansByDate;
function getDefaultPaymentContractsByMonth() {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const defaultPaymentContractsByMonth = yield contract_model_1.Contract.aggregate([
            {
                $unwind: '$paymentPlan',
            },
            {
                $match: {
                    onDefault: true,
                    $expr: {
                        $gte: [
                            '$paymentPlan.payment',
                            {
                                $subtract: [new Date(), 90 * 24 * 60 * 60 * 1000],
                            },
                        ],
                    },
                },
            },
            {
                $addFields: {
                    rangeTime: {
                        $cond: {
                            if: {
                                $gte: [
                                    '$paymentPlan.payment',
                                    {
                                        $subtract: [new Date(), 30 * 24 * 60 * 60 * 1000],
                                    },
                                ],
                            },
                            then: 'range_30_now',
                            else: {
                                $cond: {
                                    if: {
                                        $gte: [
                                            '$paymentPlan.payment',
                                            {
                                                $subtract: [new Date(), 60 * 24 * 60 * 60 * 1000],
                                            },
                                        ],
                                    },
                                    then: 'range_60_30',
                                    else: {
                                        $cond: {
                                            if: {
                                                $gte: [
                                                    '$paymentPlan.payment',
                                                    {
                                                        $subtract: [new Date(), 90 * 24 * 60 * 60 * 1000],
                                                    },
                                                ],
                                            },
                                            then: 'range_90_60',
                                            else: '$null',
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            },
            {
                $group: {
                    _id: {
                        r: '$rangeTime',
                    },
                    total: {
                        $sum: 1,
                    },
                },
            },
            {
                $project: {
                    rangeTime: '$_id.r',
                    total: 1,
                    _id: 0,
                },
            },
        ]);
        return { defaultPaymentContractsByMonth };
    });
}
exports.getDefaultPaymentContractsByMonth = getDefaultPaymentContractsByMonth;
function getDefaultPaymentContractsByDate(body) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const monday = (0, getDay_1.getDay)(body.startDate, 1, 6);
        const sunday = (0, getDay_1.getDay)(body.startDate, 7, 0);
        const defaultPaymentContractsByDate = yield contract_model_1.Contract.aggregate([
            {
                $unwind: '$paymentPlan',
            },
            {
                $match: {
                    onDefault: true,
                    'paymentPlan.payment': {
                        $gte: monday,
                        $lte: sunday,
                    },
                },
            },
            {
                $group: {
                    _id: '$paymentPlan.payment',
                    paymentContracts: {
                        $sum: 1,
                    },
                },
            },
            {
                $sort: {
                    _id: 1,
                },
            },
        ]);
        return { defaultPaymentContractsByDate };
    });
}
exports.getDefaultPaymentContractsByDate = getDefaultPaymentContractsByDate;
function indicators() {
    var _a, _b, _c, _d;
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const { satoshi: satoshiBalance } = yield income();
        const totalLoans = yield contract_model_1.Contract.count();
        const onDefault = yield contract_model_1.Contract.aggregate([
            {
                $match: {
                    onDefault: true,
                },
            },
            {
                $count: 'onDefault',
            },
        ]);
        const concluded = yield contract_model_1.Contract.aggregate([
            {
                $match: {
                    status: 'concluded',
                },
            },
            {
                $count: 'concluded',
            },
        ]);
        return {
            satoshiBalance,
            totalLoans,
            onDefault: (_b = (_a = onDefault[0]) === null || _a === void 0 ? void 0 : _a.onDefault) !== null && _b !== void 0 ? _b : 0,
            concluded: (_d = (_c = concluded[0]) === null || _c === void 0 ? void 0 : _c.concluded) !== null && _d !== void 0 ? _d : 0,
        };
    });
}
exports.indicators = indicators;
function userEarnings(body) {
    const finance = new financejs_1.Finance();
    // // To calculate Amortization
    const financeOne = finance.AM(body.amount, body.interest, body.months, 1);
    const totalAmortization = financeOne * body.months;
    const userGain = totalAmortization - body.amount;
    return {
        earning: userGain,
    };
}
exports.userEarnings = userEarnings;
function getPaymentPlan(amount, interest, months) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const monthlyInterestRate = interest / 100 / 12;
        const installment = interest === 0
            ? amount / months
            : (amount * monthlyInterestRate) /
                (1 - Math.pow((1 + monthlyInterestRate), -months));
        let initialCapital = amount;
        const paymentPlan = [];
        for (let month = 1; month <= months; month += 1) {
            const currentDate = new Date();
            const currentMonth = currentDate.getMonth();
            const fees = initialCapital * monthlyInterestRate;
            const capital = installment - fees;
            initialCapital -= capital;
            const paymentDate = new Date(currentDate.setMonth(currentMonth + month));
            paymentPlan.push({
                amount: installment,
                originalAmount: installment,
                rate: interest,
                fees,
                originalFees: fees,
                paymentDate,
            });
        }
        return paymentPlan;
    });
}
exports.getPaymentPlan = getPaymentPlan;
function amortization(body) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const contractAmortization = yield getPaymentPlan(body.amount, body.interest, body.months);
        return { getAmortization: contractAmortization };
    });
}
exports.amortization = amortization;
function getMyContracts(body, token) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const { data: user } = yield (0, userInfo_1.getUserInfo)(token);
        const filters = {
            $or: [{ lender: user === null || user === void 0 ? void 0 : user.id }, { borrower: user === null || user === void 0 ? void 0 : user.id }],
            active: true,
        };
        if (body === null || body === void 0 ? void 0 : body.status) {
            filters.status = body === null || body === void 0 ? void 0 : body.status;
        }
        if ((body === null || body === void 0 ? void 0 : body.startDate) && (body === null || body === void 0 ? void 0 : body.endDate)) {
            filters.createdAt = {
                $gte: body === null || body === void 0 ? void 0 : body.startDate,
                $lte: body === null || body === void 0 ? void 0 : body.endDate,
            };
        }
        if ((body === null || body === void 0 ? void 0 : body.role) && body.role === 'lender') {
            filters.lender = user === null || user === void 0 ? void 0 : user.id;
            filters.borrower = {
                $nin: user === null || user === void 0 ? void 0 : user.id,
            };
        }
        if ((body === null || body === void 0 ? void 0 : body.role) && (body === null || body === void 0 ? void 0 : body.role) === 'borrower') {
            filters.borrower = user === null || user === void 0 ? void 0 : user.id;
            filters.lender = {
                $nin: user === null || user === void 0 ? void 0 : user.id,
            };
        }
        return pagination(body === null || body === void 0 ? void 0 : body.page, body === null || body === void 0 ? void 0 : body.perPage, filters);
    });
}
exports.getMyContracts = getMyContracts;
function sendContract(body, token) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const content = Object.keys(body).reduce((finalTemplateContent, key) => finalTemplateContent.replace(key, body[key]), body.templateContent);
        const s3 = yield signS3Service.signS3Service({
            filename: `${body.requestId}_contract.pdf`,
            filetype: 'application/pdf',
        });
        pdfmake_1.default.vfs = vfs_fonts_1.default.pdfMake.vfs;
        const { JSDOM } = jsdom_1.default;
        const { window } = new JSDOM('');
        const html = (0, html_to_pdfmake_1.default)(content, { window });
        const docDefinition = {
            content: [html],
        };
        const pdfDocGenerator = pdfmake_1.default.createPdf(docDefinition);
        pdfDocGenerator.getBuffer((buffer) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            fs_1.default.writeFileSync('example.pdf', buffer);
            const requestOptions = {
                headers: {
                    'Content-Type': 'application/pdf',
                    'x-amz-acl': 'public-read',
                },
            };
            yield axios_1.default.put(s3.signedRequest, fs_1.default.readFileSync('example.pdf'), requestOptions);
        }));
        yield (0, wauEmail_1.sendEmail)('loan_contract_started_request_accepted', token, {
            name: `${body.borrowerName} ${body.borrowerLastName}`,
            application_number: `#${body.offerReferenceNumber}`,
            loan_amount: `${body.amountInUSDC} USD`,
            interest_rate: body.interestRate,
            payment_period: `${body.installments} meses`,
        }, s3.url, body.borrowerEmail);
        yield (0, wauEmail_1.sendEmail)('loan_contract_started_offer_accepted', token, {
            name: `${body.lenderName} ${body.lenderLastName}`,
            contract_number: `#${body.offerReferenceNumber}`,
        }, s3.url, body.lenderEmail);
    });
}
exports.sendContract = sendContract;
function getContractsFilterByStatusByUser(body, token) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const { data: user } = yield (0, userInfo_1.getUserInfo)(token);
        const filters = {
            $or: [{ lender: user === null || user === void 0 ? void 0 : user.id }, { borrower: user === null || user === void 0 ? void 0 : user.id }],
        };
        if (body.status) {
            filters.status = body.status;
        }
        const options = {
            sort: {
                createdAt: -1,
            },
        };
        return pagination(body.page, body.perPage, filters, null, options);
    });
}
exports.getContractsFilterByStatusByUser = getContractsFilterByStatusByUser;
function getPreCancelInfo(body, token) {
    var _a;
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const contract = yield findOne({ _id: body.contractId });
        const loanRequest = yield loanRequestService.findOne({
            _id: contract.loanRequest,
        });
        const btcPrice = yield (0, apiPriceBtc_1.apiPriceBtc)();
        const wallet = yield (0, walletService_1.getUserWallet)(token, loanRequest.selectedWallet);
        if (!wallet)
            throw new NoSentryError_1.NoSentryError('Token has expired. Login again.');
        const userWallet = yield (0, formatWallet_1.formatWallet)(wallet, btcPrice);
        const capital = (_a = contract === null || contract === void 0 ? void 0 : contract.paymentPlan) === null || _a === void 0 ? void 0 : _a.reduce((unpaidCapital, paymentPlan) => {
            let accumulatedUnpaidCapital = unpaidCapital;
            if (!paymentPlan.paid) {
                accumulatedUnpaidCapital += paymentPlan.amount - paymentPlan.fees;
            }
            return accumulatedUnpaidCapital;
        }, 0);
        const currentDate = new Date();
        const currentDay = currentDate.getDate();
        const interest = (capital * currentDay * (contract.rate / 100)) / 360;
        const amountToPay = capital + interest;
        const amountToPayInSats = yield (0, convertFromUSDC_1.convertFromUSDC)(wallet.type, btcPrice, amountToPay);
        return { amountToPay, amountToPayInSats, userWallet };
    });
}
exports.getPreCancelInfo = getPreCancelInfo;
function preCancel(body, token) {
    var _a, _b, _c, _d, _e;
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const { data: user } = yield (0, userInfo_1.getUserInfo)(token);
        const contract = yield findOne({ _id: body.contractId });
        if (!contract)
            throw new NoSentryError_1.NoSentryError('Contract does not exist');
        if (contract.status === 'concluded')
            throw new NoSentryError_1.NoSentryError('Contract has concluded');
        const loanRequest = yield loanRequestService.findOne({
            _id: contract.loanRequest,
        });
        const wallet = yield (0, walletService_1.getUserWallet)(token, loanRequest.selectedWallet);
        const btcPrice = yield (0, apiPriceBtc_1.apiPriceBtc)();
        const amountToPayInSats = yield (0, convertFromUSDC_1.convertFromUSDC)(wallet.type, btcPrice, body.amountToPay);
        const amountPercentage = (amountToPayInSats * 1) / 100;
        if (wallet.available_balance < amountToPayInSats + amountPercentage)
            throw new NoSentryError_1.NoSentryError('Amount to pay not available');
        const acceptedOffer = yield loanOfferService.findOne({
            _id: { $in: loanRequest.offers },
            status: 'approved',
        });
        try {
            yield (0, transfer_1.transfer)({
                amount: amountToPayInSats,
                fromWalletId: loanRequest.selectedWallet,
                toWalletId: acceptedOffer.selectedWallet,
            }, token);
        }
        catch (error) {
            throw new NoSentryError_1.NoSentryError(error.message);
        }
        // suma de todos los fee restantes para guardarlo en la transaction
        const interest = contract.paymentPlan.reduce((acum, element) => (!element.paid ? acum + element.fees : acum), 0);
        contract.paymentDue = false;
        const updatedPaymentPlans = contract.paymentPlan.map((paymentPlan) => {
            const { status, paid } = paymentPlan, rest = tslib_1.__rest(paymentPlan, ["status", "paid"]);
            const updatedPaymentPlan = Object.assign({ status: paymentPlan.status === 'next_payment' ? 'successful' : status, paid: true }, rest);
            return updatedPaymentPlan;
        });
        contract.paymentPlan = updatedPaymentPlans;
        contract.status = 'concluded';
        contract.preCancel = true;
        yield contract.save();
        yield transactionService.createTransaction({
            contract: contract._id,
            from: contract.borrower,
            to: contract.lender,
            amount: body.amountToPay,
            lenderFee: 0,
            borrowerFee: 0,
            interest,
            type: 'payment',
        }, contract.borrower, contract.lender);
        const notificationVariables = {
            '{{name}}': (_e = `${(_b = (_a = user === null || user === void 0 ? void 0 : user.metamapStatus) === null || _a === void 0 ? void 0 : _a.dni_firstName) === null || _b === void 0 ? void 0 : _b.split(' ')[0]} ${(_d = (_c = user === null || user === void 0 ? void 0 : user.metamapStatus) === null || _c === void 0 ? void 0 : _c.dni_lastName) === null || _d === void 0 ? void 0 : _d.split(' ')[0]}`) !== null && _e !== void 0 ? _e : user === null || user === void 0 ? void 0 : user.name,
            '{{contractNumber}}': contract === null || contract === void 0 ? void 0 : contract.referenceNumber,
        };
        yield (0, createNotification_1.createNotification)(
        // notification Precancelación de crédito
        {
            messageTemplateId: '65a8344d2d07da37baf04e18',
            model: 'contract',
            module: 'loans',
            object: contract === null || contract === void 0 ? void 0 : contract._id,
            recipientId: contract === null || contract === void 0 ? void 0 : contract.lender,
            senderId: user === null || user === void 0 ? void 0 : user.id,
            variables: notificationVariables,
        }, token);
        return contract;
    });
}
exports.preCancel = preCancel;
function getUserStats(body, token) {
    var _a, _b;
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        yield (0, userInfo_1.getUserInfo)(token);
        const settings = yield settingService.findOne({ active: true });
        const { arrOfAmounts, sumContractsRequestAmount } = yield (0, request_1.getValidAmounts)(body === null || body === void 0 ? void 0 : body.borrower, (_a = settings === null || settings === void 0 ? void 0 : settings.contract) === null || _a === void 0 ? void 0 : _a.allowedBlocks, (_b = settings === null || settings === void 0 ? void 0 : settings.contract) === null || _b === void 0 ? void 0 : _b.amountOfBlocksAllowed);
        const creditsReceived = yield (0, creditsReceived_1.getUserCredits)(body === null || body === void 0 ? void 0 : body.borrower, 'borrower');
        const creditsPaidOnTime = yield (0, creditsPaidOnTime_1.getUserCreditsPaidOnTime)(body === null || body === void 0 ? void 0 : body.borrower);
        const creditsPaidLate = yield (0, creditsPaidLate_1.getUserCreditsPaidLate)(body === null || body === void 0 ? void 0 : body.borrower);
        const availableCredit = arrOfAmounts[arrOfAmounts.length - 1] - sumContractsRequestAmount;
        return {
            minAmount: arrOfAmounts[0],
            maxAmount: arrOfAmounts[arrOfAmounts.length - 1],
            creditsReceived,
            creditsPaidOnTime,
            creditsPaidLate,
            availableCredit,
        };
    });
}
exports.getUserStats = getUserStats;
function addOriginalValues() {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const activeContracts = yield contract_model_1.Contract.find({ status: 'active' });
        for (const contract of activeContracts) {
            const originalPaymentPlan = yield getPaymentPlan(contract.amountInUSDC, contract.rate, contract.paymentPlan.length);
            const newPaymentPlan = contract.paymentPlan.map((paymentPlan, index) => {
                paymentPlan.originalAmount = originalPaymentPlan[index].originalAmount;
                paymentPlan.originalFees = originalPaymentPlan[index].originalFees;
                return paymentPlan;
            });
            contract.paymentPlan = newPaymentPlan;
        }
        return Promise.all(activeContracts.map((contract) => contract.save()));
    });
}
exports.addOriginalValues = addOriginalValues;
function contractAndCreditScoreDetails() {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w;
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const wb = new excel4node_1.default.Workbook();
        const ws = wb.addWorksheet('credolab_users_payments');
        const headers = [
            'Reference Number',
            'Collected Date',
            'Due Date 1',
            'Payment Date 1',
            'Due date 2',
            'Payment date 2',
            'Concluded Contract',
            'Pre Cancel',
            'On Default',
        ];
        headers.forEach((header, index) => {
            ws.cell(1, index + 1).string(header);
        });
        ws.column(1).setWidth(60);
        ws.column(2).setWidth(15);
        ws.column(3).setWidth(15);
        ws.column(4).setWidth(15);
        ws.column(5).setWidth(15);
        ws.column(6).setWidth(15);
        ws.column(8).setWidth(20);
        ws.column(7).setWidth(15);
        ws.column(9).setWidth(15);
        const contracts = yield find();
        let currentRow = 2; // Comenzamos desde la segunda fila
        for (let i = 0; i <= contracts.length - 1; i += 1) {
            const userCreditScore = yield creditScoreService.findOne({
                user: (_a = contracts[i]) === null || _a === void 0 ? void 0 : _a.borrower,
            });
            const paymentsOfContract = yield transactionService.find({
                contract: (_b = contracts[i]) === null || _b === void 0 ? void 0 : _b._id,
                type: 'payment',
            }, {}, {
                sort: {
                    createdAt: 1,
                },
            });
            ws.cell(currentRow, 1).string((_c = userCreditScore === null || userCreditScore === void 0 ? void 0 : userCreditScore.values[userCreditScore.values.length - 1]) === null || _c === void 0 ? void 0 : _c.referenceNumber);
            ws.cell(currentRow, 2).string((_d = userCreditScore === null || userCreditScore === void 0 ? void 0 : userCreditScore.values[userCreditScore.values.length - 1]) === null || _d === void 0 ? void 0 : _d.createdAt.toISOString().split('T')[0]);
            ws.cell(currentRow, 3).string((_h = (_g = (_f = (_e = contracts[i]) === null || _e === void 0 ? void 0 : _e.paymentPlan[0]) === null || _f === void 0 ? void 0 : _f.paymentDate) === null || _g === void 0 ? void 0 : _g.toISOString().split('T')[0]) !== null && _h !== void 0 ? _h : '-');
            ws.cell(currentRow, 4).string((_l = (_k = (_j = paymentsOfContract[0]) === null || _j === void 0 ? void 0 : _j.createdAt) === null || _k === void 0 ? void 0 : _k.toISOString().split('T')[0]) !== null && _l !== void 0 ? _l : '-');
            ws.cell(currentRow, 5).string((_q = (_p = (_o = (_m = contracts[i]) === null || _m === void 0 ? void 0 : _m.paymentPlan[1]) === null || _o === void 0 ? void 0 : _o.paymentDate) === null || _p === void 0 ? void 0 : _p.toISOString().split('T')[0]) !== null && _q !== void 0 ? _q : '-');
            ws.cell(currentRow, 6).string((_t = (_s = (_r = paymentsOfContract[1]) === null || _r === void 0 ? void 0 : _r.createdAt) === null || _s === void 0 ? void 0 : _s.toISOString().split('T')[0]) !== null && _t !== void 0 ? _t : '-');
            ws.cell(currentRow, 7).string(((_u = contracts[i]) === null || _u === void 0 ? void 0 : _u.status) === 'concluded' ? 'SI' : 'NO');
            ws.cell(currentRow, 8).string(((_v = contracts[i]) === null || _v === void 0 ? void 0 : _v.preCancel) ? 'SI' : 'NO');
            ws.cell(currentRow, 9).string(((_w = contracts[i]) === null || _w === void 0 ? void 0 : _w.onDefault) ? 'SI' : 'NO');
            ws.row(currentRow).setHeight(25);
            currentRow += 1;
        }
        wb.write(`Suni-users-payment-${new Date().toISOString().slice(0, 10)}.xlsx`, function (err, stats) {
            if (err) {
                console.error(err);
            }
            else {
                console.log(stats); // Prints out an instance of a node.js fs.Stats object
            }
        });
        return true;
    });
}
exports.contractAndCreditScoreDetails = contractAndCreditScoreDetails;
//# sourceMappingURL=contract.service.js.map