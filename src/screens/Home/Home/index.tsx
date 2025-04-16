import React, {useRef, useState, useCallback} from 'react';
import {FlatList, View, ViewToken} from 'react-native';
import {AppLogo, Message, Notification, Search} from '~/assets/svgs';
import {
  AppContainer,
  AppTouchable,
  AppVideoPlayer,
  HStack,
  ScreensHeader,
} from '~/components';
import {showErrorMessage} from '~/utils/utils';

export default function HomeScreen() {
  const [visibleIndex, setVisibleIndex] = useState<number | null>(null);
  const viewConfigRef = useRef({viewAreaCoveragePercentThreshold: 70});

  const onViewRef = useRef(({viewableItems}: {viewableItems: ViewToken[]}) => {
    console.log(viewableItems.length > 0);

    if (viewableItems.length > 0) {
      
      setVisibleIndex(viewableItems[0]?.index  ?? null);
    }
  });

  function searchOnPress() {
    showErrorMessage();
  }
  function messageOnPress() {}
  function notificationOnPress() {}

  const renderItem = useCallback(
    ({item, index}: {item: any; index: number}) => {
      return (
        <AppVideoPlayer
          key={index}
          style={{
            height: 200,
            backgroundColor: '#222',
            margin: 7,
          }}
          isPlaying={index === visibleIndex}
          source={{
            uri: 'https://www.w3schools.com/html/mov_bbb.mp4'
          }}
        />
      );
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
      <FlatList
        data={[...new Array(20)]}
        renderItem={renderItem}
        keyExtractor={(_, i) => String(i)}
        viewabilityConfig={viewConfigRef.current}
        onViewableItemsChanged={onViewRef.current}
        removeClippedSubviews
        ListFooterComponent={<View style={{bottom:40}} />}
      />
    </AppContainer>
  );
}
