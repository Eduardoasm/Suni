import { NextFunction, Request, Response } from 'express';
import { MessageTC } from './message.model';
import * as messageService from './message.service';

const messageQueries = {
  message: MessageTC.mongooseResolvers.findOne(),
  messages: MessageTC.mongooseResolvers.findMany({
    limit: { defaultValue: 1000000 },
  }),
  messagePagination: MessageTC.mongooseResolvers.pagination(),
};

const messageMutations = {
  createMessage: MessageTC.mongooseResolvers.createOne(),
  updateMessage: MessageTC.mongooseResolvers.updateOne(),
};

// REST Controller

export async function getAll(req: Request, res: Response, next: NextFunction) {
  try {
    const messages = await messageService.find({});
    return res.status(200).json({ success: true, messages });
  } catch (err) {
    res.status(500).json({ err: 'Internal server error', success: false });
  }
}

export async function getOne(req: Request, res: Response, next: NextFunction) {
  try {
    const message = await messageService.findOne({
      _id: req.params._id,
    });
    return res.status(200).json({ success: true, message });
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
    const message = await messageService.create(req.body);
    return res.status(200).json({ success: true, message });
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
    const message = await messageService.updateOne(
      { _id: req.params._id },
      req.body
    );
    return res.status(200).json({ success: true, message });
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
    const data = await messageService.pagination(
      Number(req.params.page),
      Number(req.params.perPage)
    );
    return res.status(200).json({ success: true, pagination: data });
  } catch (err) {
    res.status(500).json({ err: 'Internal server error', success: false });
  }
}

export { messageQueries, messageMutations };
