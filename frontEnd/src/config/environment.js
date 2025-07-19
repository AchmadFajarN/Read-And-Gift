// Environment configuration
export const config = {
  // API Configuration
  API_BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api',
  
  // Feature Flags
  USE_BACKEND: import.meta.env.VITE_USE_BACKEND === 'true' || false,
  ENABLE_FILE_UPLOAD: import.meta.env.VITE_ENABLE_FILE_UPLOAD === 'true' || true,
  
  // App Configuration
  APP_NAME: import.meta.env.VITE_APP_NAME || 'Read&Give',
  APP_VERSION: import.meta.env.VITE_APP_VERSION || '1.0.0',
  
  // Development
  IS_DEVELOPMENT: import.meta.env.DEV,
  IS_PRODUCTION: import.meta.env.PROD,
  
  // External Services
  UPLOAD_MAX_SIZE: parseInt(import.meta.env.VITE_UPLOAD_MAX_SIZE) || 5 * 1024 * 1024, // 5MB
  
  // Authentication
  TOKEN_STORAGE_KEY: 'auth_token',
  USER_STORAGE_KEY: 'bookshare_user',
};

// Validation
if (config.USE_BACKEND && !config.API_BASE_URL) {
  console.warn('Backend is enabled but API_BASE_URL is not configured');
}

export default config;