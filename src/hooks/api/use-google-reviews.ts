import { useQuery } from '@tanstack/react-query';
import { googleReviewsService, GooglePlaceSearchParams } from '@/services/google-reviews.service';
import { logError } from '@/lib/error-utils';

export const googleReviewsKeys = {
  all: ['google-reviews'] as const,
  places: () => [...googleReviewsKeys.all, 'places'] as const,
  placeSearch: (params: GooglePlaceSearchParams) => [...googleReviewsKeys.places(), 'search', params] as const,
  placeDetails: (placeId: string) => [...googleReviewsKeys.places(), 'details', placeId] as const,
  placeReviews: (placeId: string) => [...googleReviewsKeys.places(), 'reviews', placeId] as const,
  propertySearch: (propertyName: string, location?: string) => [...googleReviewsKeys.all, 'property-search', propertyName, location] as const,
};

export function useSearchPlaces(params: GooglePlaceSearchParams) {
  return useQuery({
    queryKey: googleReviewsKeys.placeSearch(params),
    queryFn: async () => {
      try {
        const response = await googleReviewsService.searchPlaces(params);
        if (!response.success) {
          throw new Error(response.message || 'Failed to search places');
        }
        return response.data || [];
      } catch (error) {
        logError('Failed to search places', error);
        throw error;
      }
    },
    enabled: !!params.query,
  });
}

export function useGetPlaceDetails(placeId: string) {
  return useQuery({
    queryKey: googleReviewsKeys.placeDetails(placeId),
    queryFn: async () => {
      try {
        const response = await googleReviewsService.getPlaceDetails(placeId);
        if (!response.success) {
          throw new Error(response.message || 'Failed to fetch place details');
        }
        return response.data!;
      } catch (error) {
        logError('Failed to fetch place details', error);
        throw error;
      }
    },
    enabled: !!placeId,
  });
}

export function useGetPlaceReviews(placeId: string) {
  return useQuery({
    queryKey: googleReviewsKeys.placeReviews(placeId),
    queryFn: async () => {
      try {
        const response = await googleReviewsService.getPlaceReviews(placeId);
        if (!response.success) {
          throw new Error(response.message || 'Failed to fetch place reviews');
        }
        return response.data || [];
      } catch (error) {
        logError('Failed to fetch place reviews', error);
        throw error;
      }
    },
    enabled: !!placeId,
  });
}

export function useSearchReviewsByProperty(propertyName: string, location?: string) {
  return useQuery({
    queryKey: googleReviewsKeys.propertySearch(propertyName, location),
    queryFn: async () => {
      try {
        const response = await googleReviewsService.searchReviewsByProperty(propertyName, location);
        if (!response.success) {
          throw new Error(response.message || 'Failed to search reviews by property');
        }
        return response.data || [];
      } catch (error) {
        logError('Failed to search reviews by property', error);
        throw error;
      }
    },
    enabled: !!propertyName,
  });
}
