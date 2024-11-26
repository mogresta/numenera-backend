import request from "supertest";
import { app, Shutdown } from "../src/index";

describe("Application", () => {
  afterAll((done) => {
    Shutdown(done);
  });

  it("starts and has proper test env", async () => {
    expect(process.env.NODE_ENV).toBe("test");
    expect(app).toBeDefined();
  }, 10000);

  it("Returns all methods allowed by client", async () => {
    const response = await request(app).options("/healthcheck");

    expect(response.status).toBe(200);
    expect(response.headers["access-control-allow-methods"]).toBe(
      "GET, POST, PUT, PATCH, DELETE",
    );
  });

  it("Returns error on unexpected route", async () => {
    const response = await request(app).get("/random");

    expect(response.status).toBe(404);
    expect(response.type).toBe("application/json");
    expect(response.body.error).toBe("Route Not Found");
  });
});
