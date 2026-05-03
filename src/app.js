/**
 * Express Application Setup
 * ScribeBoard API - Blog CMS Backend
 */
// this is my first comment  gaurav

const express = require('express'); 
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const config = require('./config');
const routes = require('./routes');
const { errorHandler, notFoundHandler } = require('./middleware/error.middleware');

const app = express();

// Security middleware
app.use(helmet());
app.use(cors(config.cors));

// Request parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Logging
if (config.env !== 'test') {
  app.use(morgan(config.env === 'development' ? 'dev' : 'combined'));
}

// API routes
app.use(config.api.prefix, routes);

// Health check endpoint used by Kubernetes Liveness/Readiness probes and CI/CD smoke tests
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'UP', timestamp: new Date().toISOString() });
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    name: 'ScribeBoard API',
    version: config.api.version,
    status: 'running',
    docs: `${config.api.prefix}`
  });
});

// Error handling
app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;
