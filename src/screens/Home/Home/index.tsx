import dayjs from 'dayjs';
import React, {useCallback, useMemo, useRef, useState} from 'react';
import {StyleSheet, ViewToken} from 'react-native';
import {
  AppContainer,
  AppFlatList,
  HomeHeader,
  HomePostItem,
} from '~/components';
import {LiveType, SortEnumType} from '~/graphql/generated';
import {useGetLives} from '~/hooks/live';

export default function HomeScreen() {
  const [visibleIndex, setVisibleIndex] = useState<number | null>(null);
  const viewConfigRef = useRef({viewAreaCoveragePercentThreshold: 70});

  const today = useMemo(() => {
    return dayjs(new Date().toUTCString());
  }, []);

  const {
    data: getLives,
    isLoading: isLoadingGetLives,
    hasNextPage: hasNextPageLives,
    fetchNextPage: fetchNextPageLives,
    refetch: refetchGetLives,
    isRefetching: isRefetchingGetLives,
  } = useGetLives({
    where: {
      and: [
        {recordStarted: {eq: true}},
        {live: {liveType: {eq: LiveType.LiveContent}}},
        {
          or: [{live: {setSchedule: {eq: false}}}],
        },
      ],
    },
    order: {live: {createdDate: SortEnumType.Desc}},
  });

  const lives = useMemo(() => {
    return getLives?.pages || [];
  }, [getLives]);

  const onViewRef = useRef(({viewableItems}: {viewableItems: ViewToken[]}) => {
    if (viewableItems.length > 0) {
      setVisibleIndex(viewableItems[0]?.index ?? null);
    }
  });

  function onLoadMore() {
    if (hasNextPageLives) {
      fetchNextPageLives();
    }
  }

  const renderItem = useCallback(
    ({item, index}: {item: LiveDto; index: number}) => {
      return <HomePostItem {...{item, index, visibleIndex}} />;
    },
    [visibleIndex],
  );

  return (
    <AppContainer isLoading={isLoadingGetLives}>
      <HomeHeader />
      <AppFlatList
        data={lives}
        renderItem={renderItem}
        keyExtractor={(_, i) => String(i)}
        viewabilityConfig={viewConfigRef.current}
        onViewableItemsChanged={onViewRef.current}
        removeClippedSubviews
        contentContainerStyle={styles.contentContainerStyle}
        onEndReached={onLoadMore}
        refreshing={isRefetchingGetLives}
        onRefresh={refetchGetLives}
      />
    </AppContainer>
  );
}

const styles = StyleSheet.create({
  contentContainerStyle: {
    flexGrow: 1,
    paddingBottom: 48,
  },
});
