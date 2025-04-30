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
import {
  LiveType,
  useLive_AddToBookmarkMutation,
  useLive_RemoveFromBookmarkMutation,
} from '~/graphql/generated';
import {navigate} from '~/navigation/methods';
import {Colors} from '~/styles';
import {formatNumber} from '~/utils/helper';
import {showErrorMessage} from '~/utils/utils';

export default function HomePostItem({
  item,
  index,
  visibleIndex,
}: {
  item: LiveDto;
  index: number;
  visibleIndex: number;
}) {
  function onPressHandler() {
    navigate('ContentViewer', {item});
  }

  return (
    <AppTouchable onPress={onPressHandler} mx={16} h={335}>
      <AppVideoPlayer
        key={index}
        showTimer
        style={styles.player}
        isPlaying={index === visibleIndex}
        source={{
          uri: item?.live?.previewUrl,
        }}
      />
      <LiveBadge isLive={item?.live?.liveType === LiveType.LiveContent} />
      <SaveButton isSaved={item?.isBookmark} liveId={item?.live?.id} />

      <SectionUserRow data={item} />
    </AppTouchable>
  );
}

function SectionUserRow({data}: {data: LiveDto}) {
  const live = data?.live;
  const user = live?.user;

  return (
    <HStack alignItems="flex-start" space={20}>
      <AppImage
        resizeMode="stretch"
        imageSource={user?.photoUrl}
        style={styles.avatar}
      />
      <VStack space={20} flex={1}>
        <HStack alignItems="flex-start">
          <VStack space={8} flex={1}>
            <AppText fontFamily="medium">{data?.live?.title ?? '-'}</AppText>
            <AppText>{live?.description ?? '-'}</AppText>
          </VStack>
          <HomePostOptions data={data} />
        </HStack>
        <HStack justifyContent="space-between" space={16}>
          <TextIcon
            icon={<HotSpot />}
            text={`${formatNumber(live?.viewCount)} viewers`}
          />
          <TextIcon
            icon={<Purchase />}
            text={`${formatNumber(live?.purchaseCount)} Purchases`}
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

function SaveButton({isSaved, liveId}: {isSaved?: boolean; liveId: number}) {
  const [saved, setSaved] = useState<boolean>(false);

  const {mutate: mutateAddToBookmark} = useLive_AddToBookmarkMutation();
  const {mutate: mutateRemoveFromBookmark} =
    useLive_RemoveFromBookmarkMutation();

  useEffect(() => {
    setSaved(isSaved ?? false);
  }, [isSaved]);

  async function saveOnPress() {
    if (saved) {
      setSaved(false);
      mutateRemoveFromBookmark(
        {liveId},
        {
          onSuccess: response => {
            if (response?.live_removeFromBookmark?.code !== 1) {
              showErrorMessage(response?.live_removeFromBookmark?.description);
            }
          },
        },
      );
    } else {
      setSaved(true);
      mutateAddToBookmark(
        {liveId},
        {
          onSuccess: response => {
            if (response?.live_addToBookmark?.code !== 1) {
              showErrorMessage(response?.live_addToBookmark?.description);
            }
          },
        },
      );
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
    borderRadius: 8,
  },
});
