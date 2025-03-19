import mongoose from 'mongoose';
import type { FilterQuery, ProjectionType, QueryOptions, UpdateQuery, UpdateWithAggregationPipeline } from 'mongoose';
import { IMessageTemplate } from './messageTemplate.model';
import { TCreateMessageTemplate } from './messageTemplate.dto';
export declare function findOne(filter?: FilterQuery<IMessageTemplate>, projection?: ProjectionType<IMessageTemplate> | null, options?: QueryOptions<IMessageTemplate> | null): Promise<mongoose.Document<unknown, any, IMessageTemplate> & IMessageTemplate & {
    _id: mongoose.Types.ObjectId;
}>;
export declare function find(filter?: FilterQuery<IMessageTemplate>, projection?: ProjectionType<IMessageTemplate> | null, options?: QueryOptions<IMessageTemplate> | null): Promise<(mongoose.Document<unknown, any, IMessageTemplate> & IMessageTemplate & {
    _id: mongoose.Types.ObjectId;
})[]>;
export declare function updateOne(filter: FilterQuery<IMessageTemplate>, update: UpdateQuery<IMessageTemplate> | UpdateWithAggregationPipeline, options?: QueryOptions<IMessageTemplate> | null): Promise<import("mongodb").UpdateResult>;
export declare function create(messageTemplate: IMessageTemplate): Promise<mongoose.Document<unknown, any, IMessageTemplate> & IMessageTemplate & {
    _id: mongoose.Types.ObjectId;
}>;
export declare function pagination(page: number, perPage: number, filter?: FilterQuery<IMessageTemplate>, projection?: ProjectionType<IMessageTemplate> | null, options?: QueryOptions<IMessageTemplate> | null): Promise<import("../../utils").Pagination<mongoose.Document<any, any, any>>>;
export declare function customCreateMessageTemplate(body: Array<TCreateMessageTemplate>): Promise<mongoose.Document<unknown, any, IMessageTemplate> & IMessageTemplate & {
    _id: mongoose.Types.ObjectId;
}>;
//# sourceMappingURL=messageTemplate.service.d.ts.map