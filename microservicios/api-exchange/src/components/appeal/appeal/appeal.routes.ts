import { Router } from 'express';
import { getAll, findOne, manageCryptoAdminApi } from './appeal.controller';

const appealRouter = Router();

appealRouter.post('/v1/appeals', getAll);
appealRouter.get('/v1/appeals/:_id', findOne);
appealRouter.post('/v1/appeals/manage_crypto', manageCryptoAdminApi);

export default appealRouter;
