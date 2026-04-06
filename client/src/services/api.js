const API_BASE = '/api';

async function fetchApi(endpoint, options = {}) {
  try {
    const response = await fetch(`${API_BASE}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`API Error [${endpoint}]:`, error.message);
    throw error;
  }
}

// Products
export const getProducts = (params = {}) => {
  const queryString = new URLSearchParams(params).toString();
  return fetchApi(`/products${queryString ? `?${queryString}` : ''}`);
};

export const getProductById = (id) => fetchApi(`/products/${id}`);

// Offers
export const getOffers = () => fetchApi('/offers');
export const getBanners = () => fetchApi('/offers/banners');

// Stores
export const getStores = () => fetchApi('/stores');

// Analytics
export const getCategoryAnalytics = () => fetchApi('/analytics/categories');
export const getTopViewed = (limit = 10) => fetchApi(`/analytics/top-viewed?limit=${limit}`);
export const getPriceDistribution = () => fetchApi('/analytics/price-distribution');
