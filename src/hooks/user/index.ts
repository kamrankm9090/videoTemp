import {useInfiniteQuery, UseInfiniteQueryOptions} from '@tanstack/react-query';
import {PAGE_SIZE} from '~/constants/constants';
import {queryKeys} from '~/constants/queryKeys';
import {fetcher} from '~/graphql/fetcher';
import {
  FollowerFolloweeDtoFilterInput,
  FollowerFolloweeDtoSortInput,
  Scalars,
  Social_GetUserFollowerFolloweesDocument,
  Social_GetUserFollowerFolloweesQuery,
  Social_GetUserFollowerFolloweesQueryVariables,
} from '~/graphql/generated';

export const useGetFollowerFollowings = ({
  where,
  take = PAGE_SIZE,
  order,
  options = {},
  userId,
  isFollower = true,
}: {
  where?: FollowerFolloweeDtoFilterInput;
  order?: Array<FollowerFolloweeDtoSortInput> | FollowerFolloweeDtoSortInput;
  options?: UseInfiniteQueryOptions<Social_GetUserFollowerFolloweesQuery>;
  take?: number;
  userId: Scalars['Int']['input'];
  isFollower: boolean;
}) => {
  return useInfiniteQuery<
    Social_GetUserFollowerFolloweesQuery,
    any,
    Social_GetUserFollowerFolloweesQueryVariables,
    any
  >(
    [queryKeys.getFollowerFollowings, isFollower],
    async ({pageParam = 0}) => {
      return fetcher(Social_GetUserFollowerFolloweesDocument, {
        skip: pageParam * PAGE_SIZE,
        take,
        where,
        order,
        userId,
      })();
    },
    {
      getNextPageParam: (
        lastPage: Social_GetUserFollowerFolloweesQuery,
        allPages: Social_GetUserFollowerFolloweesQuery[],
      ) => {
        if (
          lastPage?.social_getUserFollowerFollowees?.result?.pageInfo
            ?.hasNextPage
        ) {
          return allPages.length;
        }
        return undefined;
      },
      select: data => {
        return {
          ...data,
          pages: data?.pages
            ?.map(a => a?.social_getUserFollowerFollowees?.result?.items)
            .flat(),
        };
      },

      ...options,
    },
  );
};
