const products = require("../models/products");
const logger = require("../utils/logger");

// Get all products
const getAllProducts = async (req, res) => {
	try {
		const products = await products.findAll();
		res.status(200).json(products);
	} catch (error) {
		logger.error(error);
		res.status(500).json({ error: "Failed to fetch products" });
	}
};

// Get product by ID
const getProductById = async (req, res) => {
	const { id } = req.params;
	try {
		const product = await products.findByPk(id);
		if (product) {
			res.status(200).json(product);
		} else {
			res.status(404).json({ error: "products not found" });
		}
	} catch (error) {
		logger.error(error);
		res.status(500).json({ error: "Failed to fetch product" });
	}
};

// Create a new product
const createProduct = async (req, res) => {
	const { name, description, price } = req.body;
	if (!name || !description || !price) {
		return res.status(400).json({ error: "Missing required fields" });
	}
	try {
		const newProduct = await products.create({
			name,
			description,
			price,
		});
		res.status(201).json(newProduct);
	} catch (error) {
		logger.error(error);
		res.status(500).json({ error: "Failed to create product" });
	}
};

// Update product details
const updateProduct = async (req, res) => {
	const { id } = req.params;
	const { name, description, price } = req.body;
	try {
		const [numAffectedRows] = await products.update(
			{ name, description, price },
			{ where: { id } }
		);

		if (numAffectedRows === 0) {
			return res.status(404).json({ error: "Product not found" });
		}

		const updatedProduct = await products.findByPk(id);
		res.status(200).json(updatedProduct);
	} catch (error) {
		logger.error(error);
		res.status(500).json({ error: "Failed to update product" });
	}
};

// Delete a product
const deleteProduct = async (req, res) => {
	const { id } = req.params;
	try {
		const numAffectedRows = await products.destroy({
			where: { id },
		});

		if (numAffectedRows === 0) {
			return res.status(404).json({ error: "Product not found" });
		}

		res.status(200).json({ message: "Product deleted successfully" });
	} catch (error) {
		logger.error(error);
		res.status(500).json({ error: "Failed to delete product" });
	}
};

module.exports = {
	getAllProducts,
	getProductById,
	createProduct,
	updateProduct,
	deleteProduct,
};
