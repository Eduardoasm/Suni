import { Types } from 'mongoose';
export declare const PaymentMethodCategoryTypeName: string;
export declare const PaymentMethodCategoryType: import("graphql").GraphQLObjectType<any, any>;
export declare const PaymentMethodCategoryTypePlural: string;
export declare const PaymentMethodCategoryTypeNonNull: import("graphql-compose").NonNullComposer<import("graphql-compose").ObjectTypeComposer<import("./paymentMethodCategory.model").PaymentMethodCategoryDocument, any>>;
export type TGetPaymentMethodCategory = {
    page: number;
    perPage: number;
    name: string;
    currency: Types.ObjectId;
    selected: boolean;
};
export declare const GetPaymentMethodCategoryInput = "\n  input GetPaymentMethod {\n    selected: Boolean\n    name: String\n    currency: MongoID\n\n  }\n";
//# sourceMappingURL=paymentMethodCategory.dto.d.ts.map