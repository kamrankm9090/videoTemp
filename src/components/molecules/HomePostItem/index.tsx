import React from 'react';
import {StyleSheet} from 'react-native';
import {useSnapshot} from 'valtio';
import {
  AppLoading,
  AppTouchable,
  AppVideoPlayer,
  LiveBadge,
  SaveButton,
  SectionHomeFooter,
  VStack,
  SectionUserRow,
  MuteButton,
} from '~/components';
import {useAgora_CreateTokenMutation} from '~/graphql/generated';
import {navigate} from '~/navigation/methods';
import {contentStore, homePostStore, liveStore} from '~/stores';
import {Colors} from '~/styles';
import {height} from '~/utils/style';

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
  const {isMuted} = useSnapshot(homePostStore);

  function onPressHandler() {
    if (item?.recordEnded) {
      // navigate('HomeStack', {screen: 'ContentViewer', params: {item}});
      contentStore.contentData = item;
      navigate('HomeStack', {screen: 'ContentViewer'});
    } else {
      const liveId = item?.live?.id?.toString();
      mutateCreateAgoraToken(
        {channelName: liveId, publisher: false},
        {
          onSuccess: res => {
            if (res?.agora_createToken?.status?.code === 1) {
              setLiveData(item);
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
          showMute={false}
          showWaterMark
          muted={isMuted}
        />
        <LiveBadge isLive={!item?.recordEnded} />
        <HomePostMuteButton />
        <SaveButton isSaved={item?.isBookmark} liveId={item?.live?.id} />
        <SectionUserRow data={item} />
        {isLoadingCreateAgoraToken && <AppLoading />}
      </AppTouchable>
      {(index + 1) % 7 === 0 && <SectionHomeFooter />}
    </VStack>
  );
}

function HomePostMuteButton() {
  const {isMuted, setIsMuted} = useSnapshot(homePostStore);

  function muteHandler() {
    setIsMuted(!isMuted);
  }

  return <MuteButton onPress={muteHandler} status={isMuted} />;
}

const styles = StyleSheet.create({
  player: {
    height: HEIGHT,
    backgroundColor: Colors.Nero,
    borderRadius: 8,
  },
});
