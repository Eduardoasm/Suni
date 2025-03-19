"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreditScoreTC = exports.CreditScore = exports.creditScoreSchema = void 0;
const tslib_1 = require("tslib");
const graphql_compose_mongoose_1 = require("graphql-compose-mongoose");
const mongoose_1 = require("mongoose");
const mongoose_algolia_1 = tslib_1.__importDefault(require("mongoose-algolia"));
exports.creditScoreSchema = new mongoose_1.Schema({
    user: {
        type: String,
        required: [true, 'Please insert a user'],
    },
    referenceNumber: {
        type: String,
    },
    value: {
        type: Number,
    },
    provider: {
        type: String,
        enum: ['credolab', 'suni'],
        required: [true, 'Please insert the provider'],
    },
    active: {
        type: Boolean,
        default: true,
    },
}, {
    timestamps: true,
});
exports.creditScoreSchema.plugin(mongoose_algolia_1.default, {
    appId: process.env.ALGOLIA_APP_ID,
    apiKey: process.env.ALGOLIA_PRIVATE_KEY,
    indexName: 'creditScore',
    selector: '-createdAt -updatedAt',
    debug: true,
});
exports.CreditScore = (0, mongoose_1.model)('CreditScore', exports.creditScoreSchema);
exports.CreditScoreTC = (0, graphql_compose_mongoose_1.composeMongoose)(exports.CreditScore);
//# sourceMappingURL=creditScore.model.js.map