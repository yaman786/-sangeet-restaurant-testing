import axios from 'axios';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Add loading state or auth token here if needed
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

// Menu API calls
export const fetchMenuItems = async (filters = {}) => {
  try {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value) params.append(key, value);
    });
    
    const response = await api.get(`/menu?${params.toString()}`);
    return response;
  } catch (error) {
    console.error('Error fetching menu items:', error);
    return [];
  }
};

export const fetchMenuCategories = async () => {
  try {
    const response = await api.get('/menu/categories');
    return response;
  } catch (error) {
    console.error('Error fetching menu categories:', error);
    return [];
  }
};

export const fetchPopularMenuItems = async () => {
  try {
    const response = await api.get('/menu/popular');
    return response;
  } catch (error) {
    console.error('Error fetching popular menu items:', error);
    return [];
  }
};

// Reviews API calls
export const fetchReviews = async () => {
  try {
    const response = await api.get('/reviews');
    return response;
  } catch (error) {
    console.error('Error fetching reviews:', error);
    return [];
  }
};

export const fetchVerifiedReviews = async () => {
  try {
    const response = await api.get('/reviews/verified');
    return response;
  } catch (error) {
    console.error('Error fetching verified reviews:', error);
    return [];
  }
};

export const submitReview = async (reviewData) => {
  try {
    const response = await api.post('/reviews', reviewData);
    return response;
  } catch (error) {
    console.error('Error submitting review:', error);
    throw error;
  }
};

// Reservations API calls
export const createReservation = async (reservationData) => {
  try {
    const response = await api.post('/reservations', reservationData);
    return response;
  } catch (error) {
    console.error('Error creating reservation:', error);
    throw error;
  }
};

export const fetchReservations = async () => {
  try {
    const response = await api.get('/reservations');
    return response;
  } catch (error) {
    console.error('Error fetching reservations:', error);
    return [];
  }
};

// Events API calls
export const fetchEvents = async () => {
  try {
    const response = await api.get('/events');
    return response;
  } catch (error) {
    console.error('Error fetching events:', error);
    return [];
  }
};

export const fetchFeaturedEvents = async () => {
  try {
    const response = await api.get('/events/featured');
    return response;
  } catch (error) {
    console.error('Error fetching featured events:', error);
    return [];
  }
};

export const fetchUpcomingEvents = async () => {
  try {
    const response = await api.get('/events/upcoming');
    return response;
  } catch (error) {
    console.error('Error fetching upcoming events:', error);
    return [];
  }
};

// Newsletter API calls
export const subscribeToNewsletter = async (email) => {
  try {
    const response = await api.post('/newsletter/subscribe', { email });
    return response;
  } catch (error) {
    console.error('Error subscribing to newsletter:', error);
    throw error;
  }
};

export const unsubscribeFromNewsletter = async (email) => {
  try {
    const response = await api.post('/newsletter/unsubscribe', { email });
    return response;
  } catch (error) {
    console.error('Error unsubscribing from newsletter:', error);
    throw error;
  }
};

// Health check
export const checkApiHealth = async () => {
  try {
    const response = await api.get('/health');
    return response;
  } catch (error) {
    console.error('API health check failed:', error);
    return null;
  }
};

export default api; 