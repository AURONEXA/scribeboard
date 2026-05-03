/**
 * Stryker Mutation Testing Configuration
 * Mutation testing injects bugs into your code to see if your tests catch them.
 */
module.exports = {
  // Use npm as the package manager
  packageManager: "npm",
  
  // Output formats for the mutation results
  reporters: ["html", "clear-text", "progress"],
  
  // Use Jest as the test runner for the mutation tests
  testRunner: "jest",
  
  // Only run mutations for code that is actually covered by tests (faster)
  coverageAnalysis: "perTest",
  
  // Define which files should be mutated (injected with bugs)
  mutate: [
    "src/**/*.js",
    "!src/index.js",   // Exclude entry points
    "!src/server.js"  // Exclude server setup
  ],
  
  // Jest-specific settings for Stryker
  jest: {
    projectType: "custom",
    configFile: "jest.config.js",
    enableFindRelatedTests: true
  }
};
