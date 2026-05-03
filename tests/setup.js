// Global Setup for Jest Testing Environment
// This file runs before every test suite

// Set the environment to 'test' to prevent loading production configs
process.env.NODE_ENV = 'test';

// Define a safe mock port for the test server
process.env.PORT = 3001;

// Define a mock database URL (Prevents accidental production DB writes)
process.env.DATABASE_URL = 'postgresql://mock:mock@localhost:5432/mock';

// Define a static secret for testing JWT authentication
process.env.JWT_SECRET = 'test-secret';
