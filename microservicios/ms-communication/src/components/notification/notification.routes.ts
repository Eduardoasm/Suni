import { Router } from 'express';
import {
  getAll,
  updateOne,
  getAllWithPagination,
  softDeleteNotification,
  readNotification,
  readManyNotification,
  createNotification,
  customFindOne,
} from './notification.controller';

const router = Router();

router.get('/v1/notification', getAll);

router.post('/v1/notification', createNotification);

router.get('/v1/notification/pagination/:page/:perPage', getAllWithPagination);

router.put('/v1/notification/:_id', updateOne);

router.get('/v1/notification/:_id', customFindOne);

router.patch('/v1/notification/delete_one/:_id', softDeleteNotification);

router.patch('/v1/notification/read_one_notification/:_id', readNotification);

router.patch('/v1/notification/read_many_notifications', readManyNotification);

export default router;
