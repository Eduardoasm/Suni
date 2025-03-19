"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const listing_controller_1 = require("./listing.controller");
const router = (0, express_1.Router)();
router.get('/v1/listing/:_id', listing_controller_1.getOne);
exports.default = router;
//# sourceMappingURL=listing.routes.js.map