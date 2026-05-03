// Import core ESLint and specialized security/node/jest plugins
const security = require('eslint-plugin-security');
const node = require('eslint-plugin-node');
const jest = require('eslint-plugin-jest');
const js = require('@eslint/js');

/** @type {import('eslint').Linter.FlatConfig[]} */
module.exports = [
  // Use the standard recommended JavaScript rules
  js.configs.recommended,
  // Use the specialized security rules to detect risky code patterns (e.g., eval, regex)
  security.configs.recommended,
  {
    // Apply these settings to all JavaScript files
    files: ['**/*.js'],
    plugins: {
      security,
      node,
      jest
    },
    languageOptions: {
      // Use latest ECMAScript features
      ecmaVersion: 'latest',
      // The project uses CommonJS (require/module.exports)
      sourceType: 'commonjs',
      // Define global variables to prevent "not defined" errors during linting
      globals: {
        node: true,
        jest: true,
        process: 'readonly',
        __dirname: 'readonly',
        module: 'readonly',
        require: 'readonly',
        console: 'readonly',
        describe: 'readonly',
        it: 'readonly',
        expect: 'readonly',
        beforeEach: 'readonly',
        afterEach: 'readonly'
      }
    },
    rules: {
      // Warn when console.log is left in code (prevent log spam in production)
      'no-console': 'warn',
      // Allow object[key] access as it is common in this project's logic
      'security/detect-object-injection': 'off',
      // Ensure we don't use JS features that aren't supported by the Node version
      'node/no-unsupported-features/es-syntax': ['error', {
        'ignores': ['modules']
      }]
    }
  }
];
