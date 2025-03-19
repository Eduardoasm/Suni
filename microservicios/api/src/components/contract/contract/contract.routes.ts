import { Router } from 'express';
import {
  getAll,
  getOne,
  createOne,
  updateOne,
  pagination,
  getContractAndCreditScoreDetails,
} from './contract.controller';

const router = Router();

router.get('/v1/contracts', getAll);

router.post('/v1/contracts', createOne);

router.get('/v1/contracts/pagination/:page/:perPage', pagination);

router.get('/v1/contracts/:_id', getOne);

router.put('/v1/contracts/:_id', updateOne);

router.get(
  '/v1/contracts/users/credit-score',
  getContractAndCreditScoreDetails
);

export default router;
