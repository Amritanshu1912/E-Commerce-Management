const express = require("express");
const router = express.Router();
const {
	getAllOrders,
	getOrderById,
	createOrder,
	updateOrder,
	deleteOrder,
} = require("../controllers/orderController");
const {
	validateOrderId,
	validateCreateOrder,
	validateUpdateOrder,
	handleValidationErrors,
} = require("../validators/orderValidators.js");
const { authenticate, authorize } = require("../middlewares/authMiddleware.js");

const allowedRoles = ["admin", "support"];
const adminRole = ["admin"];

// Route: Get a list of all orders
router.get("/orders", authenticate, authorize(allowedRoles), getAllOrders);

// Route: Get details of a specific order
router.get(
	"/orders/:id",
	validateOrderId,
	handleValidationErrors,
	getOrderById
);
// Route: Create a new order
router.post(
	"/orders",
	validateCreateOrder,
	handleValidationErrors,
	createOrder
);

// Route: Update order details
router.put(
	"/orders/:id",
	validateUpdateOrder,
	handleValidationErrors,
	updateOrder
);

// Route: Delete an order
router.delete(
	"/orders/:id",
	validateOrderId,
	handleValidationErrors,
	authenticate,
	authorize(adminRole),
	deleteOrder
);

module.exports = router;
