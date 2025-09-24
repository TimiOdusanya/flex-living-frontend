import { apiClient } from '@/lib/api-client';
import { ApiResponse } from '@/types/api';
import { NormalizedReview } from '@/types';

export interface GooglePlaceSearchParams {
  query: string;
  location?: string;
  radius?: number;
  [key: string]: unknown;
}

export interface GooglePlaceDetails {
  place_id: string;
  name: string;
  rating: number;
  user_ratings_total: number;
  reviews: GoogleReview[];
  formatted_address: string;
  geometry: {
    location: {
      lat: number;
      lng: number;
    };
  };
}

export interface GoogleReview {
  author_name: string;
  author_url?: string;
  profile_photo_url?: string;
  rating: number;
  relative_time_description: string;
  text: string;
  time: number;
}

export const googleReviewsService = {
  searchPlaces: async (params: GooglePlaceSearchParams): Promise<ApiResponse<GooglePlaceDetails[]>> => {
    return apiClient.get('/google/places/search', params);
  },

  getPlaceDetails: async (placeId: string): Promise<ApiResponse<GooglePlaceDetails>> => {
    return apiClient.get(`/google/places/${placeId}`);
  },

  getPlaceReviews: async (placeId: string): Promise<ApiResponse<NormalizedReview[]>> => {
    return apiClient.get(`/google/places/${placeId}/reviews`);
  },

  searchReviewsByProperty: async (propertyName: string, location?: string): Promise<ApiResponse<NormalizedReview[]>> => {
    return apiClient.get('/google/reviews/search', { 
      propertyName, 
      location: location || 'London, UK' 
    });
  }
};
