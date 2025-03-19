declare const Query: {
    country: import("graphql-compose").Resolver<any, any, {
        filter?: any;
        sort?: string | string[] | Record<string, any>;
        skip?: number;
    }, import("../components/country").CountryDocument>;
    countries: import("graphql-compose").Resolver<any, any, {
        filter?: any;
        limit?: number;
        skip?: number;
        sort?: string | string[] | Record<string, any>;
    }, import("../components/country").CountryDocument>;
    totalCountries: import("graphql-compose").Resolver<any, any, {
        filter?: any;
    }, import("../components/country").CountryDocument>;
    loanOffer: import("graphql-compose").Resolver<any, any, {
        filter?: any;
        sort?: string | string[] | Record<string, any>;
        skip?: number;
    }, import("../components/loanOffer").LoanOfferDocument>;
    loanOffers: import("graphql-compose").Resolver<any, any, {
        filter?: any;
        limit?: number;
        skip?: number;
        sort?: string | string[] | Record<string, any>;
    }, import("../components/loanOffer").LoanOfferDocument>;
    loanOfferPagination: import("graphql-compose").Resolver<any, any, import("graphql-compose-pagination").PaginationTArgs, import("../components/loanOffer").LoanOfferDocument>;
    getAllLoansOffered: import("graphql-compose").Resolver<any, any, any, any>;
    getMyLoanOffers: import("graphql-compose").Resolver<any, any, any, any>;
    creditScore: import("graphql-compose").Resolver<any, any, {
        filter?: any;
        sort?: string | string[] | Record<string, any>;
        skip?: number;
    }, import("../components/creditScore/creditScore").CreditScoreDocument>;
    creditScores: import("graphql-compose").Resolver<any, any, {
        filter?: any;
        limit?: number;
        skip?: number;
        sort?: string | string[] | Record<string, any>;
    }, import("../components/creditScore/creditScore").CreditScoreDocument>;
    creditScorePagination: import("graphql-compose").Resolver<any, any, import("graphql-compose-pagination").PaginationTArgs, import("../components/creditScore/creditScore").CreditScoreDocument>;
    getCreditScoreUser: import("graphql-compose").Resolver<any, any, any, any>;
    getClientsWithCreditScore: import("graphql-compose").Resolver<any, any, any, any>;
    getClientWithCreditScore: import("graphql-compose").Resolver<any, any, any, any>;
    loanRequest: import("graphql-compose").Resolver<any, any, {
        filter?: any;
        sort?: string | string[] | Record<string, any>;
        skip?: number;
    }, import("../components/loanRequest").LoanRequestDocument>;
    loanRequests: import("graphql-compose").Resolver<any, any, {
        filter?: any;
        limit?: number;
        skip?: number;
        sort?: string | string[] | Record<string, any>;
    }, import("../components/loanRequest").LoanRequestDocument>;
    loanRequestPagination: import("graphql-compose").Resolver<any, any, import("graphql-compose-pagination").PaginationTArgs, import("../components/loanRequest").LoanRequestDocument>;
    getMarketLoanRequests: import("graphql-compose").Resolver<any, any, any, any>;
    getAllOffersForRequest: import("graphql-compose").Resolver<any, any, any, any>;
    getOneOfferForRequest: import("graphql-compose").Resolver<any, any, any, any>;
    getMyLoanRequests: import("graphql-compose").Resolver<any, any, any, any>;
    getUserRequestAmounts: import("graphql-compose").Resolver<any, any, any, any>;
    getCostsOfLoanRequest: import("graphql-compose").Resolver<any, any, any, any>;
    validateForLoanRequest: import("graphql-compose").Resolver<any, any, any, any>;
    notification: import("graphql-compose").Resolver<any, any, {
        filter?: any;
        sort?: string | string[] | Record<string, any>;
        skip?: number;
    }, import("../components/notification").NotificationDocument>;
    notifications: import("graphql-compose").Resolver<any, any, {
        filter?: any;
        limit?: number;
        skip?: number;
        sort?: string | string[] | Record<string, any>;
    }, import("../components/notification").NotificationDocument>;
    notificationPagination: import("graphql-compose").Resolver<any, any, import("graphql-compose-pagination").PaginationTArgs, import("../components/notification").NotificationDocument>;
    findNotifications: import("graphql-compose").Resolver<any, any, any, any>;
    history: import("graphql-compose").Resolver<any, any, {
        filter?: any;
        sort?: string | string[] | Record<string, any>;
        skip?: number;
    }, import("../components/history").HistoryDocument>;
    histories: import("graphql-compose").Resolver<any, any, {
        filter?: any;
        limit?: number;
        skip?: number;
        sort?: string | string[] | Record<string, any>;
    }, import("../components/history").HistoryDocument>;
    historyPagination: import("graphql-compose").Resolver<any, any, import("graphql-compose-pagination").PaginationTArgs, import("../components/history").HistoryDocument>;
    transaction: import("graphql-compose").Resolver<any, any, {
        filter?: any;
        sort?: string | string[] | Record<string, any>;
        skip?: number;
    }, import("../components/transaction").TransactionDocument>;
    transactions: import("graphql-compose").Resolver<any, any, {
        filter?: any;
        limit?: number;
        skip?: number;
        sort?: string | string[] | Record<string, any>;
    }, import("../components/transaction").TransactionDocument>;
    borrowerCreditHistory: import("graphql-compose").Resolver<any, any, any, any>;
    lenderCreditHistory: import("graphql-compose").Resolver<any, any, any, any>;
    setting: import("graphql-compose").Resolver<any, any, {
        filter?: any;
        sort?: string | string[] | Record<string, any>;
        skip?: number;
    }, import("../components/settings/settings").SettingDocument>;
    settings: import("graphql-compose").Resolver<any, any, {
        filter?: any;
        limit?: number;
        skip?: number;
        sort?: string | string[] | Record<string, any>;
    }, import("../components/settings/settings").SettingDocument>;
    contract: import("graphql-compose").Resolver<any, any, {
        filter?: any;
        sort?: string | string[] | Record<string, any>;
        skip?: number;
    }, import("../components/contract/contract").ContractDocument>;
    contracts: import("graphql-compose").Resolver<any, any, {
        filter?: any;
        limit?: number;
        skip?: number;
        sort?: string | string[] | Record<string, any>;
    }, import("../components/contract/contract").ContractDocument>;
    contractPagination: import("graphql-compose").Resolver<any, any, import("graphql-compose-pagination").PaginationTArgs, import("../components/contract/contract").ContractDocument>;
    totalLoans: import("graphql-compose").Resolver<any, any, {
        filter?: any;
    }, import("../components/contract/contract").ContractDocument>;
    totalIncome: import("graphql-compose").Resolver<any, any, any, any>;
    interestRate: import("graphql-compose").Resolver<any, any, any, any>;
    getContractsFilterByStatus: import("graphql-compose").Resolver<any, any, any, any>;
    getContractsByStatus: import("graphql-compose").Resolver<any, any, any, any>;
    getContractsFilterByStatusByClient: import("graphql-compose").Resolver<any, any, any, any>;
    getTransactionsByLenderOrBorrower: import("graphql-compose").Resolver<any, any, any, any>;
    getIncomeByDate: import("graphql-compose").Resolver<any, any, any, any>;
    totalIncomes: import("graphql-compose").Resolver<any, any, any, any>;
    getLoansByDate: import("graphql-compose").Resolver<any, any, any, any>;
    getDefaultPaymentContractsByMonth: import("graphql-compose").Resolver<any, any, any, any>;
    getDefaultPaymentContractsByDate: import("graphql-compose").Resolver<any, any, any, any>;
    getDefaultAndSuccessfulPayment: import("graphql-compose").Resolver<any, any, any, any>;
    amortization: import("graphql-compose").Resolver<any, any, any, any>;
    contractEarning: import("graphql-compose").Resolver<any, any, any, any>;
    getMyContracts: import("graphql-compose").Resolver<any, any, any, any>;
    getContractsFilterByStatusByUser: import("graphql-compose").Resolver<any, any, any, any>;
    getPreCancelInfo: import("graphql-compose").Resolver<any, any, any, any>;
    getUserStats: import("graphql-compose").Resolver<any, any, any, any>;
    getContractInfo: import("graphql-compose").Resolver<any, any, any, any>;
    currency: import("graphql-compose").Resolver<any, any, {
        filter?: any;
        sort?: string | string[] | Record<string, any>;
        skip?: number;
    }, import("../components/currency").CurrencyDocument>;
    currencies: import("graphql-compose").Resolver<any, any, {
        filter?: any;
        limit?: number;
        skip?: number;
        sort?: string | string[] | Record<string, any>;
    }, import("../components/currency").CurrencyDocument>;
    wallet: import("graphql-compose").Resolver<any, any, {
        filter?: any;
        sort?: string | string[] | Record<string, any>;
        skip?: number;
    }, import("../components/wallet").WalletDocument>;
    wallets: import("graphql-compose").Resolver<any, any, {
        filter?: any;
        limit?: number;
        skip?: number;
        sort?: string | string[] | Record<string, any>;
    }, import("../components/wallet").WalletDocument>;
    walletPagination: import("graphql-compose").Resolver<any, any, import("graphql-compose-pagination").PaginationTArgs, import("../components/wallet").WalletDocument>;
    user: import("graphql-compose").Resolver<any, any, {
        filter?: any;
        sort?: string | string[] | Record<string, any>;
        skip?: number;
    }, import("../components/user/user").UserDocument>;
    users: import("graphql-compose").Resolver<any, any, {
        filter?: any;
        limit?: number;
        skip?: number;
        sort?: string | string[] | Record<string, any>;
    }, import("../components/user/user").UserDocument>;
    userPagination: import("graphql-compose").Resolver<any, any, import("graphql-compose-pagination").PaginationTArgs, import("../components/user/user").UserDocument>;
    totalUsers: import("graphql-compose").Resolver<any, any, {
        filter?: any;
    }, import("../components/user/user").UserDocument>;
    getUser: import("graphql-compose").Resolver<any, any, any, any>;
    currentUser: import("graphql-compose").Resolver<any, any, any, any>;
    getUserWallets: import("graphql-compose").Resolver<any, any, any, any>;
    validateForKYC: import("graphql-compose").Resolver<any, any, any, any>;
};
export default Query;
//# sourceMappingURL=Query.d.ts.map