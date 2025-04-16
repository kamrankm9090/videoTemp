import React, {useCallback, useRef, useState} from 'react';
import {ViewToken} from 'react-native';
import {AppLogo, Message, Notification, Search} from '~/assets/svgs';
import {
  AppContainer,
  AppFlatList,
  AppTouchable,
  Box,
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
  const [visibleIndex, setVisibleIndex] = useState<number | null>(null);
  const viewConfigRef = useRef({viewAreaCoveragePercentThreshold: 70});

  const onViewRef = useRef(({viewableItems}: {viewableItems: ViewToken[]}) => {
    console.log(viewableItems.length > 0);

    if (viewableItems.length > 0) {
      setVisibleIndex(viewableItems[0]?.index ?? null);
    }
  });

  function searchOnPress() {}
  function messageOnPress() {}
  function notificationOnPress() {}

  const renderItem = useCallback(
    ({item, index}: {item: any; index: number}) => {
      return <HomePostItem {...{item, index, visibleIndex}} />;
    },
    [visibleIndex],
  );

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
        keyExtractor={(_, i) => String(i)}
        viewabilityConfig={viewConfigRef.current}
        onViewableItemsChanged={onViewRef.current}
        removeClippedSubviews
        listFooterComponent={<Box bottom={40} />}
      />
    </AppContainer>
  );
}
