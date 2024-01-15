/* eslint-disable indent */
require("dotenv").config();
const jwt = require("jsonwebtoken");
const logger = require("../utils/logger");

/**
 * Middleware to authenticate users based on JWT tokens.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {function} next - Express next middleware function.
 * @returns {Promise<void>} - Resolves if authentication is successful, otherwise sends a 401 Unauthorized response.
 */
const authenticate = async (req, res, next) => {
  try {
    // Extract JWT token from the Authorization header
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    // If no token is provided, send a 401 Unauthorized response
    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized: No token provided" });
    }

    // Verify the token using the JWT_SECRET
    const decoded = await new Promise((resolve, reject) => {
      jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
        if (error) {
          logger.error(error);

          // Handle different JWT errors and reject accordingly
          if (error instanceof jwt.TokenExpiredError) {
            reject("Token expired");
          } else if (error instanceof jwt.JsonWebTokenError) {
            reject("Invalid token");
          } else {
            reject("Token error");
          }
        } else {
          resolve(decoded);
        }
      });
    });

    // Attach the decoded user information to the request object for further processing
    req.user = decoded.user;
    next();
  } catch (error) {
    // Send a 401 Unauthorized response with an error message
    return res
      .status(401)
      .json({ message: `Unauthorized: ${error.message || error}` });
  }
};

/**
 * Middleware to authorize users based on their roles.
 * @param {string[]} roles - An array of roles that are allowed to access the route.
 * @returns {function} - Express middleware function.
 */
const authorize = (roles) => {
  return (req, res, next) => {
    try {
      // Check if the user has the necessary role to access the route
      if (req.user && req.user.role && !roles.includes(req.user.role)) {
        return res.status(403).json({ message: "Forbidden: Access denied" });
      }

      // If authorized, proceed to the next middleware or route handler
      next();
    } catch (error) {
      // Send a 500 Internal Server Error response in case of an unexpected error
      return res.status(500).json({ message: "Internal Server Error" });
    }
  };
};

module.exports = { authenticate, authorize };
