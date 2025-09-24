import { create } from 'zustand';
import { NormalizedReview, ReviewFilters, DashboardStats, Property } from '@/types';

interface ReviewState {
  reviews: NormalizedReview[];
  properties: Property[];
  stats: DashboardStats | null;
  filters: ReviewFilters;
  loading: boolean;
  error: string | null;
  setReviews: (reviews: NormalizedReview[]) => void;
  setProperties: (properties: Property[]) => void;
  setStats: (stats: DashboardStats) => void;
  setFilters: (filters: Partial<ReviewFilters>) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  updateReview: (reviewId: number, updates: Partial<NormalizedReview>) => void;
}

export const useReviewStore = create<ReviewState>((set) => ({
  reviews: [],
  properties: [],
  stats: null,
  filters: {},
  loading: false,
  error: null,
  setReviews: (reviews) => set({ reviews }),
  setProperties: (properties) => set({ properties }),
  setStats: (stats) => set({ stats }),
  setFilters: (filters) => set((state) => ({ filters: { ...state.filters, ...filters } })),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
  updateReview: (reviewId, updates) =>
    set((state) => ({
      reviews: state.reviews.map((review) =>
        review.id === reviewId ? { ...review, ...updates } : review
      ),
    })),
}));
