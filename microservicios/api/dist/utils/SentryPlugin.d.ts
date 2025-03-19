import type { Request, Response } from 'express';
import { ApolloServerPlugin, GraphQLRequestContext, GraphQLRequestListener } from '@apollo/server';
interface IContext {
    req: Request;
    res: Response;
}
export declare class SentryPlugin implements ApolloServerPlugin {
    requestDidStart(_requestContext: GraphQLRequestContext<IContext>): Promise<GraphQLRequestListener<IContext> | void>;
}
export {};
//# sourceMappingURL=SentryPlugin.d.ts.map