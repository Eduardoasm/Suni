import type { Request, Response, NextFunction } from 'express';
export declare const streamChatAuth: import("graphql-compose").Resolver<any, any, any, any>;
export declare function setChannelModerator(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>>;
export declare function adminAuthChat(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>>;
export declare const streamChatQueries: {
    streamChatAuth: import("graphql-compose").Resolver<any, any, any, any>;
};
//# sourceMappingURL=streamChat.controller.d.ts.map