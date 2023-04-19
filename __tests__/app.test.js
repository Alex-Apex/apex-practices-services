const request = require('supertest');
const app = require('../app'); // Import your Express app

describe('GET /api/endpoint', () => {
  it('should respond with status 200 and JSON data', async () => {
    const res = await request(app).get('/api/endpoint');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('data');
  });
});
