import React from 'react';
import {StyleSheet} from 'react-native';
import {useSnapshot} from 'valtio';
import {ArchiveIcon, HotSpot, MoreHIcon} from '~/assets/svgs';
import {AppImage, AppText, AppTouchable, HStack, VStack} from '~/components';
import {useAgora_CreateTokenMutation} from '~/graphql/generated';
import {navigate} from '~/navigation/methods';
import {liveStore} from '~/stores';
import {Colors} from '~/styles';
import {showSheet} from '~/utils/utils';

interface StreamItemProps {
  category: string;
  title: string;
  description: string;
  viewers: string;
  imageUrl: string;
  profileImageUrl: string;
  recordEnded: string;
  live: any;
}

const StreamItem: React.FC<StreamItemProps> = ({
  category,
  title,
  description,
  viewers,
  imageUrl,
  profileImageUrl,
  recordEnded,
  live,
}) => {
  const {mutate: mutateCreateAgoraToken, isLoading: isLoadingCreateAgoraToken} =
    useAgora_CreateTokenMutation();
  const {setLiveId, setToken, setTokenCreateDate, setLiveData} =
    useSnapshot(liveStore);

  function onPressHandler() {
    if (recordEnded) {
      navigate('HomeStack', {screen: 'ContentViewer', params: {item}});
    } else {
      const liveId = live?.id?.toString();
      mutateCreateAgoraToken(
        {channelName: liveId, publisher: true},
        {
          onSuccess: res => {
            if (res?.agora_createToken?.status?.code === 1) {
              setLiveData({
                ...live,
              });
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
    <AppTouchable style={styles.card} onPress={onPressHandler}>
      <HStack style={styles.categoryContainer} justifyContent="space-between">
        <VStack style={styles.categoryLabel}>
          <AppText fontWeight={'500'}>{category}</AppText>
        </VStack>
        <ArchiveIcon />
      </HStack>

      <AppImage imageSource={{uri: imageUrl}} style={styles.image} />

      <VStack style={styles.streamerInfo}>
        <AppImage
          imageSource={{uri: profileImageUrl}}
          style={styles.profileImage}
        />
        <VStack style={styles.textInfo}>
          <AppText fontWeight={'500'} fontSize={16}>
            {title}
          </AppText>
          <AppText fontWeight={'400'} fontSize={13}>
            {description}
          </AppText>
          <HStack>
            <HotSpot color={Colors.ERROR_BACKGROUND} style={{marginRight: 8}} />
            <AppText color={Colors.GARY_3}>{viewers} viewers</AppText>
          </HStack>
        </VStack>

        <AppTouchable onPress={() => showSheet('offer-select-option-action')}>
          <MoreHIcon />
        </AppTouchable>
      </VStack>
    </AppTouchable>
  );
};

const styles = StyleSheet.create({
  card: {
    minWidth: 290,
    backgroundColor: Colors.Grey,
    marginBottom: 20,
    borderRadius: 10,
    overflow: 'hidden',
    marginHorizontal: 10,
  },
  categoryContainer: {
    width: '100%',
    position: 'absolute',
    top: 10,
    paddingHorizontal: 16,
  },
  categoryLabel: {
    backgroundColor: Colors.ERROR,
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 20,
  },

  image: {
    width: '100%',
    height: 200,
    borderRadius: 8,
  },
  streamerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    backgroundColor: Colors.BLACK,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  textInfo: {
    flex: 1,
    gap: 4,
  },
});

export default StreamItem;
