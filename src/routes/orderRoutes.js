/*Remember to update the response schemas ($ref) to match your API response structure, 
and also make sure to define the referenced schemas (OrderListResponse, OrderResponse, 
	OrderRequest, and ErrorResponse) in your Swagger specification.*/
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
} = require("../validators/orderValidator.js");
const { authenticate, authorize } = require("../middlewares/authMiddleware.js");

const allowedRoles = ["admin", "support"];
const adminRole = ["admin"];

/**
 * @swagger
 * tags:
 *   name: Order
 *   description: API endpoints for order management
 */

/**
 * @swagger
 * /orders:
 *   get:
 *     summary: Get a list of all orders
 *     tags: [Order]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/OrderListResponse'
 *       404:
 *         description: No orders found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Failed to fetch orders
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
// Route: Get a list of all orders
router.get("/orders", authenticate, authorize(allowedRoles), getAllOrders);

/**
 * @swagger
 * /orders/{id}:
 *   get:
 *     summary: Get order details by ID
 *     tags: [Order]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: ID of the order
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/OrderResponse'
 *       404:
 *         description: Order not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Failed to fetch order
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
// Route: Get details of a specific order
router.get(
	"/orders/:id",
	validateOrderId,
	handleValidationErrors,
	getOrderById
);

/**
 * @swagger
 * /orders:
 *   post:
 *     summary: Create a new order
 *     tags: [Order]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/OrderRequest'
 *     responses:
 *       201:
 *         description: Order created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/OrderResponse'
 *       400:
 *         description: Missing required fields or invalid request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Failed to create order
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
// Route: Create a new order
router.post(
	"/orders",
	validateCreateOrder,
	handleValidationErrors,
	createOrder
);

/**
 * @swagger
 * /orders/{id}:
 *   put:
 *     summary: Update order details
 *     tags: [Order]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: ID of the order
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/OrderRequest'
 *     responses:
 *       200:
 *         description: Order updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/OrderResponse'
 *       400:
 *         description: Invalid request or order not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Failed to update order
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
// Route: Update order details
router.put(
	"/orders/:id",
	validateUpdateOrder,
	handleValidationErrors,
	updateOrder
);

/**
 * @swagger
 * /orders/{id}:
 *   delete:
 *     summary: Delete an order
 *     tags: [Order]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: ID of the order
 *     responses:
 *       200:
 *         description: Order deleted successfully
 *       404:
 *         description: Order not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Failed to delete order
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
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
