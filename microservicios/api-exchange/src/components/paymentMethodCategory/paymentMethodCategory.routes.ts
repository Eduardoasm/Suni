import { Router } from 'express';
import {
  getAll,
  updateMany,
  create,
  findOne,
  deleteOne,
  updateOne,
  getAllWithCurrency,
} from './paymentMethodCategory.controller';

const paymentMethodCategoryRouter = Router();

paymentMethodCategoryRouter.post('/v1/paymentMethodTypes', getAll);
paymentMethodCategoryRouter.post('/getAllWithCurrency', getAllWithCurrency);
paymentMethodCategoryRouter.get('/v1/paymentMethodTypes/:_id', findOne);
paymentMethodCategoryRouter.post(
  '/v1/paymentMethodTypes/updateMany',
  updateMany
);
paymentMethodCategoryRouter.post(
  '/v1/paymentMethodTypes/delete/:_id',
  deleteOne
);
paymentMethodCategoryRouter.post('/v1/paymentMethodTypes/create', create);
paymentMethodCategoryRouter.post('/v1/paymentMethodTypes/updateOne', updateOne);

export default paymentMethodCategoryRouter;
