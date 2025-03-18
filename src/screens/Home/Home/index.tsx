import dayjs from 'dayjs';
import React, {useCallback, useEffect, useRef} from 'react';
import {StyleSheet, ViewToken} from 'react-native';
import Config from 'react-native-config';
import {AppContainer, AppFlatList, Box, HomePostItem} from '~/components';
import {
  useAgora_CreateTokenMutation,
  useAgora_GetAppIdQuery,
  useInfiniteAgora_GetRecordFilesQuery,
} from '~/graphql/generated';
import {agoraStore, homePostsStore} from '~/stores';
import {generateUuid} from '~/utils/helper';

export default function HomeScreen() {
  const {data: agoraData, isLoading} = useAgora_GetAppIdQuery({});
  const {mutate} = useAgora_CreateTokenMutation();
  console.log(Config.API_URL);
  // const {tempVideoData1, tempVideoData2} = useMockData();
  // const [preloading, setPreloading] = useState(null);
  const {
    setAppId,
    setToken,
    token,
    setTokenCreatedDate,
    tokenCreatedDate,
    setChannelName,
  } = agoraStore(state => state);
  const {data, hasNextPage, fetchNextPage} =
    useInfiniteAgora_GetRecordFilesQuery({take: 40});

  const dd = data?.pages
    ?.map(a => a?.agora_getRecordFiles?.result?.items)
    .flat();

  const viewConfigRef = useRef({viewAreaCoveragePercentThreshold: 50});
  // const onViewRef = useRef(({viewableItems}: {viewableItems: ViewToken[]}) => {
  //   if (viewableItems?.length > 0) {
  //     onViewableItemsY({viewableItems});
  //   }
  // });

  const onViewRef = useRef(({viewableItems}: {viewableItems: ViewToken[]}) => {
    if (viewableItems?.length > 0) {
      onViewableItemsY({viewableItems});
    }
  });

  const renderItem = useCallback(
    ({item, index}: {item: any; index: number}) => {
      return <HomePostItem {...{item, yIndex: index}} />;
    },
    [],
  );

  const itemSeparatorComponent = useCallback(() => <Box h={30} />, []);

  const keyExtractor = useCallback((item: any) => {
    return `itm${item?.id}`;
  }, []);

  useEffect(() => {
    init();
  }, [token]);

  useEffect(() => {
    if (agoraData?.agora_getAppId?.status?.code === 1) {
      setAppId(agoraData?.agora_getAppId?.result);
    }
  }, [agoraData]);

  const init = async () => {
    if (token) {
      const currentDate = dayjs();
      const tokenDate = dayjs(tokenCreatedDate);
      const isExpired = currentDate.diff(tokenDate, 'hour') >= 24;
      console.log('isExpired ===', isExpired);
      if (isExpired) {
        getNewToken();
      }
    } else {
      getNewToken();
    }
  };

  function getNewToken() {
    const uuid = generateUuid();
    mutate(
      {channelName: uuid, publisher: true},
      {
        onSuccess: successData => {
          console.log('successData-->', successData);
          if (successData?.agora_createToken?.status?.code === 1) {
            setChannelName(uuid);
            setToken(successData?.agora_createToken?.result);
            setTokenCreatedDate(Date.now());
          }
        },
      },
    );
  }

  function onLoadMore() {
    if (hasNextPage) {
      fetchNextPage();
    }
  }

  return (
    <AppContainer isLoading={isLoading}>
      {/* <FlashList
        data={data?.pages || []}
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
      {/* ----------------------------------home ---------- */}
      <AppFlatList
        data={dd || []}
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
        onEndReached={onLoadMore}
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
