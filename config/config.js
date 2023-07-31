// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

// Configuration object for the application
export default {
  // App configuration
  app: {
    name: process.env.APP_NAME,
    port: process.env.PORT || 5000, // Node.js server port
    env: process.env.NODE_ENV,
    https: process.env.HTTPS
  },

  // JWT (JSON Web Token) configuration
  jwt: {
    tokenSecret: process.env.JWT_TOKEN_SECRET,
    refreshTokenSecret: process.env.JWT_REFRESH_TOKEN_SECRET,
    invalidTokenMessage: 'Invalid Token',
    invalidRefreshToken: 'Invalid Refresh Token or logged in other device',
    expiredRefreshToken: 'Expired Refresh Token',
    expiryTime: process.env.JWT_EXPIRY_TIME || '900s', // Default token expiry time: 900 seconds (15 minutes)
    refreshTokenExpiryTime: process.env.JWT_REFRESH_TOKEN_EXPIRY_TIME || '1d', // Default refresh token expiry time: 1 day
  },

  // Login configuration
  login: {
    invalidLoginMessage: 'Invalid credentials',
  },

  // Services configuration
  services: {
    dasboardURL: process.env.DASHBOARD_URL, // URL for the dashboard service
    dasboardURLPrefix: process.env.DASHBOARD_URL_PREFIX, // Prefix for dashboard service routes
    apiURL: process.env.API_URL, // URL for the API service
    apiURLPrefix: process.env.API_URL_PREFIX, // Prefix for API service routes

    requestTimeOut: 15000, // Timeout for API requests (in milliseconds)
    
    payloadLimit: process.env.PAYLOAD_LIMIT || '2MB' // Limit for the request payload size
  },
  
  // Database configuration
  database: {    
    type: process.env.FIREBASE_TYPE,
    project_id: process.env.FIREBASE_PROJECT_ID,
    private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
    private_key: process.env.FIREBASE_PRIVATE_KEY,
    client_email: process.env.FIREBASE_CLIENT_EMAIL,
    client_id: process.env.FIREBASE_CLIENT_ID,
    auth_uri: process.env.FIREBASE_AUTH_URI,
    token_uri: process.env.FIREBASE_TOKEN_URI,
    auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
    client_x509_cert_url: process.env.FIREBASE_CLIENT_X509_CERT_URL,
    universe_domain: process.env.FIREBASE_UNIVERSE_DOMAIN,
    databaseURL: process.env.FIREBASE_DATABASE_URL
  },

  // Log configuration
  log: {
    logLevel: process.env.LOG_LEVEL, // Log level for logging (e.g., 'info', 'debug', 'error')
    logSize: process.env.LOG_SIZE, // Maximum log size (in bytes) before rotating log files
    logInterval: process.env.LOG_INTERVAL, // Time interval (in milliseconds) for rotating log files
  },

  // Cache configuration
  cache: {
    cachePeriod: 1, // Cache period in seconds
  },

  // Standard response messages
  standardResponse: {
    success: {
      status: 'ok',
      message: 'success',
    },
    invalid: {
      status: 'failed',
      message: 'Invalid request',
    },
    failure: {
      status: 'failed',
      message: 'Internal server error',
    },
    notFound: {
      status: 'failed',
      message: 'data not found',
    },
    notSupportedMethod: {
      status: 'failed',
      message: 'http/s method not supported',
    },

    unauthorized: {
      status: 'failed',
      message: 'Not Authorized to perform this action',
    },
    forbidden: {
      status: 'failed',
      message: 'Token expired'
    }
  },
};
