"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signInController = exports.signOutController = exports.currentUserRest = exports.resetPasswordController = exports.changePasswordController = exports.currentUserController = exports.authMutations = exports.authQueries = void 0;
const tslib_1 = require("tslib");
const browser_detect_1 = tslib_1.__importDefault(require("browser-detect"));
const graphql_compose_1 = require("graphql-compose");
const auth_dto_1 = require("./auth.dto");
const user_dto_1 = require("../user/user/user.dto");
const authService = tslib_1.__importStar(require("./auth.service"));
const cookieConfig = process.env.NODE_ENV === 'development'
    ? {
        maxAge: 1000 * 60 * 60 * 24 * 365,
    }
    : {
        secure: true,
        sameSite: 'none',
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 365,
        domain: 'suni.avilatek.com',
    };
const createAdmin = graphql_compose_1.schemaComposer.createResolver({
    name: 'createAdmin',
    kind: 'mutation',
    description: 'Create new user admin',
    type: user_dto_1.UserRole,
    args: {
        data: auth_dto_1.createAdminInput,
    },
    resolve({ args, context }) {
        var _a, _b, _c;
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const token = (_b = (_a = context.req.cookies) === null || _a === void 0 ? void 0 : _a.token) !== null && _b !== void 0 ? _b : (_c = context.req.headers) === null || _c === void 0 ? void 0 : _c['x-token'];
            const browser = (0, browser_detect_1.default)(context.req.headers['user-agent']);
            const user = yield authService.createAdmin(args.data, token, browser);
            return user;
        });
    },
});
const signIn = graphql_compose_1.schemaComposer.createResolver({
    name: 'signIn',
    kind: 'mutation',
    description: 'Sign In an user to the app',
    type: auth_dto_1.SignInType,
    args: {
        data: auth_dto_1.SignInInput,
    },
    resolve({ args, context }) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const browser = (0, browser_detect_1.default)(context.req.headers['user-agent']);
            const { user, token } = yield authService.signIn(args.data, browser);
            return { user, token };
        });
    },
});
const signInAdmin = graphql_compose_1.schemaComposer.createResolver({
    name: 'signInAdmin',
    kind: 'mutation',
    description: 'Sign In an admin to the app',
    type: auth_dto_1.SignInType,
    args: {
        data: auth_dto_1.SignInInput,
    },
    resolve({ args, context }) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const browser = (0, browser_detect_1.default)(context.req.headers['user-agent']);
            const { user, token } = yield authService.signInAdmin(args.data, browser);
            context.res.cookie('token', token, cookieConfig);
            return { user, token };
        });
    },
});
const signOut = graphql_compose_1.schemaComposer.createResolver({
    name: 'SignOut',
    kind: 'mutation',
    description: 'Sign Out an user from the app',
    type: auth_dto_1.SignOutType,
    args: {
        data: auth_dto_1.SignOutInput,
    },
    resolve({ args, context }) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const { data } = args;
            const serviceResponse = yield authService.signOut(data.token);
            if (serviceResponse === null || serviceResponse === void 0 ? void 0 : serviceResponse.success) {
                context.res.clearCookie('token', cookieConfig);
                return { success: true };
            }
            return { success: false, message: serviceResponse === null || serviceResponse === void 0 ? void 0 : serviceResponse.message };
        });
    },
});
const deleteUser = graphql_compose_1.schemaComposer.createResolver({
    name: 'deleteUser',
    kind: 'mutation',
    description: 'Logical deletion of user',
    type: auth_dto_1.DeleteResultType,
    args: {},
    resolve({ context }) {
        var _a, _b, _c;
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const token = (_b = (_a = context.req.cookies) === null || _a === void 0 ? void 0 : _a.token) !== null && _b !== void 0 ? _b : (_c = context.req.headers) === null || _c === void 0 ? void 0 : _c['x-token'];
            const success = yield authService.deleteUser(token);
            context.res.clearCookie('token', cookieConfig);
            return { success };
        });
    },
});
const adminDeleteUser = graphql_compose_1.schemaComposer.createResolver({
    name: 'adminDeleteUser',
    kind: 'mutation',
    description: 'Admin logical delete an user',
    type: auth_dto_1.DeleteResultType,
    args: {
        data: auth_dto_1.AdminDeleteUserInput,
    },
    resolve({ args, context }) {
        var _a, _b, _c;
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const token = (_b = (_a = context.req.cookies) === null || _a === void 0 ? void 0 : _a.token) !== null && _b !== void 0 ? _b : (_c = context.req.headers) === null || _c === void 0 ? void 0 : _c['x-token'];
            const success = yield authService.adminDeleteUser(args.data, token);
            return { success };
        });
    },
});
const currentUser = graphql_compose_1.schemaComposer.createResolver({
    name: 'currentUser',
    kind: 'query',
    description: 'Return the user object based on the token',
    type: auth_dto_1.CurrentUserRole,
    args: {},
    resolve({ context }) {
        var _a, _b, _c;
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const token = (_b = (_a = context.req.cookies) === null || _a === void 0 ? void 0 : _a.token) !== null && _b !== void 0 ? _b : (_c = context.req.headers) === null || _c === void 0 ? void 0 : _c['x-token'];
            const { user } = yield authService.currentUser(token);
            return { user };
        });
    },
});
const resetPassword = graphql_compose_1.schemaComposer.createResolver({
    name: 'resetPassword',
    type: auth_dto_1.ResetPasswordInfo,
    description: 'Reset Password',
    kind: 'mutation',
    args: {
        data: auth_dto_1.ResetPasswordInput,
    },
    resolve({ args, context }) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                yield authService.resetPassword(args.data.email, (0, browser_detect_1.default)(context.req.headers['user-agent']));
                return { success: true };
            }
            catch (err) {
                return { err: err.message, success: false };
            }
        });
    },
});
const changePassword = graphql_compose_1.schemaComposer.createResolver({
    name: 'changePassword',
    type: auth_dto_1.ResetPasswordInfo,
    description: 'Change Password',
    kind: 'mutation',
    args: {
        data: auth_dto_1.ChangePasswordInput,
    },
    resolve({ args }) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                yield authService.changePassword(args.data);
                return { success: true };
            }
            catch (err) {
                return { success: false, err: err.message };
            }
        });
    },
});
const getUserWallets = graphql_compose_1.schemaComposer.createResolver({
    name: 'getUserWallets',
    kind: 'query',
    description: 'Return user wallets info',
    type: auth_dto_1.UserWalletsType,
    args: {
        data: auth_dto_1.GetUserWalletsInput,
    },
    resolve({ args, context }) {
        var _a;
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const token = (_a = context.req.headers) === null || _a === void 0 ? void 0 : _a.authorization;
            const userWallets = yield authService.getUserWallets(token, args === null || args === void 0 ? void 0 : args.data);
            return userWallets;
        });
    },
});
const validateForKYC = graphql_compose_1.schemaComposer.createResolver({
    name: 'validateForKYC',
    kind: 'query',
    description: 'Validates if user is allowed to do kyc or not',
    type: auth_dto_1.ValidateForKYCType,
    resolve({ context }) {
        var _a;
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const token = (_a = context.req.headers) === null || _a === void 0 ? void 0 : _a.authorization;
            const response = yield authService.validateForKYC(token);
            return response;
        });
    },
});
exports.authQueries = {
    currentUser,
    getUserWallets,
    validateForKYC,
};
exports.authMutations = {
    changePassword,
    resetPassword,
    signOut,
    signIn,
    createAdmin,
    signInAdmin,
    deleteUser,
    adminDeleteUser,
};
// REST Controller
function currentUserController(req, res, next) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        try {
            const { user } = yield authService.currentUser(req.body);
            return res.status(200).json({ success: true, user });
        }
        catch (err) {
            res.status(500).json({ success: false, err: 'Internal Server Error' });
        }
    });
}
exports.currentUserController = currentUserController;
function changePasswordController(req, res, next) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        try {
            yield authService.changePassword(req.body.email);
            return res.status(200).json({ success: true });
        }
        catch (err) {
            res.status(500).json({ success: false, err: 'Internal Server Error' });
        }
    });
}
exports.changePasswordController = changePasswordController;
function resetPasswordController(req, res, next) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        try {
            yield authService.resetPassword(req.body.email, (0, browser_detect_1.default)(req.headers['user-agent']));
            return res.status(200).json({ success: true });
        }
        catch (err) {
            res.status(500).json({ success: false, err: 'Internal Server Error' });
        }
    });
}
exports.resetPasswordController = resetPasswordController;
function currentUserRest(req, res, next) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield authService.currentUser(req.headers.authorization);
            return res.status(200).json({ user });
        }
        catch (error) {
            console.log(error, 'error in api currentUser');
            res.status(500).json({ success: false, err: 'Internal Server Error' });
        }
    });
}
exports.currentUserRest = currentUserRest;
function signOutController(req, res, next) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        try {
            // TODO: Eliminar la sesion del usuario
            res.clearCookie('token', cookieConfig);
            return res.status(200).json({ success: true });
        }
        catch (err) {
            res.status(500).json({ success: false, err: 'Internal Server Error' });
        }
    });
}
exports.signOutController = signOutController;
function signInController(req, res, next) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        try {
            const browser = (0, browser_detect_1.default)(req.headers['user-agent']);
            const { user, token } = yield authService.signIn(req.body, browser);
            return res.status(200).json({ success: true, user, token });
        }
        catch (err) {
            res.status(500).json({ success: false, err: 'Internal Server Error' });
        }
    });
}
exports.signInController = signInController;
//# sourceMappingURL=auth.controller.js.map