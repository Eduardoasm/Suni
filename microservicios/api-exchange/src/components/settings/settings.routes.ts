import { Router } from 'express';
import {
  getAll,
  getOne,
  createOne,
  updateOne,
  pagination,
  getActiveSetting,
  updateSettings,
} from './settings.controller';

const settingsRouter = Router();

settingsRouter.get('/v1/settings', getAll);

settingsRouter.post('/v1/settings/updateSettings', updateSettings);

settingsRouter.get('/v1/settings/getActiveSettings', getActiveSetting);

settingsRouter.post('/v1/settings/create', createOne);

settingsRouter.get('/v1/settings/pagination/:page/:perPage', pagination);

settingsRouter.get('/v1/settings/:_id', getOne);

settingsRouter.put('/v1/settings/:_id', updateOne);

export default settingsRouter;
