import { schemaComposer } from 'graphql-compose';
import { PaymentMethodValueTC } from './paymentMethodValue.model';
import * as paymentMethodValueService from './paymentMethodValue.service';
import {
  TUpdatesManyValues,
  UpdateManyValuesType,
  UpdateManyValuesUserInput,
} from './paymentMethodValue.dto';

export const updateValuesUser = schemaComposer.createResolver<
  any,
  {
    data: TUpdatesManyValues;
  }
>({
  name: 'updateValuesUser',
  kind: 'mutation',
  description: 'update values for paymentMethodValues',
  type: UpdateManyValuesType,
  args: {
    data: UpdateManyValuesUserInput,
  },
  async resolve({ args }) {
    const paymentMethodValue =
      await paymentMethodValueService.updateManyValuesUser(args?.data);
    return {
      success: paymentMethodValue,
    };
  },
});

const paymentMethodValueMutations = {
  createPaymentMethodValue: PaymentMethodValueTC.mongooseResolvers.createOne(),
  updatePaymentMethodValue: PaymentMethodValueTC.mongooseResolvers.updateOne(),
  updateManyPaymentMethodValue:
    PaymentMethodValueTC.mongooseResolvers.updateMany(),
  updateValuesUser,
};

const paymentMethodValueQueries = {
  paymentMethodValue: PaymentMethodValueTC.mongooseResolvers.findOne(),
  paymentMethodsValue: PaymentMethodValueTC.mongooseResolvers.findMany(),
  totalPaymentMethodsValue: PaymentMethodValueTC.mongooseResolvers.count(),
};

export { paymentMethodValueQueries, paymentMethodValueMutations };
