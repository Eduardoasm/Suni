"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentMethodInputTC = exports.PaymentMethodInput = exports.PaymentMethodInputSchema = void 0;
const mongoose_1 = require("mongoose");
const graphql_compose_mongoose_1 = require("graphql-compose-mongoose");
const options_1 = require("../options");
exports.PaymentMethodInputSchema = new mongoose_1.Schema({
    name: {
        type: String,
        trim: true,
    },
    placeholder: {
        type: String,
        trim: true,
    },
    type: {
        type: String,
        enum: ['string', 'number', 'boolean', 'date', 'phone', 'email', 'select'],
    },
    options: [options_1.optionsSchema],
    requested: {
        type: Boolean,
    },
}, {
    timestamps: true,
});
exports.PaymentMethodInput = (0, mongoose_1.model)('PaymentMethodInput', exports.PaymentMethodInputSchema);
exports.PaymentMethodInputTC = (0, graphql_compose_mongoose_1.composeMongoose)(exports.PaymentMethodInput);
//# sourceMappingURL=paymentMethodInput.model.js.map