"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppealTC = exports.Appeal = void 0;
const mongoose_1 = require("mongoose");
const graphql_compose_mongoose_1 = require("graphql-compose-mongoose");
const transaction_1 = require("../../transaction");
const multimedia_1 = require("../multimedia");
const user_schema_1 = require("../../user/user.schema");
const appealSchema = new mongoose_1.Schema({
    transaction: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Transaction',
    },
    description: {
        type: String,
        required: [true, 'Por favor ingrese la descripcion'],
    },
    paymentReceipt: [multimedia_1.multimediaSchema],
    reason: {
        type: String,
        required: [true, 'Por favor ingrese el motivo de la apelación'],
        enum: ['confirmedNotReceived', 'notConfirmed', 'confirmedNotReleased'],
        default: 'confirmedNotReceived',
    },
    finalResultDescription: {
        type: String,
    },
    status: {
        type: String,
        enum: ['active', 'canceled', 'resolved'],
    },
    active: {
        type: Boolean,
        default: true,
    },
    appealOwner: {
        type: user_schema_1.userSchema,
        required: [true, 'Por favor insertar el usuario que apeló'],
    },
}, { timestamps: true });
exports.Appeal = (0, mongoose_1.model)('Appeal', appealSchema);
exports.AppealTC = (0, graphql_compose_mongoose_1.composeMongoose)(exports.Appeal);
exports.AppealTC.addRelation('transaction', {
    resolver: () => transaction_1.TransactionTC.mongooseResolvers.dataLoader(),
    prepareArgs: {
        _id: (source) => source.transaction,
    },
    projection: { transaction: 1 },
});
//# sourceMappingURL=appeal.model.js.map