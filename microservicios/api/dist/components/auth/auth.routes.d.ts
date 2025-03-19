declare const router: import("express-serve-static-core").Router;
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
export default router;
//# sourceMappingURL=auth.routes.d.ts.map