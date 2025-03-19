"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paginate = exports.paginateModelAggregation = exports.buildPaginationType = exports.paginateModel = void 0;
const tslib_1 = require("tslib");
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
function paginateModel(page, perPage, model, filter = {}, projection = null, options = {}) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const count = yield model.countDocuments(filter);
        const pageCount = Math.ceil(count / perPage);
        if (page > pageCount) {
            throw new Error('No hay más páginas disponibles');
        }
        const skip = Math.max(0, (page - 1) * perPage);
        const products = yield model.find(filter, projection, Object.assign(Object.assign({}, (options !== null && options !== void 0 ? options : {})), { skip, limit: perPage }));
        return {
            count,
            items: products,
            pageInfo: {
                currentPage: page,
                perPage,
                pageCount,
                itemCount: count,
                hasPreviousPage: page > 1,
                hasNextPage: products.length > perPage || page * perPage < count,
            },
        };
    });
}
exports.paginateModel = paginateModel;
function buildPaginationType(_name) {
    if (typeof _name !== 'string') {
        throw new TypeError('buildPaginationType: name must be a string');
    }
    const name = `${_name.charAt(0).toUpperCase()}${_name.slice(1)}`;
    return `
    type ${name}Pagination {
      count: Int!
      items: [${name}]!
      pageInfo: ${name}PageInfo!
    }
    type ${name}PageInfo {
      currentPage: Int
      perPage: Int
      itemCount: Int
      pageCount: Int
      hasPreviousPage: Boolean
      hasNextPage: Boolean
    }
  `;
}
exports.buildPaginationType = buildPaginationType;
function paginateModelAggregation(page, perPage, model, pipeline = [], projection = null, options = {}) {
    var _a;
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const startIndex = (page - 1) * perPage;
        const endIndex = page * perPage;
        const countAggregate = model.aggregate(pipeline).count('total');
        const documentsAggregate = model
            .aggregate(pipeline)
            .skip(startIndex)
            .limit(perPage);
        // if (projection) {
        //   documentsAggregate.projection(projection);
        // }
        // if (options) {
        //   documentsAggregate.options(options);
        // }
        const [countResult, documents] = yield Promise.all([
            countAggregate.exec(),
            documentsAggregate.exec(),
        ]);
        const count = ((_a = countResult[0]) === null || _a === void 0 ? void 0 : _a.total) || 0;
        const pageCount = Math.ceil(count / perPage);
        if (page > pageCount) {
            throw new Error('No hay más páginas disponibles');
        }
        return {
            count,
            items: documents,
            pageInfo: {
                currentPage: page,
                perPage,
                pageCount,
                itemCount: count,
                hasPreviousPage: page > 1,
                hasNextPage: documents.length > perPage || page * perPage < count,
            },
        };
    });
}
exports.paginateModelAggregation = paginateModelAggregation;
function paginate(page, perPage, items) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const count = items.length;
        const pageCount = Math.ceil(count / perPage);
        if (page > pageCount) {
            throw new Error('No hay más páginas disponibles');
        }
        const skip = Math.max(0, (page - 1) * perPage);
        const startIndex = skip;
        const endIndex = startIndex + perPage;
        const slicedItems = items.slice(startIndex, endIndex);
        return {
            count,
            items: slicedItems,
            pageInfo: {
                currentPage: page,
                perPage,
                pageCount,
                itemCount: slicedItems.length,
                hasPreviousPage: page > 1,
                hasNextPage: endIndex < count,
            },
        };
    });
}
exports.paginate = paginate;
//# sourceMappingURL=pagination.js.map