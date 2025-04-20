import React, {useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import {HotSpot, Purchase, Save, Saved} from '~/assets/svgs';
import {
  AppImage,
  AppText,
  AppTouchable,
  AppVideoPlayer,
  Center,
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
        showTimer
        style={styles.player}
        isPlaying={index === visibleIndex}
        source={{
          uri: item?.previewUrl,
        }}
      />
      <LiveBadge isLive />
      <SaveButton />

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

function SaveButton({isSaved}: {isSaved?: boolean}) {
  const [saved, setSaved] = useState<boolean>(false);

  useEffect(() => {
    setSaved(isSaved ?? false);
  }, [isSaved]);

  async function saveOnPress() {
    if (saved) {
      setSaved(false);
    } else {
      setSaved(true);
    }
  }

  return (
    <AppTouchable onPress={saveOnPress} position="absolute" top={12} right={12}>
      {saved ? <Saved /> : <Save />}
    </AppTouchable>
  );
}

function LiveBadge({isLive}: {isLive?: boolean}) {
  if (isLive) {
    return (
      <Center
        pt={3}
        pb={5}
        px={10}
        top={12}
        left={12}
        rounded={20}
        bg={Colors.ERROR}
        position="absolute">
        <AppText fontFamily="bold">Live</AppText>
      </Center>
    );
  }

  return null;
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
