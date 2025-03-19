import { NextFunction, Request, Response } from 'express';
import { LanguageTC } from './language.model';
import * as languageService from './language.service';

const languageQueries = {
  language: LanguageTC.mongooseResolvers.findOne(),
  languages: LanguageTC.mongooseResolvers.findMany({
    limit: { defaultValue: 1000000 },
  }),
  languagePagination: LanguageTC.mongooseResolvers.pagination(),
};

const languageMutations = {
  createLanguage: LanguageTC.mongooseResolvers.createOne(),
  updateLanguage: LanguageTC.mongooseResolvers.updateOne(),
};

// REST Controller

export async function getAll(req: Request, res: Response, next: NextFunction) {
  try {
    const languages = await languageService.find({});
    return res.status(200).json({ success: true, languages });
  } catch (err) {
    res.status(500).json({ err: 'Internal server error', success: false });
  }
}

export async function getOne(req: Request, res: Response, next: NextFunction) {
  try {
    const language = await languageService.findOne({
      _id: req.params._id,
    });
    return res.status(200).json({ success: true, language });
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
    const language = await languageService.create(req.body);
    return res.status(200).json({ success: true, language });
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
    const language = await languageService.updateOne(
      { _id: req.params._id },
      req.body
    );
    return res.status(200).json({ success: true, language });
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
    const data = await languageService.pagination(
      Number(req.params.page),
      Number(req.params.perPage)
    );
    return res.status(200).json({ success: true, pagination: data });
  } catch (err) {
    res.status(500).json({ err: 'Internal server error', success: false });
  }
}

export { languageQueries, languageMutations };
