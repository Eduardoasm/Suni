/* eslint-disable import/no-cycle */
import axios from 'axios';
import type {
  FilterQuery,
  ProjectionType,
  QueryOptions,
  UpdateQuery,
  UpdateWithAggregationPipeline,
} from 'mongoose';
import { paginateModel } from '../../utils';
import { ICurrency, Currency } from './currency.model';
import * as assetService from '../asset/asset.service';
import { NoSentryError } from '../../utils/NoSentryError';
import { getUser } from '../../utils/walletService/userWau';
import * as countryService from '../country/country.service';
import { TGetAssetWallets } from './currency.dto';

export async function findOne(
  filter?: FilterQuery<ICurrency>,
  projection?: ProjectionType<ICurrency> | null,
  options?: QueryOptions<ICurrency> | null
) {
  return Currency.findOne(filter, projection, options).exec();
}

export async function find(
  filter?: FilterQuery<ICurrency>,
  projection?: ProjectionType<ICurrency> | null,
  options?: QueryOptions<ICurrency> | null
) {
  return Currency.find(filter, projection, options).exec();
}

export async function updateOne(
  filter: FilterQuery<ICurrency>,
  update: UpdateQuery<ICurrency> | UpdateWithAggregationPipeline,
  options?: QueryOptions<ICurrency> | null
) {
  return Currency.updateOne(filter, update, options).exec();
}

export async function create(currency: ICurrency) {
  return Currency.create(currency);
}

export async function pagination(
  page: number,
  perPage: number,
  filter?: FilterQuery<ICurrency>,
  projection?: ProjectionType<ICurrency> | null,
  options?: QueryOptions<ICurrency> | null
) {
  return paginateModel(page, perPage, Currency, filter, projection, options);
}

interface IWallet {
  wallet: string;
  name: string;
  balance: number;
  error: string | null;
  business_enabled: string | null;
  type: string;
  blocked_balance: number;
  available_balance: number;
}

export async function getUserWallets(token: string): Promise<IWallet[]> {
  const { data: user } = await getUser(token);

  // const countryAvailable = await countryService.findOne({
  //   code: user.country,
  //   active: true,
  //   disabled: false,
  // });
  // if (!countryAvailable)
  //   throw new NoSentryError(
  //     'Access denied, the country is disabled to the app'
  //   );

  if (!user) {
    throw new NoSentryError('Invalid user');
  }

  const config = {
    method: 'get',
    baseURL: process.env.SERVICE_URL,
    url: `/wallet/user-balances`,
    headers: {
      authorization: `Bearer ${token}`,
    },
  };

  const response = await axios(config);

  if (!response.data?.success) {
    throw new NoSentryError('Error in obtaining data');
  }

  const balances: IWallet[] = response?.data?.data;

  return balances;
}

export async function getUserAssetWallets(
  body: TGetAssetWallets,
  token: string
): Promise<IWallet[]> {
  const { data: user } = await getUser(token);

  // const countryAvailable = await countryService.findOne({
  //   code: user.country,
  //   active: true,
  //   disabled: false,
  // });
  // if (!countryAvailable)
  //   throw new NoSentryError(
  //     'Access denied, the country is disabled to the app'
  //   );

  if (!user) {
    throw new NoSentryError('Invalid user');
  }

  const getAssetWallet = await assetService.findOne({ _id: body.asset });

  const assetWallet: string = getAssetWallet.network.toLowerCase();

  const config = {
    method: 'get',
    baseURL: process.env.SERVICE_URL,
    url: `/${assetWallet}/user-balances`,
    headers: {
      authorization: `Bearer ${token}`,
    },
  };

  const response = await axios(config);

  if (!response.data?.success) {
    throw new NoSentryError('Error in obtaining data');
  }

  const balances: IWallet[] = response?.data?.data;

  return balances;
}
