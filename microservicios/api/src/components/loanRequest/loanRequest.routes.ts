import { Router } from 'express';
import {
  getAll,
  getOne,
  createOne,
  updateOne,
  pagination,
} from './loanRequest.controller';

const router = Router();

router.get('/v1/loanRequest', getAll);

router.post('/v1/loanRequest', createOne);

router.get('/v1/loanRequest/pagination/:page/:perPage', pagination);

router.get('/v1/loanRequest/:_id', getOne);

router.put('/v1/loanRequest/:_id', updateOne);

export default router;
