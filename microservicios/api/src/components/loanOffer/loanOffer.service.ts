/* eslint-disable import/no-cycle */
import type {
  FilterQuery,
  ProjectionType,
  QueryOptions,
  UpdateQuery,
  UpdateWithAggregationPipeline,
} from 'mongoose';
import { NoSentryError, paginateModel } from '../../utils';
import { ILoanOffer, LoanOffer } from './loanOffer.model';
import {
  TCancelLoanOffer,
  TCreateLoanOffer,
  TGetMyLoanOffers,
} from './loanOffer.dto';
import * as currencyService from '../currency/currency.service';
import { getUserInfo } from '../../utils/walletService/userInfo';
import { deleteBlock } from '../../utils/walletService/cancelAd';

export async function findOne(
  filter?: FilterQuery<ILoanOffer>,
  projection?: ProjectionType<ILoanOffer> | null,
  options?: QueryOptions<ILoanOffer> | null
) {
  return LoanOffer.findOne(filter, projection, options).exec();
}

export async function find(
  filter?: FilterQuery<ILoanOffer>,
  projection?: ProjectionType<ILoanOffer> | null,
  options?: QueryOptions<ILoanOffer> | null
) {
  return LoanOffer.find(filter, projection, options).exec();
}

export async function updateOne(
  filter: FilterQuery<ILoanOffer>,
  update: UpdateQuery<ILoanOffer> | UpdateWithAggregationPipeline,
  options?: QueryOptions<ILoanOffer> | null
) {
  return LoanOffer.updateOne(filter, update, options).exec();
}

export async function create(loanOffer: TCreateLoanOffer, session?: any) {
  const currency = await currencyService.findOne({
    symbol: loanOffer.currency,
  });
  delete loanOffer.currency;
  return LoanOffer.create(
    [
      {
        ...loanOffer,
        currency: currency._id,
      },
    ],
    { session }
  );
}

export async function pagination(
  page: number,
  perPage: number,
  filter?: FilterQuery<ILoanOffer>,
  projection?: ProjectionType<ILoanOffer> | null,
  options?: QueryOptions<ILoanOffer> | null
) {
  return paginateModel(page, perPage, LoanOffer, filter, projection, options);
}

export async function getAllLoanOffers(token: string): Promise<ILoanOffer[]> {
  const { data: user } = await getUserInfo(token);

  if (!user) {
    throw new NoSentryError('User not found');
  }
  // servicio de buscar todas las ofertas de solicitudes

  const loanOffers = await LoanOffer.find({
    status: 'active',
    active: true,
  }).exec();

  return loanOffers;
}

export async function cancelOffer(body: TCancelLoanOffer, token: string) {
  const { data: user } = await getUserInfo(token);

  if (!user) {
    throw new NoSentryError('User not found');
  }

  const loanOffer = await LoanOffer.findOne({
    $and: [
      {
        _id: body?._id,
      },
      {
        lender: user?.id,
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
    throw new NoSentryError('Loan offer not found');
  }

  await deleteBlock(token, loanOffer.blockId);

  loanOffer.status = 'canceled';
  await loanOffer.save();

  return loanOffer;
}

export async function getMyLoanOffers(body: TGetMyLoanOffers, token: string) {
  const { data: user } = await getUserInfo(token);

  const filters: any = {
    lender: user?.id,
    active: true,
    status: 'active',
  };

  if (body?.status) {
    filters.status = body?.status;
  }

  if (body?.startDate && body?.endDate) {
    filters.createdAt = {
      $gte: new Date(body?.startDate),
      $lte: new Date(body?.endDate),
    };
  }

  const options: any = {
    sort: { createdAt: -1 },
  };

  return pagination(body?.page, body?.perPage, filters, null, options);
}

export async function findOneAndUpdate(
  filter: FilterQuery<ILoanOffer>,
  update: UpdateQuery<ILoanOffer>,
  options?: QueryOptions<ILoanOffer> | null
) {
  return LoanOffer.findOneAndUpdate(filter, update, options).exec();
}

// export async function getLoanOffer(loanOffer: string, token: string) {
//   const { data: user } = getUserInfo(token)

//   const offer = await LoanOffer.findOne({ _id: loanOffer })

//   if (user.id !== offer.borrower || user.id !== offer.lender) {
//     throw new NoSentryError('User is not lender or borrower to see the offer')
//   }

//   return offer
// }
