const { body, param, validationResult } = require("express-validator");

// Validation for getOrderById endpoint
const validateUserId = [
	param("id").notEmpty().withMessage("User ID is required"),
];
// Validation for createUser endpoint
const validateCreateUser = [
	body("username").trim().notEmpty().withMessage("Username is required"),
	body("email").trim().isEmail().withMessage("Invalid email"),
	body("phone_number")
		.trim()
		.notEmpty()
		.withMessage("Phone number is required")
		.isMobilePhone()
		.withMessage("Invalid phone number"),
	body("password").trim().notEmpty().withMessage("Password is required"),
	body("address").trim().notEmpty().withMessage("Address is required"),
	body("role")
		.notEmpty()
		.isIn(["admin", "support", "customer"])
		.withMessage("Invalid role"),
	// Add more validation rules as needed
];

// Validation for updateUser endpoint
const validateUpdateUser = [
	param("id").isNumeric().withMessage("Invalid user ID"),
	body("username").trim().notEmpty().withMessage("Username is required"),
	body("email").trim().isEmail().withMessage("Invalid email"),
	body("phone_number")
		.trim()
		.notEmpty()
		.withMessage("Phone number is required")
		.isMobilePhone()
		.withMessage("Invalid phone number"),
	body("password").trim().notEmpty().withMessage("Password is required"),
	body("address").trim().notEmpty().withMessage("Address is required"),
	body("role")
		.notEmpty()
		.isIn(["admin", "support", "customer"])
		.withMessage("Invalid role"),
	// Add more validation rules as needed
];

// Validation error handler middleware
const handleValidationErrors = (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}
	next();
};

module.exports = {
	validateUserId,
	validateCreateUser,
	validateUpdateUser,
	handleValidationErrors,
};
