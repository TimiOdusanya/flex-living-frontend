import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { reviewsService, ReviewQueryParams, ReviewApprovalData } from '@/services/reviews.service';
import { ApiError, ApiResponse } from '@/types/api';
import { NormalizedReview } from '@/types';

// Query keys for review-related queries
export const reviewKeys = {
  all: ['reviews'] as const,
  lists: () => [...reviewKeys.all, 'list'] as const,
  list: (params: ReviewQueryParams) => [...reviewKeys.lists(), params] as const,
  details: () => [...reviewKeys.all, 'detail'] as const,
  detail: (id: number) => [...reviewKeys.details(), id] as const,
  stats: () => [...reviewKeys.all, 'stats'] as const,
  property: (propertyId: string) => [...reviewKeys.all, 'property', propertyId] as const,
};

/**
 * Hook for fetching reviews with filters
 */
export function useReviews(params: ReviewQueryParams = {}) {
  return useQuery({
    queryKey: reviewKeys.list(params),
    queryFn: () => reviewsService.getReviews(params),
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
}

/**
 * Hook for fetching paginated reviews
 */
export function useReviewsPaginated(params: ReviewQueryParams = {}) {
  return useQuery({
    queryKey: [...reviewKeys.list(params), 'paginated'],
    queryFn: () => reviewsService.getReviewsPaginated(params),
    staleTime: 2 * 60 * 1000,
  });
}

/**
 * Hook for fetching approved reviews
 */
export function useApprovedReviews(propertyId?: string) {
  return useQuery({
    queryKey: [...reviewKeys.all, 'approved', propertyId],
    queryFn: () => reviewsService.getApprovedReviews(propertyId),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

/**
 * Hook for fetching pending reviews
 */
export function usePendingReviews() {
  return useQuery({
    queryKey: [...reviewKeys.all, 'pending'],
    queryFn: () => reviewsService.getPendingReviews(),
    staleTime: 1 * 60 * 1000, // 1 minute
  });
}

/**
 * Hook for fetching a single review by ID
 */
export function useReview(reviewId: number) {
  return useQuery({
    queryKey: reviewKeys.detail(reviewId),
    queryFn: () => reviewsService.getReviewById(reviewId),
    enabled: !!reviewId,
    staleTime: 5 * 60 * 1000,
  });
}

/**
 * Hook for fetching reviews by property
 */
export function useReviewsByProperty(propertyId: string, params: Omit<ReviewQueryParams, 'propertyId'> = {}) {
  return useQuery({
    queryKey: reviewKeys.property(propertyId),
    queryFn: () => reviewsService.getReviewsByProperty(propertyId, params),
    enabled: !!propertyId,
    staleTime: 2 * 60 * 1000,
  });
}

/**
 * Hook for approving a review
 */
export function useApproveReview() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ reviewId, reason }: { reviewId: number; reason?: string }) =>
      reviewsService.approveReview(reviewId, reason),
    onSuccess: (_, variables) => {
      // Invalidate all review queries to refetch updated data
      queryClient.invalidateQueries({ queryKey: reviewKeys.all });
      // Optimistically update the specific review
      queryClient.setQueryData(
        reviewKeys.detail(variables.reviewId),
        (oldData: ApiResponse<NormalizedReview> | undefined) => {
          if (oldData?.success && oldData.data) {
            return {
              ...oldData,
              data: {
                ...oldData.data,
                isApproved: true,
                status: 'published' as const,
              },
            };
          }
          return oldData;
        }
      );
    },
    onError: (error: ApiError) => {
      console.error('Failed to approve review:', error);
    },
  });
}

/**
 * Hook for rejecting a review
 */
export function useRejectReview() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ reviewId, reason }: { reviewId: number; reason?: string }) =>
      reviewsService.rejectReview(reviewId, reason),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: reviewKeys.all });
      queryClient.setQueryData(
        reviewKeys.detail(variables.reviewId),
        (oldData: ApiResponse<NormalizedReview> | undefined) => {
          if (oldData?.success && oldData.data) {
            return {
              ...oldData,
              data: {
                ...oldData.data,
                isApproved: false,
                status: 'rejected' as const,
              },
            };
          }
          return oldData;
        }
      );
    },
    onError: (error: ApiError) => {
      console.error('Failed to reject review:', error);
    },
  });
}

/**
 * Hook for bulk updating reviews
 */
export function useBulkUpdateReviews() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (updates: ReviewApprovalData[]) => reviewsService.bulkUpdateReviews(updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: reviewKeys.all });
    },
    onError: (error: ApiError) => {
      console.error('Failed to bulk update reviews:', error);
    },
  });
}

/**
 * Hook for fetching dashboard statistics
 */
export function useDashboardStats() {
  return useQuery({
    queryKey: reviewKeys.stats(),
    queryFn: () => reviewsService.getDashboardStats(),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}
