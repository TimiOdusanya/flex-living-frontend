import { AlertTriangle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ApiError } from '@/types/api';
import { normalizeError } from '@/lib/error-utils';

interface QueryErrorProps {
  error: ApiError | unknown;
  onRetry?: () => void;
  title?: string;
  description?: string;
  showDetails?: boolean;
}

/**
 * Component for displaying query errors with retry functionality
 * Provides consistent error UI across the application
 */
export function QueryError({ 
  error, 
  onRetry, 
  title = 'Something went wrong',
  description = 'An error occurred while loading data. Please try again.',
  showDetails = false
}: QueryErrorProps) {
  const normalizedError = normalizeError(error);
  
  const getErrorMessage = (error: ApiError): string => {
    if (error.status === 401) {
      return 'You are not authorized to access this resource.';
    }
    if (error.status === 403) {
      return 'You do not have permission to perform this action.';
    }
    if (error.status === 404) {
      return 'The requested resource was not found.';
    }
    if (error.status >= 500) {
      return 'Server error. Please try again later.';
    }
    return error.message || 'An unexpected error occurred.';
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <div className="flex justify-center mb-4">
          <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
            <AlertTriangle className="h-6 w-6 text-red-600" />
          </div>
        </div>
        <CardTitle className="text-xl font-semibold text-gray-900">
          {title}
        </CardTitle>
        <CardDescription>
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center">
          <p className="text-sm text-gray-600 mb-4">
            {getErrorMessage(normalizedError)}
          </p>
          
          {showDetails && process.env.NODE_ENV === 'development' && (
            <div className="p-3 bg-gray-100 rounded-md text-left">
              <p className="text-xs text-gray-500 mb-1">Error Details:</p>
              <p className="text-xs font-mono text-gray-700">
                Status: {normalizedError.status} | Code: {normalizedError.code}
              </p>
              {normalizedError.details && (
                <p className="text-xs font-mono text-gray-700 mt-1">
                  Details: {JSON.stringify(normalizedError.details, null, 2)}
                </p>
              )}
            </div>
          )}
        </div>
        
        {onRetry && (
          <Button onClick={onRetry} className="w-full">
            <RefreshCw className="h-4 w-4 mr-2" />
            Try Again
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
