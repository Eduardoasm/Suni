"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const s3_controller_1 = require("./s3.controller");
const router = (0, express_1.Router)();
router.post('/v1/s3', s3_controller_1.signS3Controller);
exports.default = router;
//# sourceMappingURL=s3.routes.js.map