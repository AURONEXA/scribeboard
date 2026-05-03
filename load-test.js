// Import k6 modules for HTTP requests and validation
import http from 'k6/http';
import { check, sleep } from 'k6';

/**
 * k6 Configuration Options
 */
export const options = {
  // Number of concurrent virtual users
  vus: 10,
  // Total test duration
  duration: '30s',
  // Performance Thresholds: The test fails if these are not met
  thresholds: {
    // 95% of requests must be faster than 500ms (Stage 9 Quality Gate)
    http_req_duration: ['p(95)<500'],
  },
};

/**
 * Main Load Test Function
 */
export default function loadTest() {
  // Send a GET request to the health check endpoint
  const res = http.get('http://localhost:3000/health');
  
  // Validate that the server responded with a 200 OK status
  check(res, {
    'status is 200': (r) => r.status === 200,
  });
  
  // Wait for 1 second before the next iteration to simulate real user behavior
  sleep(1);
}
