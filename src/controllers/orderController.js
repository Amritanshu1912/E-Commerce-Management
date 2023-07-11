const orders = require("../models/orders.js");
const logger = require("../utils/logger.js");

// Get a list of all orders
const getAllOrders = async (req, res) => {
	try {
		const orders = await orders.findAll();
		if (orders.length === 0) {
			res.status(404).json({ message: "No orders found" });
		} else {
			res.status(200).json(orders);
		}
	} catch (error) {
		logger.error(error);
		res.status(500).json({ message: error.message });
	}
};

// Get details of a specific order
const getOrderById = async (req, res) => {
	const { id } = req.params;
	try {
		const order = await orders.findByPk(id);
		if (!order) {
			return res.status(404).json({ message: "Order not found" });
		}
		res.json(order);
	} catch (error) {
		logger.error(error);
		res.status(500).json({ message: error.message });
	}
};

// Create a new order
const createOrder = async (req, res) => {
	const { customer_id, product_id, quantity, total_amount, order_date } =
		req.body;
	try {
		const order = await orders.create({
			customer_id,
			product_id,
			quantity,
			total_amount,
			order_date,
		});
		res.status(201).json(order);
	} catch (error) {
		logger.error(error);
		res.status(400).json({ message: error.message });
	}
};

// Update order details
const updateOrder = async (req, res) => {
	const { id } = req.params;
	const { customer_id, product_id, quantity, total_amount, order_date } =
		req.body;
	try {
		const [numAffectedRows] = await orders.update(
			{
				customer_id,
				product_id,
				quantity,
				total_amount,
				order_date,
			},
			{
				where: { id },
			}
		);

		if (numAffectedRows === 0) {
			return res.status(404).json({ message: "Order not found" });
		}

		res.status(200).json(
			id,
			customer_id,
			product_id,
			quantity,
			total_amount,
			order_date
		);
	} catch (error) {
		logger.error(error);
		res.status(400).json({ message: error.message });
	}
};

// Delete an order
const deleteOrder = async (req, res) => {
	const { id } = req.params;
	try {
		const numAffectedRows = await orders.destroy({
			where: { id },
		});
		if (numAffectedRows === 0) {
			return res.status(404).json({ message: "Order not found" });
		}
		res.status(200).json({ message: "orders deleted successfully" });
	} catch (error) {
		logger.error(error);
		res.status(400).json({ message: error.message });
	}
};

module.exports = {
	getAllOrders,
	getOrderById,
	createOrder,
	updateOrder,
	deleteOrder,
};
