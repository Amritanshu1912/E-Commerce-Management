/*
This file will contain the middleware functions that will be used 
to protect the routes that require authentication and authorization. 
It should handle the following functions:

authenticate: This function should check if the incoming request 
has a valid JWT token and add the authenticated user's details 
to the request object for further processing.

authorize: This function should be used to check if the authenticated 
user has the necessary permissions to access a particular route.
*/
require("dotenv").config();
const jwt = require("jsonwebtoken");
const logger = require("../utils/logger");

const authenticate = (req, res, next) => {
	const authHeader = req.headers["authorization"];
	const token = authHeader && authHeader.split(" ")[1];

	if (!token) {
		return res
			.status(401)
			.json({ message: "Unauthorized: No token provided" });
	}

	jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
		if (error) {
			logger.error(error);
			if (error instanceof jwt.TokenExpiredError) {
				return res
					.status(401)
					.json({ message: "Unauthorized: Token expired" });
			} else if (error instanceof jwt.JsonWebTokenError) {
				return res
					.status(401)
					.json({ message: "Unauthorized: Invalid token" });
			} else {
				return res
					.status(401)
					.json({ message: "Unauthorized: Token error" });
			}
		} else {
			req.user = decoded.user;
			next();
		}
	});
};

// Authorize Middleware
const authorize = (roles) => {
	return (req, res, next) => {
		try {
			if (req.user && req.user.role && !roles.includes(req.user.role)) {
				return res
					.status(403)
					.json({ message: "Forbidden: Access denied" });
			}
			next();
		} catch (error) {
			return res.status(500).json({ message: "Internal Server Error" });
		}
	};
};

module.exports = { authenticate, authorize };
