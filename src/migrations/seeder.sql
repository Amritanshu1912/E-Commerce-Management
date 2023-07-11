CREATE TABLE orders (
	order_id SERIAL PRIMARY KEY,
	customer_id INTEGER NOT NULL REFERENCES users (user_id) ON DELETE CASCADE,
	product_id INTEGER NOT NULL REFERENCES products (product_id) ON DELETE CASCADE,
	quantity INTEGER NOT NULL CHECK (quantity >= 0),
	total_amount DECIMAL(10, 2) NOT NULL CHECK (total_amount >= 0),
	order_date DATE NOT NULL
);
CREATE TABLE products (
	product_id SERIAL PRIMARY KEY,
	name VARCHAR(100) NOT NULL,
	description VARCHAR(255) NOT NULL,
	price DECIMAL(10, 2) NOT NULL CHECK (price > 0)
);
CREATE TABLE users (
	user_id SERIAL PRIMARY KEY,
	username VARCHAR(50) NOT NULL UNIQUE,
	email VARCHAR(100) NOT NULL,
	phone_number VARCHAR(100) NOT NULL,
	password VARCHAR(100) NOT NULL,
	address VARCHAR(255) NOT NULL,
	role VARCHAR(20) NOT NULL
);
INSERT INTO users (
		username,
		email,
		phone_number,
		password,
		address,
		role
	)
VALUES (
		'user1',
		'user1@example.com',
		'1234567890',
		'password1',
		'Address 1',
		'customer'
	),
	(
		'user2',
		'user2@example.com',
		'2345678901',
		'password2',
		'Address 2',
		'customer'
	),
	(
		'user3',
		'user3@example.com',
		'3456789012',
		'password3',
		'Address 3',
		'customer'
	),
	(
		'admin1',
		'admin1@example.com',
		'4567890123',
		'password4',
		'Admin Address 1',
		'admin'
	),
	(
		'admin2',
		'admin2@example.com',
		'5678901234',
		'password5',
		'Admin Address 2',
		'admin'
	),
	(
		'admin3',
		'support1@example.com',
		'6789012345',
		'password6',
		'Support Address 1',
		'support'
	),
	(
		'user4',
		'user4@example.com',
		'7890123456',
		'password7',
		'Address 4',
		'customer'
	),
	(
		'user5',
		'user5@example.com',
		'8901234567',
		'password8',
		'Address 5',
		'customer'
	),
	(
		'user6',
		'user6@example.com',
		'9012345678',
		'password9',
		'Address 6',
		'customer'
	),
	(
		'admin4',
		'support2@example.com',
		'0123456789',
		'password10',
		'Support Address 2',
		'support'
	);
INSERT INTO products (name, description, price)
VALUES ('Product A', 'Description A', 99.99),
	('Product B', 'Description B', 49.99),
	('Product C', 'Description C', 24.99),
	('Product D', 'Description D', 129.99),
	('Product E', 'Description E', 79.99),
	('Product F', 'Description F', 39.99),
	('Product G', 'Description G', 19.99),
	('Product H', 'Description H', 149.99),
	('Product I', 'Description I', 69.99),
	('Product J', 'Description J', 34.99);
INSERT INTO orders (
		customer_id,
		product_id,
		quantity,
		total_amount,
		order_date
	)
VALUES (
		(
			SELECT user_id
			FROM users
			WHERE username = 'user1'
		),
		(
			SELECT product_id
			FROM products
			WHERE name = 'Product A'
		),
		2,
		199.98,
		'2023-07-08'
	),
	(
		(
			SELECT user_id
			FROM users
			WHERE username = 'user2'
		),
		(
			SELECT product_id
			FROM products
			WHERE name = 'Product B'
		),
		1,
		49.99,
		'2023-07-08'
	),
	(
		(
			SELECT user_id
			FROM users
			WHERE username = 'user3'
		),
		(
			SELECT product_id
			FROM products
			WHERE name = 'Product C'
		),
		3,
		74.97,
		'2023-07-08'
	),
	(
		(
			SELECT user_id
			FROM users
			WHERE username = 'user4'
		),
		(
			SELECT product_id
			FROM products
			WHERE name = 'Product D'
		),
		1,
		129.99,
		'2023-07-08'
	),
	(
		(
			SELECT user_id
			FROM users
			WHERE username = 'user2'
		),
		(
			SELECT product_id
			FROM products
			WHERE name = 'Product E'
		),
		2,
		159.98,
		'2023-07-08'
	),
	(
		(
			SELECT user_id
			FROM users
			WHERE username = 'user3'
		),
		(
			SELECT product_id
			FROM products
			WHERE name = 'Product F'
		),
		1,
		39.99,
		'2023-07-08'
	),
	(
		(
			SELECT user_id
			FROM users
			WHERE username = 'user4'
		),
		(
			SELECT product_id
			FROM products
			WHERE name = 'Product G'
		),
		4,
		79.96,
		'2023-07-08'
	),
	(
		(
			SELECT user_id
			FROM users
			WHERE username = 'user5'
		),
		(
			SELECT product_id
			FROM products
			WHERE name = 'Product H'
		),
		2,
		299.98,
		'2023-07-08'
	),
	(
		(
			SELECT user_id
			FROM users
			WHERE username = 'user6'
		),
		(
			SELECT product_id
			FROM products
			WHERE name = 'Product I'
		),
		1,
		69.99,
		'2023-07-08'
	),
	(
		(
			SELECT user_id
			FROM users
			WHERE username = 'user1'
		),
		(
			SELECT product_id
			FROM products
			WHERE name = 'Product J'
		),
		3,
		104.97,
		'2023-07-08'
	);