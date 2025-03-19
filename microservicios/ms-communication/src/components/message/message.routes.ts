import { Router } from 'express';
import {
  getAll,
  getOne,
  createOne,
  updateOne,
  pagination,
} from './message.controller';

const router = Router();

router.get('/v1/message', getAll);

router.post('/v1/message', createOne);

router.get('/v1/message/pagination/:page/:perPage', pagination);

router.put('/v1/message/:_id', updateOne);

router.get('/v1/message/:_id', getOne);

export default router;
