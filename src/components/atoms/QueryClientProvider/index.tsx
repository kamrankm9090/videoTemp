import React from 'react';
import {
  QueryClient,
  QueryClientProvider as Provider,
} from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 3,
    },
  },
});

export default function QueryClientProvider({
  children,
}: {
  children: ReactChildren;
}) {
  return <Provider client={queryClient}>{children}</Provider>;
}
