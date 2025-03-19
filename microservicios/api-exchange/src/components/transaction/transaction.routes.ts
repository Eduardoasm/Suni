import { Router } from 'express';
import { customFindOne } from './transaction.controller';

const transactionsRouter = Router();

transactionsRouter.get('/v1/transaction/:_id', customFindOne);

export default transactionsRouter;
