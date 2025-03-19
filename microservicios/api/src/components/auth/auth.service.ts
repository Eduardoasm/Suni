/* eslint-disable array-callback-return */
/* eslint-disable no-unused-expressions */
import jwt from 'jsonwebtoken';
import { verify } from 'argon2';
import { v4 as uuid } from 'uuid';
import axios from 'axios';
import { formatWallet } from '../../utils/formatWallet';
import { BrowserDetectInfo } from '../../types/browser';
import { NoSentryError, sendResetPasswordEmail } from '../../utils';
import {
  TAdminDeleteUserInput,
  TChangePasswordInput,
  TCreateAdminInput,
  TGetUserWalletInput,
  TSignInInput,
} from './auth.dto';
import * as userService from '../user/user/user.service';
import { apiPriceBtc } from '../../utils/apiPriceBtc';
import { getUserInfo } from '../../utils/walletService/userInfo';

export async function createAdmin(
  body: TCreateAdminInput,
  token: string,
  _browser?: BrowserDetectInfo | null
) {
  if (!token) {
    return null;
  }
  const payload = jwt.decode(token) as { id: string };
  const userSuperAdmin = await userService.findOne({
    _id: payload.id,
    active: true,
  });

  if (!userSuperAdmin.userRole.includes('superadmin')) {
    throw new NoSentryError(
      'El usuario no cuenta con los permisos suficientes'
    );
  }

  const _user = await userService.findOne({ email: body.email });

  if (_user) {
    throw new NoSentryError('Este correo ya se encuenta registrado');
  }

  const user = await userService.create({
    ...body,
    dniType: userService.translateDniType(body.dniType),
    userRole: 'admin',
    emailVerify: false,
    permission: [],
  });

  await sendResetPasswordEmail({
    user,
    os: _browser,
    url: `${process.env.DASHBOARD_URL}/reset-password/${user?.resetToken}`,
  });

  return user;
}

export async function signIn(
  body: TSignInInput,
  _browser?: BrowserDetectInfo | null
) {
  const user = await userService.findOne({ email: body.email, active: true });
  if (!user) {
    throw new NoSentryError(
      `No se ha encontrado a un usuario con correo ${body.email}`
    );
  }

  const compare = await verify(user.password, body.password);

  if (!compare) {
    throw new NoSentryError(`La contraseña es incorrecta ${body.email}`);
  }
  const token = jwt.sign(
    JSON.stringify({
      id: user._id,
      privilege: user.userRole,
    }),
    process.env.SECRET
  );

  await userService.updateOne(
    { _id: user._id },
    {
      $push: {
        sessions: [
          {
            user: user._id,
            token,
            device: `${_browser.os} ${_browser.name} ${_browser.version}`,
            active: true,
          },
        ],
      },
    }
  );

  return {
    user,
    token,
  };
}

export async function signOut(token: string) {
  try {
    const payload = jwt.decode(token) as { id: string };
    const user = await userService.findOne({ _id: payload.id, active: true });
    const sessions = user?.sessions?.map((session) => ({
      ...(session as any)?._doc,
      active: false,
    }));
    if (user) {
      const updatedUser = await userService.updateOne(
        { _id: user._id },
        {
          sessions,
        }
      );
      if (updatedUser?.modifiedCount > 0) {
        return { success: true };
      }
      return {
        success: false,
        message: 'Error: Error actualizando las sesiones del usuario',
      };
    }
    return { success: false, message: 'Usuario no encontrado' };
  } catch (error) {
    throw new NoSentryError('Error cerrando sesión');
  }
}

export async function currentUser(token: string) {
  if (!token) {
    return null;
  }
  const payload = jwt.decode(token) as { id: string };
  const user = await userService.findOne({ _id: payload.id, active: true });
  return { user };
}

export async function resetPassword(
  email: string,
  browserData: BrowserDetectInfo
) {
  const user = await userService.findOne({ email }, '-password');

  if (!user) {
    throw new NoSentryError(
      `El usuario con correo ${email} no esta registrado`
    );
  }
  user.resetToken = uuid();
  user.resetTokenValidity = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours in ms
  await Promise.all([
    user.save(),
    sendResetPasswordEmail({
      user,
      os: browserData,
      url: `${process.env.DASHBOARD_URL}/reset-password/${user?.resetToken}`,
    }),
  ]);
}

export async function changePassword(data: TChangePasswordInput) {
  const user = await userService.findOne({
    resetToken: data.token,
    resetTokenValidity: {
      $gt: Date.now(),
    },
  });
  if (!user) {
    throw new NoSentryError(`El token ha expirado, debe solicitar uno nuevo`);
  }
  user.password = data.password;
  user.resetToken = undefined;
  user.resetTokenValidity = undefined;
  await user.save();
}

export async function signInAdmin(
  body: TSignInInput,
  _browser?: BrowserDetectInfo | null
) {
  const user = await userService.findOne({
    email: body.email,
    active: true,
    userRole: 'admin' || 'superadmin',
  });
  if (!user) {
    throw new NoSentryError(
      `No se ha encontrado a un usuario con correo ${body.email}`
    );
  }
  const compare = await verify(user.password, body.password);

  if (!compare) {
    throw new NoSentryError(`La contraseña es incorrecta ${body.email}`);
  }
  const token = jwt.sign(
    JSON.stringify({
      id: user._id,
      privilege: user.userRole,
    }),
    process.env.SECRET
  );

  const sessions = user?.sessions?.map((session) => ({
    ...(session as any)?._doc,
    active: false,
  }));
  sessions.push({
    user: user._id,
    token,
    device: `${_browser.os} ${_browser.name} ${_browser.version}`,
    active: true,
  });

  await userService.updateOne(
    { _id: user._id },
    {
      sessions,
    }
  );

  return {
    user,
    token,
  };
}

export async function deleteUser(token: string) {
  if (!token) {
    return false;
  }
  const payload = jwt.decode(token) as { id: string };
  const user = await userService.findOne({ _id: payload.id, active: true });

  await userService.updateOne(
    { _id: user._id },
    { email: user._id, dni: user._id, active: false },
    { runValidators: true, new: true }
  );
  return true;
}

export async function adminDeleteUser(
  body: TAdminDeleteUserInput,
  token: string
) {
  const ROLE = ['admin', 'superadmin'];
  if (!token) {
    return false;
  }
  const payload = jwt.decode(token) as { id: string };
  const admin = await userService.findOne({ _id: payload.id, active: true });
  if (!admin || !ROLE.includes(admin.userRole)) {
    throw new NoSentryError('No tiene permiso para realizar esta acción');
  }
  const _deleteUser = await userService.updateOne(
    { _id: body.userId },
    { email: body.userId, dni: body.userId, active: false },
    { runValidators: true, new: true }
  );
  return true;
}

export async function getUserWallets(token: string, body: TGetUserWalletInput) {
  try {
    const config = {
      method: 'get',
      baseURL: process.env.SERVICE_URL,
      url: '/wallet/user-balances',
      headers: {
        authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios(config);
    const btcPrice = await apiPriceBtc();
    const userWallets = data?.data
      ?.filter(
        (wallet) =>
          (wallet?.type?.toLowerCase() === body?.currency?.toLowerCase() &&
            body?.currency) ||
          !body?.currency
      )
      ?.map((wallet) => formatWallet(wallet, btcPrice));
    return { userWallets };
  } catch (err) {
    throw new NoSentryError(err);
  }
}

export async function validateForKYC(token: string) {
  const { data: user } = await getUserInfo(token);

  if (user?.userDniDuplicated) {
    return {
      isAllowed: false,
      message: 'Tu DNI ya ha sido validado con una cuenta de Suni',
    };
  }
  if (
    (user?.metamapStatus?.status === 'UNVERIFIED' &&
      !user?.metamapStatus?.dni_value) ||
    !user?.metamapStatus
  )
    return { isAllowed: true, message: 'El usuario no ha realizado el kyc' };
  return { isAllowed: false, message: 'KYC ya realizado' };
}
