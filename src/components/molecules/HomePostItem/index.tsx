import React, {useEffect, useState} from 'react';
import {Image, StyleSheet} from 'react-native';
import {HotSpot, Purchase, ThreePoint} from '~/assets/svgs';
import {
  AppImage,
  AppText,
  AppTouchable,
  AppVideoPlayer,
  Box,
  HomePostOptions,
  HStack,
  VStack,
} from '~/components';
import {homePostsStore} from '~/stores';
import {formatNumber, getFullImageUrl} from '~/utils/helper';
import {Colors} from '~/styles';

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
    <HStack alignItems="flex-start" space={20}>
      <AppImage
        resizeMode="stretch"
        imageSource={user?.imageUrl}
        style={styles.avatar}
      />
      <VStack space={20} flex={1}>
        <HStack alignItems="flex-start">
          <VStack space={8} flex={1}>
            <AppText fontFamily="medium">{data?.title}</AppText>
            <AppText>{data?.description}</AppText>
          </VStack>
          <HomePostOptions />
        </HStack>
        <HStack justifyContent="space-between" space={16}>
          <TextIcon
            icon={<HotSpot />}
            text={`${formatNumber(data?.viewCount)} viewers`}
          />
          <TextIcon
            icon={<Purchase />}
            text={`${formatNumber(data?.purchaseCount)} Purchases`}
          />
        </HStack>
      </VStack>
    </HStack>
  );
}

function TextIcon({icon, text}: {icon?: JSX.Element; text?: string}) {
  return (
    <HStack space={8}>
      {icon}
      <AppText color={Colors.DarkGray}>{text}</AppText>
    </HStack>
  );
}

const styles = StyleSheet.create({
  avatar: {
    height: 42,
    width: 42,
    borderRadius: 42,
  },
});
