"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentMethodTC = exports.PaymentMethod = void 0;
const mongoose_1 = require("mongoose");
const graphql_compose_mongoose_1 = require("graphql-compose-mongoose");
const paymentMethodValue_1 = require("../paymentMethodValue");
const paymentMethodCategory_1 = require("../paymentMethodCategory");
const user_schema_1 = require("../user/user.schema");
const PaymentMethodSchema = new mongoose_1.Schema({
    values: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'PaymentMethodValue',
        },
    ],
    type: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'PaymentMethodCategory',
    },
    requiredInfo: [
        {
            type: String,
            trim: true,
        },
    ],
    user: {
        type: user_schema_1.userSchema,
        required: [true, 'Por favor inserta un user'],
    },
    active: {
        type: Boolean,
        default: true,
    },
}, { timestamps: true });
exports.PaymentMethod = (0, mongoose_1.model)('PaymentMethod', PaymentMethodSchema);
exports.PaymentMethodTC = (0, graphql_compose_mongoose_1.composeMongoose)(exports.PaymentMethod);
exports.PaymentMethodTC.addRelation('values', {
    resolver: () => paymentMethodValue_1.PaymentMethodValueTC.mongooseResolvers.dataLoaderMany(),
    prepareArgs: {
        _ids: (source) => source.values,
    },
    projection: { values: 1 },
});
exports.PaymentMethodTC.addRelation('type', {
    resolver: () => paymentMethodCategory_1.PaymentMethodCategoryTC.mongooseResolvers.dataLoader({ lean: true }),
    prepareArgs: {
        _id: (source) => source.type,
    },
    projection: { type: 1 },
});
//# sourceMappingURL=paymentMethod.model.js.map