import { Router } from 'express';
import {
  getAll,
  getOne,
  createOne,
  updateOne,
  pagination,
} from './notification.controller';

const router = Router();

router.get('/v1/notification', getAll);

router.post('/v1/notification', createOne);

router.get('/v1/notification/pagination/:page/:perPage', pagination);

router.get('/v1/notification/:_id', getOne);

router.put('/v1/notification/:_id', updateOne);

export default router;
