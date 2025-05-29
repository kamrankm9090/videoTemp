import { useInfiniteQuery, UseInfiniteQueryOptions } from '@tanstack/react-query';
import { fetcher } from '~/graphql/fetcher';
import {
  Live_GetTrendingLivesDocument,
  type Live_GetTrendingLivesQuery,
  type Live_GetTrendingLivesQueryVariables,
} from '~/graphql/generated';

export const useInfiniteLive_GetTrendingLivesQuery = <
  TData = Live_GetTrendingLivesQuery,
  TError = unknown,
>(
  variables?: Live_GetTrendingLivesQueryVariables,
  options?: UseInfiniteQueryOptions<Live_GetTrendingLivesQuery, TError, TData>,
) => {
  const take = variables?.take ?? 10;

  return useInfiniteQuery<Live_GetTrendingLivesQuery, TError, TData>({
    queryKey: variables
      ? ['live_getTrendingLives.infinite', variables]
      : ['live_getTrendingLives.infinite'],
    queryFn: async ({ pageParam = 0 }) =>
      await fetcher<Live_GetTrendingLivesQuery, Live_GetTrendingLivesQueryVariables>(
        Live_GetTrendingLivesDocument,
        {
          ...variables,
          skip: pageParam,
          take,
        },
      )() as Promise<Live_GetTrendingLivesQuery>,
    getNextPageParam: (lastPage, allPages) => {
      const totalCount = lastPage?.live_getTrendingLives?.result?.totalCount ?? 0;

      const fetchedCount = allPages.reduce((sum, page) => {
        const items = page.live_getTrendingLives?.result?.items;
        return sum + (items?.length ?? 0);
      }, 0);

      return fetchedCount < totalCount ? fetchedCount : undefined;
    },
    ...options,
  });
};
