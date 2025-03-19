"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfitTC = exports.Profit = void 0;
const mongoose_1 = require("mongoose");
const graphql_compose_mongoose_1 = require("graphql-compose-mongoose");
const contract_1 = require("../contract/contract");
const profitSchema = new mongoose_1.Schema({
    contract: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Contract',
    },
    amount: {
        type: Number,
    },
    active: {
        type: Boolean,
    },
}, { timestamps: true });
exports.Profit = (0, mongoose_1.model)('Profit', profitSchema);
exports.ProfitTC = (0, graphql_compose_mongoose_1.composeMongoose)(exports.Profit);
exports.ProfitTC.addRelation('contract', {
    resolver: () => contract_1.ContractTC.mongooseResolvers.dataLoader({ lean: true }),
    prepareArgs: {
        _id: (source) => source.contract,
    },
    projection: { contract: 1 },
});
//# sourceMappingURL=profit.model.js.map