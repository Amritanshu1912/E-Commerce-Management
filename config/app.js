const express = require("express");
const helmet = require("helmet");
const routes = require("../routes/index.js");
const errorHandler = require("../middlewares/errorHandler.js");

const app = express();

// Middleware
app.use(express.json());
app.use(helmet());

// Routes
app.use("/", routes);

// Error handling middleware
app.use(errorHandler);

module.exports = app;
