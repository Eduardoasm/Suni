declare const Query: {
    message: import("graphql-compose").Resolver<any, any, {
        filter?: any;
        sort?: string | string[] | Record<string, any>;
        skip?: number;
    }, import("../components/message/message.model").MessageDocument>;
    messages: import("graphql-compose").Resolver<any, any, {
        filter?: any;
        limit?: number;
        skip?: number;
        sort?: string | string[] | Record<string, any>;
    }, import("../components/message/message.model").MessageDocument>;
    messagePagination: import("graphql-compose").Resolver<any, any, import("graphql-compose-pagination").PaginationTArgs, import("../components/message/message.model").MessageDocument>;
    language: import("graphql-compose").Resolver<any, any, {
        filter?: any;
        sort?: string | string[] | Record<string, any>;
        skip?: number;
    }, import("../components/language/language.model").LanguageDocument>;
    languages: import("graphql-compose").Resolver<any, any, {
        filter?: any;
        limit?: number;
        skip?: number;
        sort?: string | string[] | Record<string, any>;
    }, import("../components/language/language.model").LanguageDocument>;
    languagePagination: import("graphql-compose").Resolver<any, any, import("graphql-compose-pagination").PaginationTArgs, import("../components/language/language.model").LanguageDocument>;
    messageTemplate: import("graphql-compose").Resolver<any, any, {
        filter?: any;
        sort?: string | string[] | Record<string, any>;
        skip?: number;
    }, import("../components/messageTemplate/messageTemplate.model").MessageTemplateDocument>;
    messageTemplates: import("graphql-compose").Resolver<any, any, {
        filter?: any;
        limit?: number;
        skip?: number;
        sort?: string | string[] | Record<string, any>;
    }, import("../components/messageTemplate/messageTemplate.model").MessageTemplateDocument>;
    messageTemplatePagination: import("graphql-compose").Resolver<any, any, import("graphql-compose-pagination").PaginationTArgs, import("../components/messageTemplate/messageTemplate.model").MessageTemplateDocument>;
    notification: import("graphql-compose").Resolver<any, any, {
        filter?: any;
        sort?: string | string[] | Record<string, any>;
        skip?: number;
    }, import("../components/notification/notification.model").NotificationDocument>;
    notifications: import("graphql-compose").Resolver<any, any, {
        filter?: any;
        limit?: number;
        skip?: number;
        sort?: string | string[] | Record<string, any>;
    }, import("../components/notification/notification.model").NotificationDocument>;
    notificationPagination: import("graphql-compose").Resolver<any, any, import("graphql-compose-pagination").PaginationTArgs, import("../components/notification/notification.model").NotificationDocument>;
    getNotifications: import("graphql-compose").Resolver<any, any, any, any>;
    customGetOne: import("graphql-compose").Resolver<any, any, any, any>;
};
export default Query;
//# sourceMappingURL=Query.d.ts.map