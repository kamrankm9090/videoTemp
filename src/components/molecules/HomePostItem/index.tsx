import React from 'react';
import {StyleSheet} from 'react-native';
import {HotSpot, Purchase} from '~/assets/svgs';
import {
  AppImage,
  AppText,
  AppVideoPlayer,
  HomePostOptions,
  HStack,
  VStack,
} from '~/components';
import {Colors} from '~/styles';
import {formatNumber} from '~/utils/helper';

export default function HomePostItem({item, index, visibleIndex}: any) {
  return (
    <VStack h={335} w="100%">
      <AppVideoPlayer
        key={index}
        style={styles.player}
        isPlaying={index === visibleIndex}
        source={{
          uri: item?.previewUrl,
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
  player: {
    height: 200,
    backgroundColor: Colors.Nero,
    margin: 7,
  },
});
