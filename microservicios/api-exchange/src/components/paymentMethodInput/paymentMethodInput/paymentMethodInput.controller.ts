import { PaymentMethodInputTC } from './paymentMethodInput.model';

const paymentMethodInputMutations = {
  createPaymentMethodInput: PaymentMethodInputTC.mongooseResolvers.createOne(),
  updatePaymentMethodInput: PaymentMethodInputTC.mongooseResolvers.updateOne(),
};

const paymentMethodInputQueries = {
  paymentMethodInput: PaymentMethodInputTC.mongooseResolvers.findOne(),
  paymentMethodsInput: PaymentMethodInputTC.mongooseResolvers.findMany(),
  totalPaymentMethodsInput: PaymentMethodInputTC.mongooseResolvers.count(),
};

export { paymentMethodInputQueries, paymentMethodInputMutations };
