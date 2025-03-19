/* eslint-disable import/no-extraneous-dependencies */
import mongoose from 'mongoose';
import { ObjectId } from 'mongodb';
import axios from 'axios';
import { rule } from 'graphql-shield';
import { NoSentryError } from '../NoSentryError';

/**
 * authorization for the user in the app
 */

export const userInfo = rule()(
  async (parent, args, context, info): Promise<any> => {
    const token = context.req.headers.authorization;

    if (!token) {
      throw new NoSentryError('Token not provided');
    }

    const config = {
      method: 'get',
      baseURL: process.env.SERVICE_URL,
      url: '/auth/userinfo',
      headers: {
        authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios(config);

    if (!data) {
      throw new NoSentryError('error obtaining data');
    }

    return true;
  }
);
