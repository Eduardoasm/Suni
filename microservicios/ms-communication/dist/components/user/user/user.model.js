"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSwagger = exports.UserTC = exports.User = void 0;
const tslib_1 = require("tslib");
const slugs_1 = tslib_1.__importDefault(require("slugs"));
const mongoose_to_swagger_1 = tslib_1.__importDefault(require("mongoose-to-swagger"));
const argon2_1 = require("argon2");
const mongoose_1 = require("mongoose");
const graphql_compose_mongoose_1 = require("graphql-compose-mongoose");
const permissions_1 = require("../permissions");
const sessions_1 = require("../sessions");
const userSchema = new mongoose_1.Schema({
    slug: {
        type: String,
    },
    email: {
        type: String,
        required: [true, 'Por favor ingrese un correo electrónico'],
        trim: true,
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'Por favor ingrese una contraseña'],
    },
    firstName: {
        type: String,
        required: [true, 'Por favor ingrese un nombre'],
        trim: true,
    },
    lastName: {
        type: String,
        // required: [true, 'Por favor ingrese un apellido'],
        trim: true,
    },
    permission: [permissions_1.permissionSchema],
    userRole: {
        type: String,
        enum: ['client', 'admin', 'superadmin'],
    },
    emailVerify: {
        type: Boolean,
        default: false,
    },
    resetTokenValidity: {
        type: Date,
    },
    resetToken: {
        type: String,
    },
    dni: {
        type: String,
        trim: true,
    },
    dniType: {
        type: String,
        enum: ['V', 'E', 'J', 'G', 'P', 'N/A'],
    },
    sessions: [sessions_1.sessionSchema],
    active: {
        type: Boolean,
        default: true,
    },
}, { timestamps: true });
userSchema.pre('save', function (next) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        if (!this.isModified('firstName') || !this.isModified('lastName')) {
            return next();
        }
        this.slug = (0, slugs_1.default)(`${this.firstName} ${this.lastName}`);
        const slugRegEx = new RegExp(`^(${this.slug})((-[0-9]*$)?)$`);
        const withSlugs = yield this.constructor.find({
            slug: slugRegEx,
        });
        if (withSlugs.length) {
            this.slug = `${this.slug}-${withSlugs.length + 1}`;
        }
        next();
    });
});
userSchema.pre('save', function (next) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        if (!this.isModified('password')) {
            return next();
        }
        this.password = (yield (0, argon2_1.hash)(this.password, {})).toString();
        next();
    });
});
exports.User = mongoose_1.models.User ||
    (0, mongoose_1.model)('User', userSchema);
exports.UserTC = (0, graphql_compose_mongoose_1.composeMongoose)(exports.User);
exports.UserSwagger = (0, mongoose_to_swagger_1.default)(exports.User);
//# sourceMappingURL=user.model.js.map