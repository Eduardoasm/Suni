"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signS3Controller = exports.s3Mutations = exports.signS3 = void 0;
const tslib_1 = require("tslib");
const graphql_compose_1 = require("graphql-compose");
const s3_dto_1 = require("./s3.dto");
const s3Service = tslib_1.__importStar(require("./s3.service"));
exports.signS3 = graphql_compose_1.schemaComposer.createResolver({
    name: 'signS3',
    kind: 'mutation',
    description: '...',
    type: s3_dto_1.S3Payload,
    args: {
        data: s3_dto_1.SignS3Input,
    },
    resolve({ args }) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const { signedRequest, url } = yield s3Service.signS3Service(args === null || args === void 0 ? void 0 : args.data);
            return {
                signedRequest,
                url,
            };
        });
    },
});
exports.s3Mutations = {
    signS3: exports.signS3,
};
function signS3Controller(req, res, next) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        try {
            const { signedRequest, url } = yield s3Service.signS3Service(req.body);
            return res.status(200).json({ success: true, signedRequest, url });
        }
        catch (err) {
            res.status(500).json({ err: 'Internal server error', success: false });
        }
    });
}
exports.signS3Controller = signS3Controller;
//# sourceMappingURL=s3.controller.js.map