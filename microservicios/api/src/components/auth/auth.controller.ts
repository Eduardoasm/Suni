import browserDetect from 'browser-detect';
import type { Request, Response, NextFunction, CookieOptions } from 'express';
import { schemaComposer } from 'graphql-compose';
import {
  ChangePasswordInput,
  ResetPasswordInfo,
  ResetPasswordInput,
  SignInInput,
  SignInType,
  SignOutType,
  TChangePasswordInput,
  TResetPasswordInput,
  TSignInInput,
  CurrentUserRole,
  TCreateAdminInput,
  createAdminInput,
  DeleteResultType,
  TAdminDeleteUserInput,
  AdminDeleteUserInput,
  TSignOutInput,
  SignOutInput,
  UserWalletsType,
  GetUserWalletsInput,
  TGetUserWalletInput,
  ValidateForKYCType,
} from './auth.dto';
import { UserRole } from '../user/user/user.dto';
import * as authService from './auth.service';

const cookieConfig: CookieOptions =
  process.env.NODE_ENV === 'development'
    ? {
        maxAge: 1000 * 60 * 60 * 24 * 365,
      }
    : {
        secure: true,
        sameSite: 'none',
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 365,
        domain: 'suni.avilatek.com',
      };

const createAdmin = schemaComposer.createResolver<
  any,
  {
    data: TCreateAdminInput;
  }
>({
  name: 'createAdmin',
  kind: 'mutation',
  description: 'Create new user admin',
  type: UserRole,
  args: {
    data: createAdminInput,
  },
  async resolve({ args, context }) {
    const token =
      context.req.cookies?.token ?? context.req.headers?.['x-token'];
    const browser = browserDetect(context.req.headers['user-agent']);
    const user = await authService.createAdmin(args.data, token, browser);
    return user;
  },
});

const signIn = schemaComposer.createResolver<
  any,
  {
    data: TSignInInput;
  }
>({
  name: 'signIn',
  kind: 'mutation',
  description: 'Sign In an user to the app',
  type: SignInType,
  args: {
    data: SignInInput,
  },
  async resolve({ args, context }) {
    const browser = browserDetect(context.req.headers['user-agent']);
    const { user, token } = await authService.signIn(args.data, browser);
    return { user, token };
  },
});

const signInAdmin = schemaComposer.createResolver<
  any,
  {
    data: TSignInInput;
  }
>({
  name: 'signInAdmin',
  kind: 'mutation',
  description: 'Sign In an admin to the app',
  type: SignInType,
  args: {
    data: SignInInput,
  },
  async resolve({ args, context }) {
    const browser = browserDetect(context.req.headers['user-agent']);
    const { user, token } = await authService.signInAdmin(args.data, browser);
    context.res.cookie('token', token, cookieConfig);
    return { user, token };
  },
});

const signOut = schemaComposer.createResolver<
  any,
  {
    data?: TSignOutInput;
  }
>({
  name: 'SignOut',
  kind: 'mutation',
  description: 'Sign Out an user from the app',
  type: SignOutType,
  args: {
    data: SignOutInput,
  },
  async resolve({ args, context }) {
    const { data } = args;
    const serviceResponse = await authService.signOut(data.token);

    if (serviceResponse?.success) {
      context.res.clearCookie('token', cookieConfig);
      return { success: true };
    }
    return { success: false, message: serviceResponse?.message };
  },
});

const deleteUser = schemaComposer.createResolver({
  name: 'deleteUser',
  kind: 'mutation',
  description: 'Logical deletion of user',
  type: DeleteResultType,
  args: {},
  async resolve({ context }) {
    const token =
      context.req.cookies?.token ?? context.req.headers?.['x-token'];
    const success = await authService.deleteUser(token);
    context.res.clearCookie('token', cookieConfig);
    return { success };
  },
});

const adminDeleteUser = schemaComposer.createResolver<
  any,
  {
    data: TAdminDeleteUserInput;
  }
>({
  name: 'adminDeleteUser',
  kind: 'mutation',
  description: 'Admin logical delete an user',
  type: DeleteResultType,
  args: {
    data: AdminDeleteUserInput,
  },
  async resolve({ args, context }) {
    const token =
      context.req.cookies?.token ?? context.req.headers?.['x-token'];
    const success = await authService.adminDeleteUser(args.data, token);
    return { success };
  },
});

const currentUser = schemaComposer.createResolver({
  name: 'currentUser',
  kind: 'query',
  description: 'Return the user object based on the token',
  type: CurrentUserRole,
  args: {},
  async resolve({ context }) {
    const token =
      context.req.cookies?.token ?? context.req.headers?.['x-token'];
    const { user } = await authService.currentUser(token);
    return { user };
  },
});

const resetPassword = schemaComposer.createResolver<
  any,
  {
    data: TResetPasswordInput;
  }
>({
  name: 'resetPassword',
  type: ResetPasswordInfo,
  description: 'Reset Password',
  kind: 'mutation',
  args: {
    data: ResetPasswordInput,
  },
  async resolve({ args, context }) {
    try {
      await authService.resetPassword(
        args.data.email,
        browserDetect(context.req.headers['user-agent'])
      );
      return { success: true };
    } catch (err) {
      return { err: err.message, success: false };
    }
  },
});

const changePassword = schemaComposer.createResolver<
  any,
  {
    data: TChangePasswordInput;
  }
>({
  name: 'changePassword',
  type: ResetPasswordInfo,
  description: 'Change Password',
  kind: 'mutation',
  args: {
    data: ChangePasswordInput,
  },
  async resolve({ args }) {
    try {
      await authService.changePassword(args.data);
      return { success: true };
    } catch (err) {
      return { success: false, err: err.message };
    }
  },
});

const getUserWallets = schemaComposer.createResolver<
  any,
  {
    data: TGetUserWalletInput;
  }
>({
  name: 'getUserWallets',
  kind: 'query',
  description: 'Return user wallets info',
  type: UserWalletsType,
  args: {
    data: GetUserWalletsInput,
  },
  async resolve({ args, context }) {
    const token = context.req.headers?.authorization;
    const userWallets = await authService.getUserWallets(token, args?.data);
    return userWallets;
  },
});

const validateForKYC = schemaComposer.createResolver<any>({
  name: 'validateForKYC',
  kind: 'query',
  description: 'Validates if user is allowed to do kyc or not',
  type: ValidateForKYCType,
  async resolve({ context }) {
    const token = context.req.headers?.authorization;
    const response = await authService.validateForKYC(token);
    return response;
  },
});

export const authQueries = {
  currentUser,
  getUserWallets,
  validateForKYC,
};

export const authMutations = {
  changePassword,
  resetPassword,
  signOut,
  signIn,
  createAdmin,
  signInAdmin,
  deleteUser,
  adminDeleteUser,
};

// REST Controller

export async function currentUserController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { user } = await authService.currentUser(req.body);
    return res.status(200).json({ success: true, user });
  } catch (err) {
    res.status(500).json({ success: false, err: 'Internal Server Error' });
  }
}

export async function changePasswordController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    await authService.changePassword(req.body.email);
    return res.status(200).json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, err: 'Internal Server Error' });
  }
}

export async function resetPasswordController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    await authService.resetPassword(
      req.body.email,
      browserDetect(req.headers['user-agent'])
    );
    return res.status(200).json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, err: 'Internal Server Error' });
  }
}

export async function currentUserRest(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const user = await authService.currentUser(req.headers.authorization);
    return res.status(200).json({ user });
  } catch (error) {
    console.log(error, 'error in api currentUser');
    res.status(500).json({ success: false, err: 'Internal Server Error' });
  }
}

export async function signOutController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    // TODO: Eliminar la sesion del usuario
    res.clearCookie('token', cookieConfig);
    return res.status(200).json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, err: 'Internal Server Error' });
  }
}

export async function signInController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const browser = browserDetect(req.headers['user-agent']);
    const { user, token } = await authService.signIn(req.body, browser);
    return res.status(200).json({ success: true, user, token });
  } catch (err) {
    res.status(500).json({ success: false, err: 'Internal Server Error' });
  }
}
