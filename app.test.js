const request = require('supertest');
const app = require("./app");

describe("The App", () => {

    it("/active-image defaults to 'default'", async () => {
        const result = await request(app).get('/active-image');

        expect(result.statusCode).toBe(200);
        expect(result.text).toBe("default");
    });
});
