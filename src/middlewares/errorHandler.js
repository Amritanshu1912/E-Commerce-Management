/* errorMiddleware.js
 Implement middleware functions to catch and handle errors 
 during the request-response cycle. This middleware can format 
 and respond with appropriate error messages to provide  
 meaningful feedback to clients. 
*/
const logger = require("../utils/logger.js");

const errorHandler = (err, req, res, next) => {
	// Log the error and request details
	logger.error(err);
	logger.error(req);

	// Define the HTTP status code for the error
	const statusCode = err.statusCode || 500;

	// Define the error response object
	const errorResponse = {
		message: err.message || "Internal Server Error",
		statusCode: statusCode,
	};

	// Send the error response
	res.status(statusCode).json(errorResponse);
	next(err);
};
module.exports = errorHandler;
