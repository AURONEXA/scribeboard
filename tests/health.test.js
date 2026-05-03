// Supertest is used to simulate HTTP requests to the Express app
const request = require('supertest');
// Import the main Express application
const app = require('../src/app');

/**
 * Health Check API Tests
 */
describe('Health Check API', () => {
  // Test Case: Check if the /health endpoint is alive
  it('should return 200 OK for /health', async () => {
    const res = await request(app).get('/health');
    // Expect HTTP Status 200 (OK)
    expect(res.statusCode).toEqual(200);
    // Expect the body to contain { status: 'UP' }
    expect(res.body).toHaveProperty('status', 'UP');
  });

  // Test Case: Check if the root endpoint is alive
  it('should return 200 OK for root /', async () => {
    const res = await request(app).get('/');
    // Expect HTTP Status 200 (OK)
    expect(res.statusCode).toEqual(200);
    // Expect the app name to be returned
    expect(res.body).toHaveProperty('name', 'ScribeBoard API');
  });
});
