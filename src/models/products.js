const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const products = sequelize.define(
	"products",
	{
		product_id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		name: {
			type: DataTypes.STRING(100),
			allowNull: false,
		},
		description: {
			type: DataTypes.STRING(255),
			allowNull: false,
		},
		price: {
			type: DataTypes.DECIMAL(10, 2),
			allowNull: false,
		},
		total_units: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
	},
	{
		modelName: "product",
		tableName: "products", // Specify the table name
		timestamps: false,
		paranoid: true, // Enable soft deletes (deletedAt column)
	}
);

module.exports = products;
