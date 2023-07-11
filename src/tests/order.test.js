/* eslint-disable no-undef */
const request = require("supertest");
const { app, server } = require("../app");

describe("Order APIs", () => {
	afterAll((done) => {
		server.close(done);
	});

	let token; // JWT token for authentication

	// Run this before each test to obtain the JWT token
	beforeEach(async () => {
		const response = await request(app).post("/auth/login").send({
			username: "your_username",
			password: "your_password",
			isFirstTimeLogin: true,
		});
		token = response.body.token;
	});

	// Test GET /orders
	describe("GET /order/orders", () => {
		it("should return all orders", async () => {
			const response = await request(app)
				.get("/order/orders")
				.set("Authorization", `Bearer ${token}`);
			expect(response.status).toBe(200);
			expect(response.body).toBeDefined();
			expect(Array.isArray(response.body)).toBeTruthy();
		});
	});

	// Test GET /orders/:id
	describe("GET /order/orders/:id", () => {
		it("should return a specific order", async () => {
			const response = await request(app)
				.get("/order/orders/1") // Assuming ID 1 exists
				.set("Authorization", `Bearer ${token}`);
			expect(response.status).toBe(200);
			expect(response.body).toBeDefined();
			expect(response.body.order_id).toBe(1); // Assuming ID 1 exists
		});

		it("should return 404 if order not found", async () => {
			const response = await request(app)
				.get("/order/orders/999") // Assuming ID 999 doesn't exist
				.set("Authorization", `Bearer ${token}`);
			expect(response.status).toBe(404);
			expect(response.body).toBeDefined();
			expect(response.body.error).toBe("Order not found");
		});
	});

	// Test POST /orders
	describe("POST /order/orders", () => {
		it("should create a new order", async () => {
			const newOrder = {
				customer_id: 1, // Assuming customer ID 1 exists
				product_id: "product_id",
				quantity: 10,
				total_amount: 99.99,
				order_date: "2022-01-01",
			};

			const response = await request(app)
				.post("/order/orders")
				.set("Authorization", `Bearer ${token}`)
				.send(newOrder);
			expect(response.status).toBe(201);
			expect(response.body).toBeDefined();
			expect(response.body.customer_id).toBe(newOrder.customer_id);
		});

		it("should return 400 if missing required fields", async () => {
			const invalidOrder = {
				customer_id: 1, // Assuming customer ID 1 exists
				product_id: "product_id",
				// Missing quantity, total_amount, order_date
			};

			const response = await request(app)
				.post("/order/orders")
				.set("Authorization", `Bearer ${token}`)
				.send(invalidOrder);
			expect(response.status).toBe(400);
			expect(response.body).toBeDefined();
			expect(response.body.error).toBe("Missing required fields");
		});
	});

	// Test PUT /orders/:id
	describe("PUT /order/orders/:id", () => {
		it("should update an order", async () => {
			const updatedOrder = {
				customer_id: 1, // Assuming customer ID 1 exists
				product_id: "product_id",
				quantity: 20,
				total_amount: 199.99,
				order_date: "2022-02-01",
			};

			const response = await request(app)
				.put("/order/orders/1") // Assuming ID 1 exists
				.set("Authorization", `Bearer ${token}`)
				.send(updatedOrder);
			expect(response.status).toBe(200);
			expect(response.body).toBeDefined();
			expect(response.body.quantity).toBe(updatedOrder.quantity);
		});

		it("should return 404 if order not found", async () => {
			const updatedOrder = {
				customer_id: 1, // Assuming customer ID 1 exists
				product_id: "product_id",
				quantity: 20,
				total_amount: 199.99,
				order_date: "2022-02-01",
			};

			const response = await request(app)
				.put("/order/orders/999") // Assuming ID 999 doesn't exist
				.set("Authorization", `Bearer ${token}`)
				.send(updatedOrder);
			expect(response.status).toBe(404);
			expect(response.body).toBeDefined();
			expect(response.body.error).toBe("Order not found");
		});
	});

	// Test DELETE /orders/:id
	describe("DELETE /order/orders/:id", () => {
		it("should delete an order", async () => {
			const response = await request(app)
				.delete("/order/orders/1") // Assuming ID 1 exists
				.set("Authorization", `Bearer ${token}`);
			expect(response.status).toBe(204);
			expect(response.body).toMatchObject({});
		});

		it("should return 404 if order not found", async () => {
			const response = await request(app)
				.delete("/order/orders/999") // Assuming ID 999 doesn't exist
				.set("Authorization", `Bearer ${token}`);
			expect(response.status).toBe(404);
			expect(response.body).toBeDefined();
			expect(response.body.error).toBe("Order not found");
		});
	});
});
