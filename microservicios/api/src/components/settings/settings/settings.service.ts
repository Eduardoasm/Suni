import jwt from 'jsonwebtoken';
import type {
  FilterQuery,
  ProjectionType,
  QueryOptions,
  UpdateQuery,
  UpdateWithAggregationPipeline,
} from 'mongoose';
import { NoSentryError, paginateModel } from '../../../utils';
import {
  TUpdateInternalCreditScoreValueInput,
  TUpdateSettingsCreditScoreParamsInput,
  TUpdateSettings,
} from './settings.dto';
import { ISettings as ISetting, Settings as Setting } from './settings.model';
import * as userService from '../../user/user/user.service';

export async function findOne(
  filter?: FilterQuery<ISetting>,
  projection?: ProjectionType<ISetting> | null,
  options?: QueryOptions<ISetting> | null
) {
  return Setting.findOne(filter, projection, options).exec();
}

export async function find(
  filter?: FilterQuery<ISetting>,
  projection?: ProjectionType<ISetting> | null,
  options?: QueryOptions<ISetting> | null
) {
  return Setting.find(filter, projection, options).exec();
}

export async function updateOne(
  filter: FilterQuery<ISetting>,
  update: UpdateQuery<ISetting> | UpdateWithAggregationPipeline,
  options?: QueryOptions<ISetting> | null
) {
  return Setting.updateOne(filter, update, options).exec();
}

export async function create(settings: ISetting) {
  return Setting.create(settings);
}

export async function updateSettingsCreditScoreParams(
  body: TUpdateSettingsCreditScoreParamsInput
) {
  const setting = Setting.findOneAndUpdate(
    {
      _id: body._id,
    },
    {
      $push: {
        creditScoreParams: body.creditScoreParams,
      },
    },
    {
      new: true,
      runValidators: true,
    }
  );

  return setting;
}

export async function updateInternalCreditScoreValue(
  body: TUpdateInternalCreditScoreValueInput
) {
  const creditScore = Setting.findOneAndUpdate(
    { _id: body._id },
    { $set: { 'creditScoreParams.$[crs].value': body.value } },
    { arrayFilters: [{ 'crs.name': { $eq: body.name } }] }
  );
  return creditScore;
}

export async function pagination(
  page: number,
  perPage: number,
  filter?: FilterQuery<ISetting>,
  projection?: ProjectionType<ISetting> | null,
  options?: QueryOptions<ISetting> | null
) {
  return paginateModel(page, perPage, Setting, filter, projection, options);
}

export async function updateSettings(body: TUpdateSettings, token: string) {
  if (!token) {
    return null;
  }

  const payload = jwt.decode(token) as { id: string };
  const userSuperAdmin = await userService.findOne({
    _id: payload.id,
    active: true,
  });

  if (!userSuperAdmin.userRole.includes('superadmin')) {
    throw new NoSentryError(
      'El usuario no cuenta con los permisos suficientes'
    );
  }

  const interestRate = Setting.findOneAndUpdate(
    {
      id: body._id,
    },
    {
      $set: {
        interestRate: body.interestRate,
        offerExpiration: body.offerExpiration,
        lenderFee: body.contractFees.lenderFee,
        borrowerFee: body.contractFees.borrowerFee,
      },
    }
  );
  return interestRate;
}

export async function getActiveSetting() {
  const setting = await Setting.findOne({ active: true });
  return setting;
}
