const users = require("../models/users");
const { Op } = require("sequelize");
const logger = require("../utils/logger");
const bcrypt = require("bcrypt");

const getAllUsers = async (req, res) => {
	try {
		const users_ = await users.findAll();
		if (users_.length === 0) {
			res.status(404).json({ message: "No users found" });
		} else {
			res.status(200).json(users_);
		}
	} catch (error) {
		logger.error(error);
		res.status(500).json({ error: "Failed to fetch users" });
	}
};

const getUserById = async (req, res) => {
	const userId = req.params.id;

	try {
		const user = await users.findByPk(userId);

		if (user) {
			res.status(200).json(user);
		} else {
			res.status(404).json({ error: "User not found" });
		}
	} catch (error) {
		logger.error(error);
		res.status(500).json({ error: "Failed to fetch user" });
	}
};

const createUser = async (req, res) => {
	const { username, email, phone_number, password, address, role } = req.body;
	const existingUser = await users.findOne({
		[Op.or]: [{ username }, { email }],
	});
	if (existingUser) {
		return res
			.status(400)
			.json({ error: "Username or email already exists" });
	}
	try {
		const newUser = await users.create({
			username,
			email,
			phone_number,
			password,
			address,
			role,
		});
		res.status(201).json(newUser);
	} catch (error) {
		logger.error(error);
		res.status(500).json({ error: "Failed to create user" });
	}
};

const updateUser = async (req, res) => {
	const userId = req.params.id;
	const { username, email, phone_number, password, address, role } = req.body;

	try {
		const existingUser = await users.findOne({
			where: { [Op.or]: [{ username }, { email }] },
		});
		if (existingUser && existingUser.user_id !== userId) {
			res.status(400).json({ error: "Username or email already taken" });
		} else {
			const hashedPassword = await bcrypt.hash(password, 10);
			const updatedUser = await users.update(
				{
					username,
					email,
					phone_number,
					hashedPassword,
					address,
					role,
				},
				{ where: { user_id: userId }, returning: true }
			);

			if (updatedUser[0]) {
				res.status(200).json(updatedUser[1][0]);
			} else {
				res.status(404).json({ error: "User not found" });
			}
		}
	} catch (error) {
		logger.error(error);
		res.status(500).json({ error: "Failed to update user" });
	}
};

const deleteUser = async (req, res) => {
	const userId = req.params.id;

	try {
		const deletedUser = await users.destroy({ where: { user_id: userId } });

		if (deletedUser) {
			res.status(204).json({ message: "User deleted successfully" });
		} else {
			res.status(404).json({ error: "User not found" });
		}
	} catch (error) {
		logger.error(error);
		res.status(500).json({ error: "Failed to delete user" });
	}
};

module.exports = {
	getAllUsers,
	getUserById,
	createUser,
	updateUser,
	deleteUser,
};
