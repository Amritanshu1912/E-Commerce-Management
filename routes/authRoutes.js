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

// Route: Create a new user account
router.post(
	"/register",
	validateRegisterUser,
	handleValidationErrors,
	registerUser
);

// Route: Authenticate a user and generate a JWT token
router.post(
	"/login",
	validateLoginUser,
	handleValidationErrors,
	(req, res, next) => {
		// Check if isFirstTimeLogin is true
		if (req.body.isFirstTimeLogin) {
			// Skip authentication middleware and proceed to loginUser handler
			next();
		} else {
			// Use authenticate middleware
			authenticate(req, res);
		}
	},
	(req, res, next) => {
		// Check if isFirstTimeLogin is true
		if (req.body.isFirstTimeLogin) {
			// Use loginUser middleware
			loginUser(req, res);
		} else {
			// Skip authentication middleware and proceed to loginUser handler
			next();
		}
	}
);

// Route: Log out the current user
router.post("/logout", logoutUser);

module.exports = router;
