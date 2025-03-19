import { Router } from 'express';
import { getAll } from './currency.controller';

const currencyRouter = Router();

currencyRouter.get('/v1/currencies', getAll);

export default currencyRouter;
