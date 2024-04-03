const express = require("express")
const router = express.Router()
const userCtrl = require("../controllers/user.controller");
const swagger = require("../swagger");

/**
 * @swagger
 * /api/users/v1/register:
 *   post:
 *     summary: Register a new user
 *     description: Register a new user with provided details.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 format: password
 *             required:
 *               - name
 *               - email
 *               - password
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Bad request. Missing required fields or invalid data.
 *       500:
 *         description: Internal server error
 */

router.post("/register", userCtrl.register)

/**
 * @swagger
 * /api/users/v1/login:
 *   post:
 *     summary: Login
 *     description: Log in with provided email and password.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 format: password
 *             required:
 *               - email
 *               - password
 *     responses:
 *       200:
 *         description: User logged in successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: JWT token for authentication
 *       401:
 *         description: Unauthorized. Invalid email or password.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message indicating invalid credentials
 *       500:
 *         description: Internal server error
 */

router.post("/login", userCtrl.login)

/**
 * @swagger
 * /api/users/v1/logout:
 *   post:
 *     summary: Logout
 *     description: Log out the user by clearing the JWT cookie.
 *     responses:
 *       200:
 *         description: User logged out successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Success message indicating successful logout
 *       400:
 *         description: Bad request. Something went wrong during the logout process.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message indicating failure during logout
 *       500:
 *         description: Internal server error
 */

router.post("/logout", userCtrl.logout)

module.exports = router