import type { Request, Response, NextFunction } from 'express';
import { schemaComposer } from 'graphql-compose';
import {
  SettingsType,
  TSettingsInput,
  CreateSettingsInput,
  TUpdateSettingsCreditScoreParamsInput,
  updateSettingsCreditScoreParamsInput,
  TUpdateInternalCreditScoreValueInput,
  updateInternalCreditScoreValueInput,
  TUpdateSettings,
  updateSettingsInput,
} from './settings.dto';
import { SettingsTC } from './settings.model';
import * as settingsService from './settings.service';

export const createSettings = schemaComposer.createResolver<
  any,
  {
    data: TSettingsInput;
  }
>({
  name: 'createSettings',
  kind: 'mutation',
  type: SettingsType,
  args: {
    data: CreateSettingsInput,
  },
  async resolve({ args }) {
    const settings = await settingsService.create(args.data);
    return settings;
  },
});

export const updateSettingsCreditScoreParams = schemaComposer.createResolver<
  any,
  {
    data: TUpdateSettingsCreditScoreParamsInput;
  }
>({
  name: 'updateSettingsCreditScoreParams',
  kind: 'mutation',
  type: SettingsType,
  args: {
    data: updateSettingsCreditScoreParamsInput,
  },
  async resolve({ args }) {
    const settings = await settingsService.updateSettingsCreditScoreParams(
      args.data
    );
    return settings;
  },
});

export const updateInternalCreditScoreValue = schemaComposer.createResolver<
  any,
  {
    data: TUpdateInternalCreditScoreValueInput;
  }
>({
  name: 'updateInternalCreditScoreValue',
  kind: 'mutation',
  type: SettingsType,
  args: {
    data: updateInternalCreditScoreValueInput,
  },
  async resolve({ args }) {
    const settings = await settingsService.updateInternalCreditScoreValue(
      args.data
    );
    return settings;
  },
});

export const updateSettingsService = schemaComposer.createResolver<
  any,
  {
    data: TUpdateSettings;
  }
>({
  name: 'updateSettings',
  kind: 'mutation',
  type: SettingsType,
  args: {
    data: updateSettingsInput,
  },
  async resolve({ args, context }) {
    const token =
      context.req.cookies?.token ?? context.req.headers?.['x-token'];
    const settings = await settingsService.updateSettings(args.data, token);
    return settings;
  },
});

const settingsQueries = {
  setting: SettingsTC.mongooseResolvers.findOne(),
  settings: SettingsTC.mongooseResolvers.findMany(),
};

const settingsMutations = {
  updateSettings: SettingsTC.mongooseResolvers.updateOne(),
  createSettings,
  updateSettingsCreditScoreParams,
  updateInternalCreditScoreValue,
  updateSettingsService,
};

// REST Controller

export async function getAll(req: Request, res: Response, next: NextFunction) {
  try {
    const currencies = await settingsService.find({});
    return res.status(200).json({ success: true, currencies });
  } catch (err) {
    res.status(500).json({ err: 'Internal server error', success: false });
  }
}

export async function getOne(req: Request, res: Response, next: NextFunction) {
  try {
    const currency = await settingsService.findOne({ _id: req.params._id });
    return res.status(200).json({ success: true, currency });
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
    const currency = await settingsService.create(req.body);
    return res.status(200).json({ success: true, currency });
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
    const currency = await settingsService.updateOne(
      { _id: req.params._id },
      req.body
    );
    return res.status(200).json({ success: true, currency });
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
    const data = await settingsService.pagination(
      Number(req.params.page),
      Number(req.params.perPage)
    );
    return res.status(200).json({ success: true, pagination: data });
  } catch (err) {
    res.status(500).json({ err: 'Internal server error', success: false });
  }
}

export { settingsQueries, settingsMutations };
