"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCommerceRiskParamsWithCreditScore = exports.pagination = exports.create = exports.updateOne = exports.find = exports.findOne = void 0;
const tslib_1 = require("tslib");
const commerceRiskParam_model_1 = require("./commerceRiskParam.model");
const pagination_1 = require("../../utils/pagination");
const userInfo_1 = require("../../utils/walletService/userInfo");
const utils_1 = require("../../utils");
const creditScoreService = tslib_1.__importStar(require("../creditScore/creditScore/creditScore.service"));
const wauEmail_1 = require("../../utils/emails/wauEmail");
function findOne(filter, projection, options) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return commerceRiskParam_model_1.CommerceRiskParam.findOne(filter, projection, options).exec();
    });
}
exports.findOne = findOne;
function find(filter, projection, options) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return commerceRiskParam_model_1.CommerceRiskParam.find(filter, projection, options).exec();
    });
}
exports.find = find;
function updateOne(filter, update, options) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return commerceRiskParam_model_1.CommerceRiskParam.updateOne(filter, update, options).exec();
    });
}
exports.updateOne = updateOne;
function create(commerceRiskParam) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return commerceRiskParam_model_1.CommerceRiskParam.create(commerceRiskParam);
    });
}
exports.create = create;
function pagination(page, perPage, filter, projection, options) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return (0, pagination_1.paginateModel)(page, perPage, commerceRiskParam_model_1.CommerceRiskParam, filter, projection, options);
    });
}
exports.pagination = pagination;
function getCommerceRiskParamsWithCreditScore(body, token) {
    var _a, _b, _c, _d;
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const { data: user } = yield (0, userInfo_1.getUserInfo)(token);
        const credolabDataset = yield creditScoreService.getCredolabDataset(body.credolabReferenceNumber);
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
                referenceNumber: body.credolabReferenceNumber,
                value: creditScore,
                provider: 'credolab',
            },
        }, token);
        const userName = (_b = (_a = user === null || user === void 0 ? void 0 : user.metamapStatus) === null || _a === void 0 ? void 0 : _a.dni_firstName) !== null && _b !== void 0 ? _b : user === null || user === void 0 ? void 0 : user.name;
        const userLastName = (_d = (_c = user === null || user === void 0 ? void 0 : user.metamapStatus) === null || _c === void 0 ? void 0 : _c.dni_lastName) !== null && _d !== void 0 ? _d : user === null || user === void 0 ? void 0 : user.lastname;
        if (createdCreditScoreUser) {
            yield (0, wauEmail_1.sendEmail)('credolab_score_created', token, {
                name: `${userName} ${userLastName}`,
            }, null, user === null || user === void 0 ? void 0 : user.email);
        }
        const filters = {
            active: true,
            commerce: body.commerce,
            withCreditScoring: true,
            creditScoreLowerLimit: {
                $lte: creditScore,
            },
            creditScoreUpperLimit: {
                $gte: creditScore,
            },
            minAmountUSD: {
                $lte: body.amountUSD,
            },
            maxAmountUSD: {
                $gte: body.amountUSD,
            },
        };
        return pagination(body.page, body.perPage, filters);
    });
}
exports.getCommerceRiskParamsWithCreditScore = getCommerceRiskParamsWithCreditScore;
//# sourceMappingURL=commerceRiskParam.service.js.map