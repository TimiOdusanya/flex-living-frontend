import { apiClient } from '@/lib/api-client';
import { ApiResponse } from '@/types/api';
import { Manager } from '@/types';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  name: string;
  role?: 'admin' | 'manager';
}

export interface AuthResponse {
  token: string;
  user: Manager;
}

/**
 * Authentication service
 * Handles all authentication-related API calls
 */
export const authService = {
  /**
   * Authenticate user with email and password
   */
  async login(credentials: LoginCredentials): Promise<ApiResponse<AuthResponse>> {
    return apiClient.post<AuthResponse>('/auth/login', credentials);
  },

  /**
   * Register a new user
   */
  async register(userData: RegisterData): Promise<ApiResponse<AuthResponse>> {
    return apiClient.post<AuthResponse>('/auth/register', userData);
  },

  /**
   * Get current user profile
   */
  async getProfile(): Promise<ApiResponse<Manager>> {
    return apiClient.get<Manager>('/auth/profile');
  },

  /**
   * Refresh authentication token
   */
  async refreshToken(): Promise<ApiResponse<{ token: string }>> {
    return apiClient.post<{ token: string }>('/auth/refresh');
  },

  /**
   * Logout user (invalidate token on server)
   */
  async logout(): Promise<ApiResponse<{ message: string }>> {
    return apiClient.post<{ message: string }>('/auth/logout');
  },
};
