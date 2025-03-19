import { Router } from 'express';
import { getOne } from './listing.controller';

const router = Router();

router.get('/v1/listing/:_id', getOne);

export default router;
