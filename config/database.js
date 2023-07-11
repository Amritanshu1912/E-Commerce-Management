const { Sequelize } = require("sequelize");
const logger = require("../src/utils/logger");
require("dotenv").config();

// Create a Sequelize instance and connect to the database
const sequelize = new Sequelize(
	process.env.DB_NAME,
	process.env.DB_USER,
	process.env.DB_PASSWORD,
	{
		host: process.env.DB_HOST,
		dialect: "postgres",
	}
);

// Test the database connection
sequelize
	.authenticate()
	.then(() => {
		console.log("Database connection has been established successfully.");
	})
	.catch((error) => {
		logger.error("Unable to connect to the database:", error);
	});

module.exports = sequelize;
