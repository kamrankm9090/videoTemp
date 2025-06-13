import { useInfiniteQuery, UseInfiniteQueryOptions } from '@tanstack/react-query';
import { fetcher } from '~/graphql/fetcher';
import {
    Community_GetCommunityMessagesDocument,
  Live_GetLiveStreamsDocument,
  type Community_GetCommunityMessagesQuery,
  type Community_GetCommunityMessagesQueryVariables,
} from '~/graphql/generated';


export const useInfiniteCommunity_GetCommunityMessagesQuery = <
  TData = Community_GetCommunityMessagesQuery,
  TError = unknown,
>(
  variables?: Community_GetCommunityMessagesQueryVariables,
  options?: UseInfiniteQueryOptions<Community_GetCommunityMessagesQuery, TError, TData>,
) => {
  const take = variables?.take ?? 10;

  return useInfiniteQuery<Community_GetCommunityMessagesQuery, TError, TData>({
    queryKey: variables
      ?   ['community_getCommunityMessages.infinite', variables]
      : ['community_getCommunityMessages.infinite'],
    queryFn: async ({ pageParam = 0 }) => {
      const { communityId, where, order } = variables ?? {};
      if (communityId === undefined) {
        throw new Error('communityId is required');
      }
      return await fetcher<Community_GetCommunityMessagesQuery, Community_GetCommunityMessagesQueryVariables>(
        Community_GetCommunityMessagesDocument,
        {
          communityId,
          where,
          order,
          skip: pageParam,
          take,
        },
      )() as Promise<Community_GetCommunityMessagesQuery>;
    },
    getNextPageParam: (lastPage, allPages) => {
      const lastItems = lastPage?.community_getCommunityMessages?.result?.items ?? [];
      const totalCount = lastPage?.community_getCommunityMessages?.result?.totalCount ?? 0;

      const fetchedCount = allPages.reduce((acc, page) => {
        const count = page.community_getCommunityMessages?.result?.items?.length ?? 0;
        return acc + count;
      }, 0);

      return fetchedCount < totalCount ? fetchedCount : undefined;
    },
    ...options,
  });
};
