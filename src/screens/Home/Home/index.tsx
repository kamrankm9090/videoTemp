import React, {createRef, useCallback, useMemo, useRef, useState} from 'react';
import {FlatList, StyleSheet, ViewToken} from 'react-native';
import {
  AppContainer,
  AppFlatList,
  HomeHeader,
  HomePostItem,
} from '~/components';
import {SortEnumType} from '~/graphql/generated';
import {useGetLivesForHome} from '~/hooks/live';

export const homeFlatListRef = createRef<FlatList>();

export default function HomeScreen() {
  const [visibleIndex, setVisibleIndex] = useState<number | null>(null);
  const viewConfigRef = useRef({viewAreaCoveragePercentThreshold: 70});

  const {
    data: getLives,
    isLoading: isLoadingGetLives,
    hasNextPage: hasNextPageLives,
    fetchNextPage: fetchNextPageLives,
    refetch: refetchGetLives,
    isRefetching: isRefetchingGetLives,
  } = useGetLivesForHome({
    order: {live: {createdDate: SortEnumType.Desc}},
  });

  const lives = useMemo(() => {
    console.log("getLives?.pages", getLives?.pages);
    
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
        ref={homeFlatListRef}
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
