/* eslint-disable import/no-cycle */
import type {
  FilterQuery,
  ProjectionType,
  QueryOptions,
  UpdateQuery,
} from 'mongoose';
import axios from 'axios';
import { DniTypeEnum, IUser, User, UserRoleEnum } from './user.model';
import { paginateModel } from '../../../utils';
import { NoSentryError } from '../../../utils/NoSentryError';
import { getUserInfo } from '../../../utils/walletService/userInfo';

export async function findOne(
  filter?: FilterQuery<IUser>,
  projection?: ProjectionType<IUser> | null,
  options?: QueryOptions<IUser> | null
) {
  return User.findOne(filter, projection, options).exec();
}

export async function find(
  filter?: FilterQuery<IUser>,
  projection?: ProjectionType<IUser> | null,
  options?: QueryOptions<IUser> | null
) {
  return User.find(filter, projection, options).exec();
}

export async function updateOne(
  filter: FilterQuery<IUser>,
  update: UpdateQuery<IUser>,
  options?: QueryOptions<IUser> | null
) {
  return User.updateOne(filter, update, options).exec();
}

export async function create(user: IUser) {
  return User.create(user);
}

export function translateDniType(candidate: string): DniTypeEnum {
  switch (candidate) {
    case 'V':
      return 'V';
    case 'E':
      return 'E';
    case 'J':
      return 'J';
    case 'G':
      return 'G';
    case 'P':
      return 'P';
    default:
      return 'N/A';
  }
}

export function translateUserRole(candidate: string): UserRoleEnum {
  switch (candidate) {
    case 'admin':
      return 'admin';
    case 'superadmin':
      return 'superadmin';
    default:
      return 'admin';
  }
}

export async function pagination(
  page: number,
  perPage: number,
  filter?: FilterQuery<IUser>,
  projection?: ProjectionType<IUser> | null,
  options?: QueryOptions<IUser> | null
) {
  return paginateModel(page, perPage, User, filter, projection, options);
}

export async function getUser(token: string) {
  const { data: user } = await getUserInfo(token);

  if (!user) {
    throw new NoSentryError('Not user found');
  }

  if (user && user?.metamapStatus) {
    user.metamapStatus.status = user?.metamapStatus?.status.toLowerCase();
  }

  return user;
}

export async function getWAOClient(clientId: string) {
  const client = await axios.get(
    `${process.env.SERVICE_URL}/user/${clientId}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.TOKEN_ADMIN_SUNI}`,
      },
    }
  );
  return client;
}
