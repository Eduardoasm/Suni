"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreditScoreTC = exports.CreditScore = exports.creditScoreSchema = void 0;
const graphql_compose_mongoose_1 = require("graphql-compose-mongoose");
const mongoose_1 = require("mongoose");
const creditScoreValues_schema_1 = require("../creditScoreValues/creditScoreValues.schema");
exports.creditScoreSchema = new mongoose_1.Schema({
    user: {
        type: String,
    },
    values: [creditScoreValues_schema_1.creditScoreValuesSchema],
}, {
    timestamps: true,
});
exports.CreditScore = (0, mongoose_1.model)('CreditScore', exports.creditScoreSchema);
exports.CreditScoreTC = (0, graphql_compose_mongoose_1.composeMongoose)(exports.CreditScore);
//# sourceMappingURL=creditScore.model.js.map