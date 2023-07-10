# E-Commerce Management System

This is an order management system built using Node.js, Express, and a database (PostgreSQL). It provides functionality for user authentication, order creation and inventory management.

## Features

-   User authentication: Register, login, and logout functionality with password encryption and JWT token-based authentication.
-   Order management: CRUD operations for orders with order number, products, and quantities.
-   Inventory management: Track product inventory levels and update quantities when orders are placed or fulfilled via different authorised roles.

## Technologies Learned

During the development of this project, I have learned and implemented the following features:

-   Unit and integration tests using Jest and supertest.
-   Dedicated loggers for logging application events and errors using Winston.
-   User authentication and authorization using JWT tokens.
-   Utilization of Node.js libraries like bcrypt, express-validator, helmet, jsonwebtoken, winston, etc.

## Tech Stack

The project utilizes the following backend technologies and libraries:

-   Node.js
-   Express
-   PostgreSQL
-   Sequelize
-   bcrypt
-   jsonwebtoken
-   winston
-   jest
-   supertest

## Installation

1. Clone the repository:

```console
git clone https://github.com/Amritanshu1912/E-Commerce-Management.git
```

2. Install the dependencies:

```console
cd E-Commerce-Management npm install

```

3. Set up the database:

-   Create a new database for the project.
-   You can use the seeder file in the root directory to seed tables with dummy data
-   Update the database configuration in `config/database.js`.

4. Start the server:

```console
npm start

```

5. Access the application at [http://localhost:3000](http://localhost:3000).

## API Documentation

-   The API documentation for this project is automatically generated using Swagger/OpenAPI.
-   Access the API documentation at [http://localhost:3000/docs](http://localhost:3000/docs).

### API Endpoints

Authentication:

POST /auth/register: Create a new user account.
POST /auth/login: Authenticate a user and generate a JWT token.
POST /auth/logout: Log out the current user.

User Management:

GET /user/users: Get a list of all users.
GET /user/users/:id: Get details of a specific user.
POST /user/users Create a new user.  
PUT /user/users/:id: Update user details.
DELETE /user/users/:id: Delete a user.

Order Management:

GET /order/orders: Get a list of all orders.
GET /order/orders/:id: Get details of a specific order.
POST /order/orders: Create a new order.
PUT /order/orders/:id: Update order details.
DELETE /order/orders/:id: Delete an order.

Product Management:

GET /product/products: Get a list of all products.
GET /product/products/:id: Get details of a specific product.
POST /product/products: Create a new product.
PUT /product/products/:id: Update product details.
DELETE /product/products/:id: Delete a product.

## Contributing

Contributions are welcome! If you'd like to contribute to this project, please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature/fix:

```console
git checkout -b feature/my-feature

```

3. Make your changes and commit them:

```console
git commit -m "Add my feature"

```

4. Push to your forked repository:

```console
git push origin feature/my-feature

```

5. Open a pull request on the original repository.

Please ensure that your contributions adhere to the project's coding conventions and include relevant tests.

## License

This project is licensed under the [MIT License](LICENSE).
