"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findOneAndUpdate = exports.getMyLoanOffers = exports.cancelOffer = exports.getAllLoanOffers = exports.pagination = exports.create = exports.updateOne = exports.find = exports.findOne = void 0;
const tslib_1 = require("tslib");
const utils_1 = require("../../utils");
const loanOffer_model_1 = require("./loanOffer.model");
const currencyService = tslib_1.__importStar(require("../currency/currency.service"));
const userInfo_1 = require("../../utils/walletService/userInfo");
const cancelAd_1 = require("../../utils/walletService/cancelAd");
function findOne(filter, projection, options) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return loanOffer_model_1.LoanOffer.findOne(filter, projection, options).exec();
    });
}
exports.findOne = findOne;
function find(filter, projection, options) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return loanOffer_model_1.LoanOffer.find(filter, projection, options).exec();
    });
}
exports.find = find;
function updateOne(filter, update, options) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return loanOffer_model_1.LoanOffer.updateOne(filter, update, options).exec();
    });
}
exports.updateOne = updateOne;
function create(loanOffer, session) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const currency = yield currencyService.findOne({
            symbol: loanOffer.currency,
        });
        delete loanOffer.currency;
        return loanOffer_model_1.LoanOffer.create([
            Object.assign(Object.assign({}, loanOffer), { currency: currency._id }),
        ], { session });
    });
}
exports.create = create;
function pagination(page, perPage, filter, projection, options) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return (0, utils_1.paginateModel)(page, perPage, loanOffer_model_1.LoanOffer, filter, projection, options);
    });
}
exports.pagination = pagination;
function getAllLoanOffers(token) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const { data: user } = yield (0, userInfo_1.getUserInfo)(token);
        if (!user) {
            throw new utils_1.NoSentryError('User not found');
        }
        // servicio de buscar todas las ofertas de solicitudes
        const loanOffers = yield loanOffer_model_1.LoanOffer.find({
            status: 'active',
            active: true,
        }).exec();
        return loanOffers;
    });
}
exports.getAllLoanOffers = getAllLoanOffers;
function cancelOffer(body, token) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const { data: user } = yield (0, userInfo_1.getUserInfo)(token);
        if (!user) {
            throw new utils_1.NoSentryError('User not found');
        }
        const loanOffer = yield loanOffer_model_1.LoanOffer.findOne({
            $and: [
                {
                    _id: body === null || body === void 0 ? void 0 : body._id,
                },
                {
                    lender: user === null || user === void 0 ? void 0 : user.id,
                },
                {
                    status: 'active',
                },
                {
                    active: true,
                },
            ],
        });
        if (!loanOffer) {
            throw new utils_1.NoSentryError('Loan offer not found');
        }
        yield (0, cancelAd_1.deleteBlock)(token, loanOffer.blockId);
        loanOffer.status = 'canceled';
        yield loanOffer.save();
        return loanOffer;
    });
}
exports.cancelOffer = cancelOffer;
function getMyLoanOffers(body, token) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const { data: user } = yield (0, userInfo_1.getUserInfo)(token);
        const filters = {
            lender: user === null || user === void 0 ? void 0 : user.id,
            active: true,
            status: 'active',
        };
        if (body === null || body === void 0 ? void 0 : body.status) {
            filters.status = body === null || body === void 0 ? void 0 : body.status;
        }
        if ((body === null || body === void 0 ? void 0 : body.startDate) && (body === null || body === void 0 ? void 0 : body.endDate)) {
            filters.createdAt = {
                $gte: new Date(body === null || body === void 0 ? void 0 : body.startDate),
                $lte: new Date(body === null || body === void 0 ? void 0 : body.endDate),
            };
        }
        const options = {
            sort: { createdAt: -1 },
        };
        return pagination(body === null || body === void 0 ? void 0 : body.page, body === null || body === void 0 ? void 0 : body.perPage, filters, null, options);
    });
}
exports.getMyLoanOffers = getMyLoanOffers;
function findOneAndUpdate(filter, update, options) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return loanOffer_model_1.LoanOffer.findOneAndUpdate(filter, update, options).exec();
    });
}
exports.findOneAndUpdate = findOneAndUpdate;
// export async function getLoanOffer(loanOffer: string, token: string) {
//   const { data: user } = getUserInfo(token)
//   const offer = await LoanOffer.findOne({ _id: loanOffer })
//   if (user.id !== offer.borrower || user.id !== offer.lender) {
//     throw new NoSentryError('User is not lender or borrower to see the offer')
//   }
//   return offer
// }
//# sourceMappingURL=loanOffer.service.js.map