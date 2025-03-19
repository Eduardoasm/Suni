"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCreditScoreUser = exports.pagination = exports.create = exports.updateOne = exports.find = exports.findOne = void 0;
const tslib_1 = require("tslib");
const utils_1 = require("../../utils");
const creditScore_model_1 = require("./creditScore.model");
const userInfo_1 = require("../../utils/userInfo");
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
function create(creditScore) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return creditScore_model_1.CreditScore.create(creditScore);
    });
}
exports.create = create;
function pagination(page, perPage, filter, projection, options) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return (0, utils_1.paginateModel)(page, perPage, creditScore_model_1.CreditScore, filter, projection, options);
    });
}
exports.pagination = pagination;
function getCreditScoreUser(body, token) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const { data: user } = yield (0, userInfo_1.getUserInfo)(token);
        const startDate = new Date(body.startDate);
        const endDate = new Date(body.endDate);
        const PROVIDER_CREDOLAB = 'credolab';
        const PROVIDER_SUNI = 'suni';
        if (body.provider === PROVIDER_CREDOLAB) {
            const creditScore = yield creditScore_model_1.CreditScore.find({
                $and: [
                    {
                        user: user.id,
                    },
                    {
                        provider: PROVIDER_CREDOLAB,
                    },
                ],
            });
            return creditScore;
        }
        if (body.provider === PROVIDER_SUNI) {
            const creditScore = yield creditScore_model_1.CreditScore.find({
                $and: [
                    {
                        user: user.id,
                    },
                    {
                        provider: PROVIDER_SUNI,
                    },
                ],
            });
            return creditScore;
        }
    });
}
exports.getCreditScoreUser = getCreditScoreUser;
// async function getCredolabAuthAccessToken(): Promise<string | null> {
//   // funcion para obtener el access token de credolab con la key de Suni
//   try {
//     const { data } = await axios.post(
//       `${process.env.DEFAULT_URL}/api/account/v1/credoAppLogin`,
//       {
//         authKey: process.env.AUTH_KEY,
//       }
//     );
//     return data.access_token;
//   } catch (error) {
//     console.log(`Failed to get credolab access token', ${error.message}`);
//     return null;
//   }
// }
// async function uploadCredolabData(
//   accessToken: string,
//   dataInfo: DataInfo
// ): Promise<boolean> {
//   // funcion para subir data de client en credolab
//   try {
//     const { data } = await axios.post(
//       `${process.env.DEFAULT_URL}/api/datasets/v1/upload`,
//       dataInfo,
//       {
//         headers: {
//           Authorization: `Bearer ${accessToken}`,
//         },
//       }
//     );
//     console.log(`Credolab upload Response ${JSON.stringify(data)}`);
//     return true;
//   } catch (error) {
//     console.log(`Failed to upload data to credolab ${error.message}`);
//     return false;
//   }
// }
// export async function credolab(
//   token: string,
//   body: TCredolabData
// ): Promise<boolean> {
//   try {
//     if (!token) {
//       throw new NoSentryError('User not Authorized');
//     }
//     const { user } = await currentUser(token);
//     if (!user) {
//       throw new NoSentryError('No user found');
//     }
//     const date = new Date().toLocaleDateString();
//     const accessToken = await getCredolabAuthAccessToken();
//     const referenceNumber = `${user._id}${date}`;
//     const dataInfo: DataInfo = {
//       referenceNumber,
//       data: body.data,
//       realIp: body.realIp,
//     };
//     const uploadData = await uploadCredolabData(accessToken, dataInfo);
//     return uploadData;
//   } catch (error) {
//     return false;
//   }
// }
// async function getCredolabUserAccessToken(): Promise<string> {
//   // funcion para obtener access token de usuario adm
//   try {
//     const config = {
//       userEmail: process.env.ADMIN_EMAIL,
//       password: `${process.env.ADMIN_PASSWORD}#`,
//     };
//     const { data } = await axios.post(
//       `${process.env.DEFAULT_URL}/api/account/v1/login`,
//       config
//     );
//     return data.access_token;
//   } catch (error) {
//     throw new NoSentryError('Failed get access token');
//   }
// }
// async function getCredolabUserValues(
//   accessToken: string,
//   referenceNumber: string
// ): Promise<any> {
//   // function para obtener data credolab de usuario
//   try {
//     const options = {
//       headers: {
//         Authorization: `Bearer ${accessToken}`,
//       },
//     };
//     const { data } = await axios.get(
//       `${process.env.DEFAULT_URL}/v6.0/datasets/${referenceNumber}/datasetinsight`,
//       options
//     );
//     return data;
//   } catch (error) {
//     throw new NoSentryError('Failed to get Credolab user values');
//   }
// }
// async function createCreditScoreCredolab(
//   user: IUser,
//   referenceNumber: string,
//   data: any
// ): Promise<UpdateQuery<IUser>> {
//   // function para actualizar el usuario con el valor de creditscore
//   try {
//     const creditScore: ICreditScore = {
//       referenceNumber,
//       value: data.scores.value,
//       provider: 'credolab',
//     };
//     const createCreditScore = await CreditScore.create(creditScore);
//     const userCreditScore = await userService.updateOne(
//       {
//         _id: user._id,
//       },
//       {
//         $push: {
//           creditScores: createCreditScore._id,
//         },
//       }
//     );
//     return userCreditScore;
//   } catch (error) {
//     throw new NoSentryError('Failed to create credit score in user');
//   }
// }
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