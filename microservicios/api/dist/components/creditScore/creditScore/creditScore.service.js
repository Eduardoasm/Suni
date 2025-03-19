"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCredolabDataset = exports.getCreditScoreUser = exports.pagination = exports.create = exports.getClientsWithCreditScore = exports.getClientWithCreditScore = exports.updateOne = exports.find = exports.findOne = void 0;
const tslib_1 = require("tslib");
/* eslint-disable import/no-cycle */
const axios_1 = tslib_1.__importDefault(require("axios"));
const dayjs_1 = tslib_1.__importDefault(require("dayjs"));
const utils_1 = require("../../../utils");
const creditScore_model_1 = require("./creditScore.model");
const userInfo_1 = require("../../../utils/walletService/userInfo");
const settingsService = tslib_1.__importStar(require("../../settings/settings/settings.service"));
function findOne(filter, projection, options) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return creditScore_model_1.CreditScore.findOne(filter, projection, options).exec();
    });
}
exports.findOne = findOne;
function find(filter, projection, options) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return creditScore_model_1.CreditScore.find(filter, projection, options).exec();
    });
}
exports.find = find;
function updateOne(filter, update, options) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return creditScore_model_1.CreditScore.updateOne(filter, update, options).exec();
    });
}
exports.updateOne = updateOne;
function getClientWithCreditScore(body) {
    var _a, _b, _c, _d, _e;
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const client = yield axios_1.default.get(`${process.env.SERVICE_URL}/user/${body === null || body === void 0 ? void 0 : body.id}`, {
            headers: {
                Authorization: `Bearer ${process.env.TOKEN_ADMIN_SUNI}`,
            },
        });
        const creditScore = yield creditScore_model_1.CreditScore.findOne({
            user: body === null || body === void 0 ? void 0 : body.id,
        });
        const settings = yield settingsService.getActiveSetting();
        const creditScoreRange = settings === null || settings === void 0 ? void 0 : settings.creditScoreRange;
        let data;
        if (creditScore) {
            const values = (_a = creditScore === null || creditScore === void 0 ? void 0 : creditScore.values) === null || _a === void 0 ? void 0 : _a.sort((valueA, valueB) => (0, dayjs_1.default)(valueA === null || valueA === void 0 ? void 0 : valueA.createdAt).isBefore((0, dayjs_1.default)(valueB === null || valueB === void 0 ? void 0 : valueB.createdAt)) ? 1 : -1);
            const suniValues = values === null || values === void 0 ? void 0 : values.filter((val) => (val === null || val === void 0 ? void 0 : val.provider) === 'suni');
            const credoLabValues = values === null || values === void 0 ? void 0 : values.filter((val) => (val === null || val === void 0 ? void 0 : val.provider) === 'credolab');
            let rangeCredoLab = 0;
            let rangeSuni = 0;
            creditScoreRange === null || creditScoreRange === void 0 ? void 0 : creditScoreRange.forEach((scoreRange, index) => {
                var _a, _b, _c, _d, _e, _f;
                if (((_a = credoLabValues[0]) === null || _a === void 0 ? void 0 : _a.value) >= scoreRange.initial) {
                    if (index === creditScoreRange.length - 1 &&
                        ((_b = credoLabValues[0]) === null || _b === void 0 ? void 0 : _b.value) >= (scoreRange === null || scoreRange === void 0 ? void 0 : scoreRange.final)) {
                        rangeCredoLab = index;
                    }
                    else if (((_c = credoLabValues[0]) === null || _c === void 0 ? void 0 : _c.value) <= (scoreRange === null || scoreRange === void 0 ? void 0 : scoreRange.final)) {
                        rangeCredoLab = index;
                    }
                }
                if (((_d = suniValues[0]) === null || _d === void 0 ? void 0 : _d.value) >= scoreRange.initial) {
                    if (index === creditScoreRange.length - 1 &&
                        ((_e = suniValues[0]) === null || _e === void 0 ? void 0 : _e.value) >= (scoreRange === null || scoreRange === void 0 ? void 0 : scoreRange.final)) {
                        rangeCredoLab = index;
                    }
                    else if (((_f = suniValues[0]) === null || _f === void 0 ? void 0 : _f.value) <= (scoreRange === null || scoreRange === void 0 ? void 0 : scoreRange.final)) {
                        rangeCredoLab = index;
                    }
                    rangeSuni = index;
                }
            });
            const currentCreditScore = {
                credoLab: credoLabValues[0]
                    ? Object.assign(Object.assign({}, (_b = credoLabValues[0]) === null || _b === void 0 ? void 0 : _b._doc), { range: rangeCredoLab }) : null,
                suni: suniValues[0]
                    ? Object.assign(Object.assign({}, (_c = suniValues[0]) === null || _c === void 0 ? void 0 : _c._doc), { range: rangeSuni }) : null,
            };
            data = {
                client,
                currentCreditScore,
                historicalCreditScore: creditScore,
            };
        }
        else {
            data = {
                client: (_e = (_d = client === null || client === void 0 ? void 0 : client.data) === null || _d === void 0 ? void 0 : _d.data) !== null && _e !== void 0 ? _e : {},
                currentCreditScore: {
                    credoLab: null,
                    suni: null,
                },
                historicalCreditScore: creditScore,
            };
        }
        return Object.assign({}, data);
    });
}
exports.getClientWithCreditScore = getClientWithCreditScore;
function getClientsWithCreditScore(filter) {
    var _a, _b, _c, _d, _e, _f;
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const users = yield axios_1.default.get(`${process.env.SERVICE_URL}/user`, {
            headers: {
                Authorization: `Bearer ${process.env.TOKEN_ADMIN_SUNI}`,
            },
        });
        const clients = (_b = (_a = users === null || users === void 0 ? void 0 : users.data) === null || _a === void 0 ? void 0 : _a.data) !== null && _b !== void 0 ? _b : [];
        const clientObject = [];
        const creditScores = yield creditScore_model_1.CreditScore.find({ values: { $ne: undefined } });
        const settings = yield settingsService.getActiveSetting();
        const creditScoreRange = settings === null || settings === void 0 ? void 0 : settings.creditScoreRange;
        let data;
        for (const client of clients) {
            const creditScore = (_c = creditScores.find((score) => (score === null || score === void 0 ? void 0 : score.user) === (client === null || client === void 0 ? void 0 : client.id))) !== null && _c !== void 0 ? _c : null;
            if (creditScore) {
                const values = (_d = creditScore === null || creditScore === void 0 ? void 0 : creditScore.values) === null || _d === void 0 ? void 0 : _d.sort((valueA, valueB) => (0, dayjs_1.default)(valueA === null || valueA === void 0 ? void 0 : valueA.createdAt).isBefore((0, dayjs_1.default)(valueB === null || valueB === void 0 ? void 0 : valueB.createdAt)) ? 1 : -1);
                const suniValues = values === null || values === void 0 ? void 0 : values.filter((val) => (val === null || val === void 0 ? void 0 : val.provider) === 'suni');
                const credoLabValues = values === null || values === void 0 ? void 0 : values.filter((val) => (val === null || val === void 0 ? void 0 : val.provider) === 'credolab');
                let rangeCredoLab = 0;
                let rangeSuni = 0;
                creditScoreRange === null || creditScoreRange === void 0 ? void 0 : creditScoreRange.forEach((scoreRange, index) => {
                    var _a, _b, _c, _d, _e, _f;
                    if (((_a = credoLabValues[0]) === null || _a === void 0 ? void 0 : _a.value) >= scoreRange.initial) {
                        if (index === creditScoreRange.length - 1 &&
                            ((_b = credoLabValues[0]) === null || _b === void 0 ? void 0 : _b.value) >= (scoreRange === null || scoreRange === void 0 ? void 0 : scoreRange.final)) {
                            rangeCredoLab = index;
                        }
                        else if (((_c = credoLabValues[0]) === null || _c === void 0 ? void 0 : _c.value) <= (scoreRange === null || scoreRange === void 0 ? void 0 : scoreRange.final)) {
                            rangeCredoLab = index;
                        }
                    }
                    if (((_d = suniValues[0]) === null || _d === void 0 ? void 0 : _d.value) >= scoreRange.initial) {
                        if (index === creditScoreRange.length - 1 &&
                            ((_e = suniValues[0]) === null || _e === void 0 ? void 0 : _e.value) >= (scoreRange === null || scoreRange === void 0 ? void 0 : scoreRange.final)) {
                            rangeCredoLab = index;
                        }
                        else if (((_f = suniValues[0]) === null || _f === void 0 ? void 0 : _f.value) <= (scoreRange === null || scoreRange === void 0 ? void 0 : scoreRange.final)) {
                            rangeCredoLab = index;
                        }
                        rangeSuni = index;
                    }
                });
                const currentCreditScore = {
                    credoLab: credoLabValues[0]
                        ? Object.assign(Object.assign({}, (_e = credoLabValues[0]) === null || _e === void 0 ? void 0 : _e._doc), { range: rangeCredoLab }) : null,
                    suni: suniValues[0]
                        ? Object.assign(Object.assign({}, (_f = suniValues[0]) === null || _f === void 0 ? void 0 : _f._doc), { range: rangeSuni }) : null,
                };
                data = {
                    client,
                    currentCreditScore,
                    historicalCreditScore: creditScore,
                };
            }
            else {
                data = {
                    client,
                    currentCreditScore: {
                        credoLab: null,
                        suni: null,
                    },
                    historicalCreditScore: creditScore,
                };
            }
            clientObject.push(data);
        }
        return { clients: clientObject };
    });
}
exports.getClientsWithCreditScore = getClientsWithCreditScore;
function create(body, token, session) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const { data: user } = yield (0, userInfo_1.getUserInfo)(token);
        if (!user) {
            throw new utils_1.NoSentryError('Invalid user');
        }
        const creditScore = yield creditScore_model_1.CreditScore.findOne({ user: user.id }, null, {
            session,
        });
        if (creditScore) {
            creditScore.values.push(body.values);
            yield creditScore.save();
            return creditScore;
        }
        return creditScore_model_1.CreditScore.create([{ user: user.id, values: body.values }], {
            session,
        });
    });
}
exports.create = create;
function pagination(page, perPage, filter, projection, options) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return (0, utils_1.paginateModel)(page, perPage, creditScore_model_1.CreditScore, filter, projection, options);
    });
}
exports.pagination = pagination;
function getCreditScoreUser(body) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const startDate = new Date(body.startDate);
        const endDate = new Date(body.endDate).setUTCHours(23, 59, 59);
        const enDateLastHour = new Date(endDate);
        if (!body.userId) {
            throw new utils_1.NoSentryError('Error, Invalid user');
        }
        const creditScore = yield creditScore_model_1.CreditScore.aggregate([
            {
                $unwind: '$values',
            },
            {
                $match: {
                    $and: [
                        {
                            user: body.userId,
                        },
                        {
                            'values.createdAt': {
                                $gte: startDate,
                                $lte: enDateLastHour,
                            },
                        },
                    ],
                },
            },
            {
                $group: {
                    _id: '$_id',
                    user: { $first: '$user' },
                    values: { $push: '$values' },
                },
            },
        ]);
        if (!creditScore) {
            throw new utils_1.NoSentryError('Error in get CreditScore');
        }
        return creditScore[0];
    });
}
exports.getCreditScoreUser = getCreditScoreUser;
function getCredolabAuthAccessToken() {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        try {
            const { data } = yield axios_1.default.post(`${process.env.CREDOLAB_URL}/api/account/v1/login`, {
                userEmail: process.env.CREDOLAB_EMAIL,
                password: process.env.CREDOLAB_PASSWORD,
            });
            return data.access_token;
        }
        catch (error) {
            console.log(error, 'credolab auth error');
            throw new utils_1.NoSentryError(`General auth error credolab: ${error.title}`);
        }
    });
}
function getCredolabDataset(referenceNumber) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        try {
            const accessToken = yield getCredolabAuthAccessToken();
            const config = {
                method: 'get',
                baseURL: process.env.CREDOLAB_URL,
                url: `/api/insights/v1/${referenceNumber}`,
                headers: {
                    authorization: `Bearer ${accessToken}`,
                },
            };
            const { data } = yield (0, axios_1.default)(config);
            return data.insights;
        }
        catch (error) {
            throw new utils_1.NoSentryError(`Error credolab dataset: ${error.title}`);
        }
    });
}
exports.getCredolabDataset = getCredolabDataset;
// export async function getCreditScoreCredolab(token: string): Promise<any> {
//   // servicio para obtener el credit score
//   if (!token) {
//     return new NoSentryError('User not Authorized');
//   }
//   const { user } = await currentUser(token);
//   const userCreditScore = user.creditScores[user.creditScores.length - 1];
//   const { referenceNumber } = await CreditScore.findOne({
//     _id: userCreditScore._id,
//   });
//   const accessToken = await getCredolabUserAccessToken();
//   const data = await getCredolabUserValues(accessToken, referenceNumber);
//   const userCreditScoreCredolab = await createCreditScoreCredolab(
//     user,
//     referenceNumber,
//     data
//   );
//   return userCreditScoreCredolab;
// }
//# sourceMappingURL=creditScore.service.js.map