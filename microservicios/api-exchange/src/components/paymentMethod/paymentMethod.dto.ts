import { Types } from 'mongoose';
import { PaymentMethodTC } from './paymentMethod.model';
import { IPaymentMethodValue } from '../paymentMethodValue';

export const PaymentMethodTypeName = PaymentMethodTC.getTypeName();
export const PaymentMethodType = PaymentMethodTC.getType();
export const PaymentMethodTypePlural =
  PaymentMethodTC.getTypePlural().getTypeName();
export const PaymentMethodTypeNonNull = PaymentMethodTC.getTypeNonNull();

export type TCreatePaymentValue = {
  value: string;
  paymentMethodInput: Types.ObjectId;
};

export type TCreatePaymentMethodUser = {
  type: Types.ObjectId;
  values: [TCreatePaymentValue];
  requiredInfo: Array<string>;
};

export const CreatePaymentMethodUserInput = `
  input CreatePaymentMethodUser {
    type: MongoID!
    values: [PaymenthMethodValue]!
    requiredInfo: [String]
  }

  input PaymenthMethodValue {
    value: String!
    paymentMethodInput: MongoID!
  }
`;

export type TGetPaymentMethodUser = {
  currency: Types.ObjectId;
};

export const GetPaymentMethodUserInput = `
  input GetPaymentMethodUser {
    currency: MongoID
  }
`;

export type TCancelPaymentMethod = {
  paymentMethodId: Types.ObjectId;
};

export const CancelPaymentMethodInput = `
  input CancelPaymentMethod {
    paymentMethodId: MongoID!
  }
`;

export const CancelPaymentMethodType = `
  type CancelPaymentMethodType {
    success: Boolean
    paymentMethod: ${PaymentMethodType}
  }
`;

export type TUpdatePaymentValue = {
  value: string;
  paymentMethodInput: Types.ObjectId;
};

export type TUpdatePaymentMethod = {
  paymentMethodId: Types.ObjectId;
  type: Types.ObjectId;
  values: [TUpdatePaymentValue];
  requiredInfo?: Array<string>;
};

export const UpdatePaymentMethodInput = `
  input UpdatePaymentMethod {
    paymentMethodId: MongoID!
    type: MongoID
    values: [PaymenthMethodValueUser!]
    requiredInfo: [String]
  }

  input PaymenthMethodValueUser {
      value: String!
      paymentMethodInput: MongoID!
  }
`;
