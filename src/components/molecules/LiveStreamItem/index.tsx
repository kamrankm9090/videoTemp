import React from 'react';
import {Image, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient'; // <-- your package
import {useSnapshot} from 'valtio';
import {HotSpot} from '~/assets/svgs';
import {AppText, AppTouchable, HStack, VStack} from '~/components';
import {useAgora_CreateTokenMutation} from '~/graphql/generated';
import {navigate} from '~/navigation/methods';
import {contentStore, liveStore} from '~/stores';
import {Colors} from '~/styles';
import {getRandomColorFromName} from '~/utils/helper';
import {fontSize} from '~/utils/style';

interface LiveStreamItemProps {
  item: any;
}

const LiveStreamItem: React.FC<LiveStreamItemProps> = ({item}) => {
  const {mutate: mutateCreateAgoraToken} = useAgora_CreateTokenMutation();
  const {setLiveId, setToken, setTokenCreateDate, setLiveData, liveData} =
    useSnapshot(liveStore);

  const getInitial = (name: string) => name?.charAt(0)?.toUpperCase() || '';
  const bgColor = getRandomColorFromName(
    item?.live?.user?.fullName || item?.live?.user?.username || '',
  );

  const onPressHandler = () => {
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
  };

  return (
    <AppTouchable style={styles.card} onPress={onPressHandler}>
      <LinearGradient
        colors={[`${bgColor}40`, `${bgColor}AA`, `${bgColor}40`]}
        style={styles.imageWrapper}
        start={{x: 0.5, y: 0}}
        end={{x: 0.5, y: 1}}
        locations={[0, 0.5, 1]}>
        <VStack style={styles.categoryTag}>
          <AppText
            fontSize={fontSize.normal}
            color={Colors.WHITE}
            fontWeight="600">
            {item?.live?.category}
          </AppText>
        </VStack>

        {!item?.live?.user?.photoUrl ? (
          <VStack style={[styles.initialCircle, {backgroundColor: bgColor}]}>
            <AppText
              fontSize={fontSize.large}
              color={Colors.WHITE}
              fontWeight="600">
              {getInitial(
                item?.live?.user?.fullName || item?.live?.user?.username,
              )}
            </AppText>
          </VStack>
        ) : (
          <Image
            style={styles.initialCircle}
            source={{uri: item?.live?.user?.photoUrl}}
          />
        )}

        <AppText style={styles.userName} fontWeight="600" color={Colors.BLACK}>
          {item?.live?.user?.fullName || item?.live?.user?.username}
        </AppText>
      </LinearGradient>

      <VStack px={10} py={10} bg={Colors.BLACK}>
        <AppText
          fontWeight="500"
          fontSize={fontSize.medium}
          color={Colors.WHITE}>
          {item?.live?.title || 'Cooking Perfection'}
        </AppText>
        <HStack mt={6} alignItems="center">
          <HotSpot />
          <AppText
            fontSize={fontSize.small}
            color={Colors.GARY_3}
            marginLeft={6}>
            {item?.live?.viewCount} viewers
          </AppText>
        </HStack>
      </VStack>
    </AppTouchable>
  );
};

export default LiveStreamItem;

const styles = StyleSheet.create({
  card: {
    width: 180,
    marginHorizontal: 10,
  },
  imageWrapper: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 10,
    borderRadius: 16,
    overflow: 'hidden',
  },
  categoryTag: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: Colors.ERROR,
    borderRadius: 20,
    paddingVertical: 4,
    paddingHorizontal: 12,
  },
  initialCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 20,
  },
  userName: {
    fontSize: fontSize.small,
    marginTop: 4,
  },
});
