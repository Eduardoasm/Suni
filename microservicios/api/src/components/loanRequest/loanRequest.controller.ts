/* eslint-disable import/no-cycle */
import type { Request, Response, NextFunction } from 'express';
import { schemaComposer } from 'graphql-compose';
import {
  CreateLoanRequestInput,
  CreateLoanOfferInput,
  LoanRequestType,
  TCreateLoanRequest,
  TCreateLoanOffer,
  getLoanOffersForRequestType,
  getLoanRequestInput,
  getLoanOfferRequestType,
  getOneLoanOfferRequestInput,
  GetMyLoanRequestsInput,
  getUserRequestAmountsType,
  GetMarketLoanRequestsInput,
  GetCostsOfRequestInput,
  GetCostsOfRequestType,
  TGetCostsOfRequest,
  TCancelLoanRequest,
  CancelLoanRequestInput,
  GetUserRequestAmountInput,
  validateForLoanRequestType,
  ValidateForLoanRequestInput,
} from './loanRequest.dto';
import { LoanRequestTC } from './loanRequest.model';
import * as loanRequestService from './loanRequest.service';
import { buildPaginationType } from '../../utils/pagination';
import { getUserInfo } from '../../utils/walletService/userInfo';
import { validateRequestFee } from '../../utils/validations/request';
import * as settingsService from '../settings/settings/settings.service';

const LoanRequestPaginationType = buildPaginationType('LoanRequest');

const getMarketLoanRequests = schemaComposer.createResolver<any>({
  name: 'getAllLoanRequests',
  kind: 'query',
  description: 'get all loan requests',
  type: LoanRequestPaginationType,
  args: {
    data: GetMarketLoanRequestsInput,
  },
  async resolve({ args, context }) {
    const token = context.req.headers?.authorization;
    const loanRequested = await loanRequestService.getMarketLoanRequests(
      args?.data,
      token
    );
    return loanRequested;
  },
});

const createLoanOffer = schemaComposer.createResolver<
  any,
  {
    data: TCreateLoanOffer;
  }
>({
  name: 'createLoanOffer',
  description: 'create offer for a request',
  kind: 'mutation',
  type: getLoanOfferRequestType,
  args: {
    data: CreateLoanOfferInput,
  },
  async resolve({ args, context }) {
    const token = context.req.headers?.authorization;
    const offerRequest = await loanRequestService.createLoanOffer(
      args?.data,
      token
    );
    return offerRequest;
  },
});

export const createLoanRequest = schemaComposer.createResolver<
  any,
  {
    data: TCreateLoanRequest;
  }
>({
  name: 'createLoanRequest',
  kind: 'mutation',
  description: 'create loan request',
  type: LoanRequestType,
  args: {
    data: CreateLoanRequestInput,
  },
  async resolve({ args, context }) {
    const token = context?.req?.headers?.authorization;
    const loanRequest = await loanRequestService.create(args?.data, token);
    return loanRequest;
  },
});

const getAllOffersForRequest = schemaComposer.createResolver<any>({
  name: 'getAllOffersForRequest',
  kind: 'query',
  description: 'get all offers for requests',
  type: getLoanOffersForRequestType,
  args: {
    data: getLoanRequestInput,
  },
  async resolve({ args, context }) {
    const token = context.req.headers?.authorization;
    const loanRequested = await loanRequestService.getLoanOffersForRequest(
      args?.data,
      token
    );
    return loanRequested;
  },
});

const getOneOfferForRequest = schemaComposer.createResolver<any>({
  name: 'getAllOffersForRequest',
  kind: 'query',
  description: 'get one offer for request',
  type: getLoanOfferRequestType,
  args: {
    data: getOneLoanOfferRequestInput,
  },
  async resolve({ args, context }) {
    const token = context.req.headers?.authorization;
    const loanOffer = await loanRequestService.getOneLoanOfferForRequest(
      args?.data,
      token
    );
    return loanOffer;
  },
});

const getMyLoanRequests = schemaComposer.createResolver<any>({
  name: 'getMyLoanRequests',
  kind: 'query',
  description: 'get one offer for request',
  type: LoanRequestPaginationType,
  args: {
    data: GetMyLoanRequestsInput,
  },
  async resolve({ args, context }) {
    const token = context.req.headers?.authorization;
    const loanRequests = await loanRequestService.getMyLoanRequests(
      args?.data,
      token
    );
    return loanRequests;
  },
});

const getUserRequestAmounts = schemaComposer.createResolver<any>({
  name: 'getUserRequestAmounts',
  kind: 'query',
  description: 'get all possible amounts a user can request',
  type: getUserRequestAmountsType,
  args: {
    data: GetUserRequestAmountInput,
  },
  async resolve({ args, context }) {
    const token = context?.req?.headers?.authorization;
    return loanRequestService.getUserRequestAmounts(token, args?.data);
  },
});

const validateForLoanRequest = schemaComposer.createResolver<any>({
  name: 'validateForLoanRequest',
  kind: 'query',
  description: 'validate if user is allowed to make loan request',
  type: validateForLoanRequestType,
  args: {
    data: ValidateForLoanRequestInput,
  },
  async resolve({ args, context }) {
    const token = context?.req?.headers?.authorization;
    const { data: user } = await getUserInfo(token);
    const settings = await settingsService.findOne({ active: true });
    const { userLoanRequest, serviceFee } = await validateRequestFee(
      args?.data.currency,
      settings,
      args?.data.amount,
      user
    );
    return loanRequestService.validateForLoanRequest(
      token,
      user,
      serviceFee,
      userLoanRequest,
      settings,
      args?.data
    );
  },
});

export const getCostsOfLoanRequest = schemaComposer.createResolver<
  any,
  {
    data: TGetCostsOfRequest;
  }
>({
  name: 'createLoanRequest',
  kind: 'mutation',
  description: 'create loan request',
  type: GetCostsOfRequestType,
  args: {
    data: GetCostsOfRequestInput,
  },
  async resolve({ args, context }) {
    const token = context?.req?.headers?.authorization;
    const loanRequest = await loanRequestService.getCostsOfRequest(
      args?.data,
      token
    );
    return loanRequest;
  },
});

export const cancelLoanRequest = schemaComposer.createResolver<
  any,
  {
    data: TCancelLoanRequest;
  }
>({
  name: 'cancelLoanRequest',
  kind: 'mutation',
  description: 'cancel loan request',
  type: LoanRequestType,
  args: {
    data: CancelLoanRequestInput,
  },
  async resolve({ args, context }) {
    const token = context?.req?.headers?.authorization;
    const loanRequest = await loanRequestService.cancelRequest(
      args?.data,
      token
    );
    return loanRequest;
  },
});

const loanRequestQueries = {
  loanRequest: LoanRequestTC.mongooseResolvers.findOne(),
  loanRequests: LoanRequestTC.mongooseResolvers.findMany({
    limit: { defaultValue: 1000000 },
  }),
  loanRequestPagination: LoanRequestTC.mongooseResolvers.pagination(),
  getMarketLoanRequests,
  getAllOffersForRequest,
  getOneOfferForRequest,
  getMyLoanRequests,
  getUserRequestAmounts,
  getCostsOfLoanRequest,
  validateForLoanRequest,
};

const loanRequestMutations = {
  updateLoanRequest: LoanRequestTC.mongooseResolvers.updateOne(),
  updateManyLoan: LoanRequestTC.mongooseResolvers.updateMany(),
  createLoanRequest,
  createLoanOffer,
  cancelLoanRequest,
};

// REST Controller

export async function getAll(req: Request, res: Response, next: NextFunction) {
  try {
    const loanRequest = await loanRequestService.find({});
    return res.status(200).json({ success: true, loanRequest });
  } catch (err) {
    res.status(500).json({ err: 'Internal server error', success: false });
  }
}

export async function getOne(req: Request, res: Response, next: NextFunction) {
  try {
    const loanRequest = await loanRequestService.findOne({
      _id: req.params._id,
    });
    return res.status(200).json({ success: true, loanRequest });
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
    const { token } = req.cookies;
    const loanRequest = await loanRequestService.create(req.body, token);
    return res.status(200).json({ success: true, loanRequest });
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
    const loanRequest = await loanRequestService.updateOne(
      { _id: req.params._id },
      req.body
    );
    return res.status(200).json({ success: true, loanRequest });
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
    const data = await loanRequestService.pagination(
      Number(req.params.page),
      Number(req.params.perPage)
    );
    return res.status(200).json({ success: true, pagination: data });
  } catch (err) {
    res.status(500).json({ err: 'Internal server error', success: false });
  }
}

export { loanRequestQueries, loanRequestMutations };
