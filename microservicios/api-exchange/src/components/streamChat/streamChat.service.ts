/* eslint-disable import/no-extraneous-dependencies */

import { StreamChat } from 'stream-chat';
import axios from 'axios';
import { getUser } from '../../utils/walletService/userWau';
import {
  TStreamChatAuthInput,
  TGetChannelById,
  TCreateChannel,
  TSetChannelModerator,
} from './streamChat.dto';
import { NoSentryError } from '../../utils/NoSentryError';

export async function authChat(body: TStreamChatAuthInput) {
  const { token } = body;
  const { data: user } = await getUser(token);

  const serverClient = StreamChat.getInstance(
    process.env.STREAM_CHAT_API_KEY,
    process.env.STREAM_CHAT_SECRET
  );
  const chatToken = serverClient.createToken(user.id);
  return chatToken;
}

export async function adminAuthChat(body: TStreamChatAuthInput) {
  const { token } = body;

  const { data } = await axios.get(
    `${process.env.LOANS_API_BASE_URL}/auth/current-user`,
    {
      headers: {
        Authorization: token,
      },
    }
  );
  const serverClient = StreamChat.getInstance(
    process.env.STREAM_CHAT_API_KEY,
    process.env.STREAM_CHAT_SECRET
  );
  console.log(data, 'data from api current user');
  const chatToken = serverClient.createToken(data?.user?.user?._id);
  return chatToken;
}

export async function getChannelById(body: TGetChannelById) {
  try {
    const serverClient = StreamChat.getInstance(
      process.env.STREAM_CHAT_API_KEY,
      process.env.STREAM_CHAT_SECRET
    );
    const filter = { type: 'messaging', id: body.channelId };
    const channels = await serverClient.queryChannels(
      filter,
      {},
      {
        watch: false, // this is the default
        state: true,
      }
    );
    return channels[0];
  } catch (error) {
    throw new NoSentryError(`Error in get channel: ${error}`);
  }
}

export async function createChannel(body: TCreateChannel) {
  try {
    const serverClient = StreamChat.getInstance(
      process.env.STREAM_CHAT_API_KEY,
      process.env.STREAM_CHAT_SECRET
    );
    await serverClient.upsertUsers([{ id: body.maker }, { id: body.taker }]);
    const channel = serverClient.channel('messaging', body.channelId, {
      name: body.channelId,
      members: [body.maker, body.taker],
      created_by_id: body.taker,
    });
    await channel.create();
    return channel;
  } catch (error) {
    console.log('Error in create channel');
    throw new NoSentryError(`Error in create channel: ${error.title}`);
  }
}

export async function setChannelModerator(body: TSetChannelModerator) {
  try {
    const channel = await getChannelById({
      channelId: body?.channelId,
    });
    const { data } = await axios.get(
      `${process.env.LOANS_API_BASE_URL}/auth/current-user`,
      {
        headers: {
          Authorization: body?.token,
        },
      }
    );
    console.log(data, 'data in setChannelModerator');

    const moderator = await channel.queryMembers({ is_moderator: true });
    if (
      moderator?.members?.length > 0 &&
      moderator?.members[0]?.user_id === data?.user?.user?._id
    ) {
      await channel.demoteModerators([moderator?.members[0]?.user_id]);
      await channel.addModerators([data?.user?.user?._id], {
        text: 'Suni support joined the channel.',
        user_id: data?.user?.user?._id,
        name: 'Suni Support',
      });
      return {
        channelId: body?.channelId,
        message: 'Moderator updated successfully',
        success: true,
      };
    }
    if (moderator?.members?.length === 0) {
      await channel.addModerators([data?.user?.user?._id], {
        text: 'Suni support joined the channel.',
        user_id: data?.user?.user?._id,
        name: 'Suni Support',
      });
    }
    return {
      channelId: body?.channelId,
      message: 'Chat moderator online',
      success: true,
    };
  } catch (err) {
    return {
      channelId: body?.channelId,
      message: 'Error adding the chat moderator',
      errorMessage: err.message,
      success: false,
    };
  }
}

export async function deleteChannel(body: TGetChannelById) {
  try {
    const channel = await getChannelById(body);

    await channel.delete();
  } catch (error) {
    console.log('Error in delete channel');
    throw new NoSentryError('Error in delete channel');
  }
}
