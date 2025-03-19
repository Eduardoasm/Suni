"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HistoryTC = exports.History = void 0;
const mongoose_1 = require("mongoose");
const graphql_compose_mongoose_1 = require("graphql-compose-mongoose");
const user_1 = require("../user/user");
const historySchema = new mongoose_1.Schema({
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
    },
    description: {
        type: String,
        trim: true,
    },
    collectionName: {
        type: String,
        enum: ['user', 'creditScore', 'loan', 'contract', 'paymentPlan'],
        // required: [true, 'Nombre de la colección en donde ocurrió la actividad'],
    },
    document: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: [true, '_id del documento que generó la actividad'],
    },
    active: {
        type: Boolean,
    },
}, { timestamps: true });
exports.History = (0, mongoose_1.model)('History', historySchema);
exports.HistoryTC = (0, graphql_compose_mongoose_1.composeMongoose)(exports.History);
exports.HistoryTC.addRelation('user', {
    resolver: () => user_1.UserTC.mongooseResolvers.dataLoader({ lean: true }),
    prepareArgs: {
        _id: (source) => source.user,
    },
    projection: { user: 1 },
});
//# sourceMappingURL=history.model.js.map