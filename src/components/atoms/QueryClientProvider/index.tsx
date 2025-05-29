import React from 'react';
import {
  QueryClient,
  QueryClientProvider as Provider,
  MutationCache,
} from '@tanstack/react-query';
import {IS_DEV} from '~/utils/helper';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 3,
    },
  },
  mutationCache: new MutationCache({
    onError: (error, variables, context, mutation) => {
      if (IS_DEV) {
        console.log('mutationCache', error);
      }
      // Optional: handle global mutation errors here
    },
  }),
});

export default function QueryClientProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Provider client={queryClient}>{children}</Provider>;
}
