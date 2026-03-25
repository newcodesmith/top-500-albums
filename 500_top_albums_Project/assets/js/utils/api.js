/**
 * API Utility Functions
 * Provides error handling, timeout protection, and user-friendly error messages
 */

/**
 * Fetches data from a URL with error handling and timeout
 * @param {string} url - The URL to fetch from
 * @param {number} timeout - Timeout in milliseconds (default: 10000)
 * @returns {Promise<Object>} Parsed JSON response
 * @throws {Error} Network error or timeout
 */
export async function safeFetch(url, timeout = 10000) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, { signal: controller.signal });
    clearTimeout(timeoutId);
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    clearTimeout(timeoutId);
    
    if (error.name === 'AbortError') {
      throw new Error('Request timed out. Please try again.');
    }
    
    if (!navigator.onLine) {
      throw new Error('No internet connection detected.');
    }
    
    throw new Error(`Failed to load: ${error.message}`);
  }
}

/**
 * Shows an error message to the user
 * @param {string} message - Error message to display
 * @param {string} container - CSS selector for container element
 */
export function showError(message, container = '.albumCoverBackground') {
  const element = document.querySelector(container);
  if (!element) {
    console.error('Error container not found:', container);
    return;
  }
  
  const errorHTML = `
    <div class="error-banner" role="alert">
      <div class="error-content">
        <span class="error-icon">⚠️</span>
        <div class="error-text">
          <h3>Oops! Something went wrong</h3>
          <p>${message}</p>
        </div>
        <button class="error-retry" onclick="window.location.reload()">
          Try Again
        </button>
      </div>
    </div>
  `;
  
  element.insertAdjacentHTML('afterbegin', errorHTML);
}

/**
 * Shows a loading indicator
 * @param {boolean} show - Whether to show or hide loading
 */
export function showLoading(show = true) {
  const loadingContainer = document.querySelector('.loading-container');
  if (loadingContainer) {
    loadingContainer.style.display = show ? 'block' : 'none';
  }
}
