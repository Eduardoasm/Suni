import { Router } from 'express';
import {
  getAll,
  getOne,
  createOne,
  updateOne,
  pagination,
} from './profit.controller';

const router = Router();

router.get('/v1/profit', getAll);

router.post('/v1/profit', createOne);

router.get('/v1/profit/pagination/:page/:perPage', pagination);

router.get('/v1/profit/:_id', getOne);

router.put('/v1/profit/:_id', updateOne);

export default router;
