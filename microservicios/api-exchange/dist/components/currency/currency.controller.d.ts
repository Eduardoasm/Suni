import { NextFunction, Request, Response } from 'express';
export declare function getAll(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>>;
export declare const getWalletsUser: import("graphql-compose").Resolver<any, any, any, any>;
export declare const getAssetWalletsUser: import("graphql-compose").Resolver<any, any, any, any>;
declare const currencyMutations: {
    createCurrency: import("graphql-compose").Resolver<any, any, {
        record: Record<string, any>;
    }, import("./currency.model").CurrencyDocument>;
    updateCurrency: import("graphql-compose").Resolver<any, any, {
        record: any;
        filter?: any;
        skip?: number;
        sort?: string | string[] | Record<string, any>;
    }, import("./currency.model").CurrencyDocument>;
};
declare const currencyQueries: {
    currency: import("graphql-compose").Resolver<any, any, {
        filter?: any;
        sort?: string | string[] | Record<string, any>;
        skip?: number;
    }, import("./currency.model").CurrencyDocument>;
    currencies: import("graphql-compose").Resolver<any, any, {
        filter?: any;
        limit?: number;
        skip?: number;
        sort?: string | string[] | Record<string, any>;
    }, import("./currency.model").CurrencyDocument>;
    totalCurrency: import("graphql-compose").Resolver<any, any, {
        filter?: any;
    }, import("./currency.model").CurrencyDocument>;
    getWalletsUser: import("graphql-compose").Resolver<any, any, any, any>;
    getAssetWalletsUser: import("graphql-compose").Resolver<any, any, any, any>;
};
export { currencyQueries, currencyMutations };
//# sourceMappingURL=currency.controller.d.ts.map