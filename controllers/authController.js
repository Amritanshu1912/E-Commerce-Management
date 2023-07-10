require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const users = require("../models/users");
const logger = require("../utils/logger");

// registerUser: This function should handle the logic for creating a new user in your database.
const registerUser = async (req, res) => {
	const {
		username: username_,
		password,
		email: email_,
		phone_number,
		address,
		role,
	} = req.body;

	try {
		// Check if the username already exists in the database
		const existingUser = await users.findOne({
			where: { username: username_ },
		});
		if (existingUser) {
			return res.status(400).json({ message: "Username already taken" });
		}
		const existingEmail = await users.findOne({
			where: { email: email_ },
		});
		if (existingEmail) {
			return res
				.status(400)
				.json({ message: "Email already registered" });
		}

		// Hash the password using bcrypt
		const saltRounds = 10; // or any other configurable value
		const hashedPassword = await bcrypt.hash(password, saltRounds);

		// Create a new user record in the database
		await users.create({
			username: username_,
			password: hashedPassword,
			email: email_,
			phone_number,
			address,
			role,
		});

		return res
			.status(201)
			.json({ message: "User registered successfully" });
	} catch (error) {
		logger.error(error);
		return res.status(500).json({ message: "Server error" });
	}
};

// loginUser: This function should handle the logic for authenticating a user and generating a JWT token.
const loginUser = async (req, res) => {
	const { username, password } = req.body;

	try {
		// Find the user with the given username in the database
		const user = await users.findOne({
			where: { username },
		});
		if (user === null) {
			return res
				.status(401)
				.json({ message: "Invalid username or password" });
		}

		// Compare the provided password with the stored hashed password
		const isPasswordValid = await bcrypt.compare(password, user.password);

		if (!isPasswordValid) {
			return res
				.status(401)
				.json({ message: "Invalid username or password" });
		}

		// Generate a JWT token
		const token = jwt.sign(
			{
				userId: user.user_id,
				role: user.role,
			},
			process.env.JWT_SECRET,
			{
				expiresIn: "1h",
			}
		);
		return res.status(200).json({ token });
	} catch (error) {
		logger.error(error);
		return res.status(500).json({ message: error.message });
	}
};

// logoutUser: This function should handle the logic for invalidating the user's JWT token.
const logoutUser = async (userId) => {
	if (!userId) {
		throw new Error("Invalid User ID");
	}

	try {
		// Delete the user's access token from your database or revoke it in any way you handle tokens

		// For example, you can have a "UserSession" model and delete the user's session by their id
		await users.deleteOne({ userId });

		// You can also invalidate the refreshToken so that the user is logged out across multiple devices
		// await User.updateOne({ _id: userId }, { refreshToken: null });

		return { status: "success", message: "User logged out successfully" };
	} catch (error) {
		return {
			status: "error",
			message: "Failed to logout user",
			error: error.message,
		};
	}
};

module.exports = {
	registerUser,
	loginUser,
	logoutUser,
};
