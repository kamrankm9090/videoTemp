import React, {ReactElement, useState} from 'react';
import {StyleSheet} from 'react-native';
import {
  RtcSurfaceView,
  VideoCanvas,
  VideoViewSetupMode,
} from 'react-native-agora';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useSnapshot} from 'valtio';
import {Note, Reload} from '~/assets/svgs';
import {
  AppButton,
  AppContainer,
  AppScrollView,
  AppText,
  AppTouchable,
  BaseComponent,
  BaseRenderUsers,
  Box,
  CounterModal,
  HStack,
  LiveHeader,
  RenderNothing,
  VStack,
} from '~/components';
import {LiveType} from '~/graphql/generated';
import useInitBroadcastEngine from '~/hooks/agora/useInitBroadcastEngine';
import {resetRoot} from '~/navigation/methods';
import {liveStore} from '~/stores';
import {Colors} from '~/styles';
import {parseISODuration} from '~/utils/helper';
import {fontSize, height} from '~/utils/style';
import {
  appFormatDate,
  hideSheet,
  showInfoMessage,
  showSheet,
} from '~/utils/utils';

const LiveScreen = () => {
  const [enableVideo] = useState<boolean>(true);
  const [liveStarted, setLiveStarted] = useState<boolean>(false);

  // const {
  //   joinChannelSuccess,
  //   remoteUsers,
  //   startPreview,
  //   engine,
  //   uid,
  //   channelId,
  //   token,
  // } = useInitRtcEngine({
  //   enableVideo: true,
  //   isBroadcaster: true,
  //   onJoinSuccess: (connection: RtcConnection, elapsed: number) =>
  //     onJoinChannelSuccess(connection, elapsed),
  // });

  const {
    joinChannelSuccess,
    uid,
    switchCamera,
    startPreview,
    remoteUsers,
    leaveChannel,
  } = useInitBroadcastEngine({});
  const {resetLiveStore} = useSnapshot(liveStore);

  const [counterModalVisible, setCounterModalVisible] =
    useState<boolean>(false);

  function joinChannelHandler() {
    if (liveStarted) {
      closeHandler();
    } else {
      setCounterModalVisible(true);
    }
  }

  function closeHandler() {
    showSheet('confirmation-action', {
      payload: {
        title: 'End Your Live',
        description:
          'If you end your live, it will also end for all your viewers.',
        positiveText: 'End now',
        onClose: () => hideSheet('confirmation-action'),
        onConfirm: () => {
          leaveChannel();
          resetLiveStore();
          setLiveStarted(false);
          resetRoot('MainTabs');
          hideSheet('confirmation-action');
          showInfoMessage('Your live ended');
        },
      },
    });
  }

  function closeCounterModal() {
    setCounterModalVisible(false);
    setLiveStarted(true);
  }

  function renderVideo(user: VideoCanvas): ReactElement | undefined {
    return (
      <RtcSurfaceView
        style={styles.video}
        zOrderMediaOverlay={user.uid !== 0}
        canvas={{...user, setupMode: VideoViewSetupMode.VideoViewSetupReplace}}
      />
    );
  }

  return (
    <AppContainer safeArea={false}>
      <LiveHeader onClose={closeHandler} />
      {!liveStarted && (
        <Box
          position="absolute"
          flex={1}
          h="100%"
          w="100%"
          zIndex={776}
          bg={Colors.BLACK_TRANSPARENT}
        />
      )}
      <BaseComponent
        name={'JoinChannelVideo'}
        renderChannel={RenderNothing}
        renderUsers={() => (
          <BaseRenderUsers
            enableVideo={enableVideo}
            renderVideo={renderVideo}
            startPreview={startPreview}
            joinChannelSuccess={joinChannelSuccess}
            remoteUsers={remoteUsers}
          />
        )}
      />
      <ExperienceCard />
      <CreateLiveFooter
        liveHandler={joinChannelHandler}
        switchOnPress={switchCamera}
        liveStarted={liveStarted}
      />
      {counterModalVisible && (
        <CounterModal
          visible={counterModalVisible}
          onClose={closeCounterModal}
        />
      )}
    </AppContainer>
  );
};

export default LiveScreen;

function CreateLiveFooter({
  liveHandler,
  switchOnPress,
  liveStarted,
}: {
  liveHandler?: () => void;
  switchOnPress?: () => void;
  liveStarted?: boolean;
}) {
  const insets = useSafeAreaInsets();

  return (
    <VStack
      zIndex={999}
      px={24}
      w="100%"
      bottom={insets.bottom}
      position="absolute">
      <HStack space={16}>
        <AppButton
          onPress={liveHandler}
          flex={1}
          width="auto"
          title={liveStarted ? 'End live' : 'Start live'}
        />
        <AppTouchable
          onPress={switchOnPress}
          disabled={liveStarted}
          rounded={8}
          p={7}
          bg={Colors.Silver_transparent_80}>
          <Reload />
        </AppTouchable>
      </HStack>
    </VStack>
  );
}

function ExperienceCard() {
  const {liveData, liveType} = useSnapshot(liveStore);
  const [expanded, setExpanded] = useState<boolean>(false);

  return (
    <VStack
      w="90%"
      p={16}
      rounded={16}
      zIndex={777}
      alignSelf="center"
      justifyContent="flex-start"
      maxH={height * 0.5}
      minH={height * 0.3}
      position="absolute"
      bottom={expanded ? 150 : 0}>
      <AppScrollView contentContainerStyle={styles.scrollView}>
        <VStack space={12}>
          <AppText fontFamily="bold" fontSize={fontSize.large}>
            {liveData?.title}
          </AppText>

          {!expanded ? (
            <>
              <AppText color={Colors.DarkGray} numberOfLines={2}>
                {liveData?.description}
              </AppText>
              <AppText
                right={0}
                zIndex={800}
                bottom={-20}
                position="absolute"
                color={Colors.PRIMARY}
                onPress={() => setExpanded(true)}>
                Show more...
              </AppText>
            </>
          ) : (
            <VStack space={12}>
              <AppText color={Colors.VeryLightGrey}>
                {liveData?.description}
              </AppText>

              <AppTouchable
                py={6}
                px={12}
                gap={8}
                rounded={8}
                flexDirection="row"
                bg={Colors.Nero_3}
                alignSelf="flex-start">
                <Note />
                <AppText fontWeight="bold">See Resume</AppText>
              </AppTouchable>

              <HStack justifyContent="space-between">
                <VStack space={16}>
                  <AppText color={Colors.DarkGray}>Category</AppText>
                  <AppText fontFamily="bold">
                    {liveData?.category?.title}
                  </AppText>
                </VStack>
                {liveType === LiveType.LiveContent && (
                  <VStack space={16}>
                    <AppText color={Colors.DarkGray}>Price</AppText>
                    <AppText fontFamily="bold">
                      {liveData?.isFree ? 'Free' : `$${liveData?.price}`}
                    </AppText>
                  </VStack>
                )}
              </HStack>

              <HStack mt={16} alignItems="flex-end">
                <VStack flex={1} space={24}>
                  <AppText color={Colors.DarkGray}>
                    Publishing schedule:{' '}
                  </AppText>
                  <AppText fontFamily="bold">
                    {liveData?.setSchedule
                      ? `${appFormatDate(
                          liveData?.publishingScheduleDate,
                          'YYYY/m/dd',
                        )}, ${parseISODuration(
                          liveData?.publishingScheduleTime,
                        )}`
                      : '-'}
                  </AppText>
                </VStack>

                <AppText
                  zIndex={800}
                  color={Colors.PRIMARY}
                  onPress={() => setExpanded(false)}>
                  Show less...
                </AppText>
              </HStack>
            </VStack>
          )}
        </VStack>
      </AppScrollView>
    </VStack>
  );
}

const styles = StyleSheet.create({
  video: {
    flex: 1,
    height: '100%',
    width: '100%',
  },
  scrollView: {
    flexGrow: 1,
  },
});
