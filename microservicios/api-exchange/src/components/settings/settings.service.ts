import jwt from 'jsonwebtoken';
import type {
  FilterQuery,
  ProjectionType,
  QueryOptions,
  UpdateQuery,
  UpdateWithAggregationPipeline,
} from 'mongoose';
import { paginateModel } from '../../utils';
import { ISettings as ISetting, Settings as Setting } from './settings.model';

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
  const settingActive = await Setting.findOne({ active: true });
  settingActive.active = false;
  await settingActive.save();
  return Setting.create(settings);
}

export async function updateSettings(
  update: UpdateQuery<ISetting> | UpdateWithAggregationPipeline
) {
  const setting = await Setting.findOne({ active: true });
  if (setting?._id) {
    const updatedSetting = await Setting.updateOne(
      { _id: setting?._id },
      { ...update }
    );
    return updatedSetting;
  }
  const newSetting = await Setting.create(update);
  return newSetting;
}

export async function getActiveSetting() {
  const setting = await Setting.findOne({ active: true });
  return setting;
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
