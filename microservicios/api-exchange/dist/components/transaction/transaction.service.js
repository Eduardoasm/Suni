"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFee = exports.getTransactionUser = exports.pagination = exports.releaseCrypto = exports.notifyPayment = exports.cancel = exports.create = exports.updateOne = exports.find = exports.customFindOne = exports.findOne = exports.getInProgressTransactions = void 0;
const tslib_1 = require("tslib");
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-unused-expressions */
/* eslint-disable array-callback-return */
/* eslint-disable import/no-cycle */
const mongoose_1 = tslib_1.__importDefault(require("mongoose"));
const axios_1 = tslib_1.__importDefault(require("axios"));
const moment_1 = tslib_1.__importDefault(require("moment"));
const bignumber_js_1 = tslib_1.__importDefault(require("bignumber.js"));
const utils_1 = require("../../utils");
const transaction_model_1 = require("./transaction.model");
const listingService = tslib_1.__importStar(require("../listing/listing/listing.service"));
const assetService = tslib_1.__importStar(require("../asset/asset.service"));
const chatService = tslib_1.__importStar(require("../streamChat/streamChat.service"));
const userWau_1 = require("../../utils/walletService/userWau");
const listing_model_1 = require("../listing/listing/listing.model");
const userWallet_1 = require("../../utils/walletService/userWallet");
const userBalanceLock_1 = require("../../utils/walletService/userBalanceLock");
const pagination_1 = require("../../utils/pagination");
const settings_1 = require("../settings");
const currencyService = tslib_1.__importStar(require("../currency/currency.service"));
const amountUnlock_1 = require("../../utils/walletService/amountUnlock");
const sendEmail_1 = require("../../utils/emails/sendEmail");
const amountAssetConvert_1 = require("../../utils/amountAssetConvert");
const validateBtcTransAmount_1 = require("../../utils/parametersValidations/validateBtcTransAmount");
const getCryptoHolderFee_1 = require("../../utils/parametersValidations/getCryptoHolderFee");
const getFiatHolderFee_1 = require("../../utils/parametersValidations/getFiatHolderFee");
const getCryptoHolderTransFee_1 = require("../../utils/parametersValidations/getCryptoHolderTransFee");
const sendNotification_1 = require("../../utils/pushNotifications/sendNotification");
const maxAmountConvert_1 = require("../../utils/maxAmountConvert");
const bestPriceService = tslib_1.__importStar(require("../bestPrice/bestPrice.service"));
const createNotification_1 = require("../../utils/avilaServices/createNotification");
bignumber_js_1.default.config({ DECIMAL_PLACES: 10, ROUNDING_MODE: 4 });
function getInProgressTransactions(token) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const { data: user } = yield (0, userWau_1.getUser)(token);
        const statusTransaction = ['pending', 'payment_executed', 'payment_received'];
        const statusListing = ['active', 'taker_assigned', 'default'];
        /// Transactions as taker
        const takerTransactions = yield transaction_model_1.Transaction.find({
            $and: [
                { 'taker.id': user.id },
                {
                    status: {
                        $in: statusTransaction,
                    },
                },
            ],
        }).sort({ createdAt: -1 });
        /// Transactions as maker
        const makerListings = yield listing_model_1.Listing.find({
            'maker.id': user.id,
            status: {
                $in: statusListing,
            },
        });
        const makerTransactions = yield transaction_model_1.Transaction.find({
            $and: [
                {
                    listing: {
                        $in: makerListings.map((e) => e._id),
                    },
                },
                {
                    status: {
                        $in: statusTransaction,
                    },
                },
            ],
        }).sort({ createdAt: -1 });
        return {
            makerTransactions,
            takerTransactions,
            totalMakerTransactions: makerTransactions.length,
            totalTakerTransactions: takerTransactions.length,
            total: makerTransactions.length + takerTransactions.length,
        };
    });
}
exports.getInProgressTransactions = getInProgressTransactions;
function findOne(filter, projection, options) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return transaction_model_1.Transaction.findOne(filter, projection, options).exec();
    });
}
exports.findOne = findOne;
function customFindOne(filter, projection, options) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return transaction_model_1.Transaction.findOne(filter, projection, options)
            .populate([
            {
                path: 'paymentMethod',
                model: 'PaymentMethod',
                populate: [
                    {
                        path: 'values',
                        model: 'PaymentMethodValue',
                        populate: {
                            path: 'paymentMethodInput',
                            model: 'PaymentMethodInput',
                        },
                    },
                    {
                        path: 'type',
                        model: 'PaymentMethodCategory',
                        populate: [
                            {
                                path: 'currency',
                                model: 'Currency',
                            },
                            {
                                path: 'paymentMethodInputs',
                                model: 'PaymentMethodInput',
                            },
                        ],
                    },
                ],
            },
            {
                path: 'listing',
                model: 'Listing',
                populate: [
                    {
                        path: 'currency',
                        model: 'Currency',
                    },
                    {
                        path: 'asset',
                        model: 'Asset',
                    },
                    {
                        path: 'bestPrice',
                        model: 'BestPrice',
                        populate: [
                            {
                                path: 'currency',
                                model: 'Currency',
                            },
                            {
                                path: 'asset',
                                model: 'Asset',
                            },
                        ],
                    },
                    {
                        path: 'paymentMethods',
                        model: 'PaymentMethod',
                        populate: [
                            {
                                path: 'values',
                                model: 'PaymentMethodValue',
                                populate: {
                                    path: 'paymentMethodInput',
                                    model: 'PaymentMethodInput',
                                },
                            },
                            {
                                path: 'type',
                                model: 'PaymentMethodCategory',
                                populate: [
                                    {
                                        path: 'currency',
                                        model: 'Currency',
                                    },
                                    {
                                        path: 'paymentMethodInputs',
                                        model: 'PaymentMethodInput',
                                    },
                                ],
                            },
                        ],
                    },
                ],
            },
        ])
            .exec();
    });
}
exports.customFindOne = customFindOne;
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
function validateAmount(currency, listing, user, body, setting, asset) {
    var _a;
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        // TODO ...hacer cambio de buscar amountMax de asset a currency para multiplicarlo por el precio o hacer la conversion
        // TODO ...dependiendo de el asset
        const today = (0, moment_1.default)().startOf('day');
        const startOfToday = today.toDate();
        const endOfToday = today.endOf('day').toDate();
        let listingPrice = listing === null || listing === void 0 ? void 0 : listing.price;
        if (listing === null || listing === void 0 ? void 0 : listing.bestPricePercentage) {
            if ((listing === null || listing === void 0 ? void 0 : listing.priceReferenceType) === 'suni') {
                const bestPrice = yield bestPriceService.findOne({
                    currencyId: listing === null || listing === void 0 ? void 0 : listing.currency._id,
                    assetId: listing === null || listing === void 0 ? void 0 : listing.asset._id,
                });
                if ((listing === null || listing === void 0 ? void 0 : listing.type) === 'sale')
                    listingPrice = listing.bestPricePercentage * bestPrice.saleBestPrice;
                else
                    listingPrice =
                        listing.bestPricePercentage * bestPrice.purchaseBestPrice;
            }
            else {
                listingPrice =
                    listing.bestPricePercentage *
                        asset.conversionRateToUsd *
                        currency.conversionRateToUsd;
            }
        }
        // obtener el amount de currency
        const fiatAmount = body.amount * listingPrice;
        // obtener el amount en usd
        const amountInUsd = (listingPrice * body.amount) / currency.conversionRateToUsd;
        // obtener todas las transacciones de maker y taker de el dia para validar que no supere al settings amount
        const makerTransactions = yield transaction_model_1.Transaction.find({
            $and: [
                { 'maker.id': (_a = listing === null || listing === void 0 ? void 0 : listing.maker) === null || _a === void 0 ? void 0 : _a.id },
                { createdAt: { $gte: startOfToday, $lte: endOfToday } },
            ],
        });
        const takerTransactions = yield transaction_model_1.Transaction.find({
            $and: [
                { 'taker.id': user === null || user === void 0 ? void 0 : user.id },
                { createdAt: { $gte: startOfToday, $lte: endOfToday } },
            ],
        });
        const takerMaxAmount = takerTransactions.reduce((acc, curr) => acc + curr.amountUsd, 0);
        const makerMaxAmount = makerTransactions.reduce((acc, curr) => acc + curr.amountUsd, 0);
        const totalUsdTakerTransactions = amountInUsd + takerMaxAmount;
        const totalUsdMakerTransactions = amountInUsd + takerMaxAmount;
        if (takerMaxAmount >= setting.transactions.maxAmountAllowed ||
            totalUsdTakerTransactions >= setting.transactions.maxAmountAllowed)
            throw new utils_1.NoSentryError('taker exceeded the amount of daily transactions');
        if (makerMaxAmount >= setting.transactions.maxAmountAllowed ||
            totalUsdMakerTransactions >= setting.transactions.maxAmountAllowed)
            throw new utils_1.NoSentryError('maker exceeded the amount of daily transactions');
        return {
            amountInUsd,
            fiatAmount,
            listingPrice,
        };
    });
}
function create(body, token) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u;
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const { data: user } = yield (0, userWau_1.getUser)(token);
        const session = yield mongoose_1.default.startSession();
        try {
            session.startTransaction();
            const STATUS_CANCELED = 'canceled';
            const STATUS_DEFAULT = 'default';
            // validar que este el listing creado
            const listing = yield listingService.findOne({ _id: body.listingId }, null, { session });
            if (!listing)
                throw new utils_1.NoSentryError('Listing not found');
            // validar que no este en status canceled o default para proceder
            if (listing.status === STATUS_CANCELED)
                throw new utils_1.NoSentryError('Cannot create Transaction with listing canceled');
            if (listing.status === STATUS_DEFAULT)
                throw new utils_1.NoSentryError('Cannot create Transaction with listing default');
            // validar que este el asset indicado en la BD
            const asset = yield assetService.findOne({ _id: listing.asset });
            if (!asset)
                throw new utils_1.NoSentryError('Asset not found');
            const setting = yield settings_1.Settings.findOne({ active: true });
            // buscar el currency que se usara en el listing
            const currency = yield currencyService.findOne({ _id: listing.currency });
            const { amountInUsd, fiatAmount, listingPrice } = yield validateAmount(currency, listing, user, body, setting, asset);
            // validar que el usuario no tome su propio listing
            if ((user === null || user === void 0 ? void 0 : user.id) === ((_a = listing === null || listing === void 0 ? void 0 : listing.maker) === null || _a === void 0 ? void 0 : _a.id))
                throw new utils_1.NoSentryError('Cannot take your listing');
            yield (0, amountAssetConvert_1.amountAssetConvert)(body, asset);
            yield (0, validateBtcTransAmount_1.validateBtcTransAmount)(setting, asset, body);
            if (body.amount > listing.amount) {
                throw new utils_1.NoSentryError('The amount cannot be greater than the listing amount');
            }
            const userName = (_c = (_b = user === null || user === void 0 ? void 0 : user.metamapStatus) === null || _b === void 0 ? void 0 : _b.dni_firstName) !== null && _c !== void 0 ? _c : user === null || user === void 0 ? void 0 : user.name;
            const userLastName = (_e = (_d = user === null || user === void 0 ? void 0 : user.metamapStatus) === null || _d === void 0 ? void 0 : _d.dni_lastName) !== null && _e !== void 0 ? _e : user === null || user === void 0 ? void 0 : user.lastname;
            const transactionData = {
                listing: listing._id,
                taker: {
                    id: user === null || user === void 0 ? void 0 : user.id,
                    email: user === null || user === void 0 ? void 0 : user.email,
                    name: userName,
                    lastname: userLastName,
                },
                amount: body.amount,
                paymentMethod: (_f = body.paymentMethod) !== null && _f !== void 0 ? _f : null,
                selectedWallet: body.selectedWallet,
                maker: {
                    id: (_g = listing === null || listing === void 0 ? void 0 : listing.maker) === null || _g === void 0 ? void 0 : _g.id,
                    email: (_h = listing === null || listing === void 0 ? void 0 : listing.maker) === null || _h === void 0 ? void 0 : _h.email,
                    name: (_j = listing === null || listing === void 0 ? void 0 : listing.maker) === null || _j === void 0 ? void 0 : _j.name,
                    lastname: (_k = listing === null || listing === void 0 ? void 0 : listing.maker) === null || _k === void 0 ? void 0 : _k.lastname,
                },
                loanAdId: null,
                amountUsd: amountInUsd,
                makerFee: listing.fee,
                takerFee: null,
                fiatAmount,
            };
            const wallet = yield (0, userWallet_1.getUserWallet)(token, body.selectedWallet);
            if (!wallet)
                throw new utils_1.NoSentryError('Wallet doesn`t exist');
            if (listing.type === 'purchase') {
                const amountPercentage = (body.amount * 1) / 100;
                if (wallet.balance < body.amount + amountPercentage) {
                    throw new utils_1.NoSentryError('Doesn`t have enough balance');
                }
                const makerFee = yield (0, getCryptoHolderFee_1.getCryptoHolderFee)({
                    transactionAmount: body.amount,
                    assetNetwork: asset.network,
                    transactionType: 'sale',
                    userRole: 'taker',
                }, setting);
                transactionData.takerFee = makerFee;
                const ad = yield (0, userBalanceLock_1.balanceLock)({
                    token,
                    wallet: wallet.wallet,
                    amount: body.amount,
                    makerFee,
                });
                transactionData.loanAdId = (_l = ad === null || ad === void 0 ? void 0 : ad.data) === null || _l === void 0 ? void 0 : _l.id;
            }
            else {
                const takerFee = yield (0, getFiatHolderFee_1.getFiatHolderFee)({
                    transactionAmount: body.amount,
                    assetNetwork: asset.network,
                    transactionType: 'purchase',
                    userRole: 'taker',
                }, setting);
                transactionData.takerFee = takerFee;
            }
            if (listing.amount === body.amount)
                listing.active = false;
            listing.amount -= body.amount;
            listing.status =
                listing.amount < listing.minAmountAsset ? 'default' : 'taker_assigned';
            if (listing.amount === 1)
                listing.active = false;
            if (listing.maxAmountAsset > listing.amount) {
                (0, maxAmountConvert_1.maxAmountConvert)(asset.network, listing, listingPrice);
            }
            yield listing.save();
            if (listing.status === 'default') {
                const paramsPushListing = {
                    token,
                    userId: listing.maker.id,
                    title: 'Anuncio',
                    message: `La disponibilidad de tu anuncio se encuentra por debajo del límite mínimo,
        actualízalo para que pueda ser visualizado nuevamente en el mercado`,
                };
                yield (0, sendNotification_1.sendNotifications)(paramsPushListing);
            }
            const createdTransaction = yield transaction_model_1.Transaction.create([transactionData], {
                session,
            });
            const variablesHolderCrypto = {
                name: listing.type === 'purchase'
                    ? `${userName} ${userLastName}`
                    : `${(_m = listing === null || listing === void 0 ? void 0 : listing.maker) === null || _m === void 0 ? void 0 : _m.name} ${(_o = listing === null || listing === void 0 ? void 0 : listing.maker) === null || _o === void 0 ? void 0 : _o.lastname}`,
            };
            const userEmailHolderCrypto = listing.type === 'purchase' ? user === null || user === void 0 ? void 0 : user.email : (_p = listing === null || listing === void 0 ? void 0 : listing.maker) === null || _p === void 0 ? void 0 : _p.email;
            const paramsPush = {
                token,
                userId: listing.maker.id,
                title: 'Transacción',
                message: `Se ha creado la transacción ${createdTransaction[0].referenceNumber}`,
            };
            yield (0, sendNotification_1.sendNotifications)(paramsPush);
            yield (0, sendEmail_1.sendEmail)('exchange_transaction_started', token, variablesHolderCrypto, null, userEmailHolderCrypto);
            yield chatService.createChannel({
                channelId: createdTransaction[0]._id.toString(),
                taker: (_r = (_q = createdTransaction[0]) === null || _q === void 0 ? void 0 : _q.taker) === null || _r === void 0 ? void 0 : _r.id,
                maker: (_s = listing === null || listing === void 0 ? void 0 : listing.maker) === null || _s === void 0 ? void 0 : _s.id,
            });
            yield (0, createNotification_1.createNotification)(
            // notification Oferta de Listing tomado
            {
                messageTemplateId: '585364632313533',
                model: 'transaction',
                module: 'exchange',
                object: (_t = createdTransaction[0]) === null || _t === void 0 ? void 0 : _t._id,
                recipientId: (_u = listing === null || listing === void 0 ? void 0 : listing.maker) === null || _u === void 0 ? void 0 : _u.id,
                senderId: user === null || user === void 0 ? void 0 : user.id,
            }, token);
            yield session.commitTransaction();
            return createdTransaction[0];
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
function cancel(body, token) {
    var _a, _b, _c;
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const { data: user } = yield (0, userWau_1.getUser)(token);
        const transaction = yield transaction_model_1.Transaction.findOne({
            _id: body.transactionId,
        });
        if (!transaction)
            throw new utils_1.NoSentryError('Transaction not found');
        const listing = yield listingService.findOne({ _id: transaction.listing });
        const asset = yield assetService.findOne({ _id: (_a = listing === null || listing === void 0 ? void 0 : listing.asset) === null || _a === void 0 ? void 0 : _a._id });
        const currency = yield currencyService.findOne({
            _id: listing === null || listing === void 0 ? void 0 : listing.currency._id,
        });
        if (listing.type === 'purchase') {
            if (user.id !== ((_b = listing === null || listing === void 0 ? void 0 : listing.maker) === null || _b === void 0 ? void 0 : _b.id))
                throw new utils_1.NoSentryError('User can not cancel transaction');
            const config = {
                method: 'delete',
                baseURL: process.env.SERVICE_URL,
                url: `/wallet/block/${transaction.loanAdId}`,
                headers: {
                    authorization: `Bearer ${token}`,
                },
            };
            const { data } = yield axios_1.default.delete(config.url, config);
            if (!(data === null || data === void 0 ? void 0 : data.success)) {
                throw new utils_1.NoSentryError('Error deleting ad in wallet');
            }
        }
        else if (user.id !== ((_c = transaction === null || transaction === void 0 ? void 0 : transaction.taker) === null || _c === void 0 ? void 0 : _c.id))
            throw new utils_1.NoSentryError('User can not cancel transaction');
        let listingPrice = listing === null || listing === void 0 ? void 0 : listing.price;
        if (listing === null || listing === void 0 ? void 0 : listing.bestPricePercentage) {
            if (listing.priceReferenceType === 'suni') {
                const bestPrice = yield bestPriceService.findOne({
                    currencyId: listing === null || listing === void 0 ? void 0 : listing.currency._id,
                    assetId: listing === null || listing === void 0 ? void 0 : listing.asset._id,
                });
                if ((listing === null || listing === void 0 ? void 0 : listing.type) === 'sale')
                    listingPrice = listing.bestPricePercentage * bestPrice.saleBestPrice;
                else
                    listingPrice =
                        listing.bestPricePercentage * bestPrice.purchaseBestPrice;
            }
            else {
                listingPrice =
                    listing.bestPricePercentage *
                        asset.conversionRateToUsd *
                        currency.conversionRateToUsd;
            }
        }
        listing.status = 'active';
        listing.amount += transaction.amount;
        listing.maxAmountAsset =
            listing.maxAmountAsset + transaction.amount > listing.originalMaxAssetAmount
                ? listing.originalMaxAssetAmount
                : listing.maxAmountAsset + transaction.amount;
        listing.maxAmount = listing.maxAmountAsset * listingPrice;
        listing.active = true;
        yield listing.save();
        transaction.status = 'cancelled';
        yield transaction.save();
        return transaction;
    });
}
exports.cancel = cancel;
function notifyPayment(body, token) {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const { data: user } = yield (0, userWau_1.getUser)(token);
        const session = yield mongoose_1.default.startSession();
        try {
            session.startTransaction();
            const transaction = yield transaction_model_1.Transaction.findOne({
                _id: body.transactionId,
            }, null, { session });
            if (!transaction)
                throw new utils_1.NoSentryError('Transaction not found');
            transaction.status = 'payment_executed';
            const userName = transaction.loanAdId
                ? (_a = transaction === null || transaction === void 0 ? void 0 : transaction.taker) === null || _a === void 0 ? void 0 : _a.name
                : (_b = transaction === null || transaction === void 0 ? void 0 : transaction.maker) === null || _b === void 0 ? void 0 : _b.name;
            const userLastName = transaction.loanAdId
                ? (_c = transaction === null || transaction === void 0 ? void 0 : transaction.taker) === null || _c === void 0 ? void 0 : _c.lastname
                : (_d = transaction === null || transaction === void 0 ? void 0 : transaction.maker) === null || _d === void 0 ? void 0 : _d.lastname;
            const variables = {
                name: `${userName} ${userLastName}`,
            };
            const userEmail = transaction.loanAdId
                ? (_e = transaction === null || transaction === void 0 ? void 0 : transaction.taker) === null || _e === void 0 ? void 0 : _e.email
                : (_f = transaction === null || transaction === void 0 ? void 0 : transaction.maker) === null || _f === void 0 ? void 0 : _f.email;
            const paramsPush = {
                token,
                userId: transaction.loanAdId
                    ? (_g = transaction === null || transaction === void 0 ? void 0 : transaction.taker) === null || _g === void 0 ? void 0 : _g.id
                    : (_h = transaction === null || transaction === void 0 ? void 0 : transaction.maker) === null || _h === void 0 ? void 0 : _h.id,
                title: 'Se ha confirmado el envío de los fondos',
                message: `Tu contraparte de la transacción ${transaction.referenceNumber} ha confirmado el envío de los fondos`,
            };
            yield (0, sendNotification_1.sendNotifications)(paramsPush);
            yield (0, sendEmail_1.sendEmail)('fiat_sent_confirmation', token, variables, null, userEmail);
            if (body.paymentMethod)
                transaction.paymentMethod = body.paymentMethod;
            yield transaction.save();
            const channel = yield chatService.getChannelById({
                channelId: body.transactionId.toString(),
            });
            const text = 'Payment has been made';
            const message = {
                text,
                user: { id: user.id },
                type: 'system',
            };
            yield channel.sendMessage(message);
            yield session.commitTransaction();
            return transaction;
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
exports.notifyPayment = notifyPayment;
function releaseCrypto(body, token) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const { data: user } = yield (0, userWau_1.getUser)(token);
        const session = yield mongoose_1.default.startSession();
        try {
            session.startTransaction();
            const transaction = yield transaction_model_1.Transaction.findOne({
                _id: body.transactionId,
            }, null, { session });
            if (!transaction)
                throw new utils_1.NoSentryError('Transaction not found');
            if (transaction.status !== 'payment_executed')
                throw new utils_1.NoSentryError('Payment has not been notified');
            const listing = yield listingService.findOne({ _id: transaction.listing }, null, { session });
            const currency = yield currencyService.findOne({
                _id: (_a = listing === null || listing === void 0 ? void 0 : listing.currency) === null || _a === void 0 ? void 0 : _a._id,
            });
            if (!listing)
                throw new utils_1.NoSentryError('Listing not found');
            if ((listing.type === 'purchase' && user.id !== ((_b = transaction === null || transaction === void 0 ? void 0 : transaction.taker) === null || _b === void 0 ? void 0 : _b.id)) ||
                (listing.type === 'sale' && user.id !== ((_c = listing === null || listing === void 0 ? void 0 : listing.maker) === null || _c === void 0 ? void 0 : _c.id))) {
                throw new utils_1.NoSentryError('User is not crypto holder');
            }
            if ((listing === null || listing === void 0 ? void 0 : listing.type) === 'sale') {
                yield (0, amountUnlock_1.unlockBalance)({
                    token,
                    toWallet: transaction === null || transaction === void 0 ? void 0 : transaction.selectedWallet,
                    amount: transaction === null || transaction === void 0 ? void 0 : transaction.amount,
                    takerFee: transaction === null || transaction === void 0 ? void 0 : transaction.takerFee,
                    blockId: listing === null || listing === void 0 ? void 0 : listing.loanAdId,
                    description: `Release of funds for ${transaction === null || transaction === void 0 ? void 0 : transaction.amount} ${currency === null || currency === void 0 ? void 0 : currency.symbol} in listing #${listing === null || listing === void 0 ? void 0 : listing.referenceNumber}`,
                });
            }
            else {
                yield (0, amountUnlock_1.unlockBalance)({
                    token,
                    toWallet: (_d = listing === null || listing === void 0 ? void 0 : listing.selectedWallet) === null || _d === void 0 ? void 0 : _d.address,
                    amount: transaction === null || transaction === void 0 ? void 0 : transaction.amount,
                    takerFee: transaction === null || transaction === void 0 ? void 0 : transaction.takerFee,
                    blockId: transaction === null || transaction === void 0 ? void 0 : transaction.loanAdId,
                    description: `Release of funds for ${transaction === null || transaction === void 0 ? void 0 : transaction.amount} ${currency === null || currency === void 0 ? void 0 : currency.symbol} in listing #${listing === null || listing === void 0 ? void 0 : listing.referenceNumber}`,
                });
            }
            transaction.status = 'successful';
            yield transaction.save();
            listing.status =
                listing.amount < listing.minAmountAsset ? 'default' : 'active';
            yield listing.save();
            const paramsPush = {
                token,
                userId: transaction.loanAdId
                    ? (_e = transaction === null || transaction === void 0 ? void 0 : transaction.maker) === null || _e === void 0 ? void 0 : _e.id
                    : (_f = transaction === null || transaction === void 0 ? void 0 : transaction.taker) === null || _f === void 0 ? void 0 : _f.id,
                title: 'Se han liberado las criptomonedas',
                message: `Tu contraparte de la transacción ${transaction.referenceNumber} ha liberado las criptomonedas`,
            };
            yield (0, sendNotification_1.sendNotifications)(paramsPush);
            const userMakerName = (_g = transaction === null || transaction === void 0 ? void 0 : transaction.maker) === null || _g === void 0 ? void 0 : _g.name;
            const userMakerLastName = (_h = transaction === null || transaction === void 0 ? void 0 : transaction.maker) === null || _h === void 0 ? void 0 : _h.lastname;
            const variablesMaker = {
                name: `${userMakerName} ${userMakerLastName}`,
            };
            const userMaker = (_j = transaction === null || transaction === void 0 ? void 0 : transaction.maker) === null || _j === void 0 ? void 0 : _j.email;
            yield (0, sendEmail_1.sendEmail)('fiat_received_confirmation', token, variablesMaker, null, userMaker);
            const userTakerName = (_k = transaction === null || transaction === void 0 ? void 0 : transaction.taker) === null || _k === void 0 ? void 0 : _k.name;
            const userTakerLastName = (_l = transaction === null || transaction === void 0 ? void 0 : transaction.taker) === null || _l === void 0 ? void 0 : _l.lastname;
            const variablesTaker = {
                name: `${userTakerName} ${userTakerLastName}`,
            };
            const userTaker = (_m = transaction === null || transaction === void 0 ? void 0 : transaction.taker) === null || _m === void 0 ? void 0 : _m.email;
            yield (0, sendEmail_1.sendEmail)('fiat_received_confirmation', token, variablesTaker, null, userTaker);
            const channel = yield chatService.getChannelById({
                channelId: body.transactionId.toString(),
            });
            const text = 'Payment received. Crypto amount has been released';
            const message = {
                text,
                user: { id: user.id },
                type: 'system',
            };
            yield channel.sendMessage(message);
            yield session.commitTransaction();
            return transaction;
        }
        catch (err) {
            yield session.abortTransaction();
            throw new utils_1.NoSentryError(err);
        }
        finally {
            session.endSession();
        }
    });
}
exports.releaseCrypto = releaseCrypto;
function pagination(page, perPage, filter, projection, options) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return (0, utils_1.paginateModel)(page, perPage, transaction_model_1.Transaction, filter, projection, options);
    });
}
exports.pagination = pagination;
function getTransactionUser(body, token) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const { data: user } = yield (0, userWau_1.getUser)(token);
        const asset = yield assetService.findOne({ _id: body.asset });
        if (body.role === 'purchase') {
            const transactionFilter = yield transaction_model_1.Transaction.aggregate([
                {
                    $lookup: {
                        from: 'listings',
                        localField: 'listing',
                        foreignField: '_id',
                        as: 'listingDetails',
                    },
                },
                {
                    $match: {
                        'listingDetails.asset': (asset === null || asset === void 0 ? void 0 : asset._id) ? asset === null || asset === void 0 ? void 0 : asset._id : { $ne: null },
                        $or: [
                            { 'taker.id': user === null || user === void 0 ? void 0 : user.id, 'listingDetails.type': 'sale' },
                            { 'maker.id': user === null || user === void 0 ? void 0 : user.id, 'listingDetails.type': 'purchase' },
                        ],
                        status: (body === null || body === void 0 ? void 0 : body.status) ? body === null || body === void 0 ? void 0 : body.status : { $ne: null },
                    },
                },
                {
                    $sort: {
                        createdAt: -1,
                    },
                },
            ]);
            return (0, pagination_1.paginate)(body.page, body.perPage, transactionFilter);
        }
        if (body.role === 'sale') {
            const transactionFilter = yield transaction_model_1.Transaction.aggregate([
                {
                    $lookup: {
                        from: 'listings',
                        localField: 'listing',
                        foreignField: '_id',
                        as: 'listingDetails',
                    },
                },
                {
                    $match: {
                        'listingDetails.asset': (asset === null || asset === void 0 ? void 0 : asset._id) ? asset === null || asset === void 0 ? void 0 : asset._id : { $ne: null },
                        $or: [
                            { 'taker.id': user.id, 'listingDetails.type': 'purchase' },
                            { 'maker.id': user.id, 'listingDetails.type': 'sale' },
                        ],
                        status: (body === null || body === void 0 ? void 0 : body.status) ? body === null || body === void 0 ? void 0 : body.status : { $ne: null },
                    },
                },
                {
                    $sort: {
                        createdAt: -1,
                    },
                },
            ]);
            return (0, pagination_1.paginate)(body.page, body.perPage, transactionFilter);
        }
        const transactionFilterUser = yield transaction_model_1.Transaction.aggregate([
            {
                $lookup: {
                    from: 'listings',
                    localField: 'listing',
                    foreignField: '_id',
                    as: 'listingDetails',
                },
            },
            {
                $match: {
                    'listingDetails.asset': (asset === null || asset === void 0 ? void 0 : asset._id) ? asset === null || asset === void 0 ? void 0 : asset._id : { $ne: null },
                    $or: [{ 'maker.id': user.id }, { 'taker.id': user.id }],
                    status: (body === null || body === void 0 ? void 0 : body.status) ? body === null || body === void 0 ? void 0 : body.status : { $ne: null },
                },
            },
            {
                $sort: {
                    createdAt: -1,
                },
            },
        ]);
        return (0, pagination_1.paginate)(body.page, body.perPage, transactionFilterUser);
    });
}
exports.getTransactionUser = getTransactionUser;
function getFee(body) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const settings = yield settings_1.Settings.findOne({ active: true });
        const valid = !(body.assetNetwork.toLowerCase() === 'btc' &&
            body.transactionAmount < settings.btc.minTransAmount);
        const serviceFee = body.transactionType === 'purchase'
            ? yield (0, getFiatHolderFee_1.getFiatHolderFee)(body, settings)
            : yield (0, getCryptoHolderFee_1.getCryptoHolderFee)(body, settings);
        const transFee = body.transactionType === 'sale'
            ? yield (0, getCryptoHolderTransFee_1.getCryptoHolderTransFee)(body, settings)
            : 0;
        return {
            fee: serviceFee + transFee,
            valid,
            minTransAmount: settings.btc.minTransAmount,
        };
    });
}
exports.getFee = getFee;
//# sourceMappingURL=transaction.service.js.map