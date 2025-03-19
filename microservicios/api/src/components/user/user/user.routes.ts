import { Router } from 'express';
import {
  getAll,
  getOne,
  createOne,
  updateOne,
  pagination,
  webhook,
} from './user.controller';

const router = Router();

router.post('/v1/users/metamap', webhook);

router.get('/v1/users', getAll);

router.post('/v1/users', createOne);

router.get('/v1/users/pagination/:page/:perPage', pagination);

router.get('/v1/users/:_id', getOne);

router.put('/v1/users/:_id', updateOne);

export default router;
