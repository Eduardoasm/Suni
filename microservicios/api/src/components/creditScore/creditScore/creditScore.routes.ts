import { Router } from 'express';
import {
  getAll,
  getOne,
  createOne,
  updateOne,
  pagination,
} from './creditScore.controller';

const router = Router();

router.get('/v1/creditScore', getAll);

router.post('/v1/creditScore', createOne);

router.get('/v1/creditScore/pagination/:page/:perPage', pagination);

router.get('/v1/creditScore/:_id', getOne);

router.put('/v1/creditScore/:_id', updateOne);

export default router;
