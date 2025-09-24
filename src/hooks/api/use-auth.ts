import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { authService, LoginCredentials, RegisterData } from '@/services/auth.service';
import { useAuthStore } from '@/store/authStore';
import { useRouter } from 'next/navigation';
import { logError } from '@/lib/error-utils';

// Query keys for auth-related queries
export const authKeys = {
  all: ['auth'] as const,
  profile: () => [...authKeys.all, 'profile'] as const,
};

/**
 * Hook for user login
 * Handles authentication state updates and navigation
 */
export function useLogin() {
  const { login } = useAuthStore();
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (credentials: LoginCredentials) => authService.login(credentials),
    onSuccess: (response) => {
      if (response.success && response.data) {
        login(response.data.user, response.data.token);
        queryClient.invalidateQueries({ queryKey: authKeys.all });
        router.push('/manager/dashboard');
      }
    },
    onError: (error: unknown) => {
      logError('Login failed', error);
    },
  });
}

/**
 * Hook for user registration
 */
export function useRegister() {
  const { login } = useAuthStore();
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (userData: RegisterData) => authService.register(userData),
    onSuccess: (response) => {
      if (response.success && response.data) {
        login(response.data.user, response.data.token);
        queryClient.invalidateQueries({ queryKey: authKeys.all });
        router.push('/manager/dashboard');
      }
    },
    onError: (error: unknown) => {
      logError('Registration failed', error);
    },
  });
}

/**
 * Hook for getting user profile
 * Automatically refetches when auth state changes
 */
export function useProfile() {
  const { isAuthenticated } = useAuthStore();

  return useQuery({
    queryKey: authKeys.profile(),
    queryFn: () => authService.getProfile(),
    enabled: isAuthenticated,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

/**
 * Hook for user logout
 * Clears auth state and invalidates all queries
 */
export function useLogout() {
  const { logout } = useAuthStore();
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => authService.logout(),
    onSuccess: () => {
      logout();
      queryClient.clear();
      router.push('/manager/login');
    },
    onError: (error: unknown) => {
      logError('Logout failed', error);
      // Still logout locally even if server request fails
      logout();
      queryClient.clear();
      router.push('/manager/login');
    },
  });
}

/**
 * Hook for refreshing authentication token
 */
export function useRefreshToken() {
  const { logout } = useAuthStore();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => authService.refreshToken(),
    onSuccess: (response) => {
      if (response.success && response.data) {
        // Update token in store (you might need to modify your store to handle this)
        queryClient.invalidateQueries({ queryKey: authKeys.all });
      }
    },
    onError: (error: unknown) => {
      logError('Token refresh failed', error);
      // If refresh fails, logout user
      logout();
      queryClient.clear();
    },
  });
}
