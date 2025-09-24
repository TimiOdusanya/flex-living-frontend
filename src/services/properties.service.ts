import { apiClient } from '@/lib/api-client';
import { ApiResponse, QueryParams } from '@/types/api';
import { Property } from '@/types';

export interface PropertyQueryParams extends QueryParams {
  city?: string;
  country?: string;
  minRating?: number;
  maxRating?: number;
  [key: string]: unknown;
}

export interface PropertyStats {
  propertyId: string;
  totalReviews: number;
  averageRating: number;
  approvedReviews: number;
  pendingReviews: number;
  recentReviews: number;
}

/**
 * Properties service
 * Handles all property-related API calls
 */
export const propertiesService = {
  async getProperties(params: PropertyQueryParams = {}): Promise<ApiResponse<Property[]>> {
    return apiClient.get<Property[]>('/reviews/properties', params);
  },
};
