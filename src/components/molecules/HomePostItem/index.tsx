import React, {useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import {useSnapshot} from 'valtio';
import {Like, LikeOutline, Save, Saved} from '~/assets/svgs';
import {
  AppImage,
  AppLoading,
  AppText,
  AppTouchable,
  AppVideoPlayer,
  Center,
  HomePostOptions,
  HStack,
  SectionHomeFooter,
  VStack,
} from '~/components';
import {
  useAgora_CreateTokenMutation,
  useLive_AddToBookmarkMutation,
  useLive_LikeMutation,
  useLive_RemoveFromBookmarkMutation,
  useLive_RemoveLikeMutation,
} from '~/graphql/generated';
import {navigate} from '~/navigation/methods';
import {liveStore} from '~/stores';
import {Colors} from '~/styles';
import {formatNumber} from '~/utils/helper';
import {fontSize, height} from '~/utils/style';
import {showErrorMessage} from '~/utils/utils';

const HEIGHT = height * 0.6;

export default function HomePostItem({
  item,
  index,
  visibleIndex,
}: {
  item: LiveDto;
  index: number;
  visibleIndex: number;
}) {
  const {mutate: mutateCreateAgoraToken, isLoading: isLoadingCreateAgoraToken} =
    useAgora_CreateTokenMutation();
  const {setLiveId, setToken, setTokenCreateDate, setLiveData} =
    useSnapshot(liveStore);

  function onPressHandler() {
    if (item?.recordEnded) {
      navigate('HomeStack', {screen: 'ContentViewer', params: {item}});
    } else {
      const liveId = item?.live?.id?.toString();
      mutateCreateAgoraToken(
        {channelName: liveId, publisher: false},
        {
          onSuccess: res => {
            if (res?.agora_createToken?.status?.code === 1) {
              setLiveData({
                ...item?.live,
              });
              setLiveId(liveId);
              setToken(res?.agora_createToken?.result);
              setTokenCreateDate(Date.now());
              navigate('HomeStack', {
                screen: 'ContentViewerLive',
              });
            }
          },
        },
      );
    }
  }

  return (
    <VStack space={48}>
      <AppTouchable
        disabled={isLoadingCreateAgoraToken}
        onPress={onPressHandler}
        pb={12}>
        <AppVideoPlayer
          key={index}
          showTimer
          style={styles.player}
          isPlaying={index === visibleIndex}
          source={{
            uri: item?.live?.previewUrl,
          }}
          showMute={true}
          showWaterMark
        />
        <LiveBadge isLive={!item?.recordEnded} />
        <SaveButton isSaved={item?.isBookmark} liveId={item?.live?.id} />
        <SectionUserRow data={item} />
        {isLoadingCreateAgoraToken && <AppLoading />}
      </AppTouchable>
      {(index + 1) % 7 === 0 && <SectionHomeFooter />}
    </VStack>
  );
}

function SectionUserRow({data}: {data: LiveDto}) {
  const live = data?.live;
  const user = live?.user;

  return (
    <HStack px={16} mt={8} alignItems="flex-start" space={12}>
      <AppImage
        resizeMode="stretch"
        imageSource={user?.photoUrl}
        style={styles.avatar}
      />
      <VStack space={8} flex={1}>
        <HStack space={12} alignItems="flex-start">
          <AppText
            flex={1}
            numberOfLines={2}
            fontSize={fontSize.medium}
            fontFamily="medium">
            {live?.title ?? '-'}
          </AppText>
          <LikeButton
            likeCount={data?.live?.likeCount}
            isLiked={data?.isLiked}
            liveId={data?.live?.id}
          />
          <HomePostOptions data={data} />
        </HStack>
        <HStack space={6}>
          <AppText color={Colors.DarkGray}>{live?.user?.username}</AppText>
          <AppText color={Colors.DarkGray}>.</AppText>
          <AppText color={Colors.DarkGray}>{`${formatNumber(
            live?.viewCount,
          )} views`}</AppText>
          <AppText color={Colors.DarkGray}>.</AppText>
          <AppText color={Colors.DarkGray}>{`${formatNumber(
            live?.purchaseCount,
          )} bought`}</AppText>
        </HStack>
      </VStack>
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
    <AppTouchable
      p={4}
      onPress={saveOnPress}
      position="absolute"
      top={12}
      right={12}>
      {saved ? <Saved /> : <Save />}
    </AppTouchable>
  );
}

function LikeButton({
  isLiked,
  liveId,
  likeCount = 0,
}: {
  isLiked?: boolean;
  liveId: number;
  likeCount: number;
}) {
  const [liked, setLiked] = useState<boolean>(false);
  const [count, setCount] = useState<number>(likeCount);

  const {mutate: mutateLike} = useLive_LikeMutation();
  const {mutate: mutateRemoveLike} = useLive_RemoveLikeMutation();

  useEffect(() => {
    setLiked(isLiked ?? false);
  }, [isLiked]);

  async function saveOnPress() {
    if (liked) {
      setLiked(false);
      setCount(prev => prev - 1);
      mutateRemoveLike(
        {liveId},
        {
          onSuccess: response => {
            if (response?.live_removeLike?.code !== 1) {
              showErrorMessage(response?.live_removeLike?.description);
            }
          },
        },
      );
    } else {
      setLiked(true);
      setCount(prev => prev + 1);
      mutateLike(
        {liveId},
        {
          onSuccess: response => {
            if (response?.live_like?.code !== 1) {
              showErrorMessage(response?.live_like?.description);
            }
          },
        },
      );
    }
  }

  return (
    <HStack space={4}>
      <AppTouchable onPress={saveOnPress}>
        {liked ? <Like /> : <LikeOutline />}
      </AppTouchable>
      <AppText fontSize={fontSize.small}>{count}</AppText>
    </HStack>
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
    height: 41,
    width: 41,
    borderRadius: 41,
  },
  player: {
    height: HEIGHT,
    backgroundColor: Colors.Nero,
    borderRadius: 8,
  },
});
