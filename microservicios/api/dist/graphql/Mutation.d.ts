declare const Mutation: {
    createCountry: import("graphql-compose").Resolver<any, any, {
        record: Record<string, any>;
    }, import("../components/country").CountryDocument>;
    updateCountry: import("graphql-compose").Resolver<any, any, {
        record: any;
        filter?: any;
        skip?: number;
        sort?: string | string[] | Record<string, any>;
    }, import("../components/country").CountryDocument>;
    updateloanOffer: import("graphql-compose").Resolver<any, any, {
        record: any;
        filter?: any;
        skip?: number;
        sort?: string | string[] | Record<string, any>;
    }, import("../components/loanOffer").LoanOfferDocument>;
    cancelLoanOffer: import("graphql-compose").Resolver<any, any, any, any>;
    updatecreditScore: import("graphql-compose").Resolver<any, any, {
        record: any;
        filter?: any;
        skip?: number;
        sort?: string | string[] | Record<string, any>;
    }, import("../components/creditScore/creditScore").CreditScoreDocument>;
    createCreditScoreUser: import("graphql-compose").Resolver<any, any, any, any>;
    updateLoanRequest: import("graphql-compose").Resolver<any, any, {
        record: any;
        filter?: any;
        skip?: number;
        sort?: string | string[] | Record<string, any>;
    }, import("../components/loanRequest").LoanRequestDocument>;
    updateManyLoan: import("graphql-compose").Resolver<any, any, {
        record: any;
        filter?: any;
        limit?: number;
        skip?: number;
        sort?: string | string[] | Record<string, any>;
    }, import("../components/loanRequest").LoanRequestDocument>;
    createLoanRequest: import("graphql-compose").Resolver<any, any, any, any>;
    createLoanOffer: import("graphql-compose").Resolver<any, any, any, any>;
    cancelLoanRequest: import("graphql-compose").Resolver<any, any, any, any>;
    updateNotification: import("graphql-compose").Resolver<any, any, {
        record: any;
        filter?: any;
        skip?: number;
        sort?: string | string[] | Record<string, any>;
    }, import("../components/notification").NotificationDocument>;
    createNotification: import("graphql-compose").Resolver<any, any, {
        record: Record<string, any>;
    }, import("../components/notification").NotificationDocument>;
    customCreateNotification: import("graphql-compose").Resolver<any, any, any, any>;
    cancelNotification: import("graphql-compose").Resolver<any, any, any, any>;
    createHistory: import("graphql-compose").Resolver<any, any, {
        record: Record<string, any>;
    }, import("../components/history").HistoryDocument>;
    updateHistory: import("graphql-compose").Resolver<any, any, {
        record: any;
        filter?: any;
        skip?: number;
        sort?: string | string[] | Record<string, any>;
    }, import("../components/history").HistoryDocument>;
    updateTransactions: import("graphql-compose").Resolver<any, any, {
        record: any;
        filter?: any;
        skip?: number;
        sort?: string | string[] | Record<string, any>;
    }, import("../components/transaction").TransactionDocument>;
    createTransaction: import("graphql-compose").Resolver<any, any, {
        record: Record<string, any>;
    }, import("../components/transaction").TransactionDocument>;
    updateSettings: import("graphql-compose").Resolver<any, any, {
        record: any;
        filter?: any;
        skip?: number;
        sort?: string | string[] | Record<string, any>;
    }, import("../components/settings/settings").SettingDocument>;
    createSettings: import("graphql-compose").Resolver<any, any, any, any>;
    updateSettingsCreditScoreParams: import("graphql-compose").Resolver<any, any, any, any>;
    updateInternalCreditScoreValue: import("graphql-compose").Resolver<any, any, any, any>;
    updateSettingsService: import("graphql-compose").Resolver<any, any, any, any>;
    updateContract: import("graphql-compose").Resolver<any, any, {
        record: any;
        filter?: any;
        skip?: number;
        sort?: string | string[] | Record<string, any>;
    }, import("../components/contract/contract").ContractDocument>;
    createContract: import("graphql-compose").Resolver<any, any, any, any>;
    preCancel: import("graphql-compose").Resolver<any, any, any, any>;
    addOriginalValues: import("graphql-compose").Resolver<any, any, any, any>;
    updateCurrency: import("graphql-compose").Resolver<any, any, {
        record: any;
        filter?: any;
        skip?: number;
        sort?: string | string[] | Record<string, any>;
    }, import("../components/currency").CurrencyDocument>;
    createCurrency: import("graphql-compose").Resolver<any, any, any, any>;
    updateWallet: import("graphql-compose").Resolver<any, any, {
        record: any;
        filter?: any;
        skip?: number;
        sort?: string | string[] | Record<string, any>;
    }, import("../components/wallet").WalletDocument>;
    createWallet: import("graphql-compose").Resolver<any, any, any, any>;
    createUser: import("graphql-compose").Resolver<any, any, {
        record: Record<string, any>;
    }, import("../components/user/user").UserDocument>;
    updateUser: import("graphql-compose").Resolver<any, any, {
        record: any;
        filter?: any;
        skip?: number;
        sort?: string | string[] | Record<string, any>;
    }, import("../components/user/user").UserDocument>;
    signS3: import("graphql-compose").Resolver<any, any, any, any>;
    changePassword: import("graphql-compose").Resolver<any, any, any, any>;
    resetPassword: import("graphql-compose").Resolver<any, any, any, any>;
    signOut: import("graphql-compose").Resolver<any, any, any, any>;
    signIn: import("graphql-compose").Resolver<any, any, any, any>;
    createAdmin: import("graphql-compose").Resolver<any, any, any, any>;
    signInAdmin: import("graphql-compose").Resolver<any, any, any, any>;
    deleteUser: import("graphql-compose").Resolver<any, any, any, any>;
    adminDeleteUser: import("graphql-compose").Resolver<any, any, any, any>;
};
export default Mutation;
//# sourceMappingURL=Mutation.d.ts.map