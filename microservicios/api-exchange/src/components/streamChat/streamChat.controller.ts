import type { Request, Response, NextFunction } from 'express';
import { schemaComposer } from 'graphql-compose';
import createHttpError from 'http-errors';
import axios from 'axios';
import { StreamChatPayload } from './streamChat.dto';
import * as streamChatService from './streamChat.service';

// import * as s3Service from './s3.service';

export const streamChatAuth = schemaComposer.createResolver({
  name: 'streamChatAuth',
  kind: 'query',
  description: 'Authentication with Stream Chat Service',
  type: StreamChatPayload,
  args: {},
  async resolve({ args, context }) {
    const token =
      context.req.cookies?.token ?? context.req.headers?.authorization;

    const authToken = await streamChatService.authChat({ token });
    return {
      token: authToken,
    };
  },
});

export async function setChannelModerator(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const token = req?.body?.token;
    const channelId = req?.params?._id;
    const channelModerator = await streamChatService.setChannelModerator({
      token,
      channelId,
    });
    return res.status(200).json(channelModerator);
  } catch (error) {
    next(createHttpError(500, error.message, { err: error.message }));
  }
}

export async function adminAuthChat(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const token = req?.headers?.authorization;
    console.log('token', token);
    const authToken = await streamChatService.adminAuthChat({
      token,
    });
    return res.status(200).json({ token: authToken });
  } catch (error) {
    console.log(error, 'error at adminAuthChat controller');
    next(createHttpError(500, error.message, { err: error.message }));
  }
}

export const streamChatQueries = {
  streamChatAuth,
};
