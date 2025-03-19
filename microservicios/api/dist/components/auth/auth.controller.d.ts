import type { Request, Response, NextFunction } from 'express';
export declare const authQueries: {
    currentUser: import("graphql-compose").Resolver<any, any, any, any>;
    getUserWallets: import("graphql-compose").Resolver<any, any, any, any>;
    validateForKYC: import("graphql-compose").Resolver<any, any, any, any>;
};
export declare const authMutations: {
    changePassword: import("graphql-compose").Resolver<any, any, any, any>;
    resetPassword: import("graphql-compose").Resolver<any, any, any, any>;
    signOut: import("graphql-compose").Resolver<any, any, any, any>;
    signIn: import("graphql-compose").Resolver<any, any, any, any>;
    createAdmin: import("graphql-compose").Resolver<any, any, any, any>;
    signInAdmin: import("graphql-compose").Resolver<any, any, any, any>;
    deleteUser: import("graphql-compose").Resolver<any, any, any, any>;
    adminDeleteUser: import("graphql-compose").Resolver<any, any, any, any>;
};
export declare function currentUserController(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>>;
export declare function changePasswordController(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>>;
export declare function resetPasswordController(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>>;
export declare function currentUserRest(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>>;
export declare function signOutController(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>>;
export declare function signInController(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>>;
//# sourceMappingURL=auth.controller.d.ts.map