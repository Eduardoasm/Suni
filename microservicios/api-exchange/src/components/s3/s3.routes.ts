import { Router } from 'express';
import { signS3Controller } from './s3.controller';

const router = Router();

router.post('/v1/s3', signS3Controller);

export default router;
