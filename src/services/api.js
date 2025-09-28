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
    // Add auth token if available
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
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
    const message = error.response?.data?.message || error.message || 'An error occurred';
    console.error('API Error:', message);
    return Promise.reject(new Error(message));
  }
);

// API endpoints
export const apiService = {
  // Research endpoints
  research: {
    getAll: () => api.get('/research'),
    getById: (id) => api.get(`/research/${id}`),
    getByCategory: (category) => api.get(`/research?category=${category}`),
  },

  // People endpoints
  people: {
    getAll: () => api.get('/people'),
    getById: (id) => api.get(`/people/${id}`),
    getByRole: (role) => api.get(`/people?role=${role}`),
  },

  // Projects endpoints
  projects: {
    getAll: () => api.get('/projects'),
    getById: (id) => api.get(`/projects/${id}`),
    getByStatus: (status) => api.get(`/projects?status=${status}`),
  },

  // Publications endpoints
  publications: {
    getAll: () => api.get('/publications'),
    getById: (id) => api.get(`/publications/${id}`),
    search: (query) => api.get(`/publications/search?q=${query}`),
    getByYear: (year) => api.get(`/publications?year=${year}`),
    getByAuthor: (author) => api.get(`/publications?author=${author}`),
  },

  // News endpoints
  news: {
    getAll: () => api.get('/news'),
    getById: (id) => api.get(`/news/${id}`),
    getByType: (type) => api.get(`/news?type=${type}`),
    getRecent: (limit = 5) => api.get(`/news?limit=${limit}&sort=date`),
  },

  // Contact endpoint
  contact: {
    submit: (data) => api.post('/contact', data),
  },
};

export default api;