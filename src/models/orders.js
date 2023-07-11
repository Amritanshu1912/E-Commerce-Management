const { DataTypes } = require("sequelize");
const sequelize = require("../../config/database");
const users = require("./users"); // Assuming you have a Customer model defined
const products = require("./products"); // Assuming you have a Product model defined

// Define the Contact model
const orders = sequelize.define(
	"orders",
	{
		order_id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			allowNull: false,
			primaryKey: true,
		},
		customer_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		product_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		quantity: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		total_amount: {
			type: DataTypes.DECIMAL(10, 2),
			allowNull: false,
		},
		order_date: {
			type: DataTypes.DATE,
			allowNull: false,
		},
	},
	{
		modelName: "order",
		tableName: "orders", // Specify the table name
		timestamps: false,
		paranoid: true, // Enable soft deletes (deletedAt column)
	}
);

orders.belongsTo(users, { foreignKey: "customer_id" });
orders.belongsTo(products, { foreignKey: "product_id" });

module.exports = orders;
