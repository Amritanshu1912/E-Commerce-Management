const express = require("express");
const router = express.Router();
const {
	getAllUsers,
	getUserById,
	createUser,
	updateUser,
	deleteUser,
} = require("../controllers/userController");
const {
	validateUserId,
	validateCreateUser,
	validateUpdateUser,
	handleValidationErrors,
} = require("../validators/userValidator.js");
const { authenticate, authorize } = require("../middlewares/authMiddleware.js");

const allowedRoles = ["admin", "support"];
const adminRole = ["admin"];

// GET /users
router.get("/users", authenticate, authorize(allowedRoles), getAllUsers);

// GET /users/:id
router.get(
	"/users/:id",
	validateUserId,
	handleValidationErrors,
	authenticate,
	authorize(allowedRoles),
	getUserById
);

// POST /users
router.post(
	"/users",
	validateCreateUser,
	handleValidationErrors,
	authenticate,
	authorize(allowedRoles),
	createUser
);

// PUT /users/:id
router.put(
	"/users/:id",
	validateUpdateUser,
	handleValidationErrors,
	authenticate,
	authorize(allowedRoles),
	updateUser
);

// DELETE /users/:id
router.delete(
	"/users/:id",
	validateUserId,
	handleValidationErrors,
	authenticate,
	authorize(adminRole),
	deleteUser
);

module.exports = router;
