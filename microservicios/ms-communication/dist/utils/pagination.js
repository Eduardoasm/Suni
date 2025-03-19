"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildPaginationType = exports.paginateModel = void 0;
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
        const skip = Math.max(0, page * perPage);
        const products = page > pageCount
            ? []
            : yield model.find(filter, projection, Object.assign(Object.assign({}, (options !== null && options !== void 0 ? options : {})), { skip, limit: perPage }));
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
//# sourceMappingURL=pagination.js.map