const { param, body, validationResult } = require("express-validator");

// Validation for getOrderById endpoint
const validateOrderId = [
	param("id").notEmpty().withMessage("Order ID is required"),
];

// Validate order creation
const validateCreateOrder = [
	body("customer_id")
		.notEmpty()
		.isInt()
		.withMessage("Customer ID is required"),
	body("product_id").notEmpty().isInt().withMessage("Product ID is required"),
	body("quantity")
		.notEmpty()
		.isInt({ min: 1 })
		.withMessage("Quantity must be a positive integer"),
	body("total_amount")
		.notEmpty()
		.isDecimal({ min: 0 })
		.withMessage("Total amount must be a non-negative decimal"),
	body("order_date").notEmpty().withMessage("Order date is required"),
];

// Validate order update
const validateUpdateOrder = [
	param("id").notEmpty().isInt().withMessage("Order ID is required"),
	body("customer_id")
		.notEmpty()
		.isInt()
		.withMessage("Customer ID is required"),
	body("product_id").notEmpty().isInt().withMessage("Product ID is required"),
	body("quantity")
		.notEmpty()
		.isInt({ min: 1 })
		.withMessage("Quantity must be a positive integer"),
	body("total_amount")
		.notEmpty()
		.isDecimal({ min: 0 })
		.withMessage("Total amount must be a non-negative decimal"),
	body("order_date").notEmpty().withMessage("Order date is required"),
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
	validateOrderId,
	validateCreateOrder,
	validateUpdateOrder,
	handleValidationErrors,
};
