import {FlashList} from '@shopify/flash-list';
import React, {useCallback, useRef, useState} from 'react';
import {StyleSheet, ViewToken} from 'react-native';
import {AppContainer, AppFlatList, Box, HomePostItem} from '~/components';
import {useMockData} from '~/constants/mockData';
import {homePostsStore} from '~/stores';

export default function HomeScreen() {
  const {tempVideoData1, tempVideoData2} = useMockData();
  const [preloading, setPreloading] = useState(null);

  const viewConfigRef = useRef({viewAreaCoveragePercentThreshold: 50});
  // const onViewRef = useRef(({viewableItems}: {viewableItems: ViewToken[]}) => {
  //   if (viewableItems?.length > 0) {
  //     onViewableItemsY({viewableItems});
  //   }
  // });

  const onViewRef = useRef(({viewableItems}: {viewableItems: ViewToken[]}) => {
    if (viewableItems?.length > 0) {
      onViewableItemsY({viewableItems});

      // Preload the next video
      const nextItemIndex = viewableItems[0].index + 1;
      if (
        tempVideoData2 &&
        tempVideoData2[nextItemIndex] &&
        tempVideoData2[nextItemIndex].url &&
        preloading !== tempVideoData2[nextItemIndex].url
      ) {
        setPreloading(tempVideoData2[nextItemIndex].url);
      }
    }
  });

  const renderItem = useCallback(
    ({item, index}: {item: any; index: number}) => {
      return <HomePostItem {...{item, yIndex: index, preloading}} />;
    },
    [preloading],
  );

  const itemSeparatorComponent = useCallback(() => <Box h={30} />, []);

  const keyExtractor = useCallback((item: {id?: number; url?: string}) => {
    return `itm${item?.id}`;
  }, []);

  return (
    <AppContainer>
      {/* <FlashList
        data={tempVideoData2 || []}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        ItemSeparatorComponent={itemSeparatorComponent}
        contentContainerStyle={styles.contentContainerStyle}
        viewabilityConfig={viewConfigRef?.current}
        onViewableItemsChanged={onViewRef.current}
        // disableVirtualization={false}
        horizontal={false}
        // maxToRenderPerBatch={5}
        // initialNumToRender={5}
        removeClippedSubviews={true}
        decelerationRate="fast"
        onEndReachedThreshold={0.5}
        overScrollMode="never"
        scrollEventThrottle={16}
        bounces={false}
        // windowSize={5}
      /> */}
      <AppFlatList
        data={tempVideoData2 || []}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        ItemSeparatorComponent={itemSeparatorComponent}
        contentContainerStyle={styles.contentContainerStyle}
        viewabilityConfig={viewConfigRef?.current}
        onViewableItemsChanged={onViewRef.current}
        disableVirtualization={false}
        horizontal={false}
        maxToRenderPerBatch={5}
        initialNumToRender={5}
        removeClippedSubviews={true}
        decelerationRate="fast"
        onEndReachedThreshold={0.5}
        overScrollMode="never"
        scrollEventThrottle={16}
        bounces={false}
        windowSize={5}
      />
    </AppContainer>
  );
}

const styles = StyleSheet.create({
  contentContainerStyle: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 300,
  },
});

export const onViewableItemsY = ({
  viewableItems,
}: {
  viewableItems: ViewToken[];
}) => {
  if (viewableItems?.length > 0) {
    const yIndex = viewableItems[0]?.index;
    homePostsStore.currentYIndex = yIndex;
    let tempMultiItems = [...homePostsStore.multiItems];
    const findIndex = tempMultiItems?.findIndex(
      el => el?.currentYIndex === yIndex,
    );
    if (findIndex <= 0) {
      homePostsStore.multiItems = [
        ...tempMultiItems,
        {
          currentYIndex: yIndex,
          currentXIndex: 0,
        },
      ];
    }
  }
};

/*

 <Animated.FlatList
        ref={scrollRef}
        data={data || []}
        // extraData={extraData}
        bounces={false}
        // onScroll={onScroll}
        // stickyHeaderIndices={[0]}
        // ListHeaderComponent={renderHeader}
        ItemSeparatorComponent={itemSeparatorComponent}
        renderItem={renderItem}
        // viewabilityConfig={viewConfigRef?.current}
        // onViewableItemsChanged={onViewRef.current}
        keyExtractor={keyExtractor}
        // style={styles(tabBarHeight).contentContainerStyle}
        // onRefresh={onRefresh}
        // refreshing={isRefetching || isRefetchingAds}
        // nestedScrollEnabled
        initialNumToRender={3}
        maxToRenderPerBatch={5}
        windowSize={5}
        onEndReachedThreshold={0.5}
        scrollEventThrottle={16}
        removeClippedSubviews={isAndroid}
        // onEndReached={({distanceFromEnd}) => {
        //   if (distanceFromEnd < 0) {
        //     return;
        //   }
        //   onLoadMore();
        // }}
        // ListFooterComponent={renderFooter}
        // ListEmptyComponent={
        //   isLoading ? <HomePostsTabPlaceHolder /> : <EmptyData />
        // }
      />

      <VStack flex={1} bg="red" alignItems="center" justifyContent="center">
        <Video
          // Can be a URL or a local file.
          source={{
            uri: 'https://www.shutterstock.com/shutterstock/videos/1103477533/preview/stock-footage-lorem-ipsum-animated-text-animation-lorem-ipsum-intro-your-video.mp4',
          }}
          repeat
          resizeMode="cover"
          // paused={false}
          // Store reference
          ref={videoRef}
          controls={true}
          poster={''}
          controlsStyles={{
            hidePrevious: true,
            hideRewind: true,
            hideFullscreen: true,
            hideDuration: true,
            hidePlayPause: true,
          }}
          // Callback when remote video is buffering
          // onBuffer={onBuffer}
          // Callback when video cannot be loaded
          // onError={onError}
          style={{
            // position: 'absolute',
            // top: 0,
            // left: 0,
            // bottom: 0,
            // right: 0,
            height: 200,
            width: 400,
            backgroundColor: 'green',
          }}
        />
      </VStack>

*/
