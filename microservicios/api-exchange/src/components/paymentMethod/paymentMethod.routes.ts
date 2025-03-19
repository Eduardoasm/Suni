import { Router } from 'express';
import { updateMany } from './paymentMethod.controller';

const PaymentMethodRouter = Router();

PaymentMethodRouter.post('/v1/paymentMethods/updateMany', updateMany);

export default PaymentMethodRouter;
