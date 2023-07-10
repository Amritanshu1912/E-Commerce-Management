const { body, param, validationResult } = require("express-validator");

// Validation for getOrderById endpoint
const validateProductId = [
	param("id").notEmpty().withMessage("Product ID is required"),
];

// Validation for createProduct endpoint
const validateCreateProduct = [
	body("name")
		.trim()
		.notEmpty()
		.isString()
		.withMessage("Product name is required"),
	body("description")
		.trim()
		.notEmpty()
		.withMessage("Product description is required"),
	body("price")
		.notEmpty()
		.isDecimal({ decimal_digits: "0,2" })
		.withMessage("Invalid product price"),
	// Add more validation rules as needed
];

// Validation for updateProduct endpoint
const validateUpdateProduct = [
	param("id").isNumeric().withMessage("Invalid product ID"),
	body("name").trim().notEmpty().withMessage("Product name is required"),
	body("description")
		.trim()
		.notEmpty()
		.withMessage("Product description is required"),
	body("price")
		.notEmpty()
		.isDecimal({ decimal_digits: "0,2" })
		.withMessage("Invalid product price"),
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
	validateProductId,
	validateCreateProduct,
	validateUpdateProduct,
	handleValidationErrors,
};
