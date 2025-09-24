import { ApiError } from '@/types/api';

/**
 * Utility function to safely handle errors from React Query
 * Ensures we always have a properly typed ApiError object
 */
export function normalizeError(error: unknown): ApiError {
  if (error && typeof error === 'object' && 'message' in error && 'status' in error && 'code' in error) {
    return error as ApiError;
  }


  if (error instanceof Error) {
    return {
      message: error.message,
      status: 0,
      code: 'UNKNOWN_ERROR',
      details: null,
    };
  }


  if (error && typeof error === 'object') {
    const errorObj = error as Record<string, unknown>;
    return {
      message: (errorObj.message as string) || 'An unknown error occurred',
      status: (errorObj.status as number) || 0,
      code: (errorObj.code as string) || 'UNKNOWN_ERROR',
      details: errorObj.details ? String(errorObj.details) : null,
    };
  }


  return {
    message: 'An unexpected error occurred',
    status: 0,
    code: 'UNKNOWN_ERROR',
    details: error ? String(error) : null,
  };
}


export function logError(context: string, error: unknown): void {
  const normalizedError = normalizeError(error);
  console.error(`${context}:`, {
    message: normalizedError.message,
    status: normalizedError.status,
    code: normalizedError.code,
    details: normalizedError.details,
  });
}
