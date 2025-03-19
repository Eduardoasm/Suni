"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.walletMutations = exports.walletQueries = exports.pagination = exports.updateOne = exports.createOne = exports.getOne = exports.getAll = void 0;
const tslib_1 = require("tslib");
const graphql_compose_1 = require("graphql-compose");
const wallet_dto_1 = require("./wallet.dto");
const wallet_model_1 = require("./wallet.model");
const walletService = tslib_1.__importStar(require("./wallet.service"));
const createWallet = graphql_compose_1.schemaComposer.createResolver({
    name: 'createWallet',
    kind: 'mutation',
    description: 'Create wallet',
    type: wallet_dto_1.WalletType,
    args: {
        data: wallet_dto_1.CreateWalletInput,
    },
    resolve({ args }) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const wallet = yield walletService.create(args === null || args === void 0 ? void 0 : args.data);
            return wallet;
        });
    },
});
const walletQueries = {
    wallet: wallet_model_1.WalletTC.mongooseResolvers.findOne(),
    wallets: wallet_model_1.WalletTC.mongooseResolvers.findMany({
        limit: { defaultValue: 1000000 },
    }),
    walletPagination: wallet_model_1.WalletTC.mongooseResolvers.pagination(),
};
exports.walletQueries = walletQueries;
const walletMutations = {
    updateWallet: wallet_model_1.WalletTC.mongooseResolvers.updateOne(),
    createWallet,
};
exports.walletMutations = walletMutations;
// REST Controller
function getAll(req, res, next) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        try {
            const wallets = yield walletService.find({});
            return res.status(200).json({ success: true, wallets });
        }
        catch (err) {
            res.status(500).json({ err: 'Internal server error', success: false });
        }
    });
}
exports.getAll = getAll;
function getOne(req, res, next) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        try {
            const wallet = yield walletService.findOne({ _id: req.params._id });
            return res.status(200).json({ success: true, wallet });
        }
        catch (err) {
            res.status(500).json({ err: 'Internal server error', success: false });
        }
    });
}
exports.getOne = getOne;
function createOne(req, res, next) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        try {
            const wallet = yield walletService.create(req.body);
            return res.status(200).json({ success: true, wallet });
        }
        catch (err) {
            res.status(500).json({ err: 'Internal server error', success: false });
        }
    });
}
exports.createOne = createOne;
function updateOne(req, res, next) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        try {
            const wallet = yield walletService.updateOne({ _id: req.params._id }, req.body);
            return res.status(200).json({ success: true, wallet });
        }
        catch (err) {
            res.status(500).json({ err: 'Internal server error', success: false });
        }
    });
}
exports.updateOne = updateOne;
function pagination(req, res, next) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        try {
            const data = yield walletService.pagination(Number(req.params.page), Number(req.params.perPage));
            return res.status(200).json({ success: true, pagination: data });
        }
        catch (err) {
            res.status(500).json({ err: 'Internal server error', success: false });
        }
    });
}
exports.pagination = pagination;
//# sourceMappingURL=wallet.controller.js.map