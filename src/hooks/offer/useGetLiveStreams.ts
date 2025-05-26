import { useInfiniteQuery, UseInfiniteQueryOptions } from '@tanstack/react-query';
import { fetcher } from '~/graphql/fetcher';
import {
  Live_GetLiveStreamsDocument,
  type Live_GetLiveStreamsQuery,
  type Live_GetLiveStreamsQueryVariables,
} from '~/graphql/generated';

export const useInfiniteLive_GetLiveStreamsQuery = <
  TData = Live_GetLiveStreamsQuery,
  TError = unknown,
>(
  variables?: Live_GetLiveStreamsQueryVariables,
  options?: UseInfiniteQueryOptions<Live_GetLiveStreamsQuery, TError, TData>,
) => {
  const take = variables?.take ?? 10;

  return useInfiniteQuery<Live_GetLiveStreamsQuery, TError, TData>({
    queryKey: variables
      ? ['live_getLiveStreams.infinite', variables]
      : ['live_getLiveStreams.infinite'],
    queryFn: async ({ pageParam = 0 }) =>
      await fetcher<Live_GetLiveStreamsQuery, Live_GetLiveStreamsQueryVariables>(
        Live_GetLiveStreamsDocument,
        {
          ...variables,
          skip: pageParam,
          take,
        },
      )() as Promise<Live_GetLiveStreamsQuery>,
    getNextPageParam: (lastPage, allPages) => {
      const lastItems = lastPage?.live_getLiveStreams?.result?.items ?? [];
      const totalCount = lastPage?.live_getLiveStreams?.result?.totalCount ?? 0;

      const fetchedCount = allPages.reduce((acc, page) => {
        const count = page.live_getLiveStreams?.result?.items?.length ?? 0;
        return acc + count;
      }, 0);

      return fetchedCount < totalCount ? fetchedCount : undefined;
    },
    ...options,
  });
};
