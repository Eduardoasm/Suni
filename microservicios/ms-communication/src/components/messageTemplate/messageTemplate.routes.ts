import { Router } from 'express';
import {
  getAll,
  getOne,
  customCreateMessageTemplate,
  updateOne,
  pagination,
  createOne,
} from './messageTemplate.controller';

const router = Router();

router.get('/v1/messageTemplate', getAll);

router.post('/v1/messageTemplate', createOne);

router.post('/v1/messageTemplate/customCreate', customCreateMessageTemplate);

router.get('/v1/messageTemplate/pagination/:page/:perPage', pagination);

router.put('/v1/messageTemplate/:_id', updateOne);

router.get('/v1/messageTemplate/:_id', getOne);

export default router;
