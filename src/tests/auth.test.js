/* eslint-disable no-undef */
const request = require("supertest");
const { app, server } = require("../app");

describe("Auth APIs", () => {
	afterAll((done) => {
		server.close(done);
	});

	let token; // JWT token for authentication

	// Modify this before each test to obtain the JWT token
	beforeEach(async () => {
		const response = await request(app)
			.post("/auth/login")
			.send({ username: "your_username", password: "your_password" });
		token = response.body.token;
	});

	// Test POST /register
	describe("POST /auth/register", () => {
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
				.post("/auth/register")
				.send(newUser);
			expect(response.status).toBe(201);
			expect(response.body).toBeDefined();
			expect(response.body.message).toBe("User registered successfully");
		});

		it("should return 400 if username already taken", async () => {
			const existingUser = {
				username: "existinguser", // Assuming this username already exists
				email: "newuser@example.com",
				phone_number: "1234567890",
				password: "password",
				address: "123 Street, City",
				role: "customer",
			};

			const response = await request(app)
				.post("/auth/register")
				.send(existingUser);
			expect(response.status).toBe(400);
			expect(response.body).toBeDefined();
			expect(response.body.message).toBe("Username already taken");
		});

		it("should return 400 if email already registered", async () => {
			const existingEmail = {
				username: "newuser",
				email: "existinguser@example.com", // Assuming this email already exists
				phone_number: "1234567890",
				password: "password",
				address: "123 Street, City",
				role: "customer",
			};

			const response = await request(app)
				.post("/register")
				.send(existingEmail);
			expect(response.status).toBe(400);
			expect(response.body).toBeDefined();
			expect(response.body.message).toBe("Email already registered");
		});
	});

	// Test POST /login
	describe("POST /auth/login", () => {
		it("should authenticate a user and generate a JWT token (isFirstTimeLogin: true)", async () => {
			const user = {
				username: "existinguser", // Assuming this username exists
				password: "password",
				isFirstTimeLogin: true,
			};

			const response = await request(app).post("/auth/login").send(user);
			expect(response.status).toBe(200);
			expect(response.body).toBeDefined();
			expect(response.body.token).toBeDefined();
		});

		it("should authenticate a user and verify a JWT token (isFirstTimeLogin: false)", async () => {
			const user = {
				username: "existinguser", // Assuming this username exists
				password: "password",
				isFirstTimeLogin: false,
			};

			const response = await request(app)
				.post("/auth/login")
				.set("Authorization", `Bearer ${token}`)
				.send(user);
			expect(response.status).toBe(200);
			expect(response.body).toBeDefined();
			expect(response.body.token).toBeDefined();
		});

		it("should return 401 if invalid username or password", async () => {
			const invalidUser = {
				username: "nonexistentuser", // Assuming this username doesn't exist
				password: "invalidpassword",
				isFirstTimeLogin: true,
			};

			const response = await request(app)
				.post("/auth/login")
				.send(invalidUser);
			expect(response.status).toBe(401);
			expect(response.body).toBeDefined();
			expect(response.body.message).toBe("Invalid username or password");
		});
	});

	// Test POST /auth/logout
	describe("POST /auth/logout", () => {
		it("should log out the current user", async () => {
			const response = await request(app)
				.post("/auth/logout")
				.set("Authorization", `Bearer ${token}`);
			expect(response.status).toBe(200);
			expect(response.body).toBeDefined();
			expect(response.body.status).toBe("success");
			expect(response.body.message).toBe("User logged out successfully");
		});

		it("should return 401 if no token provided", async () => {
			const response = await request(app).post("/auth/logout");
			expect(response.status).toBe(401);
			expect(response.body).toBeDefined();
			expect(response.body.message).toBe(
				"Unauthorized: No token provided"
			);
		});
	});
});
