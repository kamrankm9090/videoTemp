import React from 'react';
import {StyleSheet} from 'react-native';
import {AppLogo, Message, Notification, Search} from '~/assets/svgs';
import {
  AppContainer,
  AppFlatList,
  AppTouchable,
  HomePostItem,
  HStack,
  ScreensHeader,
} from '~/components';

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
  function searchOnPress() {}
  function messageOnPress() {}
  function notificationOnPress() {}

  function renderItem({item}: any) {
    return <HomePostItem {...{item}} />;
  }

  return (
    <AppContainer>
      <ScreensHeader
        leftHeader={<AppLogo height={27} width={63} />}
        rightHeader={
          <HStack space={16}>
            <AppTouchable onPress={searchOnPress}>
              <Search />
            </AppTouchable>
            <AppTouchable onPress={messageOnPress}>
              <Message />
            </AppTouchable>
            <AppTouchable onPress={notificationOnPress}>
              <Notification />
            </AppTouchable>
          </HStack>
        }
      />
      <AppFlatList
        data={data}
        renderItem={renderItem}
        contentContainerStyle={styles.contentContainerStyle}
      />
    </AppContainer>
  );
}

const styles = StyleSheet.create({
  contentContainerStyle: {flexGrow: 1, paddingHorizontal: 16},
});

// import dayjs from 'dayjs';
// import React, {useCallback, useEffect, useRef} from 'react';
// import {StyleSheet, ViewToken} from 'react-native';
// import Config from 'react-native-config';
// import {
//   AppContainer,
//   AppFlatList,
//   AppVideoPlayer,
//   Box,
//   HomePostItem,
//   VStack,
// } from '~/components';
// import {
//   useAgora_CreateTokenMutation,
//   useAgora_GetAppIdQuery,
//   useInfiniteAgora_GetRecordFilesQuery,
// } from '~/graphql/generated';
// import {agoraStore, homePostsStore} from '~/stores';
// import {generateUuid, getFullImageUrl} from '~/utils/helper';
// import IVSPlayer from 'amazon-ivs-react-native-player';
// import config from '~/config';

// const URL =
//   // '0000000026/e5561cebaa421c82a3d1459241bfac90_a956938915094327904b718cf20c8388.m3u8';
//   '0000000028/5b51bbf2d74bcf6c0ce542afc6745a03_adaadd13f09145ae95e866864b63f7d4.m3u8';

// export default function HomeScreen() {
//   const {data: agoraData, isLoading} = useAgora_GetAppIdQuery({});
//   const {mutate} = useAgora_CreateTokenMutation();
//   console.log(Config.API_URL);
//   // const {tempVideoData1, tempVideoData2} = useMockData();
//   // const [preloading, setPreloading] = useState(null);
//   const {
//     setAppId,
//     setToken,
//     token,
//     setTokenCreatedDate,
//     tokenCreatedDate,
//     setChannelName,
//   } = agoraStore(state => state);
//   const {data, hasNextPage, fetchNextPage} =
//     useInfiniteAgora_GetRecordFilesQuery({take: 40});

//   const dd = data?.pages
//     ?.map(a => a?.agora_getRecordFiles?.result?.items)
//     .flat();

//   console.log('dd-->', dd);

//   const viewConfigRef = useRef({viewAreaCoveragePercentThreshold: 50});
//   // const onViewRef = useRef(({viewableItems}: {viewableItems: ViewToken[]}) => {
//   //   if (viewableItems?.length > 0) {
//   //     onViewableItemsY({viewableItems});
//   //   }
//   // });

//   const onViewRef = useRef(({viewableItems}: {viewableItems: ViewToken[]}) => {
//     if (viewableItems?.length > 0) {
//       onViewableItemsY({viewableItems});
//     }
//   });

//   const renderItem = useCallback(
//     ({item, index}: {item: any; index: number}) => {
//       return <HomePostItem {...{item, yIndex: index}} />;
//     },
//     [],
//   );

//   const itemSeparatorComponent = useCallback(() => <Box h={30} />, []);

//   const keyExtractor = useCallback((item: any) => {
//     return `itm${item?.id}`;
//   }, []);

//   useEffect(() => {
//     init();
//   }, [token]);

//   useEffect(() => {
//     if (agoraData?.agora_getAppId?.status?.code === 1) {
//       setAppId(agoraData?.agora_getAppId?.result);
//     }
//   }, [agoraData]);

//   const init = async () => {
//     if (token) {
//       const currentDate = dayjs();
//       const tokenDate = dayjs(tokenCreatedDate);
//       const isExpired = currentDate.diff(tokenDate, 'hour') >= 24;
//       console.log('isExpired ===', isExpired);
//       if (isExpired) {
//         getNewToken();
//       }
//     } else {
//       getNewToken();
//     }
//   };

//   function getNewToken() {
//     const uuid = generateUuid();
//     mutate(
//       {channelName: uuid, publisher: true},
//       {
//         onSuccess: successData => {
//           console.log('successData-->', successData);
//           if (successData?.agora_createToken?.status?.code === 1) {
//             setChannelName(uuid);
//             setToken(successData?.agora_createToken?.result);
//             setTokenCreatedDate(Date.now());
//           }
//         },
//       },
//     );
//   }

//   function onLoadMore() {
//     if (hasNextPage) {
//       fetchNextPage();
//     }
//   }

//   return (
//     <AppContainer isLoading={isLoading}>
//       {/* <FlashList
//         data={data?.pages || []}
//         renderItem={renderItem}
//         keyExtractor={keyExtractor}
//         ItemSeparatorComponent={itemSeparatorComponent}
//         contentContainerStyle={styles.contentContainerStyle}
//         viewabilityConfig={viewConfigRef?.current}
//         onViewableItemsChanged={onViewRef.current}
//         // disableVirtualization={false}
//         horizontal={false}
//         // maxToRenderPerBatch={5}
//         // initialNumToRender={5}
//         removeClippedSubviews={true}
//         decelerationRate="fast"
//         onEndReachedThreshold={0.5}
//         overScrollMode="never"
//         scrollEventThrottle={16}
//         bounces={false}
//         // windowSize={5}
//       /> */}
//       {/* ----------------------------------home ---------- */}
//       <VStack bg="lightblue" w="100%" h={400}>
//         {/* <IVSPlayer
//           playbackRate={1}
//           style={{
//             // backgroundColor: 'lightblue',
//             height: 100,
//             width: '100%',
//           }}
//           streamUrl={getFullImageUrl(URL)}
//           paused={false}
//           autoplay={true}
//           resizeMode="aspectFit"
//           loop={true}
//         /> */}
//         <AppVideoPlayer
//           source={{uri: getFullImageUrl(URL)}}
//           style={{
//             // backgroundColor: 'lightblue',
//             height: 300,
//             width: '100%',
//           }}
//         />
//       </VStack>
//       {/* <AppFlatList
//         data={dd || []}
//         renderItem={renderItem}
//         keyExtractor={keyExtractor}
//         ItemSeparatorComponent={itemSeparatorComponent}
//         contentContainerStyle={styles.contentContainerStyle}
//         viewabilityConfig={viewConfigRef?.current}
//         onViewableItemsChanged={onViewRef.current}
//         disableVirtualization={false}
//         horizontal={false}
//         maxToRenderPerBatch={5}
//         initialNumToRender={5}
//         removeClippedSubviews={true}
//         decelerationRate="fast"
//         onEndReachedThreshold={0.5}
//         overScrollMode="never"
//         scrollEventThrottle={16}
//         bounces={false}
//         windowSize={5}
//         onEndReached={onLoadMore}
//       /> */}
//     </AppContainer>
//   );
// }

// const styles = StyleSheet.create({
//   contentContainerStyle: {
//     flexGrow: 1,
//     paddingHorizontal: 24,
//     paddingTop: 16,
//     paddingBottom: 300,
//   },
// });

// export const onViewableItemsY = ({
//   viewableItems,
// }: {
//   viewableItems: ViewToken[];
// }) => {
//   if (viewableItems?.length > 0) {
//     const yIndex = viewableItems[0]?.index;
//     homePostsStore.currentYIndex = yIndex;
//     let tempMultiItems = [...homePostsStore.multiItems];
//     const findIndex = tempMultiItems?.findIndex(
//       el => el?.currentYIndex === yIndex,
//     );
//     if (findIndex <= 0) {
//       homePostsStore.multiItems = [
//         ...tempMultiItems,
//         {
//           currentYIndex: yIndex,
//           currentXIndex: 0,
//         },
//       ];
//     }
//   }
// };

// /*

//  <Animated.FlatList
//         ref={scrollRef}
//         data={data || []}
//         // extraData={extraData}
//         bounces={false}
//         // onScroll={onScroll}
//         // stickyHeaderIndices={[0]}
//         // ListHeaderComponent={renderHeader}
//         ItemSeparatorComponent={itemSeparatorComponent}
//         renderItem={renderItem}
//         // viewabilityConfig={viewConfigRef?.current}
//         // onViewableItemsChanged={onViewRef.current}
//         keyExtractor={keyExtractor}
//         // style={styles(tabBarHeight).contentContainerStyle}
//         // onRefresh={onRefresh}
//         // refreshing={isRefetching || isRefetchingAds}
//         // nestedScrollEnabled
//         initialNumToRender={3}
//         maxToRenderPerBatch={5}
//         windowSize={5}
//         onEndReachedThreshold={0.5}
//         scrollEventThrottle={16}
//         removeClippedSubviews={isAndroid}
//         // onEndReached={({distanceFromEnd}) => {
//         //   if (distanceFromEnd < 0) {
//         //     return;
//         //   }
//         //   onLoadMore();
//         // }}
//         // ListFooterComponent={renderFooter}
//         // ListEmptyComponent={
//         //   isLoading ? <HomePostsTabPlaceHolder /> : <EmptyData />
//         // }
//       />

//       <VStack flex={1} bg="red" alignItems="center" justifyContent="center">
//         <Video
//           // Can be a URL or a local file.
//           source={{
//             uri: 'https://www.shutterstock.com/shutterstock/videos/1103477533/preview/stock-footage-lorem-ipsum-animated-text-animation-lorem-ipsum-intro-your-video.mp4',
//           }}
//           repeat
//           resizeMode="cover"
//           // paused={false}
//           // Store reference
//           ref={videoRef}
//           controls={true}
//           poster={''}
//           controlsStyles={{
//             hidePrevious: true,
//             hideRewind: true,
//             hideFullscreen: true,
//             hideDuration: true,
//             hidePlayPause: true,
//           }}
//           // Callback when remote video is buffering
//           // onBuffer={onBuffer}
//           // Callback when video cannot be loaded
//           // onError={onError}
//           style={{
//             // position: 'absolute',
//             // top: 0,
//             // left: 0,
//             // bottom: 0,
//             // right: 0,
//             height: 200,
//             width: 400,
//             backgroundColor: 'green',
//           }}
//         />
//       </VStack>

// */
