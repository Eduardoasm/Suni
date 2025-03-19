/* eslint-disable import/no-unresolved */
import { NextFunction, Request, Response } from 'express';
import createHttpError from 'http-errors';
import * as userService from './user.service';

export async function findOne(req: Request, res: Response, next: NextFunction) {
  try {
    const user = await userService.findOne(req?.params?._id);
    return res.status(200).json({ user });
  } catch (error) {
    next(createHttpError(500, error.message, { err: error.message }));
  }
}

export async function findAll(req: Request, res: Response, next: NextFunction) {
  try {
    const users = await userService.getUsersAPICall();
    return res.status(200).json({ users });
  } catch (error) {
    next(createHttpError(500, error.message, { err: error.message }));
  }
}
