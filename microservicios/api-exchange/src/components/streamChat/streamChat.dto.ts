export const StreamChatAuthInput = `
input TStreamChatAuthInput {
  token: String!
}
`;

export type TStreamChatAuthInput = {
  token: string;
};

export const StreamChatPayload = `
  type StreamChatPayload {
    token: String!
  }
`;

export type TGetChannelById = {
  channelId: string;
};

export type TCreateChannel = {
  channelId: string;
  maker: string;
  taker: string;
};

export type TSetChannelModerator = {
  channelId: string;
  token: string;
};
