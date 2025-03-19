/* eslint-disable prettier/prettier */
/* eslint-disable import/no-cycle */
import type { Request, Response, NextFunction } from 'express';
import { schemaComposer } from 'graphql-compose';
import { CreditScoreTC, ICreditScore } from './creditScore.model';
import * as creditScoreService from './creditScore.service';
import {
  CreditScoreType,
  GetCreditScoreUserInput,
  TCreateCreditScore,
  CreateCreditScoreUserInput,
  GetClientsWithCreditScoreType,
  GetClientWithCreditScoreType,
  GetClientWithCreditScoreInput,
} from './creditScore.dto';

export const getCreditScoreUser = schemaComposer.createResolver<any>({
  name: 'getCreditScoreUser',
  description: 'get credit score credolab or suni for user',
  kind: 'query',
  type: CreditScoreType,
  args: {
    data: GetCreditScoreUserInput,
  },
  async resolve({ args }) {
    const creditScore = await creditScoreService.getCreditScoreUser(args?.data);
    return creditScore;
  },
});

export const getClientsWithCreditScore = schemaComposer.createResolver<any>({
  name: 'getClientsWithCreditScore',
  description:
    'get all clients with their credit score credolab or suni for user',
  kind: 'query',
  type: GetClientsWithCreditScoreType,
  args: {},
  async resolve() {
    const creditScore = await creditScoreService.getClientsWithCreditScore();
    return creditScore;
  },
});

export const getClientWithCreditScore = schemaComposer.createResolver<any>({
  name: 'getClientWithCreditScore',
  description: 'get one client with its respective credit score',
  kind: 'query',
  type: GetClientWithCreditScoreType,
  args: { data: GetClientWithCreditScoreInput },
  async resolve({ args }) {
    const creditScore = await creditScoreService.getClientWithCreditScore(
      args?.data
    );
    return creditScore;
  },
});

export const createCreditScoreUser = schemaComposer.createResolver<
  any,
  {
    data: TCreateCreditScore;
  }
>({
  name: 'createCreditScoreUser',
  description: 'upload the credit score in credolab',
  kind: 'mutation',
  type: CreditScoreType,
  args: {
    data: CreateCreditScoreUserInput,
  },
  async resolve({ args, context }) {
    const token = context.req.headers?.authorization;
    const creditScore = await creditScoreService.create(args.data, token);
    return creditScore;
  },
});

// export const uploadCreditScore = schemaComposer.createResolver<
// any,
// {
//   data: TCredolabData,
// }
// >({
//   name: 'uploadCreditScore',
//   description: 'upload the credit score in credolab',
//   kind: 'mutation',
//   type: CredolabDataType,
//   args: {
//     data: CredolabDataInput,
//   },
//   async resolve ({ args, context }) {
//     const token =
//     context.req.cookies?.token ?? context.req.headers['x-token'];
//     const creditScore = await creditScoreService.credolab(token, args.data)
//     return creditScore
//   }
// })

// export const userCreditScore = schemaComposer.createResolver<
// any
// >({
//   name: 'userCreditScore',
//   kind: 'query',
//   description: 'get creditScore in user',
//   type: CreditScoreType,
//   async resolve({ context }) {
//     const token =
//     context?.req.cookies?.token ?? context.req.headers['x-token'];
//     const creditScore = await creditScoreService.getCreditScoreCredolab(token)
//     return creditScore;
//   }
// })

const creditScoreQueries = {
  creditScore: CreditScoreTC.mongooseResolvers.findOne(),
  creditScores: CreditScoreTC.mongooseResolvers.findMany({
    limit: { defaultValue: 1000000 },
  }),
  creditScorePagination: CreditScoreTC.mongooseResolvers.pagination(),
  getCreditScoreUser,
  getClientsWithCreditScore,
  getClientWithCreditScore,
};

const creditScoreMutations = {
  updatecreditScore: CreditScoreTC.mongooseResolvers.updateOne(),
  createCreditScoreUser,
  // uploadCreditScore,
};

// REST Controller

export async function getAll(req: Request, res: Response, next: NextFunction) {
  try {
    const creditScore = await creditScoreService.find({});
    return res.status(200).json({ success: true, creditScore });
  } catch (err) {
    res.status(500).json({ err: 'Internal server error', success: false });
  }
}

export async function getOne(req: Request, res: Response, next: NextFunction) {
  try {
    const creditScore = await creditScoreService.findOne({
      _id: req.params._id,
    });
    return res.status(200).json({ success: true, creditScore });
  } catch (err) {
    res.status(500).json({ err: 'Internal server error', success: false });
  }
}

export async function createOne(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const token = req.headers?.authorization;
    const creditScore = await creditScoreService.create(req.body, token);
    return res.status(200).json({ success: true, creditScore });
  } catch (err) {
    res.status(500).json({ err: 'Internal server error', success: false });
  }
}

export async function updateOne(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const creditScore = await creditScoreService.updateOne(
      { _id: req.params._id },
      req.body
    );
    return res.status(200).json({ success: true, creditScore });
  } catch (err) {
    res.status(500).json({ err: 'Internal server error', success: false });
  }
}

export async function pagination(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const data = await creditScoreService.pagination(
      Number(req.params.page),
      Number(req.params.perPage)
    );
    return res.status(200).json({ success: true, pagination: data });
  } catch (err) {
    res.status(500).json({ err: 'Internal server error', success: false });
  }
}

// export async function credolab( // cuando la persona pague
//   req: Request,
//   res: Response,
//   next: NextFunction,
// ) {

//     const token = req.cookies?.token ?? req.headers?.token;
//   const { user } = await currentUser(token);

//   const userCreditScore = user.creditScores[user.creditScores.length - 1];

//   const { referenceNumber } = await creditScoreService.findOne({
//     _id: userCreditScore._id,
//   });

// console.log('soy reference', referenceNumber)

//   const { data, realIp } = req.body; // data e ip

//   const { user } = await currentUser(token);
//   console.log('soy user', user)
//   if (!user) {
//     return res.status(401).json({err: 'Usuario no autorizado', success: false})
//   }

//   const date = new Date().toLocaleDateString();

//   const referenceNumber = `${user._id}${date}`

//   console.log('reference', referenceNumber)

//   const key = {
//     authKey: process.env.AUTH_KEY
// }

//   const login = await axios.post(
//     `${process.env.DEFAULT_URL}/api/account/v1/credoAppLogin`, key)

//   const accessToken = login.data.access_token

//   if (!accessToken) {
//     return res.status(400).json({err: 'invalid Request', success: false})
//   }

//   const config = {
//     headers: {
//       Authorization: `Bearer ${accessToken}`
//     }
//   }

//   console.log('soy config', config);

//   const dataInfo = {
//     referenceNumber,
//     data,
//     realIp,
//   }

//   console.log('soy datainfo', dataInfo);

//   // const uploadData= await axios.post(
//   //   'https://scoring-demo.credolab.com/api/datasets/v1/upload', dataInfo, config)

//   // console.log('soy uploadaata', uploadData.status);

//   // const { data: score } = await axios.get(
//   //   `${process.env.DEFAULT_URL}/v6.0/datasets/${referenceNumber}/datasetinsight`)

//   const creditScore: ICreditScore = {
//     referenceNumber,
//     value: 12345,
//     provider: 'credolab',
//   }

//   if (!user.creditScores.length) {
//     const createCreditScore = await creditScoreService.create(creditScore)

//     const setScoreUser = await userService.updateOne(
//       {
//         _id: user._id
//       },
//       {
//         $push: {
//           creditScores: createCreditScore._id
//         }
//       }
//     )
//     return res.status(200).json({msg: 'yes'})
//   }

//   res.status(200).send({success: true})
// }

export { creditScoreQueries, creditScoreMutations };
