const { DataTypes } = require("sequelize");
const sequelize = require("../../config/database"); // Assuming you have a separate file for configuring the database connection

const users = sequelize.define(
	"users",
	{
		user_id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		username: {
			type: DataTypes.STRING(50),
			allowNull: false,
			unique: true,
		},
		email: {
			type: DataTypes.STRING(100),
			allowNull: false,
		},
		phone_number: {
			type: DataTypes.STRING(20),
			allowNull: false,
		},
		password: {
			type: DataTypes.STRING(255),
			allowNull: false,
		},
		address: {
			type: DataTypes.STRING(255),
			allowNull: false,
		},
		role: {
			type: DataTypes.ENUM("admin", "support", "customer"),
			allowNull: false,
		},
	},
	{
		modelName: "user",
		tableName: "users",
		timestamps: false, // If you don't have timestamp columns in your table
		paranoid: true,
	}
);

module.exports = users;
