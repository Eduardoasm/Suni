import type { Request, Response, NextFunction } from 'express';
import createHttpError from 'http-errors';
import { SettingsTC } from './settings.model';
import * as settingsService from './settings.service';

const settingsQueries = {
  setting: SettingsTC.mongooseResolvers.findOne(),
  settings: SettingsTC.mongooseResolvers.findMany(),
};

const settingsMutations = {
  updateSettings: SettingsTC.mongooseResolvers.updateOne(),
  createSettings: SettingsTC.mongooseResolvers.createOne(),
};

// REST Controller

export async function getAll(req: Request, res: Response, next: NextFunction) {
  try {
    const settings = await settingsService.find({});
    return res.status(200).json({ success: true, settings });
  } catch (error) {
    next(createHttpError(500, error.message, { err: error.message }));
  }
}

export async function getOne(req: Request, res: Response, next: NextFunction) {
  try {
    const setting = await settingsService.findOne({ _id: req.params._id });
    return res.status(200).json({ success: true, setting });
  } catch (error) {
    next(createHttpError(500, error.message, { err: error.message }));
  }
}

export async function createOne(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const setting = await settingsService.create(req.body);
    return res.status(200).json({ success: true, setting });
  } catch (error) {
    next(createHttpError(500, error.message, { err: error.message }));
  }
}

export async function updateSettings(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const settings = await settingsService.updateSettings(req?.body);
    return res.status(200).json({ success: true, settings });
  } catch (error) {
    next(createHttpError(500, error.message, { err: error.message }));
  }
}

export async function getActiveSetting(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const setting = await settingsService.getActiveSetting();
    return res.status(200).json({ success: true, setting });
  } catch (error) {
    next(createHttpError(500, error.message, { err: error.message }));
  }
}

export async function updateOne(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const setting = await settingsService.updateOne(
      { _id: req.params._id },
      req.body
    );
    return res.status(200).json({ success: true, setting });
  } catch (error) {
    next(createHttpError(500, error.message, { err: error.message }));
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
  } catch (error) {
    next(createHttpError(500, error.message, { err: error.message }));
  }
}

export { settingsQueries, settingsMutations };
