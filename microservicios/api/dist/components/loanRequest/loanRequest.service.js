"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateForLoanRequest = exports.cancelRequest = exports.getCostsOfRequest = exports.getUserRequestAmounts = exports.getMyLoanRequests = exports.getOneLoanOfferForRequest = exports.getLoanOffersForRequest = exports.createLoanOffer = exports.getMarketLoanRequests = exports.pagination = exports.create = exports.updateOne = exports.find = exports.findOne = void 0;
const tslib_1 = require("tslib");
const mongoose_1 = tslib_1.__importDefault(require("mongoose"));
const dayjs_1 = tslib_1.__importDefault(require("dayjs"));
const utc_1 = tslib_1.__importDefault(require("dayjs/plugin/utc"));
const timezone_1 = tslib_1.__importDefault(require("dayjs/plugin/timezone"));
const utils_1 = require("../../utils");
const loanRequest_model_1 = require("./loanRequest.model");
const loanOfferService = tslib_1.__importStar(require("../loanOffer/loanOffer.service"));
const settingsService = tslib_1.__importStar(require("../settings/settings/settings.service"));
const userInfo_1 = require("../../utils/walletService/userInfo");
const currencyService = tslib_1.__importStar(require("../currency/currency.service"));
const walletService_1 = require("../../utils/walletService");
const creditScoreService = tslib_1.__importStar(require("../creditScore/creditScore/creditScore.service"));
const walletCurrency_1 = require("../../utils/validations/walletCurrency");
const request_1 = require("../../utils/validations/request");
const cancelAd_1 = require("../../utils/walletService/cancelAd");
const convertFromUSDC_1 = require("../../utils/coinConversion/convertFromUSDC");
const apiPriceBtc_1 = require("../../utils/apiPriceBtc");
const paymentFeeService_1 = require("../../utils/walletService/paymentFeeService");
const notificationService = tslib_1.__importStar(require("../notification/notification.service"));
const wauEmail_1 = require("../../utils/emails/wauEmail");
const rejectOffers_1 = require("../../utils/rejectOffers");
const contractService = tslib_1.__importStar(require("../contract/contract/contract.service"));
const sendNotification_1 = require("../../utils/pushNotifications/sendNotification");
const createNotification_1 = require("../../utils/avilaServices/createNotification");
dayjs_1.default.extend(utc_1.default);
dayjs_1.default.extend(timezone_1.default);
function findOne(filter, projection, options) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return loanRequest_model_1.LoanRequest.findOne(filter, projection, options).exec();
    });
}
exports.findOne = findOne;
function find(filter, projection, options) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return loanRequest_model_1.LoanRequest.find(filter, projection, options).exec();
    });
}
exports.find = find;
function updateOne(filter, update, options) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return loanRequest_model_1.LoanRequest.updateOne(filter, update, options).exec();
    });
}
exports.updateOne = updateOne;
function create(body, token) {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const { data: user } = yield (0, userInfo_1.getUserInfo)(token);
        const session = yield mongoose_1.default.startSession();
        try {
            session.startTransaction();
            const { selectedWallet, amount, installments, credolabReferenceNumber } = body;
            const settings = yield settingsService.findOne({ active: true });
            const { userLoanRequest, serviceFee } = yield (0, request_1.validateRequestFee)(body.currency, settings, body.amount, user);
            const { isAllowed, message } = yield validateForLoanRequest(token, user, serviceFee, userLoanRequest, settings, {
                currency: body.currency,
                amount,
                selectedWallet,
                installments,
                version: body.version,
            });
            if (!isAllowed)
                throw new utils_1.NoSentryError(message);
            const credolabDataset = yield creditScoreService.getCredolabDataset(credolabReferenceNumber);
            let creditScore = null;
            credolabDataset.forEach((insight) => {
                var _a;
                if ((insight === null || insight === void 0 ? void 0 : insight.code) === 'Score')
                    creditScore = (_a = insight === null || insight === void 0 ? void 0 : insight.value) === null || _a === void 0 ? void 0 : _a.score;
            });
            if (!creditScore) {
                throw new utils_1.NoSentryError('Credolab score not available');
            }
            const createdCreditScoreUser = yield creditScoreService.create({
                values: {
                    referenceNumber: credolabReferenceNumber,
                    value: creditScore,
                    provider: 'credolab',
                },
            }, token, session);
            const currency = yield currencyService.findOne({
                symbol: (_a = body === null || body === void 0 ? void 0 : body.currency) === null || _a === void 0 ? void 0 : _a.toLowerCase(),
            });
            const userName = (_c = (_b = user === null || user === void 0 ? void 0 : user.metamapStatus) === null || _b === void 0 ? void 0 : _b.dni_firstName) !== null && _c !== void 0 ? _c : user === null || user === void 0 ? void 0 : user.name;
            const userLastName = (_e = (_d = user === null || user === void 0 ? void 0 : user.metamapStatus) === null || _d === void 0 ? void 0 : _d.dni_lastName) !== null && _e !== void 0 ? _e : user === null || user === void 0 ? void 0 : user.lastname;
            const createdLoanRequest = yield loanRequest_model_1.LoanRequest.create([
                {
                    selectedWalletCurrency: currency._id,
                    borrower: user === null || user === void 0 ? void 0 : user.id,
                    borrowerInfo: {
                        name: userName,
                        lastName: userLastName,
                        country: (_f = user === null || user === void 0 ? void 0 : user.metamapStatus) === null || _f === void 0 ? void 0 : _f.country,
                        dni: (_g = user === null || user === void 0 ? void 0 : user.metamapStatus) === null || _g === void 0 ? void 0 : _g.dni_value,
                        email: user === null || user === void 0 ? void 0 : user.email,
                    },
                    amountInUSDC: amount,
                    installments,
                    selectedWallet,
                    country: (_h = user === null || user === void 0 ? void 0 : user.metamapStatus) === null || _h === void 0 ? void 0 : _h.country,
                    creditScore,
                },
            ], { session });
            const creditScoreVariables = {
                name: `${userName} ${userLastName}`,
            };
            if (createdCreditScoreUser) {
                yield (0, wauEmail_1.sendEmail)('credolab_score_created', token, creditScoreVariables, null, user === null || user === void 0 ? void 0 : user.email);
            }
            const notificationBorrower = yield notificationService.create({
                user: createdLoanRequest[0].borrower,
                collectionName: 'loan',
                message: `Número de referencia de solicitud de préstamo: ${createdLoanRequest[0].referenceNumber}`,
                subject: 'Se ha creado una solicitud de préstamo',
                active: true,
            }, session);
            const loanRequestVariables = {
                name: `${userName} ${userLastName}`,
                application_number: `#${createdLoanRequest[0].referenceNumber}`,
            };
            yield (0, wauEmail_1.sendEmail)('loan_request_processed', token, loanRequestVariables, null, user === null || user === void 0 ? void 0 : user.email);
            if (userLoanRequest) {
                const borrowerBalanceLock = {
                    token,
                    walletId: selectedWallet,
                    fee: serviceFee,
                    service: 'loan_request',
                };
                yield (0, paymentFeeService_1.paymentServiceFee)(borrowerBalanceLock);
            }
            yield session.commitTransaction();
            return createdLoanRequest[0];
        }
        catch (error) {
            yield session.abortTransaction();
            throw new utils_1.NoSentryError(error);
        }
        finally {
            session.endSession();
        }
    });
}
exports.create = create;
function pagination(page, perPage, filter, projection, options) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return (0, utils_1.paginateModel)(page, perPage, loanRequest_model_1.LoanRequest, filter, projection, options);
    });
}
exports.pagination = pagination;
function getMarketLoanRequests(body, token) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        // servicio de buscar todas las solicitudes
        // obtener las solicitudes que no son mias  y sort de mayor creditscore
        const { data: user } = yield (0, userInfo_1.getUserInfo)(token);
        const filters = {
            status: 'active',
            active: true,
            borrower: {
                $ne: user === null || user === void 0 ? void 0 : user.id,
            },
        };
        const options = {
            sort: {
                creditScore: -1,
            },
        };
        return pagination(body === null || body === void 0 ? void 0 : body.page, body === null || body === void 0 ? void 0 : body.perPage, filters, null, options);
    });
}
exports.getMarketLoanRequests = getMarketLoanRequests;
function createLoanOffer(body, token) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x;
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const { data: user } = yield (0, userInfo_1.getUserInfo)(token);
        const session = yield mongoose_1.default.startSession();
        try {
            session.startTransaction();
            const userWallet = yield (0, walletService_1.getUserWallet)(token, body.selectedWallet);
            yield (0, walletCurrency_1.validateWalletAndTransactionCurrency)(userWallet, body.currency);
            const settings = yield settingsService.findOne({
                active: true,
            });
            const loanRequest = yield findOne({
                _id: body.loanRequest,
            }, null, { session });
            if (!loanRequest) {
                throw new utils_1.NoSentryError('Request not found');
            }
            if (user.id === loanRequest.borrower)
                throw new utils_1.NoSentryError('Cannot take your loan request');
            const day = (0, dayjs_1.default)();
            let expirationDate;
            // regla de eslint de no usar doble ternario, se cambiaron por if else si no manda expiration el front lo tomamos de los settings
            if (body.expirationHours || body.expirationMinutes) {
                expirationDate = day
                    .add((_a = body.expirationHours) !== null && _a !== void 0 ? _a : 0, 'hour')
                    .add((_b = body.expirationMinutes) !== null && _b !== void 0 ? _b : 0, 'minute')
                    .format();
            }
            else if (settings.offerExpiration.type === 'minutes') {
                expirationDate = day
                    .add((_c = settings === null || settings === void 0 ? void 0 : settings.offerExpiration) === null || _c === void 0 ? void 0 : _c.rate, 'minute')
                    .format();
            }
            else {
                expirationDate = day
                    .add((_d = settings === null || settings === void 0 ? void 0 : settings.offerExpiration) === null || _d === void 0 ? void 0 : _d.rate, 'hour')
                    .format();
            }
            if (body.interestRate < (settings === null || settings === void 0 ? void 0 : settings.minInterestRate))
                throw new utils_1.NoSentryError(`Interest rate cannot be less than ${settings === null || settings === void 0 ? void 0 : settings.minInterestRate}`);
            if (body.interestRate > (settings === null || settings === void 0 ? void 0 : settings.maxInterestRate))
                throw new utils_1.NoSentryError(`Interest rate cannot be greater than ${settings === null || settings === void 0 ? void 0 : settings.maxInterestRate}`);
            const btcPrice = yield (0, apiPriceBtc_1.apiPriceBtc)();
            const serviceFeeInUSDC = settings.contractFees.lenderFee.type === 'percentage'
                ? (settings.contractFees.lenderFee.value * loanRequest.amountInUSDC) /
                    100
                : settings.contractFees.lenderFee.value;
            const serviceFee = yield (0, convertFromUSDC_1.convertFromUSDC)(body.currency.toLowerCase(), btcPrice, serviceFeeInUSDC);
            const amountInSelectedWalletCurrency = yield (0, convertFromUSDC_1.convertFromUSDC)(body.currency.toLowerCase(), btcPrice, loanRequest.amountInUSDC);
            const amountPercentage = ((serviceFee + amountInSelectedWalletCurrency) * 1) / 100;
            if (serviceFee + amountInSelectedWalletCurrency + amountPercentage >
                userWallet.available_balance)
                throw new utils_1.NoSentryError('Selected wallet balance is not enough to make offer');
            const block = yield (0, walletService_1.balanceLock)({
                token,
                walletId: body.selectedWallet,
                amount: amountInSelectedWalletCurrency,
                expiresAt: expirationDate,
                serviceFee,
            });
            const userName = (_f = (_e = user === null || user === void 0 ? void 0 : user.metamapStatus) === null || _e === void 0 ? void 0 : _e.dni_firstName) !== null && _f !== void 0 ? _f : user === null || user === void 0 ? void 0 : user.name;
            const userLastName = (_h = (_g = user === null || user === void 0 ? void 0 : user.metamapStatus) === null || _g === void 0 ? void 0 : _g.dni_lastName) !== null && _h !== void 0 ? _h : user === null || user === void 0 ? void 0 : user.lastname;
            const createdLoanOffer = yield loanOfferService.create({
                lender: user === null || user === void 0 ? void 0 : user.id,
                lenderInfo: {
                    name: userName,
                    lastName: userLastName,
                    country: (_j = user === null || user === void 0 ? void 0 : user.metamapStatus) === null || _j === void 0 ? void 0 : _j.country,
                    dni: (_k = user === null || user === void 0 ? void 0 : user.metamapStatus) === null || _k === void 0 ? void 0 : _k.dni_value,
                    email: user === null || user === void 0 ? void 0 : user.email,
                },
                interestRate: body.interestRate,
                selectedWallet: body.selectedWallet,
                expirationDate,
                currency: body.currency,
                amount: loanRequest.amountInUSDC,
                borrower: loanRequest.borrower,
                installments: loanRequest.installments,
                blockId: (_l = block === null || block === void 0 ? void 0 : block.data) === null || _l === void 0 ? void 0 : _l.id,
                blockedAmountInWalletCurrency: (_m = block === null || block === void 0 ? void 0 : block.data) === null || _m === void 0 ? void 0 : _m.amount,
                lenderFeeInUSDC: serviceFeeInUSDC,
                lenderFeeInWalletCurrency: serviceFee,
                referenceNumberOfLoanRequest: loanRequest.referenceNumber,
            }, session);
            const notificationLender = yield notificationService.create({
                user: createdLoanOffer[0].lender,
                collectionName: 'loan',
                message: `Se ha creado una oferta de préstamo para la solicitud: ${loanRequest.referenceNumber}`,
                subject: 'Se ha creado una oferta de préstamo',
                active: true,
            }, session);
            const notificationBorrower = yield notificationService.create({
                user: createdLoanOffer[0].borrower,
                collectionName: 'loan',
                message: `Has recibido una oferta de préstamo para la solicitud: ${loanRequest.referenceNumber}`,
                subject: 'Has recibido una oferta de préstamo',
                active: true,
            }, session);
            let offerDuration;
            if (body.expirationHours || body.expirationMinutes) {
                offerDuration = `${(_o = body.expirationHours) !== null && _o !== void 0 ? _o : 0} horas y ${(_p = body.expirationMinutes) !== null && _p !== void 0 ? _p : 0} minutos`;
            }
            else if (settings.offerExpiration.type === 'minutes') {
                offerDuration = `${(_q = settings === null || settings === void 0 ? void 0 : settings.offerExpiration) === null || _q === void 0 ? void 0 : _q.rate} minutos`;
            }
            else {
                offerDuration = `${(_r = settings === null || settings === void 0 ? void 0 : settings.offerExpiration) === null || _r === void 0 ? void 0 : _r.rate} horas`;
            }
            const variables = {
                name: `${(_s = loanRequest === null || loanRequest === void 0 ? void 0 : loanRequest.borrowerInfo) === null || _s === void 0 ? void 0 : _s.name} ${(_t = loanRequest === null || loanRequest === void 0 ? void 0 : loanRequest.borrowerInfo) === null || _t === void 0 ? void 0 : _t.lastName}`,
                application_number: `#${loanRequest === null || loanRequest === void 0 ? void 0 : loanRequest.referenceNumber}`,
                interest_rate: (_u = createdLoanOffer[0]) === null || _u === void 0 ? void 0 : _u.interestRate,
                offer_duration: offerDuration,
            };
            const paramsPush = {
                token,
                userId: loanRequest.borrower,
                title: 'Oferta de préstamo recibida',
                message: `Has recibido una nueva oferta de ${createdLoanOffer[0].interestRate}%
      en tu solicitud de préstamos ${loanRequest.referenceNumber}`,
            };
            yield (0, sendNotification_1.sendNotifications)(paramsPush);
            yield (0, wauEmail_1.sendEmail)('loan_offer_received', token, variables, null, (_v = loanRequest === null || loanRequest === void 0 ? void 0 : loanRequest.borrowerInfo) === null || _v === void 0 ? void 0 : _v.email);
            yield (0, createNotification_1.createNotification)(
            // notification Oferta de préstamo recibida
            {
                messageTemplateId: '65a834012d07da37baf04e09',
                model: 'loanRequest',
                module: 'loans',
                object: loanRequest === null || loanRequest === void 0 ? void 0 : loanRequest._id,
                recipientId: loanRequest === null || loanRequest === void 0 ? void 0 : loanRequest.borrower,
                senderId: user === null || user === void 0 ? void 0 : user.id,
            }, token);
            // agregar la oferta a la solicitud de prestamo
            try {
                loanRequest.offers.push(createdLoanOffer[0]._id);
                yield loanRequest.save();
            }
            catch (error) {
                console.log(error, 'error creating loan offer');
                yield (0, cancelAd_1.deleteBlock)(token, (_w = block === null || block === void 0 ? void 0 : block.data) === null || _w === void 0 ? void 0 : _w.id);
                createdLoanOffer[0].delete();
                throw new utils_1.NoSentryError('Error creating offer');
            }
            // comprobar si se creo correctamente
            if (!createdLoanOffer[0]) {
                yield (0, cancelAd_1.deleteBlock)(token, (_x = block === null || block === void 0 ? void 0 : block.data) === null || _x === void 0 ? void 0 : _x.id);
                throw new utils_1.NoSentryError('Error creating offer');
            }
            yield session.commitTransaction();
            return {
                loanRequest,
                loanOffer: createdLoanOffer[0],
            };
        }
        catch (error) {
            yield session.abortTransaction();
            throw new utils_1.NoSentryError(error);
        }
        finally {
            session.endSession();
        }
    });
}
exports.createLoanOffer = createLoanOffer;
function getLoanOffersForRequest(body, token) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        // servicio de obtener todas las ofertas de una solicitud
        const { data: user } = yield (0, userInfo_1.getUserInfo)(token);
        if (!user) {
            throw new utils_1.NoSentryError('User not found');
        }
        // obtenemos la solicitud
        const loanRequest = yield loanRequest_model_1.LoanRequest.findOne({
            _id: body.loanRequest,
        }).populate('offers');
        // validamos que haya una solicitud
        if (!loanRequest) {
            throw new utils_1.NoSentryError('Not found the loan request');
        }
        // buscamos las ofertas de esa solicitud
        const { offers } = loanRequest;
        return { loanOffers: offers };
    });
}
exports.getLoanOffersForRequest = getLoanOffersForRequest;
function getOneLoanOfferForRequest(body, token) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const { data: user } = yield (0, userInfo_1.getUserInfo)(token);
        if (!user) {
            throw new utils_1.NoSentryError('User not found');
        }
        const loanRequest = yield loanRequest_model_1.LoanRequest.findOne({
            _id: body.loanRequest,
        }).populate('offers');
        const loan = loanRequest.offers.find((element) => {
            const offer = element._id.toString() === body.loanOffer;
            return offer;
        });
        const loanOffer = yield loanOfferService.findOne({ _id: loan });
        return {
            loanRequest,
            loanOffer,
        };
    });
}
exports.getOneLoanOfferForRequest = getOneLoanOfferForRequest;
function getMyLoanRequests(body, token) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const { data: user } = yield (0, userInfo_1.getUserInfo)(token);
        const filters = {
            borrower: user === null || user === void 0 ? void 0 : user.id,
            active: true,
            status: 'active',
        };
        if ((body === null || body === void 0 ? void 0 : body.startDate) && (body === null || body === void 0 ? void 0 : body.endDate)) {
            filters.createdAt = {
                $gte: (body === null || body === void 0 ? void 0 : body.startDate) ? body === null || body === void 0 ? void 0 : body.startDate : { $ne: null },
                $lte: (body === null || body === void 0 ? void 0 : body.endDate) ? body === null || body === void 0 ? void 0 : body.endDate : { $ne: null },
            };
        }
        if (body === null || body === void 0 ? void 0 : body.status) {
            filters.status = body === null || body === void 0 ? void 0 : body.status;
        }
        return pagination(body === null || body === void 0 ? void 0 : body.page, body === null || body === void 0 ? void 0 : body.perPage, filters);
    });
}
exports.getMyLoanRequests = getMyLoanRequests;
function getUserRequestAmounts(token, body) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const { data: user } = yield (0, userInfo_1.getUserInfo)(token);
        const settings = yield settingsService.findOne({
            active: true,
        });
        const { arrOfAmounts, sumContractsRequestAmount } = yield (0, request_1.getValidAmounts)(user === null || user === void 0 ? void 0 : user.id, settings.contract.allowedBlocks, settings.contract.amountOfBlocksAllowed);
        if (!(body === null || body === void 0 ? void 0 : body.version)) {
            return {
                amounts: arrOfAmounts,
            };
        }
        if ((body === null || body === void 0 ? void 0 : body.version) === 'v2') {
            return {
                minAmount: arrOfAmounts[0],
                maxAmount: arrOfAmounts[arrOfAmounts.length - 1],
                availableCredit: arrOfAmounts[arrOfAmounts.length - 1] - sumContractsRequestAmount,
            };
        }
    });
}
exports.getUserRequestAmounts = getUserRequestAmounts;
function getCostsOfRequest(body, token) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        yield (0, userInfo_1.getUserInfo)(token);
        const settings = yield settingsService.findOne({
            active: true,
        });
        const btcPrice = yield (0, apiPriceBtc_1.apiPriceBtc)();
        const serviceFeeInUSDC = settings.contractFees.lenderFee.type === 'percentage'
            ? (settings.contractFees.lenderFee.value * body.amountInUSDC) / 100
            : settings.contractFees.lenderFee.value;
        const serviceFee = yield (0, convertFromUSDC_1.convertFromUSDC)(body.currency.toLowerCase(), btcPrice, serviceFeeInUSDC);
        const amountInSelectedWalletCurrency = yield (0, convertFromUSDC_1.convertFromUSDC)(body.currency.toLowerCase(), btcPrice, body.amountInUSDC);
        return {
            amountInSATS: serviceFee + amountInSelectedWalletCurrency,
            amountInUSDC: serviceFeeInUSDC + body.amountInUSDC,
        };
    });
}
exports.getCostsOfRequest = getCostsOfRequest;
function cancelRequest(body, token) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const { data: user } = yield (0, userInfo_1.getUserInfo)(token);
        const session = yield mongoose_1.default.startSession();
        try {
            session.startTransaction();
            if (!user) {
                throw new utils_1.NoSentryError('User not found');
            }
            const loanRequest = yield loanRequest_model_1.LoanRequest.findOne({
                $and: [
                    {
                        _id: body === null || body === void 0 ? void 0 : body._id,
                    },
                    {
                        borrower: user === null || user === void 0 ? void 0 : user.id,
                    },
                    {
                        status: 'active',
                    },
                    {
                        active: true,
                    },
                ],
            }, null, { session }).populate({
                path: 'offers',
                model: 'LoanOffer',
            });
            if (!loanRequest) {
                throw new utils_1.NoSentryError('Loan request not found');
            }
            yield Promise.all((0, rejectOffers_1.rejectOffers)(loanRequest, token, null, session));
            loanRequest.status = 'canceled';
            yield loanRequest.save();
            yield session.commitTransaction();
            return loanRequest;
        }
        catch (error) {
            yield session.abortTransaction();
            throw new utils_1.NoSentryError(error);
        }
        finally {
            session.endSession();
        }
    });
}
exports.cancelRequest = cancelRequest;
function validateForLoanRequest(token, user, serviceFee, userLoanRequest, settings, body) {
    var _a, _b, _c, _d, _e, _f;
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const userWallet = yield (0, walletService_1.getUserWallet)(token, body.selectedWallet);
        const { arrOfAmounts, sumContractsRequestAmount } = yield (0, request_1.getValidAmounts)(user === null || user === void 0 ? void 0 : user.id, (_a = settings === null || settings === void 0 ? void 0 : settings.contract) === null || _a === void 0 ? void 0 : _a.allowedBlocks, (_b = settings === null || settings === void 0 ? void 0 : settings.contract) === null || _b === void 0 ? void 0 : _b.amountOfBlocksAllowed);
        if (!(body === null || body === void 0 ? void 0 : body.version)) {
            const userRequest = yield loanRequest_model_1.LoanRequest.findOne({
                borrower: user.id,
                status: 'active',
            });
            if (userRequest) {
                return {
                    isAllowed: false,
                    message: 'You have an active loan application',
                };
            }
            const userContract = yield contractService.findOne({
                borrower: user.id,
                status: 'active',
            });
            if (userContract) {
                return {
                    isAllowed: false,
                    message: 'You have an active contract. You must finish it to request a new loan',
                };
            }
            if (!arrOfAmounts.includes(body.amount)) {
                return {
                    isAllowed: false,
                    message: `Invalid amount, possible request amounts are ${arrOfAmounts}`,
                };
            }
        }
        else if ((body === null || body === void 0 ? void 0 : body.version) === 'v2') {
            if (body.amount < arrOfAmounts[0] || // validacion de errores cuando el amount es menos o mayor al limite minimo y maximo de bloques
                body.amount > arrOfAmounts[arrOfAmounts.length - 1]) {
                return {
                    isAllowed: false,
                    message: arrOfAmounts.length === 1
                        ? `Invalid amount, possible request amount is ${arrOfAmounts[0]}`
                        : `Invalid amount, possible request amounts are between ${arrOfAmounts[0]} and ${arrOfAmounts[arrOfAmounts.length - 1]}`,
                };
            }
            if (arrOfAmounts[arrOfAmounts.length - 1] - sumContractsRequestAmount <
                arrOfAmounts[0]) {
                return {
                    isAllowed: false,
                    message: 'The available request amount is less than the mínimum request amount',
                };
            }
            if (sumContractsRequestAmount + body.amount >
                arrOfAmounts[arrOfAmounts.length - 1]) {
                return {
                    isAllowed: false,
                    message: `Amount exceeds the limit, possible request amounts are between ${arrOfAmounts[0]} and ${arrOfAmounts[arrOfAmounts.length - 1] - sumContractsRequestAmount}`,
                };
            }
        }
        if (body.installments < ((_d = (_c = settings === null || settings === void 0 ? void 0 : settings.contract) === null || _c === void 0 ? void 0 : _c.minMonthlyPayments) !== null && _d !== void 0 ? _d : 1) ||
            body.installments > ((_f = (_e = settings === null || settings === void 0 ? void 0 : settings.contract) === null || _e === void 0 ? void 0 : _e.maxMonthlyPayments) !== null && _f !== void 0 ? _f : 1)) {
            return {
                isAllowed: false,
                message: `Invalid number of installments, value most be between ${settings.contract.minMonthlyPayments} and ${settings.contract.maxMonthlyPayments}`,
            };
        }
        try {
            yield (0, walletCurrency_1.validateWalletAndTransactionCurrency)(userWallet, body.currency);
        }
        catch (e) {
            return { isAllowed: false, message: e.message };
        }
        // Logic to pay request fee
        if (serviceFee > userWallet.available_balance && userLoanRequest)
            return {
                isAllowed: false,
                message: 'Selected wallet available balance is not enough to make loan request',
            };
        return { isAllowed: true, message: 'User is allowed to make loan request' };
    });
}
exports.validateForLoanRequest = validateForLoanRequest;
//# sourceMappingURL=loanRequest.service.js.map