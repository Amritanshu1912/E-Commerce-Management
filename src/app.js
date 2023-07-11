const express = require("express");
const helmet = require("helmet");
const routes = require("./routes/index.js");
const errorHandler = require("./middlewares/errorHandler.js");
require("dotenv").config();

const app = express();

// Middleware
app.use(express.json());
app.use(helmet());

// Routes
app.use("/", routes);

// Error handling middleware
app.use(errorHandler);

// Start the server
const port = process.env.APP_PORT || 3000; // Set the port
const server = app.listen(port, async () => {
	console.log(`Server is running on port ${port}`);
});

module.exports = {
	app,
	server,
};
