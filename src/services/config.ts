/**
 * Configuration for API services
 * Change this to switch between mock and real API
 */

// API Configuration
export const API_CONFIG = {
  // Set to 'mock' for development, 'production' for real API
  mode: 'mock' as 'mock' | 'production',
  
  // Base URLs for different environments
  mockUrl: 'http://localhost:3001',
  productionUrl: 'https://api.your-music-service.com/v1',
  
  // Timeout settings
  timeout: 10000, // 10 seconds
  
  // Retry configuration
  retries: 3,
  retryDelay: 1000, // 1 second
};

// Determine which base URL to use
export const API_BASE_URL = API_CONFIG.mode === 'mock' 
  ? API_CONFIG.mockUrl 
  : API_CONFIG.productionUrl;

// Request headers
export const DEFAULT_HEADERS = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
};

// API endpoints
export const ENDPOINTS = {
  // Auth endpoints
  login: '/auth/login',
  signup: '/auth/signup',
  logout: '/auth/logout',
  refresh: '/auth/refresh',
  
  // Music endpoints
  songs: '/songs',
  artists: '/artists',
  albums: '/albums',
  playlists: '/playlists',
  
  // Search endpoints
  search: '/search',
  suggestions: '/search/suggestions',
  
  // User endpoints
  profile: '/me',
  liked: '/me/liked',
  recent: '/me/recent',
  following: '/me/following',
  
  // Genre endpoints
  genres: '/genres',
};

/**
 * Get full endpoint URL
 */
export function getEndpoint(endpoint: keyof typeof ENDPOINTS): string {
  return `${API_BASE_URL}${ENDPOINTS[endpoint]}`;
}

/**
 * Check if we're in mock mode
 */
export function isMockMode(): boolean {
  return API_CONFIG.mode === 'mock';
}