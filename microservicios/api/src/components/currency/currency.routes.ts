import { Router } from 'express';
import {
  getAll,
  getOne,
  createOne,
  updateOne,
  pagination,
} from './currency.controller';

const router = Router();

router.get('/v1/currencies', getAll);

router.post('/v1/currencies', createOne);

router.get('/v1/currencies/pagination/:page/:perPage', pagination);

router.get('/v1/currencies/:_id', getOne);

router.put('/v1/currencies/:_id', updateOne);

export default router;
