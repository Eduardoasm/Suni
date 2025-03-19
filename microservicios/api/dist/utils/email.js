"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendResetPasswordEmail = exports.sendWelcomeEmail = void 0;
const tslib_1 = require("tslib");
/* eslint-disable no-restricted-syntax */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
const postmark = tslib_1.__importStar(require("postmark"));
const dayjs_1 = tslib_1.__importDefault(require("dayjs"));
require("dayjs/locale/es");
dayjs_1.default.locale('es');
// const client = new postmark.ServerClient(process.env.POSTMARK_API_KEY);
const client = new postmark.ServerClient(process.env.POSTMARK_API_KEY);
const fromEmail = 'notifications@avilatek.com';
const adminUrl = process.env.DASHBOARD_URL;
const clientUrl = process.env.CLIENT_URL;
const companyName = 'Suni';
const companyAddress = 'Caracas, Venezuela';
function sendWelcomeEmail(user) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const emailOptions = {
            From: `Notificaciones <${fromEmail}>`,
            To: `${user === null || user === void 0 ? void 0 : user.email}`,
            TemplateAlias: 'welcome',
            TemplateModel: {},
        };
        return client.sendEmailWithTemplate(emailOptions);
    });
}
exports.sendWelcomeEmail = sendWelcomeEmail;
function sendResetPasswordEmail({ user, os, url, }) {
    var _a, _b, _c, _d;
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        try {
            const emailOptions = {
                From: `Notificaciones <${fromEmail}>`,
                To: `${user === null || user === void 0 ? void 0 : user.email}`,
                TemplateAlias: 'password-reset',
                TemplateModel: {
                    product_url: adminUrl,
                    product_name: companyName,
                    name: (_a = user === null || user === void 0 ? void 0 : user.firstName) !== null && _a !== void 0 ? _a : '',
                    action_url: url,
                    operating_system: (_b = os.os) !== null && _b !== void 0 ? _b : 'N/A',
                    browser_name: `${(_c = os === null || os === void 0 ? void 0 : os.name) !== null && _c !== void 0 ? _c : 'N/A'} ${(_d = os === null || os === void 0 ? void 0 : os.version) !== null && _d !== void 0 ? _d : '-'}`,
                    support_url: `${adminUrl}/frequently-asked-questions`,
                    company_name: companyName,
                    company_address: companyAddress,
                },
            };
            return client.sendEmailWithTemplate(emailOptions);
        }
        catch (error) {
            console.log(error, 'Error sending reset password email');
        }
    });
}
exports.sendResetPasswordEmail = sendResetPasswordEmail;
//# sourceMappingURL=email.js.map