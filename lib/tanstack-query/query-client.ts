// lib/query-client.ts
import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Global defaults — adjust to your needs
      staleTime: 1000 * 60,     // 1 minute
      gcTime: 1000 * 60 * 5,     // 5 minutes (garbage collection time)
      retry: 2,
      refetchOnWindowFocus: false, // usually better UX in dashboards
    },
  },
});