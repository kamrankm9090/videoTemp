import { useInfiniteQuery, UseInfiniteQueryOptions } from '@tanstack/react-query';
import { fetcher } from '~/graphql/fetcher';
import {
  Live_GetRecommendedLivesDocument,
  type Live_GetRecommendedLivesQuery,
  type Live_GetRecommendedLivesQueryVariables,
} from '~/graphql/generated';

export const useInfiniteLive_GetRecommendedLivesQuery = <
  TData = Live_GetRecommendedLivesQuery,
  TError = unknown,
>(
  variables?: Live_GetRecommendedLivesQueryVariables,
  options?: UseInfiniteQueryOptions<Live_GetRecommendedLivesQuery, TError, TData>,
) => {
  const take = variables?.take ?? 10;

  return useInfiniteQuery<Live_GetRecommendedLivesQuery, TError, TData>({
    queryKey: variables
      ? ['live_getRecommendedLives.infinite', variables]
      : ['live_getRecommendedLives.infinite'],
    queryFn: ({ pageParam = 0 }) =>
      fetcher<Live_GetRecommendedLivesQuery, Live_GetRecommendedLivesQueryVariables>(
        Live_GetRecommendedLivesDocument,
        {
          ...variables,
          skip: pageParam,
          take,
        },
      )() as Promise<Live_GetRecommendedLivesQuery>,
    getNextPageParam: (lastPage, allPages) => {
      const lastItems = lastPage?.live_getRecommendedLives?.result?.items ?? [];
      const totalCount = lastPage?.live_getRecommendedLives?.result?.totalCount ?? 0;

      const fetchedCount = allPages.reduce((acc, page) => {
        const items = page.live_getRecommendedLives?.result?.items;
        return acc + (items?.length ?? 0);
      }, 0);

      console.log('Recommended Lives:', { totalCount, fetchedCount });

      return fetchedCount < totalCount ? fetchedCount : undefined;
    },
    ...options,
  });
};
