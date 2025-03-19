import { Types, Document, Model } from 'mongoose';
import { IPaymentMethodInput } from '../paymentMethodInput/paymentMethodInput';
import { ICurrency } from '../currency';
export interface IPaymentMethodCategory {
    _id?: any;
    name: string;
    paymentMethodInputs: Array<Types.ObjectId | IPaymentMethodInput>;
    currency: Types.ObjectId | ICurrency;
    selected: boolean;
    active: boolean;
    createdAt: Date;
    updatedAt: Date;
}
export type PaymentMethodCategoryDocument = Document<Types.ObjectId, any, IPaymentMethodCategory> & IPaymentMethodCategory;
export declare const PaymentMethodCategory: Model<IPaymentMethodCategory, {}, {}, {}, any>;
export declare const PaymentMethodCategoryTC: import("graphql-compose-mongoose").ObjectTypeComposerWithMongooseResolvers<PaymentMethodCategoryDocument, any>;
//# sourceMappingURL=paymentMethodCategory.model.d.ts.map