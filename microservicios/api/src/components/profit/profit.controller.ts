/* eslint-disable import/no-cycle */
import type { Request, Response, NextFunction } from 'express';
import { schemaComposer } from 'graphql-compose';
import { ProfitTC } from './profit.model';
import * as profitService from './profit.service';

const profitQueries = {
  profit: ProfitTC.mongooseResolvers.findOne(),
  profits: ProfitTC.mongooseResolvers.findMany({
    limit: { defaultValue: 1000000 },
  }),
  profitPagination: ProfitTC.mongooseResolvers.pagination(),
};

const profitMutations = {
  updateProfit: ProfitTC.mongooseResolvers.updateOne(),
  createProfit: ProfitTC.mongooseResolvers.createOne(),
};

// REST Controller

export async function getAll(req: Request, res: Response, next: NextFunction) {
  try {
    const profit = await profitService.find({});
    return res.status(200).json({ success: true, profit });
  } catch (err) {
    res.status(500).json({ err: 'Internal server error', success: false });
  }
}

export async function getOne(req: Request, res: Response, next: NextFunction) {
  try {
    const profit = await profitService.findOne({
      _id: req.params._id,
    });
    return res.status(200).json({ success: true, profit });
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
    const profit = await profitService.create(req.body);
    return res.status(200).json({ success: true, profit });
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
    const profit = await profitService.updateOne(
      { _id: req.params._id },
      req.body
    );
    return res.status(200).json({ success: true, profit });
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
    const data = await profitService.pagination(
      Number(req.params.page),
      Number(req.params.perPage)
    );
    return res.status(200).json({ success: true, pagination: data });
  } catch (err) {
    res.status(500).json({ err: 'Internal server error', success: false });
  }
}

export { profitQueries, profitMutations };
