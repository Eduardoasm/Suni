import { Router } from 'express';
import {
  getAll,
  getOne,
  createOne,
  updateOne,
  pagination,
} from './wallet.controller';

const router = Router();

router.get('/v1/wallets', getAll);

router.post('/v1/wallets', createOne);

router.get('/v1/wallets/pagination/:page/:perPage', pagination);

router.get('/v1/wallets/:_id', getOne);

router.put('/v1/wallets/:_id', updateOne);

export default router;
