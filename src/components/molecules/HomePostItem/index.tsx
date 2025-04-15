import React, {useEffect} from 'react';
import {Image, StyleSheet} from 'react-native';
import {HotSpot, Purchase, ThreePoint} from '~/assets/svgs';
import {
  AppImage,
  AppText,
  AppVideoPlayer,
  Box,
  HStack,
  VStack,
} from '~/components';
import {homePostsStore} from '~/stores';
import {getFullImageUrl} from '~/utils/helper';

export default function HomePostItem({item, yIndex, preloading}: any) {
  const isPlaying = homePostsStore.currentYIndex === yIndex;

  // useEffect(() => {
  //   if (preloading === item?.url && item?.url) {
  //     // console.log('item?.--->', item?.id, '---->', item?.url);
  //     const url = getFullImageUrl(item.url);
  //     Image.prefetch(url); // Prefetch the image/video
  //   }
  // }, [preloading, item?.url]);

  return (
    <VStack h={335} w="100%">
      <AppVideoPlayer
        isPlaying={isPlaying}
        source={{
          uri: getFullImageUrl(item?.name),
        }}
      />
      <SectionUserRow data={item} />
    </VStack>
  );
}

function SectionUserRow({data}: any) {
  const user = data?.user;

  return (
    <HStack space={24}>
      <AppImage imageSource={user?.imageUrl} style={styles.avatar} />
      <VStack space={16}>
        <HStack flex={1} space={16}>
          <VStack flex={1} space={16}>
            <AppText>{data?.title}</AppText>
            <AppText>{data?.description}</AppText>
          </VStack>
          <ThreePoint />
        </HStack>
        <HStack space={16}>
          <TextIcon icon={<HotSpot />} text={data?.viewCount} />
          <TextIcon icon={<Purchase />} text={data?.purchaseCount} />
        </HStack>
      </VStack>
    </HStack>
  );
}

function TextIcon({icon, text}: {icon?: JSX.Element; text?: string}) {
  return (
    <HStack>
      {icon}
      <AppText>{text}</AppText>
    </HStack>
  );
}

const styles = StyleSheet.create({
  avatar: {
    height: 42,
    width: 42,
    borderRadius: 21,
  },
});
