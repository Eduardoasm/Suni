declare const Mutation: {
    createMessage: import("graphql-compose").Resolver<any, any, {
        record: Record<string, any>;
    }, import("../components/message/message.model").MessageDocument>;
    updateMessage: import("graphql-compose").Resolver<any, any, {
        record: any;
        filter?: any;
        skip?: number;
        sort?: string | string[] | Record<string, any>;
    }, import("../components/message/message.model").MessageDocument>;
    createLanguage: import("graphql-compose").Resolver<any, any, {
        record: Record<string, any>;
    }, import("../components/language/language.model").LanguageDocument>;
    updateLanguage: import("graphql-compose").Resolver<any, any, {
        record: any;
        filter?: any;
        skip?: number;
        sort?: string | string[] | Record<string, any>;
    }, import("../components/language/language.model").LanguageDocument>;
    createMessageTemplate: import("graphql-compose").Resolver<any, any, {
        record: Record<string, any>;
    }, import("../components/messageTemplate/messageTemplate.model").MessageTemplateDocument>;
    updateMessageTemplate: import("graphql-compose").Resolver<any, any, {
        record: any;
        filter?: any;
        skip?: number;
        sort?: string | string[] | Record<string, any>;
    }, import("../components/messageTemplate/messageTemplate.model").MessageTemplateDocument>;
    createNotification: import("graphql-compose").Resolver<any, any, {
        record: Record<string, any>;
    }, import("../components/notification/notification.model").NotificationDocument>;
    updateNotification: import("graphql-compose").Resolver<any, any, {
        record: any;
        filter?: any;
        skip?: number;
        sort?: string | string[] | Record<string, any>;
    }, import("../components/notification/notification.model").NotificationDocument>;
    deleteNotification: import("graphql-compose").Resolver<any, any, any, any>;
    readOneNotification: import("graphql-compose").Resolver<any, any, any, any>;
    readManyNotifications: import("graphql-compose").Resolver<any, any, any, any>;
    customCreateNotification: import("graphql-compose").Resolver<any, any, any, any>;
    unreadNotification: import("graphql-compose").Resolver<any, any, any, any>;
};
export default Mutation;
//# sourceMappingURL=Mutation.d.ts.map