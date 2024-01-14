const swaggerJSDoc = require("swagger-jsdoc");

const options = {
	definition: {
		openapi: "3.0.3",
		info: {
			title: "E-Commerce API Documentation",
			description: "API docmentation for E-Commerce management web app",
			contact: {
				name: "E-Commerce API",
				url: "https://github.com/E-Commerce-API/E-Commerce-API",
				email: "amritanshusingh3@gmail.com",
			},
			servers: [
				{
					url: "https://localhost:3000/",
					description: "Local server",
				},
			],
			components: {
				securitySchemes: {
					bearerAuth: {
						type: "http",
						scheme: "bearer",
						bearerFormat: "JWT",
					},
				},
			},
			version: "1.0.0",
		},
	},
	apis: ["./src/routes/*.js"], // Update the path to include your route files
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
