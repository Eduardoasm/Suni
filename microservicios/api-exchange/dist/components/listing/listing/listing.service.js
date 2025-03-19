"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addReferenceNumber = exports.getKpiMarketPrice = exports.updateListingUser = exports.bestPricesListings = exports.getListingFilterUser = exports.getListingFilter = exports.pagination = exports.cancelListing = exports.createListingPurchase = exports.createListingSale = exports.updateOne = exports.find = exports.findOne = void 0;
const tslib_1 = require("tslib");
const mongoose_1 = tslib_1.__importDefault(require("mongoose"));
const utils_1 = require("../../../utils");
const walletService_1 = require("../../../utils/walletService");
const listing_model_1 = require("./listing.model");
const assetService = tslib_1.__importStar(require("../../asset/asset.service"));
const currencyService = tslib_1.__importStar(require("../../currency/currency.service"));
const userWau_1 = require("../../../utils/walletService/userWau");
const cancelAd_1 = require("../../../utils/walletService/cancelAd");
const settingService = tslib_1.__importStar(require("../../settings/settings.service"));
const transactionService = tslib_1.__importStar(require("../../transaction/transaction.service"));
const updateLock_1 = require("../../../utils/walletService/updateLock");
const paymentMethodCategoryService = tslib_1.__importStar(require("../../paymentMethodCategory/paymentMethodCategory.service"));
const apiPriceBtc_1 = require("../../../utils/apiPriceBtc");
const sendEmail_1 = require("../../../utils/emails/sendEmail");
const amountAssetConvert_1 = require("../../../utils/amountAssetConvert");
const validateBtcTransAmount_1 = require("../../../utils/parametersValidations/validateBtcTransAmount");
const getCryptoHolderFee_1 = require("../../../utils/parametersValidations/getCryptoHolderFee");
const getFiatHolderFee_1 = require("../../../utils/parametersValidations/getFiatHolderFee");
const minMaxAmountToAsset_1 = require("../../../utils/minMaxAmountToAsset");
const amountToAsset_1 = require("../../../utils/amountToAsset");
const bestPriceService = tslib_1.__importStar(require("../../bestPrice/bestPrice.service"));
function findOne(filter, projection, options) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return listing_model_1.Listing.findOne(filter, projection, options).exec();
    });
}
exports.findOne = findOne;
function find(filter, projection, options) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return listing_model_1.Listing.find(filter, projection, options).exec();
    });
}
exports.find = find;
function updateOne(filter, update, options) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return listing_model_1.Listing.updateOne(filter, update, options).exec();
    });
}
exports.updateOne = updateOne;
function createListingSale(token, listing) {
    var _a, _b, _c, _d, _e, _f;
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const { data: user } = yield (0, userWau_1.getUser)(token);
        const session = yield mongoose_1.default.startSession();
        try {
            session.startTransaction();
            const asset = yield assetService.findOne({ _id: listing.asset });
            const currency = yield currencyService.findOne({ _id: listing.currency });
            const STATUS_SUCCESSFUL = 'successful';
            const transactions = yield transactionService.find({
                $or: [{ 'maker.id': user.id }, { 'taker.id': user.id }],
            });
            const transactionsSuccessful = yield transactionService.find({
                status: STATUS_SUCCESSFUL,
                $or: [{ 'maker.id': user.id }, { 'taker.id': user.id }],
            });
            const wallet = yield (0, walletService_1.getUserWallet)(token, listing.walletUser);
            if (!wallet) {
                throw new utils_1.NoSentryError('Wallet doesn`t exist');
            }
            const amountPercentage = (listing.amount * 1) / 100;
            if (wallet.available_balance < listing.amount + amountPercentage) {
                throw new utils_1.NoSentryError('Doesn`t have enough balance');
            }
            // el listing price se definira como el precio de el listing si no viene el bestPricePercentage
            // o en caso que venga, se calculara como bestPricePercentage para las funciones que la necesiten
            let listingPrice = listing === null || listing === void 0 ? void 0 : listing.price;
            let bestPrice;
            if (listing === null || listing === void 0 ? void 0 : listing.bestPricePercentage) {
                if ((listing === null || listing === void 0 ? void 0 : listing.priceReferenceType) === 'suni') {
                    bestPrice = yield bestPriceService.findOne({
                        currency: listing === null || listing === void 0 ? void 0 : listing.currency,
                        asset: listing === null || listing === void 0 ? void 0 : listing.asset,
                    });
                    listingPrice = listing.bestPricePercentage * bestPrice.saleBestPrice;
                }
                else {
                    listingPrice =
                        listing.bestPricePercentage *
                            asset.conversionRateToUsd *
                            currency.conversionRateToUsd;
                }
            }
            if (!(listing === null || listing === void 0 ? void 0 : listing.amountInAsset)) {
                (0, amountToAsset_1.amountToAsset)(listing, listingPrice, asset === null || asset === void 0 ? void 0 : asset.network);
            }
            const { minAmountAsset, maxAmountAsset } = (0, minMaxAmountToAsset_1.minMaxAmountToAsset)(listing.minAmount, listing.maxAmount, asset.network, listingPrice);
            yield (0, amountAssetConvert_1.amountAssetConvert)(listing, asset);
            const settings = yield settingService.getActiveSetting();
            yield (0, validateBtcTransAmount_1.validateBtcTransAmount)(settings, asset, listing);
            const makerFee = yield (0, getCryptoHolderFee_1.getCryptoHolderFee)({
                transactionAmount: listing.amount,
                assetNetwork: asset.network,
                transactionType: 'sale',
                userRole: 'maker',
            }, settings);
            const type = 'sale';
            const status = 'active';
            const userName = (_b = (_a = user === null || user === void 0 ? void 0 : user.metamapStatus) === null || _a === void 0 ? void 0 : _a.dni_firstName) !== null && _b !== void 0 ? _b : user === null || user === void 0 ? void 0 : user.name;
            const userLastName = (_d = (_c = user === null || user === void 0 ? void 0 : user.metamapStatus) === null || _c === void 0 ? void 0 : _c.dni_lastName) !== null && _d !== void 0 ? _d : user === null || user === void 0 ? void 0 : user.lastname;
            const listingProperties = {
                type,
                status,
                maker: {
                    id: user === null || user === void 0 ? void 0 : user.id,
                    email: user === null || user === void 0 ? void 0 : user.email,
                    name: userName,
                    lastname: userLastName,
                },
                selectedWallet: { address: wallet.wallet, name: wallet.name },
                transactionsMaker: transactions.length,
                transactionsMakerCompleted: transactionsSuccessful.length,
                comments: listing === null || listing === void 0 ? void 0 : listing.comments,
                autoReply: listing.autoReply,
                fee: makerFee,
                minAmountAsset,
                maxAmountAsset,
                originalMaxAssetAmount: maxAmountAsset,
                bestPrice: (_e = bestPrice === null || bestPrice === void 0 ? void 0 : bestPrice._id) !== null && _e !== void 0 ? _e : null,
            };
            const newListingSale = Object.assign(Object.assign({}, listing), listingProperties);
            const createdListingSale = yield listing_model_1.Listing.create([newListingSale], {
                session,
            });
            const variables = {
                name: `${userName} ${userLastName}`,
            };
            const userEmail = user === null || user === void 0 ? void 0 : user.email;
            yield (0, sendEmail_1.sendEmail)('ad_registered', token, variables, null, userEmail);
            const ad = yield (0, walletService_1.balanceLock)({
                token,
                wallet: wallet.wallet,
                amount: listing.amount,
                makerFee,
            });
            createdListingSale[0].loanAdId = (_f = ad === null || ad === void 0 ? void 0 : ad.data) === null || _f === void 0 ? void 0 : _f.id;
            yield createdListingSale[0].save();
            yield session.commitTransaction();
            if (!listing.bestPricePercentage) {
                yield bestPriceService.getBestPrice({
                    assetId: listing.asset,
                    currencyId: listing.currency,
                });
            }
            return createdListingSale[0];
        }
        catch (error) {
            yield session.abortTransaction();
            console.log('General error in create listing sale');
            throw new utils_1.NoSentryError(error);
        }
        finally {
            session.endSession();
        }
    });
}
exports.createListingSale = createListingSale;
function createListingPurchase(token, listing) {
    var _a, _b, _c, _d, _e;
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const { data: user } = yield (0, userWau_1.getUser)(token);
        const session = yield mongoose_1.default.startSession();
        try {
            session.startTransaction();
            const asset = yield assetService.findOne({ _id: listing.asset });
            const currency = yield currencyService.findOne({ _id: listing.currency });
            const STATUS_SUCCESSFUL = 'successful';
            const transactions = yield transactionService.find({
                $or: [{ 'maker.id': user.id }, { 'taker.id': user.id }],
            });
            const transactionsSuccessful = yield transactionService.find({
                status: STATUS_SUCCESSFUL,
                $or: [{ 'maker.id': user.id }, { 'taker.id': user.id }],
            });
            let listingPrice = listing === null || listing === void 0 ? void 0 : listing.price;
            let bestPrice;
            if (listing === null || listing === void 0 ? void 0 : listing.bestPricePercentage) {
                if ((listing === null || listing === void 0 ? void 0 : listing.priceReferenceType) === 'suni') {
                    bestPrice = yield bestPriceService.findOne({
                        currency: listing === null || listing === void 0 ? void 0 : listing.currency,
                        asset: listing === null || listing === void 0 ? void 0 : listing.asset,
                    });
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
            if (!(listing === null || listing === void 0 ? void 0 : listing.amountInAsset)) {
                (0, amountToAsset_1.amountToAsset)(listing, listingPrice, asset === null || asset === void 0 ? void 0 : asset.network);
            }
            const { minAmountAsset, maxAmountAsset } = (0, minMaxAmountToAsset_1.minMaxAmountToAsset)(listing.minAmount, listing.maxAmount, asset.network, listingPrice);
            const wallet = yield (0, walletService_1.getUserWallet)(token, listing.walletUser);
            yield (0, amountAssetConvert_1.amountAssetConvert)(listing, asset);
            const settings = yield settingService.getActiveSetting();
            yield (0, validateBtcTransAmount_1.validateBtcTransAmount)(settings, asset, listing);
            const type = 'purchase';
            const status = 'active';
            const fee = yield (0, getFiatHolderFee_1.getFiatHolderFee)({
                transactionAmount: listing.amount,
                assetNetwork: asset.network,
                transactionType: 'purchase',
                userRole: 'maker',
            }, settings);
            const userName = (_b = (_a = user === null || user === void 0 ? void 0 : user.metamapStatus) === null || _a === void 0 ? void 0 : _a.dni_firstName) !== null && _b !== void 0 ? _b : user === null || user === void 0 ? void 0 : user.name;
            const userLastName = (_d = (_c = user === null || user === void 0 ? void 0 : user.metamapStatus) === null || _c === void 0 ? void 0 : _c.dni_lastName) !== null && _d !== void 0 ? _d : user === null || user === void 0 ? void 0 : user.lastname;
            const listingProperties = {
                type,
                status,
                maker: {
                    id: user === null || user === void 0 ? void 0 : user.id,
                    email: user === null || user === void 0 ? void 0 : user.email,
                    name: userName,
                    lastname: userLastName,
                },
                selectedWallet: { address: wallet.wallet, name: wallet.name },
                transactionsMaker: transactions.length,
                transactionsMakerCompleted: transactionsSuccessful.length,
                fee,
                minAmountAsset,
                maxAmountAsset,
                originalMaxAssetAmount: maxAmountAsset,
                bestPrice: (_e = bestPrice === null || bestPrice === void 0 ? void 0 : bestPrice._id) !== null && _e !== void 0 ? _e : null,
            };
            const newListingPurchase = Object.assign(Object.assign({}, listing), listingProperties);
            const createdListingPurchase = yield listing_model_1.Listing.create([newListingPurchase], {
                session,
            });
            const variables = {
                name: `${userName} ${userLastName}`,
            };
            const userEmail = user === null || user === void 0 ? void 0 : user.email;
            yield (0, sendEmail_1.sendEmail)('ad_registered', token, variables, null, userEmail);
            yield session.commitTransaction();
            if (!listing.bestPricePercentage) {
                yield bestPriceService.getBestPrice({
                    assetId: listing === null || listing === void 0 ? void 0 : listing.asset,
                    currencyId: listing === null || listing === void 0 ? void 0 : listing.currency,
                });
            }
            return createdListingPurchase[0];
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
exports.createListingPurchase = createListingPurchase;
function cancelListing(body, token) {
    var _a;
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const { data: user } = yield (0, userWau_1.getUser)(token);
        const takerAssigned = 'taker_assigned';
        // const countryAvailable = await countryService.findOne({
        //   code: user.country,
        //   active: true,
        //   disabled: false,
        // });
        // if (!countryAvailable)
        //   throw new NoSentryError(
        //     'Access denied, the country is disabled to the app'
        //   );
        const listing = yield listing_model_1.Listing.findOne({ _id: body.listing });
        if (!listing)
            throw new utils_1.NoSentryError('Listing not found');
        if ((user === null || user === void 0 ? void 0 : user.id) !== ((_a = listing === null || listing === void 0 ? void 0 : listing.maker) === null || _a === void 0 ? void 0 : _a.id))
            throw new utils_1.NoSentryError('User is not Listing maker');
        if ((listing === null || listing === void 0 ? void 0 : listing.status) === takerAssigned)
            throw new utils_1.NoSentryError('Please finish the transaction');
        if (listing.type === 'sale')
            yield (0, cancelAd_1.deleteAd)(token, listing.loanAdId);
        listing.status = 'canceled';
        yield listing.save();
        return listing;
    });
}
exports.cancelListing = cancelListing;
function pagination(page, perPage, filter, projection, options) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return (0, utils_1.paginateModel)(page, perPage, listing_model_1.Listing, filter, projection, options);
    });
}
exports.pagination = pagination;
function getListingFilter(body, token) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const { data: user } = yield (0, userWau_1.getUser)(token);
        // const countryAvailable = await countryService.findOne({
        //   code: user.country,
        //   active: true,
        //   disabled: false,
        // });
        // if (!countryAvailable)
        //   throw new NoSentryError(
        //     'Access denied, the country is disabled to the app'
        //   );
        // Obtenemos el PaymentMethod a través del type enviado desde el front-end
        const paymentMethod = yield paymentMethodCategoryService.findOne({
            _id: body === null || body === void 0 ? void 0 : body.paymentMethods,
        });
        const asset = yield assetService.findOne({ _id: body === null || body === void 0 ? void 0 : body.asset });
        const currency = yield currencyService.findOne({ _id: body === null || body === void 0 ? void 0 : body.currency });
        const validateType = ['purchase', 'sale'];
        if (!validateType.includes(body.type)) {
            throw new utils_1.NoSentryError('No is a validate Type');
        }
        const filters = [
            {
                $lookup: {
                    from: 'paymentmethods',
                    localField: 'paymentMethods',
                    foreignField: '_id',
                    as: 'paymentMethodsData',
                },
            },
            {
                $match: {
                    status: {
                        $in: ['active', 'taker_assigned'],
                    },
                    active: true,
                    'maker.id': { $ne: user === null || user === void 0 ? void 0 : user.id },
                    type: body === null || body === void 0 ? void 0 : body.type,
                    asset: (asset === null || asset === void 0 ? void 0 : asset._id) ? asset === null || asset === void 0 ? void 0 : asset._id : { $ne: null },
                    currency: (currency === null || currency === void 0 ? void 0 : currency._id) ? currency === null || currency === void 0 ? void 0 : currency._id : { $ne: null },
                    'paymentMethodsData.type': (paymentMethod === null || paymentMethod === void 0 ? void 0 : paymentMethod._id)
                        ? paymentMethod === null || paymentMethod === void 0 ? void 0 : paymentMethod._id
                        : { $ne: null },
                    amount: { $ne: 0 },
                },
            },
            {
                $addFields: {
                    completeOrders: {
                        $cond: {
                            if: { $eq: ['$transactionsMakerCompleted', 0] },
                            then: 0,
                            else: {
                                $multiply: [
                                    {
                                        $divide: [
                                            '$transactionsMakerCompleted',
                                            '$transactionsMaker',
                                        ],
                                    },
                                    100,
                                ],
                            },
                        },
                    },
                },
            },
        ];
        if (body === null || body === void 0 ? void 0 : body.amount) {
            filters.push({
                $match: {
                    $and: [
                        { minAmount: { $lte: body.amount } },
                        { maxAmount: { $gte: body.amount } },
                    ],
                },
            });
        }
        if ((body === null || body === void 0 ? void 0 : body.order) === 'order') {
            filters.push({
                $sort: {
                    transactionsMaker: -1,
                },
            });
        }
        else if ((body === null || body === void 0 ? void 0 : body.order) === 'completionRate') {
            filters.push({
                $sort: {
                    completeOrders: -1,
                },
            });
        }
        else {
            filters.push({
                $sort: {
                    price: body.type === 'purchase' ? -1 : 1,
                },
            });
        }
        const listingsFilters = yield listing_model_1.Listing.aggregate(filters);
        return (0, utils_1.paginate)(body.page, body.perPage, listingsFilters);
    });
}
exports.getListingFilter = getListingFilter;
function getListingFilterUser(body, token) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const { data: user } = yield (0, userWau_1.getUser)(token);
        // const countryAvailable = await countryService.find({
        //   code: user.country,
        //   active: true,
        //   disabled: false,
        // });
        // if (!countryAvailable)
        //   throw new NoSentryError(
        //     'Access denied, the country is disabled to the app'
        //   );
        const filters = {
            'maker.id': user === null || user === void 0 ? void 0 : user.id,
            active: true,
            amount: { $ne: 0 },
        };
        if (body.type) {
            filters.type = body.type;
        }
        if (body.asset) {
            filters.asset = body.asset;
        }
        if (body.status) {
            filters.status = body.status;
        }
        const options = {
            sort: {
                createdAt: -1,
            },
        };
        const listingsFilters = yield listing_model_1.Listing.find(filters, null, options);
        return (0, utils_1.paginate)(body.page, body.perPage, listingsFilters);
    });
}
exports.getListingFilterUser = getListingFilterUser;
function bestPricesListings(body) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const validateType = ['purchase', 'sale'];
        if (!validateType.includes(body.type)) {
            throw new utils_1.NoSentryError('No is a validate Type');
        }
        const asset = yield assetService.findOne({ _id: body.asset });
        const currency = yield currencyService.findOne({ _id: body.currency });
        const bestPrice = yield listing_model_1.Listing.aggregate([
            {
                $match: {
                    $and: [
                        { active: true },
                        { type: body.type },
                        { asset: asset._id },
                        { currency: currency._id },
                    ],
                },
            },
            {
                $project: {
                    _id: '$price',
                    price: { $multiply: ['$price', 100] },
                },
            },
            {
                $sort: {
                    price: body.type === 'purchase' ? -1 : 1,
                },
            },
            {
                $project: {
                    _id: '$type',
                    price: { $divide: ['$price', 100] },
                },
            },
        ]).exec();
        if (bestPrice.length === 0) {
            throw new utils_1.NoSentryError('Not enought listings');
        }
        function valuesListing() {
            var _a;
            const listingLength = Math.floor(bestPrice.length / 2);
            // eslint-disable-next-line no-shadow
            const listingMedian = bestPrice.length % 2 !== 0
                ? bestPrice[listingLength].price
                : (bestPrice[listingLength - 1].price +
                    bestPrice[listingLength].price) /
                    2;
            // eslint-disable-next-line no-shadow
            const listingBestPrice = (_a = bestPrice[0]) === null || _a === void 0 ? void 0 : _a.price;
            return { listingMedian, listingBestPrice };
        }
        const { listingMedian, listingBestPrice } = valuesListing();
        return {
            median: listingMedian,
            bestPrice: listingBestPrice,
        };
    });
}
exports.bestPricesListings = bestPricesListings;
function updateListingUser(body, token) {
    var _a, _b, _c, _d, _e;
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const { data: user } = yield (0, userWau_1.getUser)(token);
        const session = yield mongoose_1.default.startSession();
        try {
            session.startTransaction();
            const LISTING_TYPE_SALE = 'sale';
            const setting = yield settingService.findOne({ active: true });
            const foundListing = yield listing_model_1.Listing.findOne({ _id: body === null || body === void 0 ? void 0 : body.listing }, null, {
                session,
            });
            if (foundListing.status === 'taker_assigned')
                throw new utils_1.NoSentryError('Please end the transaction');
            const foundAsset = yield assetService.findOne({ _id: foundListing.asset });
            const foundCurrency = yield currencyService.findOne({
                _id: foundListing.currency,
            });
            if ((user === null || user === void 0 ? void 0 : user.id) !== foundListing.maker.id) {
                throw new utils_1.NoSentryError('You are not the owner of the listing');
            }
            const wallet = yield (0, walletService_1.getUserWallet)(token, foundListing.selectedWallet.address);
            if (!wallet) {
                throw new utils_1.NoSentryError('Wallet doesn`t exist');
            }
            if (body === null || body === void 0 ? void 0 : body.selectedWallet) {
                const newWallet = yield (0, walletService_1.getUserWallet)(token, body === null || body === void 0 ? void 0 : body.selectedWallet);
                if (!newWallet) {
                    throw new utils_1.NoSentryError('Wallet doesn`t exist');
                }
                foundListing.selectedWallet.address = wallet.wallet;
                foundListing.selectedWallet.name = wallet.name;
                yield foundListing.save();
            }
            let bestPrice;
            // guardamos el nuevo precio si lo recibimos si no, preguntamos si habia antiguo precio
            let listingPrice = (_a = body === null || body === void 0 ? void 0 : body.price) !== null && _a !== void 0 ? _a : foundListing === null || foundListing === void 0 ? void 0 : foundListing.price;
            // si recibimos un nuevo precioPorcentaje o tomamos el precio porcentaje antiguo
            if (body === null || body === void 0 ? void 0 : body.bestPricePercentage) {
                if (body.priceReferenceType === 'suni') {
                    bestPrice = yield bestPriceService.findOne({
                        currency: body.currency,
                        asset: body.asset,
                    });
                    if ((foundListing === null || foundListing === void 0 ? void 0 : foundListing.type) === 'sale')
                        listingPrice = body.bestPricePercentage * bestPrice.saleBestPrice;
                    else
                        listingPrice = body.bestPricePercentage * bestPrice.purchaseBestPrice;
                }
                else {
                    listingPrice =
                        body.bestPricePercentage *
                            foundAsset.conversionRateToUsd *
                            foundCurrency.conversionRateToUsd;
                }
            }
            if (!(body === null || body === void 0 ? void 0 : body.amountInAsset) && body.amount) {
                (0, amountToAsset_1.amountToAsset)(body, listingPrice, foundAsset === null || foundAsset === void 0 ? void 0 : foundAsset.network, foundListing);
            }
            if ((body === null || body === void 0 ? void 0 : body.minAmount) || (body === null || body === void 0 ? void 0 : body.maxAmount)) {
                if (!body.amountInAsset) {
                    const { minAmountAsset, maxAmountAsset } = (0, minMaxAmountToAsset_1.minMaxAmountToAsset)((body === null || body === void 0 ? void 0 : body.minAmount) ? body.minAmount : foundListing.minAmount, (body === null || body === void 0 ? void 0 : body.maxAmount) ? body.maxAmount : foundListing.maxAmount, foundAsset === null || foundAsset === void 0 ? void 0 : foundAsset.network, listingPrice);
                    foundListing.minAmountAsset = minAmountAsset;
                    foundListing.maxAmountAsset = maxAmountAsset;
                    yield foundListing.save();
                }
            }
            const { listing, currency, asset, selectedWallet, type } = body, updateBody = tslib_1.__rest(body, ["listing", "currency", "asset", "selectedWallet", "type"]);
            const maker = {
                id: user === null || user === void 0 ? void 0 : user.id,
                name: (_b = user === null || user === void 0 ? void 0 : user.metamapStatus.dni_firstName) !== null && _b !== void 0 ? _b : user === null || user === void 0 ? void 0 : user.name,
                email: user === null || user === void 0 ? void 0 : user.email,
                lastname: (_c = user === null || user === void 0 ? void 0 : user.metamapStatus.dni_firstName) !== null && _c !== void 0 ? _c : user === null || user === void 0 ? void 0 : user.lastname,
            };
            const amountPercentage = (_d = ((body.amount - foundListing.amount) * 1) / 100) !== null && _d !== void 0 ? _d : 0;
            if (foundListing.type === LISTING_TYPE_SALE &&
                wallet.available_balance <
                    body.amount - foundListing.amount + amountPercentage) {
                throw new utils_1.NoSentryError('Doesn`t have enough balance');
            }
            const updatedListing = yield listing_model_1.Listing.findOneAndUpdate({ _id: listing, 'maker.id': user.id }, Object.assign(Object.assign({}, updateBody), { bestPrice: (_e = bestPrice === null || bestPrice === void 0 ? void 0 : bestPrice._id) !== null && _e !== void 0 ? _e : null, maker, minAmountAsset: body.amountInAsset
                    ? body.minAmount
                    : foundListing.minAmountAsset, maxAmountAsset: body.amountInAsset
                    ? body.maxAmount
                    : foundListing.maxAmountAsset }), {
                new: true,
                session,
            });
            if (foundListing.type === LISTING_TYPE_SALE) {
                const makerFee = yield (0, getCryptoHolderFee_1.getCryptoHolderFee)({
                    transactionAmount: body.amount,
                    assetNetwork: foundAsset.network,
                    transactionType: foundListing.type,
                    userRole: 'maker',
                }, setting);
                yield (0, updateLock_1.updateBlock)({
                    token,
                    amount: body.amount,
                    makerFee,
                    blockId: foundListing.loanAdId,
                });
            }
            yield session.commitTransaction();
            if (!body.bestPricePercentage) {
                yield bestPriceService.getBestPrice({
                    currencyId: body.currency,
                    assetId: body.asset,
                });
            }
            return updatedListing;
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
exports.updateListingUser = updateListingUser;
function getKpiMarketPrice(body, token) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const fiatUppercase = body.fiat.toUpperCase();
        const currency = yield currencyService.findOne({ network: fiatUppercase });
        yield (0, userWau_1.getUser)(token);
        // Obtenemos la conversion de la moneda en usd, el precio de sats en btc y el precio de btc en USD
        const rateFiatUsd = currency.conversionRateToUsd;
        const rateSatsBtc = 0.00000001;
        const priceBtcInUsd = yield (0, apiPriceBtc_1.apiPriceBtc)();
        // Obtener el precio de el fiat en btc y en Sats
        const rateFiatBtc = priceBtcInUsd * rateFiatUsd;
        const rateFiatSats = rateFiatBtc * rateSatsBtc;
        if ((body === null || body === void 0 ? void 0 : body.asset.toLowerCase()) === 'btc') {
            return {
                rate: rateFiatBtc,
            };
        }
        if ((body === null || body === void 0 ? void 0 : body.asset.toLowerCase()) === 'lnd') {
            return {
                rate: rateFiatSats,
            };
        }
    });
}
exports.getKpiMarketPrice = getKpiMarketPrice;
function addReferenceNumber() {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        let referenceNumber = 100000;
        const listings = yield listing_model_1.Listing.find().sort({ createdAt: 1 });
        yield Promise.all(listings.map((listing) => {
            listing.referenceNumber = referenceNumber;
            referenceNumber += 1;
            return listing.save();
        }));
        return true;
    });
}
exports.addReferenceNumber = addReferenceNumber;
// const job = new CronJob(   // commented the cronjob waiting to talk to SUNI for the best market prices
//   '*/2 * * * *',
//   async function () {
//     const typeDynamic = 'dinamico';
//     console.log('You will see this message every second');
//     const listings = await Listing.find({ priceType: typeDynamic, active: true, status: 'active' })
//     const listingMap = listings.map(async(listing) => {
//       const asset = await assetService.findOne({ _id: listing.asset })
//       const currency = await currencyService.findOne({ _id: listing.currency })
//       const objListingUpdate = {
//         currency: currency._id,
//         asset: asset._id,
//         type: listing.type,
//         priceType: listing.priceType,
//       };
//           const { median } = await bestPricesListings(objListingUpdate)
//           // if (typeof median === 'number' && !Number.isNaN(median)) {
//             // median es un número válido
//             // Ejecuta acciones con median
//             console.log('median válido:', median);
//             // ...
//             console.log('priceee', median)
//             const newPrice = (median * listing.pricePercentage) / 100
//             console.log('porcentaje', listing.pricePercentage)
//             console.log('preciooo', newPrice)
//             const updateListing = await Listing.updateOne({
//               _id: listing._id,
//               asset: asset._id,
//               currency: currency._id,
//               type: listing.type,
//               priceType: listing.priceType
//             },
//             {
//               price: newPrice
//             })
//             console.log('soy median', median)
//             const findListing = await Listing.findOne(listing._id)
//             console.log('listing update', findListing)
//           // } else {
//           //   // median es NaN o no es un número
//           //   console.log('median inválido:', median);
//           // }
//         })
//     const promise = Promise.all(listingMap)
//     return promise
//   },
//   null,
//   true
//   );
//# sourceMappingURL=listing.service.js.map