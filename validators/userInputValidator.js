const logger = require("../utils/logger.js");
const { body, validationResult } = require("express-validator");

// Validation for the registerUser endpoint
const validateRegisterUser = [
	body("username").trim().notEmpty().withMessage("Username is required"),
	body("email").trim().isEmail().withMessage("Invalid email address"),
	body("phone_number")
		.trim()
		.notEmpty()
		.withMessage("Phone number is required")
		.isMobilePhone()
		.withMessage("Invalid phone number"),
	body("password")
		.isLength({ min: 6 })
		.withMessage("Password must be at least 6 characters"),
	body("address").trim().notEmpty().withMessage("Address is required"),
	body("role")
		.isIn(["admin", "support", "customer"])
		.withMessage("Invalid role value"),
	// Add more validation rules as needed
];

// Validation for the loginUser endpoint
const validateLoginUser = [
	body("username").trim().notEmpty().withMessage("Username is required"),
	body("password").notEmpty().withMessage("Password is required"),
	body("isFirstTimeLogin")
		.isBoolean()
		.withMessage("isFirstTimeLogin is invalid boolean value"),
	// Add more validation rules as needed
];

// Validation error handler middleware
const handleValidationErrors = async (req, res, next) => {
	try {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			// Log the validation errors
			logger.error(errors.array());

			// Return a more descriptive status code
			return res.status(422).json({ errors: errors.array() });
		}
		next();
	} catch (error) {
		// Log any unexpected errors
		logger.error(error);
		next(error);
	}
};

module.exports = {
	validateRegisterUser,
	validateLoginUser,
	handleValidationErrors,
};
