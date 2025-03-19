export declare const StreamChatAuthInput = "\ninput TStreamChatAuthInput {\n  token: String!\n}\n";
export type TStreamChatAuthInput = {
    token: string;
};
export declare const StreamChatPayload = "\n  type StreamChatPayload {\n    token: String!\n  }\n";
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
//# sourceMappingURL=streamChat.dto.d.ts.map