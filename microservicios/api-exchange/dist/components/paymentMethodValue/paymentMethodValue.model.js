"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentMethodValueTC = exports.PaymentMethodValue = void 0;
const mongoose_1 = require("mongoose");
const graphql_compose_mongoose_1 = require("graphql-compose-mongoose");
const paymentMethodInput_1 = require("../paymentMethodInput/paymentMethodInput");
const PaymentMethodValueSchema = new mongoose_1.Schema({
    value: {
        type: String,
        required: [true, 'Ingresa un valor'],
        trim: true,
    },
    paymentMethodInput: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'PaymentMethodInput',
    },
    active: {
        type: Boolean,
        default: true,
    },
}, { timestamps: true });
exports.PaymentMethodValue = (0, mongoose_1.model)('PaymentMethodValue', PaymentMethodValueSchema);
exports.PaymentMethodValueTC = (0, graphql_compose_mongoose_1.composeMongoose)(exports.PaymentMethodValue);
exports.PaymentMethodValueTC.addRelation('paymentMethodInput', {
    resolver: () => paymentMethodInput_1.PaymentMethodInputTC.mongooseResolvers.dataLoader({ lean: true }),
    prepareArgs: {
        _id: (source) => source.paymentMethodInput,
    },
    projection: { paymentMethodInput: 1 },
});
//# sourceMappingURL=paymentMethodValue.model.js.map