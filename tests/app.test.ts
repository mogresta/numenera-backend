import supertest from "supertest";
import app from "../src/app";
import http from "http";

describe("App", () => {
    let server: http.Server;

    beforeAll((done) => {
        server = app.listen(0, done); // Use dynamic port
    });

    afterAll((done) => {
        server.close(done);
    });

    const request = supertest.agent(app);

    it("should get /", async () => {
        const res = await request.get("/");

        expect(res.status).toBe(200);
        expect(res.body.data).toBe("Hello World!");
    })

    it('should return hello world JSON', async () => {
        const response = await request
            .get('/')
            .expect('Content-Type', /json/)
            .expect(200);

        expect(response.body).toEqual({
            data: 'Hello World!'
        });
    });

    it('should have correct content type', async () => {
        await request
            .get('/')
            .expect('Content-Type', 'application/json; charset=utf-8');
    });
})