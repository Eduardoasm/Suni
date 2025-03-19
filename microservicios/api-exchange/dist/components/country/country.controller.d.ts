import { NextFunction, Request, Response } from 'express';
export declare function create(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>>;
export declare function updateOne(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>>;
export declare function getAll(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>>;
export declare function findOne(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>>;
declare const countryMutations: {
    createCountry: import("graphql-compose").Resolver<any, any, {
        record: Record<string, any>;
    }, import("./country.model").CountryDocument>;
    updateCountry: import("graphql-compose").Resolver<any, any, {
        record: any;
        filter?: any;
        skip?: number;
        sort?: string | string[] | Record<string, any>;
    }, import("./country.model").CountryDocument>;
};
declare const countryQueries: {
    country: import("graphql-compose").Resolver<any, any, {
        filter?: any;
        sort?: string | string[] | Record<string, any>;
        skip?: number;
    }, import("./country.model").CountryDocument>;
    countries: import("graphql-compose").Resolver<any, any, {
        filter?: any;
        limit?: number;
        skip?: number;
        sort?: string | string[] | Record<string, any>;
    }, import("./country.model").CountryDocument>;
    totalCountries: import("graphql-compose").Resolver<any, any, {
        filter?: any;
    }, import("./country.model").CountryDocument>;
};
export { countryQueries, countryMutations };
//# sourceMappingURL=country.controller.d.ts.map