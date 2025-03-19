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
import { Schema } from 'mongoose';
export type PaymentPlanStatusEnum = 'successful' | 'on_default' | 'next_payment' | 'active';
export interface IPaymentPlan {
    _id?: any;
    paymentDate: Date;
    rate: number;
    fees: number;
    originalFees?: number;
    amount: number;
    originalAmount?: number;
    status?: PaymentPlanStatusEnum;
    paid?: boolean;
    active?: boolean;
    updatedAt?: Date;
    createdAt?: Date;
}
export declare const paymentPlanSchema: Schema<IPaymentPlan, import("mongoose").Model<IPaymentPlan, any, any, any, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, IPaymentPlan>;
//# sourceMappingURL=payment-plan.schema.d.ts.map