/* eslint-disable no-undef */
const request = require("supertest");
const { app, server } = require("../app");

describe("Product APIs", () => {
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

	// Test GET /products
	describe("GET /product/products", () => {
		it("should return all products", async () => {
			const response = await request(app)
				.get("/product/products")
				.set("Authorization", `Bearer ${token}`);
			expect(response.status).toBe(200);
			expect(response.body).toBeDefined();
			expect(Array.isArray(response.body)).toBeTruthy();
		});
	});

	// Test GET /products/:id
	describe("GET /product/products/:id", () => {
		it("should return a specific product", async () => {
			const response = await request(app)
				.get("/product/products/1") // Assuming ID 1 exists
				.set("Authorization", `Bearer ${token}`);
			expect(response.status).toBe(200);
			expect(response.body).toBeDefined();
			expect(response.body.product_id).toBe(1); // Assuming ID 1 exists
		});

		it("should return 404 if product not found", async () => {
			const response = await request(app)
				.get("/product/products/999") // Assuming ID 999 doesn't exist
				.set("Authorization", `Bearer ${token}`);
			expect(response.status).toBe(404);
			expect(response.body).toBeDefined();
			expect(response.body.error).toBe("Product not found");
		});
	});

	// Test POST /products
	describe("POST /product/products", () => {
		it("should create a new product", async () => {
			const newProduct = {
				name: "New Product",
				description: "This is a new product",
				price: 9.99,
			};

			const response = await request(app)
				.post("/product/products")
				.set("Authorization", `Bearer ${token}`)
				.send(newProduct);
			expect(response.status).toBe(201);
			expect(response.body).toBeDefined();
			expect(response.body.name).toBe(newProduct.name);
		});

		it("should return 400 if missing required fields", async () => {
			const invalidProduct = {
				name: "New Product",
				// Missing description and price
			};

			const response = await request(app)
				.post("/product/products")
				.set("Authorization", `Bearer ${token}`)
				.send(invalidProduct);
			expect(response.status).toBe(400);
			expect(response.body).toBeDefined();
			expect(response.body.error).toBe("Missing required fields");
		});
	});

	// Test PUT /products/:id
	describe("PUT /product/products/:id", () => {
		it("should update a product", async () => {
			const updatedProduct = {
				name: "Updated Product",
				description: "This product has been updated",
				price: 19.99,
			};

			const response = await request(app)
				.put("/product/products/1") // Assuming ID 1 exists
				.set("Authorization", `Bearer ${token}`)
				.send(updatedProduct);
			expect(response.status).toBe(200);
			expect(response.body).toBeDefined();
			expect(response.body.name).toBe(updatedProduct.name);
		});

		it("should return 404 if product not found", async () => {
			const updatedProduct = {
				name: "Updated Product",
				description: "This product has been updated",
				price: 19.99,
			};

			const response = await request(app)
				.put("/product/products/999") // Assuming ID 999 doesn't exist
				.set("Authorization", `Bearer ${token}`)
				.send(updatedProduct);
			expect(response.status).toBe(404);
			expect(response.body).toBeDefined();
			expect(response.body.error).toBe("Product not found");
		});
	});

	// Test DELETE /products/:id
	describe("DELETE /product/products/:id", () => {
		it("should delete a product", async () => {
			const response = await request(app)
				.delete("/product/products/1") // Assuming ID 1 exists
				.set("Authorization", `Bearer ${token}`);
			expect(response.status).toBe(204);
			expect(response.body).toMatchObject({});
		});

		it("should return 404 if product not found", async () => {
			const response = await request(app)
				.delete("/product/products/999") // Assuming ID 999 doesn't exist
				.set("Authorization", `Bearer ${token}`);
			expect(response.status).toBe(404);
			expect(response.body).toBeDefined();
			expect(response.body.error).toBe("Product not found");
		});
	});
});
