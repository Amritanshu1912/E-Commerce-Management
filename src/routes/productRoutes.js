const express = require("express");
const router = express.Router();
const {
	getAllProducts,
	getProductById,
	createProduct,
	updateProduct,
	deleteProduct,
} = require("../controllers/productController");
const {
	validateProductId,
	validateCreateProduct,
	validateUpdateProduct,
	handleValidationErrors,
} = require("../validators/productValidator.js");
const { authenticate, authorize } = require("../middlewares/authMiddleware.js");

const allowedRoles = ["admin", "support"];
const adminRole = ["admin"];

// Route: Get a list of all products
router.get("/products", getAllProducts);

// Route: Get details of a specific product
router.get(
	"/products/:id",
	validateProductId,
	handleValidationErrors,
	getProductById
);

// Route: Create a new product
router.post(
	"/products",
	validateCreateProduct,
	handleValidationErrors,
	authenticate,
	authorize(allowedRoles),
	createProduct
);

// Route: Update product details
router.put(
	"/products/:id",
	validateUpdateProduct,
	handleValidationErrors,
	authenticate,
	authorize(allowedRoles),
	updateProduct
);

// Route: Delete a product
router.delete(
	"/products/:id",
	validateProductId,
	handleValidationErrors,
	authenticate,
	authorize(adminRole),
	deleteProduct
);

module.exports = router;
