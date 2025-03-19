import { Router } from 'express';
import {
  getAll,
  getOne,
  createOne,
  updateOne,
  pagination,
} from './language.controller';

const router = Router();

router.get('/v1/language', getAll);

router.post('/v1/language', createOne);

router.get('/v1/language/pagination/:page/:perPage', pagination);

router.put('/v1/language/:_id', updateOne);

router.get('/v1/language/:_id', getOne);

export default router;
