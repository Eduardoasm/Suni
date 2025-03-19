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
import { Schema, Model, Types, Document } from 'mongoose';
import { ICreditScoreValues } from '../creditScoreValues/creditScoreValues.schema';
export interface ICreditScore {
    _id?: any;
    user: string;
    values: [ICreditScoreValues];
    active?: boolean;
}
export type CreditScoreDocument = Document<Types.ObjectId, any, ICreditScore> & ICreditScore;
export declare const creditScoreSchema: Schema<ICreditScore, Model<ICreditScore, any, any, any, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, ICreditScore>;
export declare const CreditScore: Model<ICreditScore, {}, {}, {}, any>;
export declare const CreditScoreTC: import("graphql-compose-mongoose").ObjectTypeComposerWithMongooseResolvers<CreditScoreDocument, any>;
//# sourceMappingURL=creditScore.model.d.ts.map