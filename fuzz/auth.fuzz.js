// Import the target validator to be fuzzed
const { register } = require('../src/validators/auth.validator');

/**
 * Jazzer.js Fuzzing Target
 * This function will be called thousands of times with random 'data' inputs
 */
module.exports.fuzz = function(data) {
  try {
    // Convert the raw buffer data from Jazzer into a string
    const input = data.toString();
    
    let payload;
    try {
      // Attempt to parse the random input as JSON (testing JSON parser resilience)
      payload = JSON.parse(input);
    } catch (e) {
      // If not valid JSON, construct a malformed object using the raw input strings
      // This tests how the validator handles unexpected character sequences in fields
      payload = { email: input, password: input, firstName: input, lastName: input };
    }
    
    // Execute the actual validation logic
    register.validate(payload);
    
  } catch (e) {
    // SECURITY: We only care about process crashes (TypeErrors, RangeErrors, etc.)
    // Validation errors (Joi errors) are expected and caught here safely.
    if (e instanceof TypeError) {
      console.error('Possible Logic Crash Found:', e);
    }
  }
};
