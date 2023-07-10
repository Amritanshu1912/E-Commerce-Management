// This file should contain a utility function to generate the JWT token.
// You can use the jsonwebtoken library for this purpose.
require("dotenv").config();
const logger = require("./logger.js");
const jwt = require("jsonwebtoken");

function generateToken(user) {
	try {
		const { id, email, role } = user;
		const payload = {
			id,
			email,
			role,
		};

		const expiresIn = process.env.TOKEN_EXPIRATION || "1h";
		const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn });

		return token;
	} catch (error) {
		logger.error("Error generating token:", error);
		throw new Error("Token generation failed");
	}
}

module.exports = generateToken;
