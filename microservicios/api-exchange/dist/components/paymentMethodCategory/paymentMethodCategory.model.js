"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentMethodCategoryTC = exports.PaymentMethodCategory = void 0;
const mongoose_1 = require("mongoose");
const graphql_compose_mongoose_1 = require("graphql-compose-mongoose");
const paymentMethodInput_1 = require("../paymentMethodInput/paymentMethodInput");
const currency_1 = require("../currency");
const PaymentMethodCategorySchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, 'Ingresa un nombre'],
        trim: true,
    },
    paymentMethodInputs: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'PaymentMethodInput',
        },
    ],
    active: {
        type: Boolean,
        default: true,
    },
    selected: {
        type: Boolean,
        default: true,
    },
    currency: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Currency',
    },
}, { timestamps: true });
exports.PaymentMethodCategory = (0, mongoose_1.model)('PaymentMethodCategory', PaymentMethodCategorySchema);
exports.PaymentMethodCategoryTC = (0, graphql_compose_mongoose_1.composeMongoose)(exports.PaymentMethodCategory);
exports.PaymentMethodCategoryTC.addRelation('paymentMethodInputs', {
    resolver: () => paymentMethodInput_1.PaymentMethodInputTC.mongooseResolvers.dataLoaderMany(),
    prepareArgs: {
        _ids: (source) => source.paymentMethodInputs,
    },
    projection: { paymentMethodInputs: 1 },
});
exports.PaymentMethodCategoryTC.addRelation('currency', {
    resolver: () => currency_1.CurrencyTC.mongooseResolvers.dataLoader({ lean: true }),
    prepareArgs: {
        _id: (source) => source.currency,
    },
    projection: { currency: 1 },
});
//# sourceMappingURL=paymentMethodCategory.model.js.map