import React, {useCallback, useMemo, useRef, useState} from 'react';
import {StyleSheet, ViewToken} from 'react-native';
import {
  AppContainer,
  AppFlatList,
  HomeHeader,
  HomePostItem,
  InviteFriendsCard,
  PeopleYouMayKnow,
  VStack,
} from '~/components';
import {SortEnumType, useInfiniteLive_GetLivesQuery} from '~/graphql/generated';

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
  } = useInfiniteLive_GetLivesQuery({
    where: {recordStarted: {eq: true}},
    order: {live: {createdDate: SortEnumType.Desc}},
  });

  const lives = useMemo(() => {
    return getLives?.pages?.map(a => a?.live_getLives?.result?.items).flat();
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

  const listFooterComponent = useCallback(() => {
    return (
      <VStack>
        <PeopleYouMayKnow />
        <InviteFriendsCard />
      </VStack>
    );
  }, []);

  return (
    <AppContainer isLoading={isLoadingGetLives}>
      <HomeHeader />
      <AppFlatList
        data={lives || []}
        renderItem={renderItem}
        keyExtractor={(_, i) => String(i)}
        viewabilityConfig={viewConfigRef.current}
        onViewableItemsChanged={onViewRef.current}
        removeClippedSubviews
        listFooterComponent={listFooterComponent}
        onEndReached={onLoadMore}
        contentContainerStyle={styles.contentContainerStyle}
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
