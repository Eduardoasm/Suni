"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SentryPlugin = void 0;
const tslib_1 = require("tslib");
/* eslint-disable no-restricted-syntax */
/* eslint-disable class-methods-use-this */
const Sentry = tslib_1.__importStar(require("@sentry/node"));
const jsonwebtoken_1 = tslib_1.__importDefault(require("jsonwebtoken"));
class SentryPlugin {
    requestDidStart(_requestContext) {
        return Promise.resolve({
            didEncounterErrors(ctx) {
                var _a, _b, _c, _d, _e;
                return tslib_1.__awaiter(this, void 0, void 0, function* () {
                    if ((_b = (_a = ctx === null || ctx === void 0 ? void 0 : ctx.req) === null || _a === void 0 ? void 0 : _a.cookies) === null || _b === void 0 ? void 0 : _b.token) {
                        const payload = jsonwebtoken_1.default.decode((_d = (_c = ctx === null || ctx === void 0 ? void 0 : ctx.req) === null || _c === void 0 ? void 0 : _c.cookies) === null || _d === void 0 ? void 0 : _d.token);
                        Sentry.setUser({
                            id: payload.id,
                        });
                    }
                    for (const err of ctx.errors) {
                        // Only report internal server errors,
                        // all errors extending ApolloError should be user-facing
                        if (((_e = err === null || err === void 0 ? void 0 : err.extensions) === null || _e === void 0 ? void 0 : _e.code) !== 'NO_SENTRY') {
                            // Add scoped report details and send to Sentry
                            Sentry.withScope((scope) => {
                                var _a, _b, _c;
                                // Annotate whether failing operation was query/mutation/subscription
                                scope.setTag('kind', (_a = ctx === null || ctx === void 0 ? void 0 : ctx.operation) === null || _a === void 0 ? void 0 : _a.operation);
                                // Log query and variables as extras (make sure to strip out sensitive data!)
                                scope.setExtra('query', (_b = ctx === null || ctx === void 0 ? void 0 : ctx.request) === null || _b === void 0 ? void 0 : _b.query);
                                scope.setExtra('variables', (_c = ctx === null || ctx === void 0 ? void 0 : ctx.request) === null || _c === void 0 ? void 0 : _c.variables);
                                if (err.path) {
                                    // We can also add the path as breadcrumb
                                    scope.addBreadcrumb({
                                        category: 'query-path',
                                        message: err.path.join(' > '),
                                        level: 'debug',
                                    });
                                }
                                Sentry.captureException(err);
                            });
                        }
                    }
                });
            },
        });
    }
}
exports.SentryPlugin = SentryPlugin;
//# sourceMappingURL=SentryPlugin.js.map