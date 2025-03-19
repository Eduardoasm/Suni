"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOne = exports.listingMutations = exports.listingQueries = exports.addReferenceNumber = exports.getKpiMarketPrice = exports.createListingPurchase = exports.getBestPricesListings = exports.updateListingUserCustom = exports.cancelListing = exports.createListingSale = exports.getListingFiltersUser = exports.getListingFilters = void 0;
const tslib_1 = require("tslib");
const graphql_compose_1 = require("graphql-compose");
const listing_dto_1 = require("./listing.dto");
const listing_model_1 = require("./listing.model");
const listingService = tslib_1.__importStar(require("./listing.service"));
exports.getListingFilters = graphql_compose_1.schemaComposer.createResolver({
    name: 'getListingFilter',
    kind: 'query',
    description: 'get listings filters',
    type: listing_dto_1.listingsPaginationType,
    args: {
        data: listing_dto_1.getListingFilterInput,
    },
    resolve({ args, context }) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const token = context.req.headers.authorization;
            const listings = yield listingService.getListingFilter(args === null || args === void 0 ? void 0 : args.data, token);
            return listings;
        });
    },
});
exports.getListingFiltersUser = graphql_compose_1.schemaComposer.createResolver({
    name: 'getListingFilterUser',
    kind: 'query',
    description: 'get listings filters by user',
    type: listing_dto_1.listingsPaginationType,
    args: {
        data: listing_dto_1.getListingFilterUserInput,
    },
    resolve({ args, context }) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const token = context.req.headers.authorization;
            const listings = yield listingService.getListingFilterUser(args === null || args === void 0 ? void 0 : args.data, token);
            return listings;
        });
    },
});
exports.createListingSale = graphql_compose_1.schemaComposer.createResolver({
    name: 'createListingSale',
    kind: 'mutation',
    description: 'create listing for sale',
    type: listing_dto_1.ListingType,
    args: {
        data: listing_dto_1.CreateListingInput,
    },
    resolve({ args, context }) {
        var _a;
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const token = (_a = context.req.headers) === null || _a === void 0 ? void 0 : _a['authorization'];
            const listings = yield listingService.createListingSale(token, args === null || args === void 0 ? void 0 : args.data);
            return listings;
        });
    },
});
exports.cancelListing = graphql_compose_1.schemaComposer.createResolver({
    name: 'cancelListing',
    kind: 'mutation',
    description: 'cancel listing',
    type: listing_dto_1.ListingType,
    args: {
        data: listing_dto_1.CancelListingInput,
    },
    resolve({ args, context }) {
        var _a;
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const token = (_a = context.req.headers) === null || _a === void 0 ? void 0 : _a['authorization'];
            const listings = yield listingService.cancelListing(args === null || args === void 0 ? void 0 : args.data, token);
            return listings;
        });
    },
});
exports.updateListingUserCustom = graphql_compose_1.schemaComposer.createResolver({
    name: 'updateListingUserCustom',
    kind: 'mutation',
    description: 'update listing',
    type: listing_dto_1.ListingType,
    args: {
        data: listing_dto_1.UpdateListingUserInput,
    },
    resolve({ args, context }) {
        var _a;
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const token = (_a = context.req.headers) === null || _a === void 0 ? void 0 : _a['authorization'];
            const listings = yield listingService.updateListingUser(args === null || args === void 0 ? void 0 : args.data, token);
            return listings;
        });
    },
});
exports.getBestPricesListings = graphql_compose_1.schemaComposer.createResolver({
    name: 'getBestPricesListings',
    kind: 'query',
    description: 'get best prices listings',
    type: listing_dto_1.GetPricesListingType,
    args: {
        data: listing_dto_1.GetBestPriceListingInput,
    },
    resolve({ args }) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const listings = yield listingService.bestPricesListings(args === null || args === void 0 ? void 0 : args.data);
            return listings;
        });
    },
});
exports.createListingPurchase = graphql_compose_1.schemaComposer.createResolver({
    name: 'createListingPurchase',
    kind: 'mutation',
    description: 'create listing for purchase',
    type: listing_dto_1.ListingType,
    args: {
        data: listing_dto_1.CreateListingInput,
    },
    resolve({ args, context }) {
        var _a;
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const token = (_a = context.req.headers) === null || _a === void 0 ? void 0 : _a['authorization'];
            const listings = yield listingService.createListingPurchase(token, args === null || args === void 0 ? void 0 : args.data);
            return listings;
        });
    },
});
exports.getKpiMarketPrice = graphql_compose_1.schemaComposer.createResolver({
    name: 'getKpiMarketPrice',
    kind: 'query',
    description: 'get kpi market price',
    type: listing_dto_1.GetKpiMarketPriceType,
    args: {
        data: listing_dto_1.GetKpiMarketPriceInput,
    },
    resolve({ args, context }) {
        var _a;
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const token = (_a = context.req.headers) === null || _a === void 0 ? void 0 : _a['authorization'];
            const marketPrice = yield listingService.getKpiMarketPrice(args === null || args === void 0 ? void 0 : args.data, token);
            return marketPrice;
        });
    },
});
exports.addReferenceNumber = graphql_compose_1.schemaComposer.createResolver({
    name: 'addReferenceNumber',
    kind: 'query',
    description: 'add referenceNumber in all listings',
    type: 'Boolean',
    resolve() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const listings = yield listingService.addReferenceNumber();
            return listings;
        });
    },
});
const listingMutations = {
    createListing: listing_model_1.ListingTC.mongooseResolvers.createOne(),
    updateListing: listing_model_1.ListingTC.mongooseResolvers.updateOne(),
    createListingPurchase: exports.createListingPurchase,
    createListingSale: exports.createListingSale,
    updateListingUserCustom: exports.updateListingUserCustom,
    cancelListing: exports.cancelListing,
    addReferenceNumber: exports.addReferenceNumber,
};
exports.listingMutations = listingMutations;
const listingQueries = {
    listing: listing_model_1.ListingTC.mongooseResolvers.findOne(),
    listings: listing_model_1.ListingTC.mongooseResolvers.findMany(),
    totalListing: listing_model_1.ListingTC.mongooseResolvers.count(),
    getListingFilters: exports.getListingFilters,
    getBestPricesListings: exports.getBestPricesListings,
    getListingFiltersUser: exports.getListingFiltersUser,
    getKpiMarketPrice: exports.getKpiMarketPrice,
};
exports.listingQueries = listingQueries;
function getOne(req, res, next) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        try {
            const listing = yield listingService.findOne({
                _id: req.params._id,
            });
            return res.status(200).json({ success: true, listing });
        }
        catch (err) {
            res.status(500).json({ err: 'Internal server error', success: false });
        }
    });
}
exports.getOne = getOne;
//# sourceMappingURL=listing.controller.js.map