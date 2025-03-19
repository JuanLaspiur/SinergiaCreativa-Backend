import express from 'express';
import { UserController } from '../controllers/userController';
import validateUserRoutes from '../middlewares/validateUser';
import authMiddleware from '../middlewares/authMiddleware';

const router = express.Router();

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Create a new user
 *     description: Registers a new user in the system.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "John Doe"
 *               email:
 *                 type: string
 *                 example: "john@example.com"
 *               password:
 *                 type: string
 *                 example: "SecurePassword123"
 *     responses:
 *       201:
 *         description: User successfully created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: "userId"
 *                 name:
 *                   type: string
 *                   example: "John Doe"
 *       400:
 *         description: Bad request, validation failed
 *       500:
 *         description: Internal server error
 */
router.post(`/login`, validateUserRoutes('login'), UserController.login);

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users need Bearer Token
 *     description: Fetches all users in the system.
 *     responses:
 *       200:
 *         description: A list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   name:
 *                     type: string
 *                   email:
 *                     type: string
 *       500:
 *         description: Internal server error
 */
router.get(`/`, authMiddleware, UserController.getAllUsers);

/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: User login
 *     description: Authenticates a user and returns a token.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "john@example.com"
 *               password:
 *                 type: string
 *                 example: "SecurePassword123"
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Login exitoso"
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "userId"
 *                     name:
 *                       type: string
 *                       example: "John Doe"
 *                 token:
 *                   type: string
 *                   example: "JWTTokenExample"
 *       401:
 *         description: Unauthorized, invalid credentials
 *       500:
 *         description: Internal server error
 */
router.post(`/`, validateUserRoutes('register'), UserController.createUser);

/**
 * @swagger
 * /users/expected-monthly-income:
 *   put:
 *     summary: Update the expected monthly income of a user
 *     description: Updates the expected monthly income for a specific user.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 example: "60c72b2f9d1b2c001f1d1a63"
 *               expectedMonthlyIncome:
 *                 type: number
 *                 example: 5000
 *     responses:
 *       200:
 *         description: Monthly income expectation updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Expectativa mensual actualizada"
 *                 updatedUser:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "userId"
 *                     expectedMonthlyIncome:
 *                       type: number
 *                       example: 5000
 *       400:
 *         description: Bad request, invalid userId or expectedMonthlyIncome
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
router.put(`/expected-monthly-income`, UserController.updateExpectedMonthlyIncome);


/**
 * @swagger
 * /users/{userId}/change-password:
 *   put:
 *     summary: Change user password
 *     description: Allows a user to change their password.
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *           example: "60c72b2f9d1b2c001f1d1a63"
 *         description: The user's ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               currentPassword:
 *                 type: string
 *                 example: "OldPassword123"
 *               newPassword:
 *                 type: string
 *                 example: "NewSecurePassword123"
 *     responses:
 *       200:
 *         description: Password updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Contraseña actualizada correctamente"
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "userId"
 *       400:
 *         description: Invalid current password or new password
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
router.put(`/:userId/change-password`, UserController.changePassword);

/**
 * @swagger
 * /users/{userId}:
 *   delete:
 *     summary: Delete a user
 *     description: Deletes a user from the system.
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *           example: "60c72b2f9d1b2c001f1d1a63"
 *         description: The user's ID
 *     responses:
 *       200:
 *         description: User deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Usuario eliminado exitosamente"
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
router.delete(`/:userId`, UserController.deleteUser);

export default router;
