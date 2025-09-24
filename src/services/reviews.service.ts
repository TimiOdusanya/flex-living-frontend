import { apiClient } from '@/lib/api-client';
import { ApiResponse, PaginatedResponse, QueryParams } from '@/types/api';
import { NormalizedReview, ReviewFilters, DashboardStats, Property } from '@/types';

export interface ReviewApprovalData {
  reviewId: number;
  approved: boolean;
  reason?: string;
}

export interface ReviewQueryParams extends QueryParams, ReviewFilters {
  [key: string]: unknown;
}

/**
 * Reviews service
 * Handles all review-related API calls with proper typing and error handling
 */
export const reviewsService = {
  /**
   * Get all reviews with optional filtering and pagination
   */
  async getReviews(params: ReviewQueryParams = {}): Promise<ApiResponse<NormalizedReview[]>> {
    return apiClient.get<NormalizedReview[]>('/reviews', params);
  },

  /**
   * Get paginated reviews
   */
  async getReviewsPaginated(params: ReviewQueryParams = {}): Promise<ApiResponse<PaginatedResponse<NormalizedReview>>> {
    return apiClient.get<PaginatedResponse<NormalizedReview>>('/reviews/paginated', params);
  },

  /**
   * Get approved reviews only
   */
  async getApprovedReviews(propertyId?: string): Promise<ApiResponse<NormalizedReview[]>> {
    const params = propertyId ? { propertyId } : {};
    return apiClient.get<NormalizedReview[]>('/reviews/approved', params);
  },

  /**
   * Get pending reviews
   */
  async getPendingReviews(): Promise<ApiResponse<NormalizedReview[]>> {
    return apiClient.get<NormalizedReview[]>('/reviews/pending');
  },

  /**
   * Approve a review
   */
  async approveReview(reviewId: number, reason?: string): Promise<ApiResponse<{ message: string }>> {
    return apiClient.patch<{ message: string }>(`/reviews/${reviewId}/approve`, { reason });
  },

  /**
   * Reject a review
   */
  async rejectReview(reviewId: number, reason?: string): Promise<ApiResponse<{ message: string }>> {
    return apiClient.patch<{ message: string }>(`/reviews/${reviewId}/reject`, { reason });
  },

  /**
   * Bulk approve/reject reviews
   */
  async bulkUpdateReviews(updates: ReviewApprovalData[]): Promise<ApiResponse<{ message: string; processed: number }>> {
    return apiClient.patch<{ message: string; processed: number }>('/reviews/bulk-update', { updates });
  },

  /**
   * Get dashboard statistics
   */
  async getDashboardStats(): Promise<ApiResponse<DashboardStats>> {
    return apiClient.get<DashboardStats>('/reviews/dashboard-stats');
  },

  /**
   * Get review by ID
   */
  async getReviewById(reviewId: number): Promise<ApiResponse<NormalizedReview>> {
    return apiClient.get<NormalizedReview>(`/reviews/${reviewId}`);
  },

  /**
   * Get reviews for a specific property
   */
  async getReviewsByProperty(propertyId: string, params: Omit<ReviewQueryParams, 'propertyId'> = {}): Promise<ApiResponse<NormalizedReview[]>> {
    return apiClient.get<NormalizedReview[]>(`/reviews/property/${propertyId}`, params);
  },
};
