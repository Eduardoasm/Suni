import { Types } from 'mongoose';
import { PaymentMethodCategoryTC } from './paymentMethodCategory.model';

export const PaymentMethodCategoryTypeName =
  PaymentMethodCategoryTC.getTypeName();
export const PaymentMethodCategoryType = PaymentMethodCategoryTC.getType();
export const PaymentMethodCategoryTypePlural =
  PaymentMethodCategoryTC.getTypePlural().getTypeName();
export const PaymentMethodCategoryTypeNonNull =
  PaymentMethodCategoryTC.getTypeNonNull();

export type TGetPaymentMethodCategory = {
  page: number;
  perPage: number;
  name: string;
  currency: Types.ObjectId;
  selected: boolean;
};

export const GetPaymentMethodCategoryInput = `
  input GetPaymentMethod {
    selected: Boolean
    name: String
    currency: MongoID

  }
`;
