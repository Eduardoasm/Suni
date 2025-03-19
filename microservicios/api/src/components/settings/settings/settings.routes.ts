import { Router } from 'express';
import {
  getAll,
  getOne,
  createOne,
  updateOne,
  pagination,
} from './settings.controller';

const router = Router();

router.get('/v1/settings', getAll);

router.post('/v1/settings', createOne);

router.get('/v1/settings/pagination/:page/:perPage', pagination);

router.get('/v1/settings/:_id', getOne);

router.put('/v1/settings/:_id', updateOne);

export default router;
