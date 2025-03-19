import { Router } from 'express';
import {
  getAll,
  getOne,
  createOne,
  updateOne,
  pagination,
  createTransaction,
} from './transaction.controller';

const router = Router();

router.get('/v1/transactions', getAll);

router.post('/v1/transactions', createOne);

router.get('/v1/transactions/pagination/:page/:perPage', pagination);

router.get('/v1/transactions/:_id', getOne);

router.put('/v1/transactions/:_id', updateOne);

router.post('/v2/transactions/:borrowerId/:lenderId', createTransaction);

export default router;
