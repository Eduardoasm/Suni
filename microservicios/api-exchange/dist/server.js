"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable import/newline-after-import */
/* eslint-disable import/first */
const http_1 = tslib_1.__importDefault(require("http"));
const dotenv_1 = tslib_1.__importDefault(require("dotenv"));
dotenv_1.default.config({ path: './src/variables.env' });
const Sentry = tslib_1.__importStar(require("@sentry/node"));
const Tracing = tslib_1.__importStar(require("@sentry/tracing"));
const mongoose_1 = tslib_1.__importDefault(require("mongoose"));
const express_1 = tslib_1.__importDefault(require("express"));
const swagger_ui_express_1 = tslib_1.__importDefault(require("swagger-ui-express"));
const swagger_jsdoc_1 = tslib_1.__importDefault(require("swagger-jsdoc"));
const body_parser_1 = tslib_1.__importDefault(require("body-parser"));
const cookie_parser_1 = tslib_1.__importDefault(require("cookie-parser"));
const cors_1 = tslib_1.__importDefault(require("cors"));
const helmet_1 = tslib_1.__importDefault(require("helmet"));
const integrations_1 = require("@sentry/integrations");
const server_1 = require("@apollo/server");
const express4_1 = require("@apollo/server/express4");
const drainHttpServer_1 = require("@apollo/server/plugin/drainHttpServer");
const default_1 = require("@apollo/server/plugin/landingPage/default");
const disabled_1 = require("@apollo/server/plugin/disabled");
const cacheControl_1 = require("@apollo/server/plugin/cacheControl");
const graphql_middleware_1 = require("graphql-middleware");
const graphql_shield_1 = require("graphql-shield");
const utils_keyvaluecache_1 = require("@apollo/utils.keyvaluecache");
const axios_1 = tslib_1.__importDefault(require("axios"));
const SentryPlugin_1 = require("./utils/SentryPlugin");
const schema_1 = tslib_1.__importDefault(require("./graphql/schema"));
const paymentMethodCategory_routes_1 = tslib_1.__importDefault(require("./components/paymentMethodCategory/paymentMethodCategory.routes"));
const currency_1 = require("./components/currency");
const settings_1 = require("./components/settings");
const appeal_1 = require("./components/appeal/appeal");
const user_1 = require("./components/user");
const streamChat_1 = require("./components/streamChat");
const country_1 = require("./components/country");
const transaction_routes_1 = tslib_1.__importDefault(require("./components/transaction/transaction.routes"));
const listing_routes_1 = tslib_1.__importDefault(require("./components/listing/listing/listing.routes"));
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
global.__rootdir__ = process.cwd() || __dirname;
function initSever() {
    var _a, _b;
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        let connection = null;
        try {
            connection = yield mongoose_1.default
                .connect(String(process.env.DATABASE))
                .then((conn) => {
                console.log('Connected to database');
                return conn;
            });
            mongoose_1.default.connection.on('error', (err) => `❌🤬❌🤬 ${err}`);
            const app = (0, express_1.default)();
            const PORT = Number(process.env.PORT);
            app.set('port', PORT || 3004);
            app.use((0, cors_1.default)({
                origin: JSON.parse((_b = (_a = process === null || process === void 0 ? void 0 : process.env) === null || _a === void 0 ? void 0 : _a.CORS_ORIGINS) !== null && _b !== void 0 ? _b : '["studio.apollographql.com"]').push('studio.apollographql.com'),
                credentials: true,
            }));
            app.use(body_parser_1.default.json());
            app.use(body_parser_1.default.urlencoded({ extended: true }));
            app.use((0, cookie_parser_1.default)());
            if (process.env.NODE_ENV === 'production') {
                app.use((0, helmet_1.default)({
                    contentSecurityPolicy: process.env.NODE_ENV === 'production' ? undefined : false,
                }));
            }
            app.use(Sentry.Handlers.requestHandler());
            app.use(Sentry.Handlers.tracingHandler());
            app.use(Sentry.Handlers.errorHandler());
            app.use('/api', paymentMethodCategory_routes_1.default);
            app.use('/api', currency_1.currencyRouter);
            app.use('/api', settings_1.settingsRouter);
            app.use('/api', appeal_1.appealRouter);
            app.use('/api', user_1.userRouter);
            app.use('/api', streamChat_1.streamChatRouter);
            app.use('/api', country_1.countryRouter);
            app.use('/api', transaction_routes_1.default);
            app.use('/api', listing_routes_1.default);
            const isAuthenticated = (0, graphql_shield_1.rule)()((parent, args, context, info) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                var _c;
                const token = (_c = context.req.headers) === null || _c === void 0 ? void 0 : _c.authorization;
                const config = {
                    method: 'get',
                    baseURL: process.env.SERVICE_URL,
                    url: '/auth/userinfo',
                    headers: {
                        authorization: `Bearer ${token}`,
                    },
                };
                const { data } = yield (0, axios_1.default)(config);
                return data.success;
            }));
            const permissions = (0, graphql_shield_1.shield)({
                Query: { '*': isAuthenticated },
                Mutation: { '*': isAuthenticated },
            });
            const schemaWithPermissions = (0, graphql_middleware_1.applyMiddleware)(schema_1.default, permissions); // middleware-permisos de graphql
            const httpServer = http_1.default.createServer(app);
            const server = new server_1.ApolloServer({
                schema: schema_1.default,
                introspection: true,
                cache: new utils_keyvaluecache_1.InMemoryLRUCache({
                    maxSize: 100 * 1024 * 1024,
                    ttl: 60 * 60 * 8,
                }),
                plugins: [
                    process.env.NODE_ENV === 'production'
                        ? (0, disabled_1.ApolloServerPluginLandingPageDisabled)()
                        : (0, default_1.ApolloServerPluginLandingPageLocalDefault)({ footer: false }),
                    (0, drainHttpServer_1.ApolloServerPluginDrainHttpServer)({ httpServer }),
                    (0, cacheControl_1.ApolloServerPluginCacheControl)({
                        defaultMaxAge: 60,
                        calculateHttpHeaders: true,
                    }),
                    new SentryPlugin_1.SentryPlugin(),
                ],
            });
            yield server.start();
            app.use((0, express4_1.expressMiddleware)(server, {
                context: ({ req, res }) => tslib_1.__awaiter(this, void 0, void 0, function* () { return ({ req, res }); }),
            }));
            const swaggerSpec = (0, swagger_jsdoc_1.default)({
                definition: {
                    openapi: '3.0.0',
                    info: {
                        title: 'Suni exchange API',
                        version: '1.0.0',
                    },
                    host: process.env.NODE_ENV === 'development'
                        ? 'http://localhost:3004'
                        : 'https://api.sun-exchange.avilatek.com/graphql',
                },
                apis: ['./src/components/**/*.routes.ts'],
            });
            app.use('/api/docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerSpec));
            if (process.env.NODE_ENV !== 'development') {
                Sentry.init({
                    dsn: process.env.SENTRY_DSN,
                    tracesSampleRate: 0.5,
                    integrations: [
                        new integrations_1.RewriteFrames({
                            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                            root: global.__rootdir__,
                        }),
                        new Sentry.Integrations.Http({ tracing: true }),
                        new Tracing.Integrations.Mongo({ useMongoose: true }),
                        new Tracing.Integrations.Express({ app }),
                        new Tracing.Integrations.Apollo(),
                    ],
                });
            }
            yield new Promise((resolve) => {
                httpServer.listen({ port: PORT }, resolve);
            });
            console.log(`🚀 Server ready at http://localhost:${PORT}/graphql`);
        }
        catch (err) {
            if (connection) {
                connection.connection.close();
            }
            console.log(err);
            process.exit(1);
        }
    });
}
initSever();
//# sourceMappingURL=server.js.map