import { TStreamChatAuthInput, TGetChannelById, TCreateChannel, TSetChannelModerator } from './streamChat.dto';
export declare function authChat(body: TStreamChatAuthInput): Promise<string>;
export declare function adminAuthChat(body: TStreamChatAuthInput): Promise<string>;
export declare function getChannelById(body: TGetChannelById): Promise<import("stream-chat").Channel<import("stream-chat").DefaultGenerics>>;
export declare function createChannel(body: TCreateChannel): Promise<import("stream-chat").Channel<import("stream-chat").DefaultGenerics>>;
export declare function setChannelModerator(body: TSetChannelModerator): Promise<{
    channelId: string;
    message: string;
    success: boolean;
    errorMessage?: undefined;
} | {
    channelId: string;
    message: string;
    errorMessage: any;
    success: boolean;
}>;
export declare function deleteChannel(body: TGetChannelById): Promise<void>;
//# sourceMappingURL=streamChat.service.d.ts.map