"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("./auth.controller");
const router = (0, express_1.Router)();
/**
 * @openapi
 * components:
 *   schemas:
 *    SuccessfulResponse:
 *      type: object
 *      properties:
 *        success:
 *          type: boolean
 *
 *    UnsuccessfulResponse:
 *      type: object
 *      properties:
 *        success:
 *          type: boolean
 *        err:
 *          type: string
 *
 *    ChangePassword:
 *      type: object
 *      properties:
 *        token:
 *          type: string
 *          description: The reset token for the user
 *        password:
 *          type: string
 *          description: The new password for the user
 *
 *    ResetPassword:
 *      type: object
 *      properties:
 *        token:
 *          type: string
 *          description: The reset token for the user
 *        password:
 *          type: string
 *          description: The new password for the user
 *
 *    SignIn:
 *      type: object
 *      properties:
 *        email:
 *          type: string
 *          description: The reset token for the user
 *        password:
 *          type: string
 *          description: The new password for the user
 *
 *    RegisterUser:
 *      type: object
 *      properties:
 *        email:
 *          type: string
 *          description: The email for the new user
 *        password:
 *          type: string
 *          description: The password for the new user
 *        firstName:
 *          type: string
 *          description: The first name of user
 *        lastName:
 *          type:  string
 *          description: The last name of user
 *        dni:
 *          type: string
 *          description: The dni for the new user
 *        dniType:
 *          type: string
 *          description: The type of dni for the new user
 *          enum: ['V', 'E', 'J', 'G', 'P', 'N/A']
 *
 *    CreateUser:
 *      type: object
 *      properties:
 *        email:
 *          type: string
 *          description: The email for the new user
 *        password:
 *          type: string
 *          description: The password for the new user
 *        firstName:
 *          type: string
 *          description: The first name of user
 *        lastName:
 *          type:  string
 *          description: The last name of user
 *        dni:
 *          type: string
 *          description: The dni for the new user
 *        dniType:
 *          type: string
 *          description: The type of dni for the new user
 *          enum: ['V', 'E', 'J', 'G', 'P', 'N/A']
 *        userRole:
 *          type: string
 *          enum: ['client', 'admin', 'superadmin']
 *        permissions:
 *          type: array
 *          items:
 *            $ref: '#/components/schemas/PermissionInput'
 *
 *    PermissionInput:
 *      type: object
 *      properties:
 *        name:
 *          type: string
 *        key:
 *          type: string
 *        options:
 *          type: array
 *          items:
 *            type: string
 *            enum: ['create', read', 'update', 'delete']
 */
/**
 * @openapi
 * /api/v1/auth/change-password:
 *   post:
 *     description: Change the password for an user.
 *     tags:
 *      - auth
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#/components/schemas/ChangePassword'
 *     responses:
 *       200:
 *         description: Change the password for an user.
 *         content:
 *          application/json:
 *            schema:
 *              type: object
 *              $ref: '#/components/schemas/SuccessfulResponse'
 *       500:
 *         description: Internal Server Error.
 *         content:
 *          application/json:
 *            schema:
 *              type: object
 *              $ref: '#/components/schemas/UnsuccessfulResponse'
 */
router.post('/v1/auth/change-password', auth_controller_1.changePasswordController);
/**
 * @openapi
 * /api/v1/auth/reset-password:
 *   post:
 *     description: Send a reset the password email for an user.
 *     tags:
 *      - auth
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#/components/schemas/ResetPassword'
 *     responses:
 *       200:
 *         description: Send a reset the password email for an user.
 *         content:
 *          application/json:
 *            schema:
 *              type: object
 *              $ref: '#/components/schemas/SuccessfulResponse'
 *       500:
 *         description: Internal Server Error.
 *         content:
 *          application/json:
 *            schema:
 *              type: object
 *              $ref: '#/components/schemas/UnsuccessfulResponse'
 */
router.post('/v1/auth/reset-password', auth_controller_1.resetPasswordController);
/**
 * @openapi
 * /api/v1/auth/sign-out:
 *   post:
 *     description: Delete the cookie of the current user.
 *     tags:
 *      - auth
 *     responses:
 *       200:
 *         description: Delete the cookie of the current user.
 *         content:
 *          application/json:
 *            schema:
 *              type: object
 *              $ref: '#/components/schemas/SuccessfulResponse'
 *       500:
 *         description: Internal Server Error.
 *         content:
 *          application/json:
 *            schema:
 *              type: object
 *              $ref: '#/components/schemas/UnsuccessfulResponse'
 */
router.post('/v1/auth/sign-out', auth_controller_1.signOutController);
/**
 * @openapi
 * /api/v1/auth/sign-in:
 *   post:
 *     description: Sign in an user.
 *     tags:
 *      - auth
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#/components/schemas/SignIn'
 *     responses:
 *       200:
 *         description: Sign in na user.
 *         content:
 *          application/json:
 *            schema:
 *              type: object
 *              $ref: '#/components/schemas/SuccessfulResponse'
 *       500:
 *         description: Internal Server Error.
 *         content:
 *          application/json:
 *            schema:
 *              type: object
 *              $ref: '#/components/schemas/UnsuccessfulResponse'
 */
router.post('/v1/auth/sign-in', auth_controller_1.signInController);
router.get('/v1/auth/current-user', auth_controller_1.currentUserRest);
/**
 * @openapi
 * /api/v1/auth/sign-up:
 *   post:
 *     description: Register a new user.
 *     tags:
 *      - auth
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#/components/schemas/RegisterUser'
 *     responses:
 *       200:
 *         description: Send a reset the password email for an user.
 *         content:
 *          application/json:
 *            schema:
 *              type: object
 *              $ref: '#/components/schemas/SuccessfulResponse'
 *       500:
 *         description: Internal Server Error.
 *         content:
 *          application/json:
 *            schema:
 *              type: object
 *              $ref: '#/components/schemas/UnsuccessfulResponse'
 */
/**
 * @openapi
 * /api/v1/auth/create-user:
 *   post:
 *     description: Creates a new user.
 *     tags:
 *      - auth
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#/components/schemas/CreateUser'
 *     responses:
 *       200:
 *         description: Create a new user.
 *         content:
 *          application/json:
 *            schema:
 *              type: object
 *              $ref: '#/components/schemas/SuccessfulResponse'
 *       500:
 *         description: Internal Server Error.
 *         content:
 *          application/json:
 *            schema:
 *              type: object
 *              $ref: '#/components/schemas/UnsuccessfulResponse'
 */
exports.default = router;
//# sourceMappingURL=auth.routes.js.map