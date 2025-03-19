import { Types } from 'mongoose';
import { PaymentMethodValueTC } from './paymentMethodValue.model';

export const PaymentMethodValueTypesName = PaymentMethodValueTC.getTypeName();
export const PaymentMethodValueTypes = PaymentMethodValueTC.getType();
export const PaymentMethodValueTypesPlural =
  PaymentMethodValueTC.getTypePlural().getTypeName();
export const PaymentMethodValueTypesNonNull =
  PaymentMethodValueTC.getTypeNonNull();

export type TUpdateManyValuesUser = {
  _id: Types.ObjectId;
  value: string;
};

export type TUpdatesManyValues = {
  items: Array<TUpdateManyValuesUser>;
};

export const UpdateManyValuesUserInput = `
  input UpdateManyValuesUser {
    items: [Values!]
    idPaymentMethod: MongoID!
  }

  input Values {
    _id: MongoID!
    value: String!
  }
`;

export const UpdateManyValuesType = `
  type UpdateManyValues {
    success: Boolean!
  }
`;
