"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateForKYC = exports.getUserWallets = exports.adminDeleteUser = exports.deleteUser = exports.signInAdmin = exports.changePassword = exports.resetPassword = exports.currentUser = exports.signOut = exports.signIn = exports.createAdmin = void 0;
const tslib_1 = require("tslib");
/* eslint-disable array-callback-return */
/* eslint-disable no-unused-expressions */
const jsonwebtoken_1 = tslib_1.__importDefault(require("jsonwebtoken"));
const argon2_1 = require("argon2");
const uuid_1 = require("uuid");
const axios_1 = tslib_1.__importDefault(require("axios"));
const formatWallet_1 = require("../../utils/formatWallet");
const utils_1 = require("../../utils");
const userService = tslib_1.__importStar(require("../user/user/user.service"));
const apiPriceBtc_1 = require("../../utils/apiPriceBtc");
const userInfo_1 = require("../../utils/walletService/userInfo");
function createAdmin(body, token, _browser) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        if (!token) {
            return null;
        }
        const payload = jsonwebtoken_1.default.decode(token);
        const userSuperAdmin = yield userService.findOne({
            _id: payload.id,
            active: true,
        });
        if (!userSuperAdmin.userRole.includes('superadmin')) {
            throw new utils_1.NoSentryError('El usuario no cuenta con los permisos suficientes');
        }
        const _user = yield userService.findOne({ email: body.email });
        if (_user) {
            throw new utils_1.NoSentryError('Este correo ya se encuenta registrado');
        }
        const user = yield userService.create(Object.assign(Object.assign({}, body), { dniType: userService.translateDniType(body.dniType), userRole: 'admin', emailVerify: false, permission: [] }));
        yield (0, utils_1.sendResetPasswordEmail)({
            user,
            os: _browser,
            url: `${process.env.DASHBOARD_URL}/reset-password/${user === null || user === void 0 ? void 0 : user.resetToken}`,
        });
        return user;
    });
}
exports.createAdmin = createAdmin;
function signIn(body, _browser) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const user = yield userService.findOne({ email: body.email, active: true });
        if (!user) {
            throw new utils_1.NoSentryError(`No se ha encontrado a un usuario con correo ${body.email}`);
        }
        const compare = yield (0, argon2_1.verify)(user.password, body.password);
        if (!compare) {
            throw new utils_1.NoSentryError(`La contraseña es incorrecta ${body.email}`);
        }
        const token = jsonwebtoken_1.default.sign(JSON.stringify({
            id: user._id,
            privilege: user.userRole,
        }), process.env.SECRET);
        yield userService.updateOne({ _id: user._id }, {
            $push: {
                sessions: [
                    {
                        user: user._id,
                        token,
                        device: `${_browser.os} ${_browser.name} ${_browser.version}`,
                        active: true,
                    },
                ],
            },
        });
        return {
            user,
            token,
        };
    });
}
exports.signIn = signIn;
function signOut(token) {
    var _a;
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        try {
            const payload = jsonwebtoken_1.default.decode(token);
            const user = yield userService.findOne({ _id: payload.id, active: true });
            const sessions = (_a = user === null || user === void 0 ? void 0 : user.sessions) === null || _a === void 0 ? void 0 : _a.map((session) => (Object.assign(Object.assign({}, session === null || session === void 0 ? void 0 : session._doc), { active: false })));
            if (user) {
                const updatedUser = yield userService.updateOne({ _id: user._id }, {
                    sessions,
                });
                if ((updatedUser === null || updatedUser === void 0 ? void 0 : updatedUser.modifiedCount) > 0) {
                    return { success: true };
                }
                return {
                    success: false,
                    message: 'Error: Error actualizando las sesiones del usuario',
                };
            }
            return { success: false, message: 'Usuario no encontrado' };
        }
        catch (error) {
            throw new utils_1.NoSentryError('Error cerrando sesión');
        }
    });
}
exports.signOut = signOut;
function currentUser(token) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        if (!token) {
            return null;
        }
        const payload = jsonwebtoken_1.default.decode(token);
        const user = yield userService.findOne({ _id: payload.id, active: true });
        return { user };
    });
}
exports.currentUser = currentUser;
function resetPassword(email, browserData) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const user = yield userService.findOne({ email }, '-password');
        if (!user) {
            throw new utils_1.NoSentryError(`El usuario con correo ${email} no esta registrado`);
        }
        user.resetToken = (0, uuid_1.v4)();
        user.resetTokenValidity = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours in ms
        yield Promise.all([
            user.save(),
            (0, utils_1.sendResetPasswordEmail)({
                user,
                os: browserData,
                url: `${process.env.DASHBOARD_URL}/reset-password/${user === null || user === void 0 ? void 0 : user.resetToken}`,
            }),
        ]);
    });
}
exports.resetPassword = resetPassword;
function changePassword(data) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const user = yield userService.findOne({
            resetToken: data.token,
            resetTokenValidity: {
                $gt: Date.now(),
            },
        });
        if (!user) {
            throw new utils_1.NoSentryError(`El token ha expirado, debe solicitar uno nuevo`);
        }
        user.password = data.password;
        user.resetToken = undefined;
        user.resetTokenValidity = undefined;
        yield user.save();
    });
}
exports.changePassword = changePassword;
function signInAdmin(body, _browser) {
    var _a;
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const user = yield userService.findOne({
            email: body.email,
            active: true,
            userRole: 'admin' || 'superadmin',
        });
        if (!user) {
            throw new utils_1.NoSentryError(`No se ha encontrado a un usuario con correo ${body.email}`);
        }
        const compare = yield (0, argon2_1.verify)(user.password, body.password);
        if (!compare) {
            throw new utils_1.NoSentryError(`La contraseña es incorrecta ${body.email}`);
        }
        const token = jsonwebtoken_1.default.sign(JSON.stringify({
            id: user._id,
            privilege: user.userRole,
        }), process.env.SECRET);
        const sessions = (_a = user === null || user === void 0 ? void 0 : user.sessions) === null || _a === void 0 ? void 0 : _a.map((session) => (Object.assign(Object.assign({}, session === null || session === void 0 ? void 0 : session._doc), { active: false })));
        sessions.push({
            user: user._id,
            token,
            device: `${_browser.os} ${_browser.name} ${_browser.version}`,
            active: true,
        });
        yield userService.updateOne({ _id: user._id }, {
            sessions,
        });
        return {
            user,
            token,
        };
    });
}
exports.signInAdmin = signInAdmin;
function deleteUser(token) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        if (!token) {
            return false;
        }
        const payload = jsonwebtoken_1.default.decode(token);
        const user = yield userService.findOne({ _id: payload.id, active: true });
        yield userService.updateOne({ _id: user._id }, { email: user._id, dni: user._id, active: false }, { runValidators: true, new: true });
        return true;
    });
}
exports.deleteUser = deleteUser;
function adminDeleteUser(body, token) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const ROLE = ['admin', 'superadmin'];
        if (!token) {
            return false;
        }
        const payload = jsonwebtoken_1.default.decode(token);
        const admin = yield userService.findOne({ _id: payload.id, active: true });
        if (!admin || !ROLE.includes(admin.userRole)) {
            throw new utils_1.NoSentryError('No tiene permiso para realizar esta acción');
        }
        const _deleteUser = yield userService.updateOne({ _id: body.userId }, { email: body.userId, dni: body.userId, active: false }, { runValidators: true, new: true });
        return true;
    });
}
exports.adminDeleteUser = adminDeleteUser;
function getUserWallets(token, body) {
    var _a, _b;
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        try {
            const config = {
                method: 'get',
                baseURL: process.env.SERVICE_URL,
                url: '/wallet/user-balances',
                headers: {
                    authorization: `Bearer ${token}`,
                },
            };
            const { data } = yield (0, axios_1.default)(config);
            const btcPrice = yield (0, apiPriceBtc_1.apiPriceBtc)();
            const userWallets = (_b = (_a = data === null || data === void 0 ? void 0 : data.data) === null || _a === void 0 ? void 0 : _a.filter((wallet) => {
                var _a, _b;
                return (((_a = wallet === null || wallet === void 0 ? void 0 : wallet.type) === null || _a === void 0 ? void 0 : _a.toLowerCase()) === ((_b = body === null || body === void 0 ? void 0 : body.currency) === null || _b === void 0 ? void 0 : _b.toLowerCase()) &&
                    (body === null || body === void 0 ? void 0 : body.currency)) ||
                    !(body === null || body === void 0 ? void 0 : body.currency);
            })) === null || _b === void 0 ? void 0 : _b.map((wallet) => (0, formatWallet_1.formatWallet)(wallet, btcPrice));
            return { userWallets };
        }
        catch (err) {
            throw new utils_1.NoSentryError(err);
        }
    });
}
exports.getUserWallets = getUserWallets;
function validateForKYC(token) {
    var _a, _b;
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const { data: user } = yield (0, userInfo_1.getUserInfo)(token);
        if (user === null || user === void 0 ? void 0 : user.userDniDuplicated) {
            return {
                isAllowed: false,
                message: 'Tu DNI ya ha sido validado con una cuenta de Suni',
            };
        }
        if ((((_a = user === null || user === void 0 ? void 0 : user.metamapStatus) === null || _a === void 0 ? void 0 : _a.status) === 'UNVERIFIED' &&
            !((_b = user === null || user === void 0 ? void 0 : user.metamapStatus) === null || _b === void 0 ? void 0 : _b.dni_value)) ||
            !(user === null || user === void 0 ? void 0 : user.metamapStatus))
            return { isAllowed: true, message: 'El usuario no ha realizado el kyc' };
        return { isAllowed: false, message: 'KYC ya realizado' };
    });
}
exports.validateForKYC = validateForKYC;
//# sourceMappingURL=auth.service.js.map