import request from 'supertest';
import app from "./app.js";

describe("The App", () => {

    it("/active-image defaults to 'default'", async () => {
        const result = await request(app).get('/active-image');

        expect(result.statusCode).toBe(200);
        expect(result.text).toBe("default");
    });
});
