"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoSentryError = void 0;
const graphql_1 = require("graphql");
class NoSentryError extends graphql_1.GraphQLError {
    constructor(message) {
        super(message, {
            extensions: {
                code: 'NO_SENTRY',
                name: 'NoSentryError',
            },
        });
    }
}
exports.NoSentryError = NoSentryError;
//# sourceMappingURL=NoSentryError.js.map