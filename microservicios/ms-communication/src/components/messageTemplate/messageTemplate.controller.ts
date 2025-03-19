import { NextFunction, Request, Response } from 'express';
import { MessageTemplateTC } from './messageTemplate.model';
import * as messageTemplateService from './messageTemplate.service';

const messageTemplateQueries = {
  messageTemplate: MessageTemplateTC.mongooseResolvers.findOne(),
  messageTemplates: MessageTemplateTC.mongooseResolvers.findMany({
    limit: { defaultValue: 1000000 },
  }),
  messageTemplatePagination: MessageTemplateTC.mongooseResolvers.pagination(),
};

const messageTemplateMutations = {
  createMessageTemplate: MessageTemplateTC.mongooseResolvers.createOne(),
  updateMessageTemplate: MessageTemplateTC.mongooseResolvers.updateOne(),
};

// REST Controller

export async function getAll(req: Request, res: Response, next: NextFunction) {
  try {
    const messageTemplates = await messageTemplateService.find({});
    return res.status(200).json({ success: true, messageTemplates });
  } catch (err) {
    res.status(500).json({ err: 'Internal server error', success: false });
  }
}

export async function getOne(req: Request, res: Response, next: NextFunction) {
  try {
    const messageTemplate = await messageTemplateService.findOne({
      _id: req.params._id,
    });
    return res.status(200).json({ success: true, messageTemplate });
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
    const messageTemplate = await messageTemplateService.create(req.body);
    return res.status(200).json({ success: true, messageTemplate });
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
    const messageTemplate = await messageTemplateService.updateOne(
      { _id: req.params._id },
      req.body
    );
    return res.status(200).json({ success: true, messageTemplate });
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
    const data = await messageTemplateService.pagination(
      Number(req.params.page),
      Number(req.params.perPage)
    );
    return res.status(200).json({ success: true, pagination: data });
  } catch (err) {
    res.status(500).json({ err: 'Internal server error', success: false });
  }
}

export async function customCreateMessageTemplate(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const messageTemplate =
      await messageTemplateService.customCreateMessageTemplate(
        req.body?.messages
      );
    return res.status(200).json({ success: true, messageTemplate });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, msg: 'Internal server error' });
  }
}

export { messageTemplateQueries, messageTemplateMutations };
