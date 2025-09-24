# API Architecture Documentation

This document outlines the new API architecture using React Query for better state management, error handling, and code organization.

## Architecture Overview

The API layer is structured into several layers:

1. **API Client** (`api-client.ts`) - Base HTTP client with interceptors
2. **Services** (`services/`) - Business logic and API calls
3. **Hooks** (`hooks/api/`) - React Query hooks for components
4. **Types** (`types/api.ts`) - TypeScript definitions
5. **Components** - Error boundaries and loading states

## Key Features

### ✅ Type Safety
- Comprehensive TypeScript types
- No `any` types used
- Proper error typing with `ApiError` interface

### ✅ Error Handling
- Centralized error handling in API client
- Consistent error UI components
- Retry mechanisms with exponential backoff

### ✅ Caching & Performance
- Intelligent caching with React Query
- Optimistic updates for mutations
- Background refetching for real-time data

### ✅ Code Organization
- Modular service structure
- Separation of concerns
- Reusable hooks and components

## Usage Examples

### Basic Query Hook
```typescript
import { useReviews } from '@/hooks/api';

function ReviewsList() {
  const { data, isLoading, error } = useReviews({ status: 'pending' });
  
  if (isLoading) return <LoadingSpinner />;
  if (error) return <QueryError error={error} />;
  
  return <div>{/* Render reviews */}</div>;
}
```

### Mutation Hook
```typescript
import { useApproveReview } from '@/hooks/api';

function ReviewActions({ reviewId }: { reviewId: number }) {
  const approveMutation = useApproveReview();
  
  const handleApprove = () => {
    approveMutation.mutate({ reviewId });
  };
  
  return (
    <Button 
      onClick={handleApprove}
      disabled={approveMutation.isPending}
    >
      {approveMutation.isPending ? 'Approving...' : 'Approve'}
    </Button>
  );
}
```

### Error Handling
```typescript
import { QueryError } from '@/components/query-error';

function ReviewsPage() {
  const { data, error, refetch } = useReviews();
  
  if (error) {
    return (
      <QueryError
        error={error}
        onRetry={() => refetch()}
        title="Failed to load reviews"
        description="Please try again"
      />
    );
  }
  
  return <div>{/* Render content */}</div>;
}
```

## Service Structure

### Auth Service
- `login()` - User authentication
- `register()` - User registration
- `getProfile()` - Get user profile
- `refreshToken()` - Refresh auth token
- `logout()` - User logout

### Reviews Service
- `getReviews()` - Get filtered reviews
- `getReviewsPaginated()` - Get paginated reviews
- `getApprovedReviews()` - Get approved reviews only
- `getPendingReviews()` - Get pending reviews
- `approveReview()` - Approve a review
- `rejectReview()` - Reject a review
- `bulkUpdateReviews()` - Bulk approve/reject
- `getDashboardStats()` - Get dashboard statistics

### Properties Service
- `getProperties()` - Get all properties
- `getPropertyById()` - Get single property
- `getPropertyStats()` - Get property statistics
- `getPropertiesWithStats()` - Get properties with stats
- `searchProperties()` - Search properties

## Query Keys


```typescript
// Auth keys
authKeys = {
  all: ['auth'],
  profile: () => ['auth', 'profile']
}

// Review keys
reviewKeys = {
  all: ['reviews'],
  lists: () => ['reviews', 'list'],
  list: (params) => ['reviews', 'list', params],
  detail: (id) => ['reviews', 'detail', id],
  stats: () => ['reviews', 'stats']
}
```

## Error Types

```typescript
interface ApiError {
  message: string;
  status: number;
  code: string;
  details?: unknown;
}
```


## Performance Considerations

- Queries are cached for 5-10 minutes by default
- Mutations automatically invalidate related queries
- Background refetching keeps data fresh
- Optimistic updates provide immediate feedback
- Retry logic handles temporary network issues
