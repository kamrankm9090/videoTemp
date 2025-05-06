import React from 'react';
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
  const {mutate: mutateCreateAgoraToken} = useAgora_CreateTokenMutation();
  const {setLiveId, setToken, setTokenCreateDate, setLiveData} =
    useSnapshot(liveStore);

  function onPressHandler() {
    if (recordEnded) {
      navigate('HomeStack', {screen: 'ContentViewer', params: {item: live}});
    } else {
      const liveId = live?.id?.toString();
      mutateCreateAgoraToken(
        {channelName: liveId, publisher: true},
        {
          onSuccess: res => {
            if (res?.agora_createToken?.status?.code === 1) {
              setLiveData(live);
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
      borderRadius={10}
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
          <AppText fontWeight="500">{category}</AppText>
        </VStack>
        <ArchiveIcon />
      </HStack>

      <AppImage
        imageSource={{uri: imageUrl}}
        style={{
          width: '100%',
          height: 200,
          borderRadius: 8,
        }}
      />

      <VStack
        flexDirection="row"
        alignItems="center"
        py={10}
        px={12}
        bg={Colors.BLACK}>
        <AppImage
          imageSource={{uri: profileImageUrl}}
          style={{
            width: 50,
            height: 50,
            borderRadius: 25,
            marginRight: 10,
          }}
        />

        <VStack flex={1} style={{gap: 4}}>
          <AppText fontWeight="500" fontSize={16}>
            {title}
          </AppText>
          <AppText fontWeight="400" fontSize={13}>
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

export default StreamItem;
