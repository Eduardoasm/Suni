"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paymentPlanSchema = void 0;
const mongoose_1 = require("mongoose");
const graphql_compose_1 = require("graphql-compose");
const graphql_compose_mongoose_1 = require("graphql-compose-mongoose");
exports.paymentPlanSchema = new mongoose_1.Schema({
    paymentDate: {
        type: Date,
    },
    rate: {
        type: Number,
    },
    fees: {
        type: Number,
    },
    originalFees: {
        type: Number,
    },
    amount: {
        type: Number,
    },
    originalAmount: {
        type: Number,
    },
    status: {
        type: String,
        enum: ['successful', 'on_default', 'next_payment', 'active'],
        default: 'active',
    },
    paid: {
        type: Boolean,
        default: false,
    },
    active: {
        type: Boolean,
        default: true,
    },
}, { timestamps: true });
(0, graphql_compose_mongoose_1.convertSchemaToGraphQL)(exports.paymentPlanSchema, 'PaymentPlan', graphql_compose_1.schemaComposer);
//# sourceMappingURL=payment-plan.schema.js.map