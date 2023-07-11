/*/*Remember to update the response schemas ($ref) to match your API response structure, 
and also make sure to define the referenced schemas (UserListResponse, UserResponse, 
UserRequest, and ErrorResponse) in your Swagger specification.*/
const express = require("express");
const router = express.Router();
const { authenticate } = require("../middlewares/authMiddleware.js");
const {
	validateRegisterUser,
	validateLoginUser,
	handleValidationErrors,
} = require("../validators/userInputValidator.js");
const {
	registerUser,
	loginUser,
	logoutUser,
} = require("../controllers/authController.js");

/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: API endpoints for authentication
 */

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RegisterRequest'
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Invalid request or username/email already exists
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
// Route: Create a new user account
router.post(
	"/register",
	validateRegisterUser,
	handleValidationErrors,
	registerUser
);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: User login
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginRequest'
 *     responses:
 *       200:
 *         description: Successful login
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LoginResponse'
 *       401:
 *         description: Invalid username or password
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
// Route: Authenticate a user and generate a JWT token
router.post(
	"/login",
	validateLoginUser,
	handleValidationErrors,
	(req, res, next) => {
		// Check if isFirstTimeLogin is true
		if (req.body.isFirstTimeLogin) {
			// Use loginUser middleware
			loginUser(req, res, next);
		} else {
			// Use authenticate middleware
			authenticate(req, res, next);
		}
	}
);

/**
 * @swagger
 * /auth/logout:
 *   post:
 *     summary: Log out the current user
 *     tags: [Authentication]
 *     responses:
 *       200:
 *         description: User logged out successfully
 *       401:
 *         description: Unauthorized access
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
// Route: Log out the current user
router.post("/logout", logoutUser);

module.exports = router;
