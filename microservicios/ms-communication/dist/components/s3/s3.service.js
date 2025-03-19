"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signS3Service = void 0;
const tslib_1 = require("tslib");
/* eslint-disable import/no-extraneous-dependencies */
const client_s3_1 = require("@aws-sdk/client-s3");
const s3_request_presigner_1 = require("@aws-sdk/s3-request-presigner");
function signS3Service(body) {
    var _a, _b;
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const bucketName = (_b = (_a = process === null || process === void 0 ? void 0 : process.env) === null || _a === void 0 ? void 0 : _a.AWS_BUCKET_NAME) !== null && _b !== void 0 ? _b : '';
        const s3 = new client_s3_1.S3({
            credentials: {
                accessKeyId: process.env.AWS_ACCESS_KEY_ID,
                secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
            },
            endpoint: 'https://nyc3.digitaloceanspaces.com',
            region: process.env.AWS_REGION,
        });
        const command = new client_s3_1.PutObjectCommand({
            Bucket: bucketName,
            Key: body.filename,
            ContentType: body.filetype,
            ACL: 'public-read',
        });
        const oneHrInSec = 60 * 60;
        const signedRequest = yield (0, s3_request_presigner_1.getSignedUrl)(s3, command, {
            expiresIn: oneHrInSec,
        });
        const url = `https://suni.nyc3.digitaloceanspaces.com/${body.filename}`;
        return {
            signedRequest,
            url,
        };
    });
}
exports.signS3Service = signS3Service;
//# sourceMappingURL=s3.service.js.map