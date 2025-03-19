import { Types } from 'mongoose';
export declare const PaymentMethodTypeName: string;
export declare const PaymentMethodType: import("graphql").GraphQLObjectType<any, any>;
export declare const PaymentMethodTypePlural: string;
export declare const PaymentMethodTypeNonNull: import("graphql-compose").NonNullComposer<import("graphql-compose").ObjectTypeComposer<import("./paymentMethod.model").PaymentMethodDocument, any>>;
export type TCreatePaymentValue = {
    value: string;
    paymentMethodInput: Types.ObjectId;
};
export type TCreatePaymentMethodUser = {
    type: Types.ObjectId;
    values: [TCreatePaymentValue];
    requiredInfo: Array<string>;
};
export declare const CreatePaymentMethodUserInput = "\n  input CreatePaymentMethodUser {\n    type: MongoID!\n    values: [PaymenthMethodValue]!\n    requiredInfo: [String]\n  }\n\n  input PaymenthMethodValue {\n    value: String!\n    paymentMethodInput: MongoID!\n  }\n";
export type TGetPaymentMethodUser = {
    currency: Types.ObjectId;
};
export declare const GetPaymentMethodUserInput = "\n  input GetPaymentMethodUser {\n    currency: MongoID\n  }\n";
export type TCancelPaymentMethod = {
    paymentMethodId: Types.ObjectId;
};
export declare const CancelPaymentMethodInput = "\n  input CancelPaymentMethod {\n    paymentMethodId: MongoID!\n  }\n";
export declare const CancelPaymentMethodType: string;
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
export declare const UpdatePaymentMethodInput = "\n  input UpdatePaymentMethod {\n    paymentMethodId: MongoID!\n    type: MongoID\n    values: [PaymenthMethodValueUser!]\n    requiredInfo: [String]\n  }\n\n  input PaymenthMethodValueUser {\n      value: String!\n      paymentMethodInput: MongoID!\n  }\n";
//# sourceMappingURL=paymentMethod.dto.d.ts.map