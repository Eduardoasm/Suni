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
/// <reference types="mongoose" />
/// <reference types="mongoose/types/inferschematype" />
import { ISettings } from '../../components/settings/settings';
export declare function getValidAmounts(userId: string, maxNumberBlocks: number, blockAmount: number): Promise<{
    arrOfAmounts: any[];
    sumContractsRequestAmount: any;
}>;
export declare function validateRequestFee(currency: string, settings: ISettings, amount: number, user: any): Promise<{
    userLoanRequest: import("mongoose").Document<unknown, any, import("../../components/loanRequest").ILoanRequest> & import("../../components/loanRequest").ILoanRequest & {
        _id: import("mongoose").Types.ObjectId;
    };
    serviceFee: number;
}>;
//# sourceMappingURL=request.d.ts.map