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
export type feeTypeEnum = 'fixed' | 'percentage';
export interface IContractFeeSettings {
    _id?: any;
    moraFee: {
        value: number;
        type: feeTypeEnum;
    };
    lenderFee: {
        value: number;
        type: feeTypeEnum;
    };
    borrowerFee: {
        value: number;
        type: feeTypeEnum;
    };
    borrowerRequestFee: {
        value: number;
        type: feeTypeEnum;
    };
}
export declare const contractFeeSettingsSchema: Schema<IContractFeeSettings, import("mongoose").Model<IContractFeeSettings, any, any, any, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, IContractFeeSettings>;
//# sourceMappingURL=contract-fee-settings.schema.d.ts.map