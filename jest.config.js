/**
 * Jest Testing Configuration
 */
module.exports = {
  // Use the Node.js environment for testing (API backend)
  testEnvironment: 'node',
  
  // Display individual test results during the run
  verbose: true,
  
  // Automatically collect code coverage information
  collectCoverage: true,
  
  // Directory where Jest should output coverage reports
  coverageDirectory: 'coverage',
  
  // Quality Gates: Minimum coverage required for the CI/CD pipeline to pass
  coverageThreshold: {
    global: {
      // Set to 1% as a baseline for the initial PR; increase this as tests are added
      branches: 1,
      functions: 1,
      lines: 1,
      statements: 1
    }
  },
  
  // Pattern to find test files
  testMatch: ['**/tests/**/*.test.js'],
  
  // Files to run after the test environment has been established (for global mocks/env vars)
  setupFilesAfterEnv: ['./tests/setup.js']
};
