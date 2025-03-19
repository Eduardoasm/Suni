import { Types } from 'mongoose';
export declare const MessageTemplateTypeName: string;
export declare const MessageTemplateType: import("graphql").GraphQLObjectType<any, any>;
export declare const MessageTemplateTypePlural: string;
export declare const MessageTemplateTypeNotNull: import("graphql-compose").NonNullComposer<import("graphql-compose").ObjectTypeComposer<import("./messageTemplate.model").MessageTemplateDocument, any>>;
export type TCreateMessageTemplate = {
    language: Types.ObjectId;
    title: string;
    content: string;
};
//# sourceMappingURL=messageTemplate.dto.d.ts.map