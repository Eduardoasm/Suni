import { Types, Document, Model } from 'mongoose';
import { IPaymentMethodValue } from '../paymentMethodValue';
import { IPaymentMethodCategory } from '../paymentMethodCategory';
import { IUser } from '../user/user.schema';
export interface IPaymentMethod {
    _id?: any;
    type: Types.ObjectId | IPaymentMethodCategory;
    values: Array<Types.ObjectId | IPaymentMethodValue>;
    requiredInfo?: Array<string>;
    user: IUser;
    active?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}
export type PaymentMethodDocument = Document<Types.ObjectId, any, IPaymentMethod> & IPaymentMethod;
export declare const PaymentMethod: Model<IPaymentMethod, {}, {}, {}, any>;
export declare const PaymentMethodTC: import("graphql-compose-mongoose").ObjectTypeComposerWithMongooseResolvers<PaymentMethodDocument, any>;
//# sourceMappingURL=paymentMethod.model.d.ts.map