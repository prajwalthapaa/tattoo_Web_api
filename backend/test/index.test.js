const request = require("supertest");
const express = require("express");
// const { errorResponseHandler, invalidPathHandler } = require("../middlewares/errorHandlers.js");
const userRoutes = require("../routes/userRoutes.js");
const tattooRoutes = require("../routes/tattooRoutes.js");
const bookingRoutes = require("../routes/bookingRoutes.js");

jest.mock("../configs/db.js", () => ({ connectDB: jest.fn() }));

const app = express();
app.use(express.json());
app.use("/api/user", userRoutes);
app.use("/api/tattoo", tattooRoutes);
app.use("/api/booking", bookingRoutes);
app.use(errorResponseHandler);
app.use(invalidPathHandler);

describe("API Routes", () => {
  test("GET /api/user - should return 200", async () => {
    const response = await request(app).get("/api/user");
    expect(response.status).toBe(200);
  });

  test("POST /api/user - should return 400 for missing data", async () => {
    const response = await request(app).post("/api/user").send({});
    expect(response.status).toBe(400);
  });

  test("GET /api/tattoo - should return 200", async () => {
    const response = await request(app).get("/api/tattoo");
    expect(response.status).toBe(200);
  });

  test("POST /api/tattoo - should return 400 for missing data", async () => {
    const response = await request(app).post("/api/tattoo").send({});
    expect(response.status).toBe(400);
  });

  test("GET /api/booking - should return 200", async () => {
    const response = await request(app).get("/api/booking");
    expect(response.status).toBe(200);
  });

  test("POST /api/booking - should return 400 for missing data", async () => {
    const response = await request(app).post("/api/booking").send({});
    expect(response.status).toBe(400);
  });

  test("GET /invalid-path - should return 404", async () => {
    const response = await request(app).get("/invalid-path");
    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("message", "Invalid API Path");
  });

  test("POST /api/user - should return 201 for valid data", async () => {
    const response = await request(app).post("/api/user").send({ name: "Test User", email: "test@example.com" });
    expect(response.status).toBe(201);
  });

  test("POST /api/tattoo - should return 201 for valid data", async () => {
    const response = await request(app).post("/api/tattoo").send({ name: "Test Tattoo", artist: "Test Artist" });
    expect(response.status).toBe(201);
  });

  test("POST /api/booking - should return 201 for valid data", async () => {
    const response = await request(app).post("/api/booking").send({ user: "12345", tattoo: "67890", date: "2025-03-10" });
    expect(response.status).toBe(201);
  });
});
