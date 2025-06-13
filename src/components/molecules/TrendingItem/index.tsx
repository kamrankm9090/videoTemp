import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import {useSnapshot} from 'valtio';
import {ArchiveIcon, HotSpot} from '~/assets/svgs';
import {
  AppIndicator,
  AppText,
  AppTouchable,
  AppVideoPlayer,
  HStack,
  VStack,
} from '~/components';
import {useAgora_CreateTokenMutation} from '~/graphql/generated';
import {navigate} from '~/navigation/methods';
import {contentStore, liveStore} from '~/stores';
import {Colors} from '~/styles';
import {getFullImageUrl, getRandomColorFromName} from '~/utils/helper';
import {fontSize} from '~/utils/style';

interface TrendingItemProps {
  item: any;
}

const TrendingItem: React.FC<TrendingItemProps> = ({item}) => {
  const [isLoadingVideo, setIsLoadingVideo] = useState(true);

  const {mutate: mutateCreateAgoraToken} = useAgora_CreateTokenMutation();
  const {setLiveId, setToken, setTokenCreateDate, setLiveData, liveData} =
    useSnapshot(liveStore);

  const bgColor = getRandomColorFromName(
    item?.live?.user?.fullName || item?.live?.user?.username || '',
  );

  function onPressHandler() {
    if (item?.recordEnded) {
      contentStore.contentData = item;
      navigate('HomeStack', {screen: 'ContentViewer', params: {item}});
    } else {
      const liveId = item?.live?.id?.toString();
      mutateCreateAgoraToken(
        {channelName: liveId, publisher: true},
        {
          onSuccess: res => {
            if (res?.agora_createToken?.status?.code === 1) {
              setLiveData({...liveData, live: {...item}});
              setLiveId(liveId);
              setToken(res?.agora_createToken?.result || '');
              setTokenCreateDate(Date.now());
              navigate('HomeStack', {screen: 'ContentViewerLive'});
            }
          },
        },
      );
    }
  }

  return (
    <AppTouchable
      minW={183}
      bg={Colors.Grey}
      mb={20}
      rounded={10}
      overflow="hidden"
      mx={10}
      onPress={onPressHandler}>
      <HStack
        w="100%"
        position="absolute"
        top={10}
        px={16}
        justifyContent="space-between"
        zIndex={1}>
        <VStack bg={bgColor} py={5} px={15} rounded={20}>
          <AppText fontWeight="500" color={Colors.WHITE}>
            {item?.live?.category}
          </AppText>
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
        resizeMode="cover"
        source={{
          uri: getFullImageUrl(item?.live?.introUrl),
        }}
        onLoadStart={() => setIsLoadingVideo(true)}
        onLoad={() => setIsLoadingVideo(false)}
        onBuffer={({isBuffering}) => setIsLoadingVideo(isBuffering)}>
        {isLoadingVideo && (
          <AppIndicator color={Colors.GARY_2} style={StyleSheet.absoluteFill} />
        )}
      </AppVideoPlayer>

      <HStack py={10} px={8} bg={Colors.BLACK}>
        <VStack flex={1} space={4}>
          <AppText fontFamily="medium" fontSize={fontSize.medium}>
            {item?.live?.title}
          </AppText>
          <HStack space={8}>
            <HotSpot />
            <AppText color={Colors.GARY_3}>
              {item?.live?.viewCount} viewers
            </AppText>
          </HStack>
        </VStack>
      </HStack>
    </AppTouchable>
  );
};

export default TrendingItem;

const styles = StyleSheet.create({
  videoPlayer: {
    width: '100%',
    height: 200,
  },
  thumbnail: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
});
