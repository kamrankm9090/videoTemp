import {useInfiniteQuery} from '@tanstack/react-query';
import {PAGE_SIZE} from '~/constants/constants';
import {queryKeys} from '~/constants/queryKeys';
import {fetcher} from '~/graphql/fetcher';
import {
  Live_GetLivesDocument,
  Live_GetLivesQuery,
  Live_GetLivesQueryVariables,
  LiveDtoFilterInput,
  LiveDtoSortInput,
} from '~/graphql/generated';

export const useGetLives = ({
  where,
  take = PAGE_SIZE,
  order,
  options = {},
  category,
}: {
  where?: LiveDtoFilterInput;
  order?: Array<LiveDtoSortInput> | LiveDtoSortInput;
  options?: any;
  take?: number;
  category?: string;
}) => {
  return useInfiniteQuery<
    Live_GetLivesQuery,
    any,
    Live_GetLivesQueryVariables,
    any
  >(
    [queryKeys.getLives, where, take, order, category],
    async ({pageParam = 0}) => {
      return fetcher(Live_GetLivesDocument, {
        skip: pageParam * PAGE_SIZE,
        take,
        where,
        order,
        category,
      })();
    },
    {
      getNextPageParam: (
        lastPage: Live_GetLivesQuery,
        allPages: Live_GetLivesQuery[],
      ) => {
        if (lastPage?.live_getLives?.result?.pageInfo?.hasNextPage) {
          return allPages.length;
        }
        return undefined;
      },
      select: data => {
        return {
          ...data,
          pages: data?.pages?.map(a => a?.live_getLives?.result?.items).flat(),
        };
      },
      ...options,
    },
  );
};
