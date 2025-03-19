import { Types } from 'mongoose';
export declare const PaymentMethodValueTypesName: string;
export declare const PaymentMethodValueTypes: import("graphql").GraphQLObjectType<any, any>;
export declare const PaymentMethodValueTypesPlural: string;
export declare const PaymentMethodValueTypesNonNull: import("graphql-compose").NonNullComposer<import("graphql-compose").ObjectTypeComposer<import("./paymentMethodValue.model").PaymentMethodValueDocument, any>>;
export type TUpdateManyValuesUser = {
    _id: Types.ObjectId;
    value: string;
};
export type TUpdatesManyValues = {
    items: Array<TUpdateManyValuesUser>;
};
export declare const UpdateManyValuesUserInput = "\n  input UpdateManyValuesUser {\n    items: [Values!]\n    idPaymentMethod: MongoID!\n  }\n\n  input Values {\n    _id: MongoID!\n    value: String!\n  }\n";
export declare const UpdateManyValuesType = "\n  type UpdateManyValues {\n    success: Boolean!\n  }\n";
//# sourceMappingURL=paymentMethodValue.dto.d.ts.map