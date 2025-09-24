import axios from 'axios';
import { NormalizedReview, ReviewFilters, DashboardStats, Property, Manager, ApiResponse } from '@/types';

const isProduction = typeof window !== 'undefined' && 
  window.location.hostname === 'flex-living-frontend-timi.vercel.app';

const API_BASE_URL = isProduction
  ? 'https://flex-living-backend-h8cx.onrender.com/api'
  : process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth-storage');
  if (token) {
    try {
      const parsed = JSON.parse(token);
      if (parsed.state?.token) {
        config.headers.Authorization = `Bearer ${parsed.state.token}`;
      }
    } catch (error) {
      console.error('Error parsing auth token:', error);
    }
  }
  return config;
});

export const authApi = {
  login: async (email: string, password: string): Promise<ApiResponse<{ token: string; user: Manager }>> => {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  },

  register: async (email: string, password: string, name: string, role: 'admin' | 'manager' = 'manager'): Promise<ApiResponse<{ token: string; user: Manager }>> => {
    const response = await api.post('/auth/register', { email, password, name, role });
    return response.data;
  },

  getProfile: async (): Promise<ApiResponse<Manager>> => {
    const response = await api.get('/auth/profile');
    return response.data;
  },
};

export const reviewApi = {
  getReviews: async (filters: ReviewFilters = {}): Promise<ApiResponse<NormalizedReview[]>> => {
    const response = await api.get('/reviews', { params: filters });
    return response.data;
  },

  getApprovedReviews: async (propertyId?: string): Promise<ApiResponse<NormalizedReview[]>> => {
    const response = await api.get('/reviews/approved', { 
      params: propertyId ? { propertyId } : {} 
    });
    return response.data;
  },

  approveReview: async (reviewId: number): Promise<ApiResponse<{ message: string }>> => {
    const response = await api.patch(`/reviews/${reviewId}/approve`);
    return response.data;
  },

  rejectReview: async (reviewId: number): Promise<ApiResponse<{ message: string }>> => {
    const response = await api.patch(`/reviews/${reviewId}/reject`);
    return response.data;
  },

  getDashboardStats: async (): Promise<ApiResponse<DashboardStats>> => {
    const response = await api.get('/reviews/dashboard-stats');
    return response.data;
  },

  getProperties: async (): Promise<ApiResponse<Property[]>> => {
    const response = await api.get('/reviews/properties');
    return response.data;
  },
};
