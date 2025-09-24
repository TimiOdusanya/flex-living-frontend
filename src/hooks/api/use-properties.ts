import { useQuery } from '@tanstack/react-query';
import { propertiesService, PropertyQueryParams } from '@/services/properties.service';


export const propertyKeys = {
  all: ['properties'] as const,
  lists: () => [...propertyKeys.all, 'list'] as const,
  list: (params: PropertyQueryParams) => [...propertyKeys.lists(), params] as const,
  details: () => [...propertyKeys.all, 'detail'] as const,
  detail: (id: string) => [...propertyKeys.details(), id] as const,
  stats: (id: string) => [...propertyKeys.all, 'stats', id] as const,
  withStats: (params: PropertyQueryParams) => [...propertyKeys.all, 'with-stats', params] as const,
  search: (query: string, params: Omit<PropertyQueryParams, 'search'>) => 
    [...propertyKeys.all, 'search', query, params] as const,
};

/**
 * Hook for fetching all properties with optional filtering
 */
export function useProperties(params: PropertyQueryParams = {}) {
  return useQuery({
    queryKey: propertyKeys.list(params),
    queryFn: () => propertiesService.getProperties(params),
    staleTime: 10 * 60 * 1000,
  });
}

/**
 * Hook for fetching a single property by ID
 */
export function useProperty(propertyId: string) {
  return useQuery({
    queryKey: propertyKeys.detail(propertyId),
    queryFn: async () => {
      const response = await propertiesService.getProperties();
      if (!response.success) {
        throw new Error(response.message || 'Failed to fetch properties');
      }
      const property = response.data?.find(p => p.id === propertyId);
      if (!property) {
        throw new Error(`Property with ID ${propertyId} not found`);
      }
      return { success: true, data: property };
    },
    enabled: !!propertyId,
    staleTime: 10 * 60 * 1000,
  });
}

/**
 * Hook for fetching property statistics
 */
export function usePropertyStats(propertyId: string) {
  return useQuery({
    queryKey: propertyKeys.stats(propertyId),
    queryFn: async () => {
      const response = await propertiesService.getProperties();
      if (!response.success) {
        throw new Error(response.message || 'Failed to fetch properties');
      }
      const property = response.data?.find(p => p.id === propertyId);
      if (!property) {
        throw new Error(`Property with ID ${propertyId} not found`);
      }
      return { 
        success: true, 
        data: {
          propertyId: property.id,
          totalReviews: property.totalReviews,
          averageRating: property.averageRating
        }
      };
    },
    enabled: !!propertyId,
    staleTime: 5 * 60 * 1000,
  });
}

/**
 * Hook for fetching properties with their statistics
 */
export function usePropertiesWithStats(params: PropertyQueryParams = {}) {
  return useQuery({
    queryKey: propertyKeys.withStats(params),
    queryFn: async () => {
      const response = await propertiesService.getProperties(params);
      if (!response.success) {
        throw new Error(response.message || 'Failed to fetch properties');
      }
      return { success: true, data: response.data || [] };
    },
    staleTime: 5 * 60 * 1000,
  });
}

/**
 * Hook for searching properties
 */
export function useSearchProperties(query: string, params: Omit<PropertyQueryParams, 'search'> = {}) {
  return useQuery({
    queryKey: propertyKeys.search(query, params),
    queryFn: async () => {
      const response = await propertiesService.getProperties({ ...params, search: query });
      if (!response.success) {
        throw new Error(response.message || 'Failed to search properties');
      }
      return { success: true, data: response.data || [] };
    },
    enabled: !!query && query.length >= 2,
    staleTime: 5 * 60 * 1000,
  });
}
