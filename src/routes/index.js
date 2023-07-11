const express = require("express");
const authRoutes = require("./authRoutes");
const orderRoutes = require("./orderRoutes");
const productRoutes = require("./productRoutes");
const userRoutes = require("./userRoutes");

const router = express.Router();

// Register the route handlers from different files
router.use("/auth", authRoutes);
router.use("/order", orderRoutes);
router.use("/product", productRoutes);
router.use("/user", userRoutes);

module.exports = router;
