import { useInfiniteQuery, UseInfiniteQueryOptions } from '@tanstack/react-query';
import { fetcher } from '~/graphql/fetcher';
import {
  Live_GetNewLivesDocument,
  type Live_GetNewLivesQuery,
  type Live_GetNewLivesQueryVariables,
} from '~/graphql/generated';

export const useInfiniteLive_GetNewLivesQuery = <
  TData = Live_GetNewLivesQuery,
  TError = unknown,
>(
  variables?: Live_GetNewLivesQueryVariables,
  options?: UseInfiniteQueryOptions<Live_GetNewLivesQuery, TError, TData>,
) => {
  const take = variables?.take ?? 10;

  return useInfiniteQuery<Live_GetNewLivesQuery, TError, TData>({
    queryKey: variables
      ? ['live_getNewLives.infinite', variables]
      : ['live_getNewLives.infinite'],
    queryFn: ({ pageParam = 0 }) =>
      fetcher<Live_GetNewLivesQuery, Live_GetNewLivesQueryVariables>(
        Live_GetNewLivesDocument,
        {
          ...variables,
          skip: pageParam,
          take,
        },
      )() as Promise<Live_GetNewLivesQuery>,
    getNextPageParam: (lastPage, allPages) => {
      const totalCount = lastPage?.live_getNewLives?.result?.totalCount ?? 0;

      const fetchedCount = allPages.reduce((sum, page) => {
        const items = page.live_getNewLives?.result?.items;
        return sum + (items?.length ?? 0);
      }, 0);

      console.log('New Lives:', { totalCount, fetchedCount });

      return fetchedCount < totalCount ? fetchedCount : undefined;
    },
    ...options,
  });
};
