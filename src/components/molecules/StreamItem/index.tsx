import React, {useState} from 'react';
import {ActivityIndicator, StyleSheet} from 'react-native';
import {useSnapshot} from 'valtio';
import {ArchiveIcon, HotSpot, MoreHIcon} from '~/assets/svgs';
import {
  AppImage,
  AppIndicator,
  AppText,
  AppTouchable,
  AppVideoPlayer,
  HStack,
  VStack,
} from '~/components';
import {useAgora_CreateTokenMutation} from '~/graphql/generated';
import {navigate} from '~/navigation/methods';
import {liveStore} from '~/stores';
import {Colors} from '~/styles';
import {getFullImageUrl} from '~/utils/helper';
import {fontSize} from '~/utils/style';
import {showSheet} from '~/utils/utils';

interface StreamItemProps {
  item: any;
}

const StreamItem: React.FC<StreamItemProps> = ({item}) => {
  const [isLoadingVideo, setIsLoadingVideo] = useState(true);

  const {mutate: mutateCreateAgoraToken} = useAgora_CreateTokenMutation();
  const {setLiveId, setToken, setTokenCreateDate, setLiveData} =
    useSnapshot(liveStore);

    
  function onPressHandler() {
    if (item?.recordEnded) {
      navigate('HomeStack', {screen: 'ContentViewer', params: {item}});
    } else {
      const liveId = item?.live?.id?.toString();
      mutateCreateAgoraToken(
        {channelName: liveId, publisher: true},
        {
          onSuccess: res => {
            if (res?.agora_createToken?.status?.code === 1) {
              setLiveData(item);
              setLiveId(liveId);
              setToken(res?.agora_createToken?.result || '');
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
    <AppTouchable
      onPress={onPressHandler}
      minW={290}
      bg={Colors.GARY_1}
      mb={20}
      rounded={10}
      overflow="hidden"
      mx={10}>
      <HStack
        w="100%"
        position="absolute"
        top={10}
        zIndex={1}
        px={16}
        justifyContent="space-between">
        <VStack bg={Colors.ERROR} py={5} px={15} borderRadius={20}>
          <AppText fontWeight="500">{item?.live?.category}</AppText>
        </VStack>
        <ArchiveIcon />
      </HStack>

      <AppVideoPlayer
        style={styles.videoPlayer}
        fullscreen={false}
        controls={false}
        muted={true}
        volume={0}
        repeat={true}
        resizeMode="contain"
        source={{
          uri: getFullImageUrl(item?.live?.recordUrl),
        }}
        showTimer
        onLoadStart={() => setIsLoadingVideo(true)}
        onLoad={() => setIsLoadingVideo(false)}
        onBuffer={({isBuffering}) => setIsLoadingVideo(isBuffering)}>
        {isLoadingVideo && (
          <AppIndicator color={Colors.GARY_2}  style={StyleSheet.absoluteFill} />
        )}
      </AppVideoPlayer>

      <HStack py={10} px={12} bg={Colors.BLACK}>
        <AppImage
          imageSource={{uri: item?.live?.user?.photoUrl}}
          style={styles.avatar}
        />

        <VStack flex={1} space={4}>
          <AppText fontWeight="500" fontSize={fontSize.medium}>
            {item?.live?.title}
          </AppText>
          <AppText fontWeight="400" fontSize={fontSize.small}>
            {item?.live?.description}
          </AppText>
          <HStack space={8}>
            <HotSpot color={Colors.ERROR_BACKGROUND} />
            <AppText color={Colors.GARY_3}>
              {item?.live?.viewCount} viewers
            </AppText>
          </HStack>
        </VStack>

        <AppTouchable onPress={() => showSheet('offer-select-option-action')}>
          <MoreHIcon />
        </AppTouchable>
      </HStack>
    </AppTouchable>
  );
};

export default StreamItem;

const styles = StyleSheet.create({
  videoPlayer: {
    width: '100%',
    height: 200,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
});
