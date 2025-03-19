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
import { Schema, Model, Document, Types } from 'mongoose';
import { ICreditScoreParams } from '../credit-score-params';
import { ICreditScoreRange } from '../credit-score-range';
import { IOfferExpiration } from '../offer-expiration/offer-expiration.schema';
import { IContractFeeSettings } from '../contract-fee-settings';
import { IContractSettings } from '../contract-settings';
export interface ISettings {
    _id?: any;
    offerExpiration?: IOfferExpiration;
    creditScoreParams?: Array<ICreditScoreParams>;
    creditScoreRange?: Array<ICreditScoreRange>;
    maxInterestRate?: number;
    minInterestRate?: number;
    contract?: IContractSettings;
    contractFees?: IContractFeeSettings;
    active?: boolean;
}
export type SettingDocument = Document<Types.ObjectId, any, ISettings> & ISettings;
export declare const settingsSchema: Schema<ISettings, Model<ISettings, any, any, any, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, ISettings>;
export declare const Settings: Model<ISettings, {}, {}, {}, any>;
export declare const SettingsTC: import("graphql-compose-mongoose").ObjectTypeComposerWithMongooseResolvers<SettingDocument, any>;
//# sourceMappingURL=settings.model.d.ts.map