require("dotenv").config();
const express = require("express");
const helmet = require("helmet");
const routes = require("./routes/index.js");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./config/swagger");
const errorHandler = require("./middlewares/errorHandler.js");

const app = express();

// Middleware
app.use(express.json());
app.use(helmet());

// Error handling middleware
app.use(errorHandler);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
app.use("/", routes);

// Start the server
const port = process.env.APP_PORT || 3000; // Set the port
const server = app.listen(port, async () => {
	console.log(`Server is running on port ${port}`);
});

module.exports = {
	app,
	server,
};
