import { Types, Document, Model } from 'mongoose';
import { IPaymentMethodInput } from '../paymentMethodInput/paymentMethodInput';
export interface IPaymentMethodValue {
    _id?: any;
    value: string;
    paymentMethodInput?: Types.ObjectId | IPaymentMethodInput;
    active?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}
export type PaymentMethodValueDocument = Document<Types.ObjectId, any, IPaymentMethodValue> & IPaymentMethodValue;
export declare const PaymentMethodValue: Model<IPaymentMethodValue, {}, {}, {}, any>;
export declare const PaymentMethodValueTC: import("graphql-compose-mongoose").ObjectTypeComposerWithMongooseResolvers<PaymentMethodValueDocument, any>;
//# sourceMappingURL=paymentMethodValue.model.d.ts.map