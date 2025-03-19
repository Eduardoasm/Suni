export type ModelEnum = 'contract' | 'loanRequest' | 'loanOffer' | 'listing' | 'transaction';
export type ModuleEnum = 'wallet' | 'loans' | 'exchange';
export type TNotification = {
    messageTemplateId: string;
    model: ModelEnum;
    module: ModuleEnum;
    object: string;
    recipientId: string;
    senderId?: string;
    variables?: object;
};
//# sourceMappingURL=notification.d.ts.map