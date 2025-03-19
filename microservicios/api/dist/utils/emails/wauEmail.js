"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmail = void 0;
const tslib_1 = require("tslib");
const axios_1 = tslib_1.__importDefault(require("axios"));
const NoSentryError_1 = require("../NoSentryError");
function sendEmail(templateId, token, variables, attachmentUrl, email) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        if (!token)
            throw new NoSentryError_1.NoSentryError('Token not provided');
        const config = {
            method: 'post',
            baseURL: process.env.SERVICE_URL,
            url: `/email/${templateId}`,
            headers: {
                authorization: `Bearer ${token}`,
            },
            data: {
                email,
                variables,
                attachment_url: attachmentUrl,
            },
        };
        try {
            const { data } = yield (0, axios_1.default)(config);
            if (!data.success)
                throw new NoSentryError_1.NoSentryError('Error sending email');
            return data;
        }
        catch (error) {
            console.log(error, 'Error sending email');
            throw new NoSentryError_1.NoSentryError(`Error in send email processed to user: ${error.message}`);
        }
    });
}
exports.sendEmail = sendEmail;
//# sourceMappingURL=wauEmail.js.map