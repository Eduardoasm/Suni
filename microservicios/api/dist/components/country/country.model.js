"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CountryTC = exports.Country = void 0;
const mongoose_1 = require("mongoose");
const graphql_compose_mongoose_1 = require("graphql-compose-mongoose");
const countrySchema = new mongoose_1.Schema({
    name: {
        type: String,
        trim: true,
    },
    code: {
        type: String,
        trim: true,
    },
    flag: {
        type: String,
        trim: true,
    },
    active: {
        type: Boolean,
        default: true,
    },
    disabled: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true });
exports.Country = (0, mongoose_1.model)('Country', countrySchema);
exports.CountryTC = (0, graphql_compose_mongoose_1.composeMongoose)(exports.Country);
//# sourceMappingURL=country.model.js.map