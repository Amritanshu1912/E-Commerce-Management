/* eslint-disable no-undef */
const request = require("supertest");
const app = require("../config/app");

describe("User APIs", () => {
	let server;

	beforeAll(() => {
		server = app.listen(3000);
	});

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

	// Test GET /users
	describe("GET /user/users", () => {
		it("should return all users", async () => {
			const response = await request(app)
				.get("/user/users")
				.set("Authorization", `Bearer ${token}`);
			expect(response.status).toBe(200);
			expect(response.body).toBeDefined();
			expect(Array.isArray(response.body)).toBeTruthy();
		});
	});

	// Test GET /users/:id
	describe("GET /user/users/:id", () => {
		it("should return a specific user", async () => {
			const response = await request(app)
				.get("/user/users/1") // Assuming ID 1 exists
				.set("Authorization", `Bearer ${token}`);
			expect(response.status).toBe(200);
			expect(response.body).toBeDefined();
			expect(response.body.user_id).toBe(1); // Assuming ID 1 exists
		});

		it("should return 404 if user not found", async () => {
			const response = await request(app)
				.get("/user/users/999") // Assuming ID 999 doesn't exist
				.set("Authorization", `Bearer ${token}`);
			expect(response.status).toBe(404);
			expect(response.body).toBeDefined();
			expect(response.body.error).toBe("User not found");
		});
	});

	// Test POST /users
	describe("POST /user/users", () => {
		it("should create a new user", async () => {
			const newUser = {
				username: "newuser",
				email: "newuser@example.com",
				phone_number: "1234567890",
				password: "password",
				address: "123 Street, City",
				role: "customer",
			};

			const response = await request(app)
				.post("/user/users")
				.set("Authorization", `Bearer ${token}`)
				.send(newUser);
			expect(response.status).toBe(201);
			expect(response.body).toBeDefined();
			expect(response.body.username).toBe(newUser.username);
		});

		it("should return 400 if missing required fields", async () => {
			const invalidUser = {
				username: "newuser",
				email: "newuser@example.com",
				// Missing phone_number, password, address, role
			};

			const response = await request(app)
				.post("/user/users")
				.set("Authorization", `Bearer ${token}`)
				.send(invalidUser);
			expect(response.status).toBe(400);
			expect(response.body).toBeDefined();
			expect(response.body.error).toBe("Missing required fields");
		});
	});

	// Test PUT /users/:id
	describe("PUT /user/users/:id", () => {
		it("should update a user", async () => {
			const updatedUser = {
				username: "updateduser",
				email: "updateduser@example.com",
				phone_number: "9876543210",
				password: "newpassword",
				address: "456 Street, City",
				role: "admin",
			};

			const response = await request(app)
				.put("/user/users/1") // Assuming ID 1 exists
				.set("Authorization", `Bearer ${token}`)
				.send(updatedUser);
			expect(response.status).toBe(200);
			expect(response.body).toBeDefined();
			expect(response.body.username).toBe(updatedUser.username);
		});

		it("should return 404 if user not found", async () => {
			const updatedUser = {
				username: "updateduser",
				email: "updateduser@example.com",
				phone_number: "9876543210",
				password: "newpassword",
				address: "456 Street, City",
				role: "admin",
			};

			const response = await request(app)
				.put("/user/users/999") // Assuming ID 999 doesn't exist
				.set("Authorization", `Bearer ${token}`)
				.send(updatedUser);
			expect(response.status).toBe(404);
			expect(response.body).toBeDefined();
			expect(response.body.error).toBe("User not found");
		});
	});

	// Test DELETE /users/:id
	describe("DELETE /user/users/:id", () => {
		it("should delete a user", async () => {
			const response = await request(app)
				.delete("/user/users/1") // Assuming ID 1 exists
				.set("Authorization", `Bearer ${token}`);
			expect(response.status).toBe(204);
			expect(response.body).toMatchObject({});
		});

		it("should return 404 if user not found", async () => {
			const response = await request(app)
				.delete("/user/users/999") // Assuming ID 999 doesn't exist
				.set("Authorization", `Bearer ${token}`);
			expect(response.status).toBe(404);
			expect(response.body).toBeDefined();
			expect(response.body.error).toBe("User not found");
		});
	});
});
