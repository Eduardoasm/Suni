/* eslint-disable import/no-cycle */
import type { Request, Response, NextFunction } from 'express';
import { schemaComposer } from 'graphql-compose';
import {
  TCreateWalletInput,
  CreateWalletInput,
  WalletType,
} from './wallet.dto';
import { WalletTC } from './wallet.model';
import * as walletService from './wallet.service';

const createWallet = schemaComposer.createResolver<
  any,
  {
    data: TCreateWalletInput;
  }
>({
  name: 'createWallet',
  kind: 'mutation',
  description: 'Create wallet',
  type: WalletType,
  args: {
    data: CreateWalletInput,
  },
  async resolve({ args }) {
    const wallet = await walletService.create(args?.data);
    return wallet;
  },
});

const walletQueries = {
  wallet: WalletTC.mongooseResolvers.findOne(),
  wallets: WalletTC.mongooseResolvers.findMany({
    limit: { defaultValue: 1000000 },
  }),
  walletPagination: WalletTC.mongooseResolvers.pagination(),
};

const walletMutations = {
  updateWallet: WalletTC.mongooseResolvers.updateOne(),
  createWallet,
};

// REST Controller

export async function getAll(req: Request, res: Response, next: NextFunction) {
  try {
    const wallets = await walletService.find({});
    return res.status(200).json({ success: true, wallets });
  } catch (err) {
    res.status(500).json({ err: 'Internal server error', success: false });
  }
}

export async function getOne(req: Request, res: Response, next: NextFunction) {
  try {
    const wallet = await walletService.findOne({ _id: req.params._id });
    return res.status(200).json({ success: true, wallet });
  } catch (err) {
    res.status(500).json({ err: 'Internal server error', success: false });
  }
}

export async function createOne(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const wallet = await walletService.create(req.body);
    return res.status(200).json({ success: true, wallet });
  } catch (err) {
    res.status(500).json({ err: 'Internal server error', success: false });
  }
}

export async function updateOne(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const wallet = await walletService.updateOne(
      { _id: req.params._id },
      req.body
    );
    return res.status(200).json({ success: true, wallet });
  } catch (err) {
    res.status(500).json({ err: 'Internal server error', success: false });
  }
}

export async function pagination(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const data = await walletService.pagination(
      Number(req.params.page),
      Number(req.params.perPage)
    );
    return res.status(200).json({ success: true, pagination: data });
  } catch (err) {
    res.status(500).json({ err: 'Internal server error', success: false });
  }
}

export { walletQueries, walletMutations };
