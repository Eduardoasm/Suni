import { Router } from 'express';
import { getAll, getOne, updateOne, pagination } from './loanOffer.controller';

const router = Router();

router.get('/v1/loanOffer', getAll);

router.get('/v1/loanOffer/pagination/:page/:perPage', pagination);

router.get('/v1/loanOffer/:_id', getOne);

router.put('/v1/loanOffer/:_id', updateOne);

export default router;
