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
import {useInfiniteLive_GetLivesQuery} from '~/graphql/generated';

const data = [
  {
    id: 0,
    previewUrl:
      'https://klpmedia.blob.core.windows.net/klpmedia/files/BigBuckBunny.[0].mp4',
    title: 'Cs go_mc',
    description: 'a live stream where the person',
    viewCount: 34000,
    purchaseCount: 34500,
    isSave: false,
    isLive: false,
    user: {
      fullName: 'Kamran km',
      imageUrl: 'https://picsum.photos/200/300',
    },
  },
  {
    id: 1,
    previewUrl:
      'https://klpmedia.blob.core.windows.net/klpmedia/files/BigBuckBunny.[1].mp4',
    title: 'Cs go_mc',
    description: 'a live stream where the person',
    viewCount: 34000,
    purchaseCount: 34500,
    isSave: false,
    isLive: false,
    user: {
      fullName: 'David Beckham',
      imageUrl: 'https://picsum.photos/id/237/200/300',
    },
  },
  {
    id: 2,
    previewUrl:
      'https://klpmedia.blob.core.windows.net/klpmedia/files/BigBuckBunny.[3].mp4',
    title: 'Cs go_mc',
    description: 'a live stream where the person',
    viewCount: 34000,
    purchaseCount: 34500,
    isSave: false,
    isLive: false,
    user: {
      fullName: 'Cristiano Ronaldo',
      imageUrl: 'https://picsum.photos/seed/picsum/200/300',
    },
  },
];

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
  } = useInfiniteLive_GetLivesQuery();

  const lives = useMemo(() => {
    return getLives?.pages?.map(a => a?.live_getLives?.result?.items).flat();
  }, [getLives]);

  console.log('lives-->', lives);
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
    ({item, index}: {item: any; index: number}) => {
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
        data={data}
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
