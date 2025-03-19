"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const language_controller_1 = require("./language.controller");
const router = (0, express_1.Router)();
router.get('/v1/language', language_controller_1.getAll);
router.post('/v1/language', language_controller_1.createOne);
router.get('/v1/language/pagination/:page/:perPage', language_controller_1.pagination);
router.put('/v1/language/:_id', language_controller_1.updateOne);
router.get('/v1/language/:_id', language_controller_1.getOne);
exports.default = router;
//# sourceMappingURL=language.routes.js.map