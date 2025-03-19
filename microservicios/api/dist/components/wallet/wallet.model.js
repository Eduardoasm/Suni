"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WalletTC = exports.Wallet = void 0;
const mongoose_1 = require("mongoose");
const graphql_compose_mongoose_1 = require("graphql-compose-mongoose");
const currency_1 = require("../currency");
const walletSchema = new mongoose_1.Schema({
    name: {
        type: String,
    },
    address: {
        type: String,
    },
    currency: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Currency',
    },
    owner: {
        type: String, // Ref to user in SUNIs
    },
}, { timestamps: true });
exports.Wallet = (0, mongoose_1.model)('Wallet', walletSchema);
exports.WalletTC = (0, graphql_compose_mongoose_1.composeMongoose)(exports.Wallet);
exports.WalletTC.addRelation('currency', {
    resolver: () => currency_1.CurrencyTC.mongooseResolvers.dataLoader({ lean: true }),
    prepareArgs: {
        _id: (source) => source.currency,
    },
    projection: { currency: 1 },
});
//# sourceMappingURL=wallet.model.js.map