"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.S3Payload = exports.SignS3Input = void 0;
exports.SignS3Input = `
input SignS3Input {
  filename: String!
  filetype: String!
}
`;
exports.S3Payload = `
  type S3Payload {
    signedRequest: String!
    url: String!
  }
`;
//# sourceMappingURL=s3.dto.js.map