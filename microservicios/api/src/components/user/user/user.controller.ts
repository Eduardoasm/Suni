/* eslint-disable import/no-cycle */
import type { Request, Response, NextFunction } from 'express';
import axios, { Axios } from 'axios';
import { schemaComposer } from 'graphql-compose';
import { UserTC } from './user.model';
import { TUpdateUserWallet, UserRole, GetUserType } from './user.dto';
import * as userService from './user.service';

export const getUser = schemaComposer.createResolver<any>({
  name: 'getUser',
  kind: 'query',
  description: 'get user auth',
  type: GetUserType,
  async resolve({ context }) {
    const token = context.req.headers?.authorization;
    const user = await userService.getUser(token);
    return user;
  },
});

const userQueries = {
  user: UserTC.mongooseResolvers.findOne(),
  users: UserTC.mongooseResolvers.findMany(),
  userPagination: UserTC.mongooseResolvers.pagination(),
  totalUsers: UserTC.mongooseResolvers.count(),
  getUser,
};

const userMutations = {
  createUser: UserTC.mongooseResolvers.createOne(),
  updateUser: UserTC.mongooseResolvers.updateOne(),
};

// REST Controller

export async function getAll(req: Request, res: Response, next: NextFunction) {
  try {
    const users = await userService.find({});
    return res.status(200).json({ success: true, users });
  } catch (err) {
    res.status(500).json({ err: 'Internal server error', success: false });
  }
}

export async function getOne(req: Request, res: Response, next: NextFunction) {
  try {
    const user = await userService.findOne({
      _id: req.params._id,
    });
    return res.status(200).json({ success: true, user });
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
    const user = await userService.create(req.body);
    return res.status(200).json({ success: true, user });
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
    const user = await userService.updateOne({ _id: req.params._id }, req.body);
    return res.status(200).json({ success: true, user });
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
    const data = await userService.pagination(
      Number(req.params.page),
      Number(req.params.perPage)
    );
    return res.status(200).json({ success: true, pagination: data });
  } catch (err) {
    res.status(500).json({ err: 'Internal server error', success: false });
  }
}

export async function webhook(req: Request, res: Response, next: NextFunction) {
  try {
    const event = req.body;

    const token = req?.headers?.authorization;

    const config = {
      method: 'post',
      baseURL: process.env.SERVICE_URL,
      url: `/auth/updateUser`,
      headers: {
        authorization: `Bearer ${token}`,
      },
    };

    const USER_STATUS = {
      VERIFIED: 'verified',
      REVIEW_NEEDED: 'reviewNeeded',
      REJECTED: 'rejected',
    };

    const USER_VERIFIED = {
      // objeto con las condicionales de los eventos de metamap
      [USER_STATUS.VERIFIED]: async (): Promise<any> => {
        const status = USER_STATUS.VERIFIED.toUpperCase();
        const { data } = await axios.post(
          `${config.url}?status=${status}`,
          null,
          config
        );
        if (!data) {
          res
            .status(400)
            .json({ success: false, error: 'failed to update user' });
        }
        return data;
      },
      [USER_STATUS.REVIEW_NEEDED]: async (): Promise<any> => {
        const status = USER_STATUS.REVIEW_NEEDED.toUpperCase();
        const { data } = await axios.post(
          `${config.url}?status=${status}`,
          null,
          config
        );
        if (!data) {
          res
            .status(400)
            .json({ success: false, error: 'failed to update user' });
        }
        return data;
      },
      [USER_STATUS.REJECTED]: async (): Promise<any> => {
        const status = USER_STATUS.REJECTED.toUpperCase();
        const { data } = await axios.post(
          `${config.url}?status=${status}`,
          null,
          config
        );
        if (!data) {
          res
            .status(400)
            .json({ success: false, error: 'failed to update user' });
        }
        return data;
      },
    };

    if (event?.identityStatus) {
      // como el webhook nos trae varios eventos, apenas nos indique el status de la verificacion se procede a hacer el cambio
      // de la verificacion de el usuario
      const userStatusHandler = USER_VERIFIED[event.identityStatus];
      await userStatusHandler();
    }
    res.status(200).send({ success: true, data: 'userUpdate' });
  } catch (error) {
    res.status(500).json({ err: 'Internal server error', success: false });
  }
}

export { userQueries, userMutations };
