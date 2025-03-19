import type { Model, Document, FilterQuery, ProjectionType, QueryOptions, PipelineStage } from 'mongoose';
export type Pagination<T> = {
    count: number;
    items: T[];
    pageInfo: {
        currentPage: number;
        perPage: number;
        itemCount: number;
        pageCount: number;
        hasPreviousPage: boolean;
        hasNextPage: boolean;
    };
};
/**
 * @function paginateModel
 * @description This function recibe a model and execute all the logic for pagination
 * @param {number} page - actual page
 * @param {number} perPage - items per page
 * @param {Model<any>} model - mongoose model
 * @param {FilterQuery<any>} filter - filter query
 * @param {ProjectionType<any>} projection - projection
 * @param {QueryOptions<any>} options - options
 * @returns {Pagination<Document<any>>} - pagination object
 */
export declare function paginateModel<T extends Model<any>, U extends Document>(page: number, perPage: number, model: T, filter?: FilterQuery<T>, projection?: ProjectionType<T> | null, options?: QueryOptions<T> | null): Promise<Pagination<U>>;
export declare function buildPaginationType(_name: string): string;
export declare function paginateModelAggregation<T extends Model<any>, U extends Document>(page: number, perPage: number, model: T, pipeline?: PipelineStage[], projection?: ProjectionType<T> | null, options?: QueryOptions<T> | null): Promise<Pagination<U>>;
export declare function paginate<T>(page: number, perPage: number, items: any[]): Promise<Pagination<T>>;
//# sourceMappingURL=pagination.d.ts.map