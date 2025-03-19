"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.manageCryptoAdmin = exports.pagination = exports.cancelAppeal = exports.create = exports.updateOne = exports.getAllAppealInfo = exports.findAppeal = exports.find = exports.findOne = void 0;
const tslib_1 = require("tslib");
/* eslint-disable import/no-cycle */
const mongoose_1 = tslib_1.__importDefault(require("mongoose"));
const appeal_model_1 = require("./appeal.model");
const utils_1 = require("../../../utils");
const transactionService = tslib_1.__importStar(require("../../transaction/transaction.service"));
const chatService = tslib_1.__importStar(require("../../streamChat/streamChat.service"));
const userWau_1 = require("../../../utils/walletService/userWau");
const sendEmail_1 = require("../../../utils/emails/sendEmail");
const listingService = tslib_1.__importStar(require("../../listing/listing/listing.service"));
const amountUnlock_1 = require("../../../utils/walletService/amountUnlock");
const cancelAd_1 = require("../../../utils/walletService/cancelAd");
const bestPriceService = tslib_1.__importStar(require("../../bestPrice/bestPrice.service"));
const createNotification_1 = require("../../../utils/avilaServices/createNotification");
const currencyService = tslib_1.__importStar(require("../../currency/currency.service"));
function findOne(filter, projection, options) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return appeal_model_1.Appeal.findOne(filter, projection, options).exec();
    });
}
exports.findOne = findOne;
function find(filter, projection, options) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return appeal_model_1.Appeal.find(filter, projection, options).exec();
    });
}
exports.find = find;
function getAppealReason(reason) {
    switch (reason) {
        case 'notConfirmed':
            return 'Pago no confirmado';
        case 'confirmedNotReceived':
            return 'Cripto no recibido';
        case 'confirmedNotReleased':
            return 'Cripto no liberado';
        default:
            return 'Pago confirmado, dinero no recibido';
    }
}
function findAppeal(token, filter, projection, options) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const appealData = yield appeal_model_1.Appeal.findOne(filter, projection, options).populate({
            path: 'transaction',
            model: 'Transaction',
            populate: {
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
                ],
            },
        });
        const reason = getAppealReason(appealData === null || appealData === void 0 ? void 0 : appealData.reason);
        return Object.assign(Object.assign({}, appealData._doc), { reason });
    });
}
exports.findAppeal = findAppeal;
function getAllAppealInfo(token, filter, projection, options) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const appealsData = yield appeal_model_1.Appeal.find(filter, projection, options)
            .populate({
            path: 'transaction',
            model: 'Transaction',
            populate: {
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
                ],
            },
        })
            .exec();
        const appeals = [];
        for (const appeal of appealsData) {
            const reason = getAppealReason(appeal === null || appeal === void 0 ? void 0 : appeal.reason);
            const formData = Object.assign(Object.assign({}, appeal === null || appeal === void 0 ? void 0 : appeal._doc), { reason });
            appeals.push(formData);
        }
        return appeals;
    });
}
exports.getAllAppealInfo = getAllAppealInfo;
function updateOne(filter, update, options) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return appeal_model_1.Appeal.updateOne(filter, update, options).exec();
    });
}
exports.updateOne = updateOne;
function create(body, token) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const { data: user } = yield (0, userWau_1.getUser)(token);
        const session = yield mongoose_1.default.startSession();
        try {
            session.startTransaction();
            // const countryAvailable = await countryService.findOne({
            //   code: user.country,
            //   active: true,
            //   disabled: false,
            // });
            // if (!countryAvailable)
            //   throw new NoSentryError(
            //     'Access denied, the country is disabled to the app'
            //   );
            const transaction = yield transactionService.findOne({
                _id: body.transaction,
            }, null, { session });
            const STATUS_APPEAL = 'active';
            const appealOwner = {
                id: user.id,
                email: user.email,
                name: (_b = (_a = user === null || user === void 0 ? void 0 : user.metamapStatus) === null || _a === void 0 ? void 0 : _a.dni_firstName) !== null && _b !== void 0 ? _b : user === null || user === void 0 ? void 0 : user.name,
                lastname: (_d = (_c = user === null || user === void 0 ? void 0 : user.metamapStatus) === null || _c === void 0 ? void 0 : _c.dni_lastName) !== null && _d !== void 0 ? _d : user === null || user === void 0 ? void 0 : user.lastname,
            };
            const createdAppeal = yield appeal_model_1.Appeal.create([
                {
                    transaction: transaction._id,
                    description: body.description,
                    paymentReceipt: body.paymentReceipt,
                    status: STATUS_APPEAL,
                    reason: body.reason,
                    appealOwner,
                },
            ], { session });
            transaction.appealed = true;
            transaction.appealedBy = appealOwner;
            yield transaction.save();
            const userMakerName = (_e = transaction === null || transaction === void 0 ? void 0 : transaction.maker) === null || _e === void 0 ? void 0 : _e.name;
            const userMakerLastName = (_f = transaction === null || transaction === void 0 ? void 0 : transaction.maker) === null || _f === void 0 ? void 0 : _f.lastname;
            const variablesMaker = {
                name: `${userMakerName} ${userMakerLastName}`,
            };
            const userMaker = (_g = transaction === null || transaction === void 0 ? void 0 : transaction.maker) === null || _g === void 0 ? void 0 : _g.email;
            yield (0, sendEmail_1.sendEmail)('transaction_appeal_filed', token, variablesMaker, null, userMaker);
            const userTakerName = (_h = transaction === null || transaction === void 0 ? void 0 : transaction.taker) === null || _h === void 0 ? void 0 : _h.name;
            const userTakerLastName = (_j = transaction === null || transaction === void 0 ? void 0 : transaction.taker) === null || _j === void 0 ? void 0 : _j.lastname;
            const variablesTaker = {
                name: `${userTakerName} ${userTakerLastName}`,
            };
            const userTaker = (_k = transaction === null || transaction === void 0 ? void 0 : transaction.taker) === null || _k === void 0 ? void 0 : _k.email;
            yield (0, sendEmail_1.sendEmail)('transaction_appeal_filed', token, variablesTaker, null, userTaker);
            const channel = yield chatService.getChannelById({
                channelId: createdAppeal[0].transaction._id.toString(),
            });
            const text = 'An appeal has been created';
            const message = {
                text,
                user: { id: user.id },
                type: 'system',
            };
            yield channel.sendMessage(message);
            yield session.commitTransaction();
            yield (0, createNotification_1.createNotification)(
            // notification Transacción en apelación
            {
                messageTemplateId: '196113595656315',
                model: 'transaction',
                module: 'exchange',
                object: transaction === null || transaction === void 0 ? void 0 : transaction._id,
                recipientId: (user === null || user === void 0 ? void 0 : user.id) === (transaction === null || transaction === void 0 ? void 0 : transaction.maker.id)
                    ? transaction === null || transaction === void 0 ? void 0 : transaction.taker.id
                    : transaction === null || transaction === void 0 ? void 0 : transaction.maker.id,
                senderId: user === null || user === void 0 ? void 0 : user.id,
            }, token);
            return createdAppeal[0];
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
function cancelAppeal(body, token) {
    var _a;
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const { data: user } = yield (0, userWau_1.getUser)(token);
        const session = yield mongoose_1.default.startSession();
        try {
            session.startTransaction();
            // const countryAvailable = await countryService.findOne({
            //   code: user.country,
            //   active: true,
            //   disabled: false,
            // });
            // if (!countryAvailable)
            //   throw new NoSentryError(
            //     'Access denied, the country is disabled to the app'
            //   );
            const STATUS_APPEAL_CANCELED = 'canceled';
            const appeal = yield appeal_model_1.Appeal.findOne({
                transaction: body.transactionId,
            }, null, { session });
            const transaction = yield transactionService.findOne({
                _id: body.transactionId,
            }, null, { session });
            if (((_a = appeal === null || appeal === void 0 ? void 0 : appeal.appealOwner) === null || _a === void 0 ? void 0 : _a.id) !== (user === null || user === void 0 ? void 0 : user.id))
                throw new utils_1.NoSentryError('Invalid user for appeal');
            appeal.status = STATUS_APPEAL_CANCELED;
            yield appeal.save();
            transaction.appealed = false;
            yield transaction.save();
            const channel = yield chatService.getChannelById({
                channelId: appeal.transaction._id.toString(),
            });
            const text = 'An appeal has been canceled';
            const message = {
                text,
                user: { id: user.id },
                type: 'system',
            };
            yield channel.sendMessage(message);
            yield session.commitTransaction();
            yield (0, createNotification_1.createNotification)(
            // notification Apelación resuelta
            {
                messageTemplateId: '753245640186065',
                model: 'transaction',
                module: 'exchange',
                object: transaction === null || transaction === void 0 ? void 0 : transaction._id,
                recipientId: (user === null || user === void 0 ? void 0 : user.id) === (transaction === null || transaction === void 0 ? void 0 : transaction.maker.id)
                    ? transaction === null || transaction === void 0 ? void 0 : transaction.taker.id
                    : transaction === null || transaction === void 0 ? void 0 : transaction.maker.id,
                senderId: user === null || user === void 0 ? void 0 : user.id,
            }, token);
            return appeal;
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
exports.cancelAppeal = cancelAppeal;
function pagination(page, perPage, filter, projection, options) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return (0, utils_1.paginateModel)(page, perPage, appeal_model_1.Appeal, filter, projection, options);
    });
}
exports.pagination = pagination;
function manageCryptoAdmin(body) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j;
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const session = yield mongoose_1.default.startSession();
        try {
            session.startTransaction();
            const transaction = yield transactionService.findOne({
                _id: body.transactionId,
            }, null, { session });
            const appealFound = yield findOne({
                transaction: body.transactionId,
            }, null, { session });
            if (!transaction)
                throw new utils_1.NoSentryError('Transaction not found');
            const listing = yield listingService.findOne({ _id: transaction.listing }, null, { session });
            const currency = yield currencyService.findOne({
                _id: listing === null || listing === void 0 ? void 0 : listing.currency._id,
            });
            const token = process.env.TOKEN_ADMIN_SUNI;
            if ((body === null || body === void 0 ? void 0 : body.decisionType) === 'release') {
                if ((listing === null || listing === void 0 ? void 0 : listing.type) === 'sale') {
                    yield (0, amountUnlock_1.unlockBalance)({
                        token,
                        toWallet: transaction === null || transaction === void 0 ? void 0 : transaction.selectedWallet,
                        amount: transaction === null || transaction === void 0 ? void 0 : transaction.amount,
                        takerFee: transaction.takerFee,
                        blockId: listing === null || listing === void 0 ? void 0 : listing.loanAdId,
                        description: `Release of funds for ${transaction === null || transaction === void 0 ? void 0 : transaction.amount} ${currency === null || currency === void 0 ? void 0 : currency.symbol} in listing #${listing === null || listing === void 0 ? void 0 : listing.referenceNumber}`,
                    });
                }
                else {
                    yield (0, amountUnlock_1.unlockBalance)({
                        token,
                        toWallet: (_a = listing === null || listing === void 0 ? void 0 : listing.selectedWallet) === null || _a === void 0 ? void 0 : _a.address,
                        amount: transaction === null || transaction === void 0 ? void 0 : transaction.amount,
                        takerFee: transaction === null || transaction === void 0 ? void 0 : transaction.takerFee,
                        blockId: transaction === null || transaction === void 0 ? void 0 : transaction.loanAdId,
                        description: `Release of funds for ${transaction === null || transaction === void 0 ? void 0 : transaction.amount} ${currency === null || currency === void 0 ? void 0 : currency.symbol} in listing #${listing === null || listing === void 0 ? void 0 : listing.referenceNumber}`,
                    });
                }
                yield (0, createNotification_1.createNotification)(
                // notification Apelación resuelta
                // message: se han liberado los fondos a tu wallet...
                {
                    messageTemplateId: '843268822926754',
                    model: 'transaction',
                    module: 'exchange',
                    object: transaction === null || transaction === void 0 ? void 0 : transaction._id,
                    recipientId: (listing === null || listing === void 0 ? void 0 : listing.type) === 'sale'
                        ? (_b = transaction === null || transaction === void 0 ? void 0 : transaction.taker) === null || _b === void 0 ? void 0 : _b.id
                        : (_c = listing === null || listing === void 0 ? void 0 : listing.maker) === null || _c === void 0 ? void 0 : _c.id,
                }, token);
                yield (0, createNotification_1.createNotification)(
                // notification Apelación resuelta
                // message: se han liberado los fondos a tu contraparte..
                {
                    messageTemplateId: '473347693704116',
                    model: 'transaction',
                    module: 'exchange',
                    object: transaction === null || transaction === void 0 ? void 0 : transaction._id,
                    recipientId: (listing === null || listing === void 0 ? void 0 : listing.type) === 'sale'
                        ? (_d = transaction === null || transaction === void 0 ? void 0 : transaction.maker) === null || _d === void 0 ? void 0 : _d.id
                        : (_e = transaction === null || transaction === void 0 ? void 0 : transaction.taker) === null || _e === void 0 ? void 0 : _e.id,
                }, token);
                transaction.status = 'successful';
            }
            else {
                let listingPrice = listing === null || listing === void 0 ? void 0 : listing.price;
                if (listing === null || listing === void 0 ? void 0 : listing.bestPricePercentage) {
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
                if ((listing === null || listing === void 0 ? void 0 : listing.type) === 'purchase') {
                    yield (0, cancelAd_1.deleteAd)(token, transaction === null || transaction === void 0 ? void 0 : transaction.loanAdId);
                }
                listing.amount += transaction.amount; // aumentamos el amount de el listing ya que se devolvieron los fondos
                listing.maxAmountAsset =
                    listing.maxAmountAsset + transaction.amount >
                        listing.originalMaxAssetAmount
                        ? listing.originalMaxAssetAmount
                        : listing.maxAmountAsset + transaction.amount;
                listing.maxAmount = listing.maxAmountAsset * listingPrice;
                listing.active = true; // para no hacer condicional si esta en false el listing por si entro en default se cambia a true
                yield (0, createNotification_1.createNotification)(
                // notification Apelación resuelta devolución
                // message: se han devuelto los fondos a tu wallet...
                {
                    messageTemplateId: '149023089927323',
                    model: 'transaction',
                    module: 'exchange',
                    object: transaction === null || transaction === void 0 ? void 0 : transaction._id,
                    recipientId: (listing === null || listing === void 0 ? void 0 : listing.type) === 'sale'
                        ? (_f = listing === null || listing === void 0 ? void 0 : listing.maker) === null || _f === void 0 ? void 0 : _f.id
                        : (_g = transaction === null || transaction === void 0 ? void 0 : transaction.taker) === null || _g === void 0 ? void 0 : _g.id,
                }, token);
                yield (0, createNotification_1.createNotification)(
                // notification Apelación resuelta devolución
                // message: se han devuelto los fondos a tu contraparte...
                {
                    messageTemplateId: '807577023896948',
                    model: 'transaction',
                    module: 'exchange',
                    object: transaction === null || transaction === void 0 ? void 0 : transaction._id,
                    recipientId: (listing === null || listing === void 0 ? void 0 : listing.type) === 'sale'
                        ? (_h = transaction === null || transaction === void 0 ? void 0 : transaction.taker) === null || _h === void 0 ? void 0 : _h.id
                        : (_j = listing === null || listing === void 0 ? void 0 : listing.maker) === null || _j === void 0 ? void 0 : _j.id,
                }, token);
                transaction.status = 'cancelled';
            }
            yield transaction.save();
            appealFound.status = 'resolved';
            yield appealFound.save();
            listing.status =
                (listing === null || listing === void 0 ? void 0 : listing.amount) < (listing === null || listing === void 0 ? void 0 : listing.minAmountAsset) ? 'default' : 'active';
            yield listing.save();
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
exports.manageCryptoAdmin = manageCryptoAdmin;
//# sourceMappingURL=appeal.service.js.map