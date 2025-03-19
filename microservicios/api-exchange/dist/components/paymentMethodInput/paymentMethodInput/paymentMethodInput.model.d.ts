/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
import { Types, Document, Model, Schema } from 'mongoose';
import { IOptions } from '../options';
export type PaymentMethodInputTypeEnum = 'string' | 'number' | 'boolean' | 'date' | 'phone' | 'email' | 'select';
export interface IPaymentMethodInput {
    _id?: string;
    name: string;
    placeholder: string;
    type: PaymentMethodInputTypeEnum;
    options?: Array<IOptions>;
    requested: boolean;
    active?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}
export type PaymentMethodInputDocument = Document<Types.ObjectId, any, IPaymentMethodInput> & IPaymentMethodInput;
export declare const PaymentMethodInputSchema: Schema<IPaymentMethodInput, Model<IPaymentMethodInput, any, any, any, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, IPaymentMethodInput>;
export declare const PaymentMethodInput: Model<IPaymentMethodInput, {}, {}, {}, any>;
export declare const PaymentMethodInputTC: import("graphql-compose-mongoose").ObjectTypeComposerWithMongooseResolvers<PaymentMethodInputDocument, any>;
//# sourceMappingURL=paymentMethodInput.model.d.ts.map