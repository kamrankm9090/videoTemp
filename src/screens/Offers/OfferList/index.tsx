import {useRoute} from '@react-navigation/native';
import React, {useCallback, useMemo, useState} from 'react';
import {StyleSheet} from 'react-native';
import {
  AppContainer,
  AppFlatList,
  AppHeader,
  LiveStreamItem,
  StreamItem,
  TrendingItem,
  UserCardItem,
} from '~/components';
import {
  useInfiniteUser_GetCastersToFollowQuery,
} from '~/graphql/generated';
import { useInfiniteLive_GetLiveStreamsQuery } from '~/hooks/offer/useGetLiveStreams';
import { useInfiniteLive_GetNewLivesQuery } from '~/hooks/offer/useGetNewLives';
import { useInfiniteLive_GetRecommendedLivesQuery } from '~/hooks/offer/useGetRecommendedLives';
import { useInfiniteLive_GetTrendingLivesQuery } from '~/hooks/offer/useGetTrendingLives';
import {Colors} from '~/styles';

const OfferList = () => {
  const route: any = useRoute();
  const currentTitle: string = route?.params?.item?.title;

  const QUERY_MAP: Record<string, any> = {
    'Live streams': useInfiniteLive_GetLiveStreamsQuery,
    Recommended: useInfiniteLive_GetRecommendedLivesQuery,
    Trending: useInfiniteLive_GetTrendingLivesQuery,
    'New Live': useInfiniteLive_GetNewLivesQuery,
    'People who may you know': useInfiniteUser_GetCastersToFollowQuery,
  };

  const queryHook = QUERY_MAP[currentTitle];
  const {data, hasNextPage, fetchNextPage, refetch, isRefetching} = queryHook
    ? queryHook()
    : {data: null, hasNextPage: false, fetchNextPage: () => {}, refetch: () => {}, isRefetching: false};

  const renderTrendingItem = useCallback(
    ({item}: any) => <TrendingItem item={item} />,
    [],
  );
  const renderStreamItem = useCallback(
    ({item}: any) => <StreamItem item={item} />,
    [],
  );
  const renderUserItem = useCallback(
    ({item}: any) => <UserCardItem user={item} />,
    [],
  );
  const renderLiveStreamItem = useCallback(
    ({item}: any) => <LiveStreamItem item={item} />,
    [],
  );

  const {items, renderItem, numColumns} = useMemo(() => {
    let result: any[] = [];

    if (!data) return {items: [], renderItem: () => null, numColumns: 1};

    switch (currentTitle) {
      case 'People who may you know':
        result = data?.pages?.[0]?.user_getCastersToFollow?.result?.items || [];
        return {items: result, renderItem: renderUserItem, numColumns: 2};

      case 'Recommended':
        result = data?.pages?.[0]?.live_getRecommendedLives?.result?.items || [];
        return {items: result, renderItem: renderStreamItem, numColumns: 1};

      case 'Trending':
        result = data?.pages?.[0]?.live_getTrendingLives?.result?.items || [];
        return {items: result, renderItem: renderTrendingItem, numColumns: 2};

      case 'New Live':
        result = data?.pages?.[0]?.live_getNewLives?.result?.items || [];
        return {items: result, renderItem: renderStreamItem, numColumns: 1};

      case 'Live streams':
        const pages = data?.pages || [];
        result = pages.flatMap(
          (p: any) => p?.live_getLiveStreams?.result?.items || [],
        );
        return {items: result, renderItem: renderLiveStreamItem, numColumns: 2};

      default:
        return {items: [], renderItem: () => null, numColumns: 1};
    }
  }, [
    data,
    currentTitle,
    renderUserItem,
    renderStreamItem,
    renderTrendingItem,
    renderLiveStreamItem,
  ]);

  return (
    <AppContainer>
      <AppHeader
        backAction
        title={currentTitle}
        backgroundColor={Colors.BACKGROUND}
        titleColor={Colors.WHITE}
      />
      <AppFlatList
        key={`${currentTitle}-${numColumns}`}
        numColumns={numColumns}
        data={items}
        contentContainerStyle={{marginTop: 20}}
        renderItem={renderItem}
        keyExtractor={(_, index) => `${currentTitle}-${index}`}
        onEndReached={() => {
          if (hasNextPage) fetchNextPage?.();
        }}
        refreshing={isRefetching}
        onRefresh={refetch}
      />
    </AppContainer>
  );
};

export default OfferList;

const styles = StyleSheet.create({});
