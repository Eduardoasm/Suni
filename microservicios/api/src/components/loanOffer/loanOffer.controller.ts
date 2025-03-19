/* eslint-disable import/no-cycle */
import type { Request, Response, NextFunction } from 'express';
import { schemaComposer } from 'graphql-compose';
import { LoanOfferTC } from './loanOffer.model';
import * as loanOfferService from './loanOffer.service';
import {
  CancelLoanOfferInput,
  GetMyLoanOffersInput,
  LoanOfferType,
  LoanOfferTypePlural,
} from './loanOffer.dto';
import { buildPaginationType } from '../../utils/pagination';

const LoanOffersPaginationType = buildPaginationType('LoanOffer');

const getAllLoansOffered = schemaComposer.createResolver<any>({
  name: 'getAllLoansOffered',
  kind: 'query',
  description: 'get all loans offereds',
  type: LoanOfferTypePlural,
  async resolve({ context }) {
    const token = context.req.headers?.authorization;
    const loansOffered = await loanOfferService.getAllLoanOffers(token);
    return loansOffered;
  },
});

const cancelLoanOffer = schemaComposer.createResolver<any>({
  name: 'cancelLoanOffer',
  kind: 'mutation',
  description: 'cancel Loan offer',
  type: LoanOfferType,
  args: {
    data: CancelLoanOfferInput,
  },
  async resolve({ args, context }) {
    const token = context.req.headers?.authorization;
    const loansOffered = await loanOfferService.cancelOffer(args?.data, token);
    return loansOffered;
  },
});

export const getMyLoanOffers = schemaComposer.createResolver<any>({
  name: 'getMyLoanOffers',
  kind: 'query',
  description: 'get all loan offers of user',
  type: LoanOffersPaginationType,
  args: {
    data: GetMyLoanOffersInput,
  },
  async resolve({ args, context }) {
    const token = context.req.headers?.authorization;
    const loanOffers = await loanOfferService.getMyLoanOffers(
      args?.data,
      token
    );
    return loanOffers;
  },
});

const loanOfferQueries = {
  loanOffer: LoanOfferTC.mongooseResolvers.findOne(),
  loanOffers: LoanOfferTC.mongooseResolvers.findMany({
    limit: { defaultValue: 1000000 },
  }),
  loanOfferPagination: LoanOfferTC.mongooseResolvers.pagination(),
  getAllLoansOffered,
  getMyLoanOffers,
};

const loanOfferMutations = {
  updateloanOffer: LoanOfferTC.mongooseResolvers.updateOne(),
  cancelLoanOffer,
};

// REST Controller

export async function getAll(req: Request, res: Response, next: NextFunction) {
  try {
    const loanOffer = await loanOfferService.find({});
    return res.status(200).json({ success: true, loanOffer });
  } catch (err) {
    res.status(500).json({ err: 'Internal server error', success: false });
  }
}

export async function getOne(req: Request, res: Response, next: NextFunction) {
  try {
    const loanOffer = await loanOfferService.findOne({
      _id: req.params._id,
    });
    return res.status(200).json({ success: true, loanOffer });
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
    const loanOffer = await loanOfferService.updateOne(
      { _id: req.params._id },
      req.body
    );
    return res.status(200).json({ success: true, loanOffer });
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
    const data = await loanOfferService.pagination(
      Number(req.params.page),
      Number(req.params.perPage)
    );
    return res.status(200).json({ success: true, pagination: data });
  } catch (err) {
    res.status(500).json({ err: 'Internal server error', success: false });
  }
}

export { loanOfferQueries, loanOfferMutations };
