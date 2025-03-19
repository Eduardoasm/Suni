import { Router } from 'express';
import { adminAuthChat, setChannelModerator } from './streamChat.controller';

const streamChatRouter = Router();

streamChatRouter.get('/v1/streamChat/authToken', adminAuthChat);
streamChatRouter.post(
  '/v1/streamChat/channel/set_moderator/:_id',
  setChannelModerator
);

export default streamChatRouter;
