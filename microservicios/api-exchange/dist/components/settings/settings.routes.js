"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const settings_controller_1 = require("./settings.controller");
const settingsRouter = (0, express_1.Router)();
settingsRouter.get('/v1/settings', settings_controller_1.getAll);
settingsRouter.post('/v1/settings/updateSettings', settings_controller_1.updateSettings);
settingsRouter.get('/v1/settings/getActiveSettings', settings_controller_1.getActiveSetting);
settingsRouter.post('/v1/settings/create', settings_controller_1.createOne);
settingsRouter.get('/v1/settings/pagination/:page/:perPage', settings_controller_1.pagination);
settingsRouter.get('/v1/settings/:_id', settings_controller_1.getOne);
settingsRouter.put('/v1/settings/:_id', settings_controller_1.updateOne);
exports.default = settingsRouter;
//# sourceMappingURL=settings.routes.js.map