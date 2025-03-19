/* eslint-disable import/no-cycle */
import axios from 'axios';
import type {
  FilterQuery,
  ProjectionType,
  QueryOptions,
  UpdateQuery,
  UpdateWithAggregationPipeline,
} from 'mongoose';
import dayjs from 'dayjs';
import { NoSentryError, paginateModel } from '../../../utils';
import { ICreditScore, CreditScore } from './creditScore.model';
import {
  TCreateCreditScore,
  TGetClientWithCreditScoreInput,
  TGetCreditScoreUser,
} from './creditScore.dto';
import { getUserInfo } from '../../../utils/walletService/userInfo';
import * as settingsService from '../../settings/settings/settings.service';

export async function findOne(
  filter?: FilterQuery<ICreditScore>,
  projection?: ProjectionType<ICreditScore> | null,
  options?: QueryOptions<ICreditScore> | null
) {
  return CreditScore.findOne(filter, projection, options).exec();
}

export async function find(
  filter?: FilterQuery<ICreditScore>,
  projection?: ProjectionType<ICreditScore> | null,
  options?: QueryOptions<ICreditScore> | null
) {
  return CreditScore.find(filter, projection, options).exec();
}

export async function updateOne(
  filter: FilterQuery<ICreditScore>,
  update: UpdateQuery<ICreditScore> | UpdateWithAggregationPipeline,
  options?: QueryOptions<ICreditScore> | null
) {
  return CreditScore.updateOne(filter, update, options).exec();
}

export async function getClientWithCreditScore(
  body: TGetClientWithCreditScoreInput
) {
  const client = await axios.get(
    `${process.env.SERVICE_URL}/user/${body?.id}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.TOKEN_ADMIN_SUNI}`,
      },
    }
  );
  const creditScore = await CreditScore.findOne({
    user: body?.id,
  });
  const settings = await settingsService.getActiveSetting();
  const creditScoreRange = settings?.creditScoreRange;
  let data;
  if (creditScore) {
    const values = creditScore?.values?.sort((valueA, valueB) =>
      dayjs(valueA?.createdAt).isBefore(dayjs(valueB?.createdAt)) ? 1 : -1
    );
    const suniValues = values?.filter((val) => val?.provider === 'suni');
    const credoLabValues = values?.filter(
      (val) => val?.provider === 'credolab'
    );
    let rangeCredoLab = 0;
    let rangeSuni = 0;
    creditScoreRange?.forEach((scoreRange, index) => {
      if (credoLabValues[0]?.value >= scoreRange.initial) {
        if (
          index === creditScoreRange.length - 1 &&
          credoLabValues[0]?.value >= scoreRange?.final
        ) {
          rangeCredoLab = index;
        } else if (credoLabValues[0]?.value <= scoreRange?.final) {
          rangeCredoLab = index;
        }
      }
      if (suniValues[0]?.value >= scoreRange.initial) {
        if (
          index === creditScoreRange.length - 1 &&
          suniValues[0]?.value >= scoreRange?.final
        ) {
          rangeCredoLab = index;
        } else if (suniValues[0]?.value <= scoreRange?.final) {
          rangeCredoLab = index;
        }
        rangeSuni = index;
      }
    });
    const currentCreditScore = {
      credoLab: credoLabValues[0]
        ? {
            ...(credoLabValues[0] as any)?._doc,
            range: rangeCredoLab,
          }
        : null,
      suni: suniValues[0]
        ? {
            ...(suniValues[0] as any)?._doc,
            range: rangeSuni,
          }
        : null,
    };
    data = {
      client,
      currentCreditScore,
      historicalCreditScore: creditScore,
    };
  } else {
    data = {
      client: client?.data?.data ?? {},
      currentCreditScore: {
        credoLab: null,
        suni: null,
      },
      historicalCreditScore: creditScore,
    };
  }

  return { ...data };
}

export async function getClientsWithCreditScore(
  filter?: FilterQuery<ICreditScore>
) {
  const users = await axios.get(`${process.env.SERVICE_URL}/user`, {
    headers: {
      Authorization: `Bearer ${process.env.TOKEN_ADMIN_SUNI}`,
    },
  });
  const clients = users?.data?.data ?? [];
  const clientObject = [];
  const creditScores = await CreditScore.find({ values: { $ne: undefined } });
  const settings = await settingsService.getActiveSetting();
  const creditScoreRange = settings?.creditScoreRange;
  let data;
  for (const client of clients) {
    const creditScore =
      creditScores.find((score) => score?.user === client?.id) ?? null;
    if (creditScore) {
      const values = creditScore?.values?.sort((valueA, valueB) =>
        dayjs(valueA?.createdAt).isBefore(dayjs(valueB?.createdAt)) ? 1 : -1
      );
      const suniValues = values?.filter((val) => val?.provider === 'suni');
      const credoLabValues = values?.filter(
        (val) => val?.provider === 'credolab'
      );
      let rangeCredoLab = 0;
      let rangeSuni = 0;
      creditScoreRange?.forEach((scoreRange, index) => {
        if (credoLabValues[0]?.value >= scoreRange.initial) {
          if (
            index === creditScoreRange.length - 1 &&
            credoLabValues[0]?.value >= scoreRange?.final
          ) {
            rangeCredoLab = index;
          } else if (credoLabValues[0]?.value <= scoreRange?.final) {
            rangeCredoLab = index;
          }
        }
        if (suniValues[0]?.value >= scoreRange.initial) {
          if (
            index === creditScoreRange.length - 1 &&
            suniValues[0]?.value >= scoreRange?.final
          ) {
            rangeCredoLab = index;
          } else if (suniValues[0]?.value <= scoreRange?.final) {
            rangeCredoLab = index;
          }
          rangeSuni = index;
        }
      });
      const currentCreditScore = {
        credoLab: credoLabValues[0]
          ? {
              ...(credoLabValues[0] as any)?._doc,
              range: rangeCredoLab,
            }
          : null,
        suni: suniValues[0]
          ? {
              ...(suniValues[0] as any)?._doc,
              range: rangeSuni,
            }
          : null,
      };
      data = {
        client,
        currentCreditScore,
        historicalCreditScore: creditScore,
      };
    } else {
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
}

export async function create(
  body: TCreateCreditScore,
  token: string,
  session?: any
) {
  const { data: user } = await getUserInfo(token);

  if (!user) {
    throw new NoSentryError('Invalid user');
  }

  const creditScore = await CreditScore.findOne({ user: user.id }, null, {
    session,
  });

  if (creditScore) {
    creditScore.values.push(body.values);
    await creditScore.save();
    return creditScore;
  }

  return CreditScore.create([{ user: user.id, values: body.values }], {
    session,
  });
}

export async function pagination(
  page: number,
  perPage: number,
  filter?: FilterQuery<ICreditScore>,
  projection?: ProjectionType<ICreditScore> | null,
  options?: QueryOptions<ICreditScore> | null
) {
  return paginateModel(page, perPage, CreditScore, filter, projection, options);
}

export async function getCreditScoreUser(body: TGetCreditScoreUser) {
  const startDate = new Date(body.startDate);
  const endDate = new Date(body.endDate).setUTCHours(23, 59, 59);
  const enDateLastHour = new Date(endDate);

  if (!body.userId) {
    throw new NoSentryError('Error, Invalid user');
  }

  const creditScore = await CreditScore.aggregate([
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
    throw new NoSentryError('Error in get CreditScore');
  }

  return creditScore[0];
}

async function getCredolabAuthAccessToken() {
  try {
    const { data } = await axios.post(
      `${process.env.CREDOLAB_URL}/api/account/v1/login`,
      {
        userEmail: process.env.CREDOLAB_EMAIL,
        password: process.env.CREDOLAB_PASSWORD,
      }
    );
    return data.access_token;
  } catch (error) {
    console.log(error, 'credolab auth error');
    throw new NoSentryError(`General auth error credolab: ${error.title}`);
  }
}

export async function getCredolabDataset(referenceNumber: string) {
  try {
    const accessToken = await getCredolabAuthAccessToken();

    const config = {
      method: 'get',
      baseURL: process.env.CREDOLAB_URL,
      url: `/api/insights/v1/${referenceNumber}`,
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    };
    const { data } = await axios(config);

    return data.insights;
  } catch (error) {
    throw new NoSentryError(`Error credolab dataset: ${error.title}`);
  }
}

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
