import React, {ReactElement, useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import {
  ClientRoleType,
  LocalVideoStreamReason,
  LocalVideoStreamState,
  RtcSurfaceView,
  VideoCanvas,
  VideoSourceType,
  VideoViewSetupMode,
} from 'react-native-agora';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useSnapshot} from 'valtio';
import {Note, Reload} from '~/assets/svgs';
import {
  AppButton,
  AppContainer,
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
import useInitRtcEngine from '~/hooks/agora/useInitRtcEngine';
import {goBack} from '~/navigation/methods';
import {liveStore} from '~/stores';
import {Colors} from '~/styles';
import * as log from '~/utils/log';
import {fontSize, height} from '~/utils/style';
import {
  appFormatDate,
  hideSheet,
  showInfoMessage,
  showSheet,
} from '~/utils/utils';

export default function LiveScreen() {
  const [enableVideo] = useState<boolean>(true);
  const [liveStarted, setLiveStarted] = useState<boolean>(false);
  const {
    joinChannelSuccess,
    remoteUsers,
    startPreview,
    engine,
    uid,
    channelId,
    token,
  } = useInitRtcEngine(enableVideo);

  const [_, setSwitchCamera] = useState(false);
  const [counterModalVisible, setCounterModalVisible] =
    useState<boolean>(false);

  function switchCamera() {
    engine.current.switchCamera();
    setSwitchCamera(prev => !prev);
  }

  function joinChannel() {
    setLiveStarted(true);
    setCounterModalVisible(true);
  }

  function leaveChannel() {
    engine.current.leaveChannel();
  }

  useEffect(() => {
    engine.current.addListener(
      'onVideoDeviceStateChanged',
      (deviceId: string, deviceType: number, deviceState: number) => {
        log.info(
          'onVideoDeviceStateChanged',
          'deviceId',
          deviceId,
          'deviceType',
          deviceType,
          'deviceState',
          deviceState,
        );
      },
    );

    engine.current.addListener(
      'onLocalVideoStateChanged',
      (
        source: VideoSourceType,
        state: LocalVideoStreamState,
        error: LocalVideoStreamReason,
      ) => {
        log.info(
          'onLocalVideoStateChanged',
          'source',
          source,
          'state',
          state,
          'error',
          error,
        );
      },
    );

    const engineCopy = engine.current;
    return () => {
      engineCopy.removeAllListeners();
    };
  }, [engine]);

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
          goBack();
          hideSheet('confirmation-action');
          showInfoMessage('Your live ended');
          setLiveStarted(false);
        },
      },
    });
  }

  function closeCounterModal() {
    setCounterModalVisible(false);
    if (!channelId) {
      log.error('channelId is invalid');
      return;
    }
    if (uid < 0) {
      log.error('uid is invalid');
      return;
    }

    // start joining channel
    // 1. Users can only see each other after they join the
    // same channel successfully using the same app id.
    // 2. If app certificate is turned on at dashboard, token is needed
    // when joining channel. The channel name and uid used to calculate
    // the token has to match the ones used for channel join

    engine.current.joinChannel(token, channelId, uid, {
      // Make myself as the broadcaster to send stream to remote
      clientRoleType: ClientRoleType.ClientRoleBroadcaster,
    });
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
      {!liveStarted && <ExperienceCard />}
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
      <CreateLiveFooter
        startOnPress={joinChannel}
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
}

function CreateLiveFooter({
  startOnPress,
  switchOnPress,
  liveStarted,
}: {
  startOnPress?: () => void;
  switchOnPress?: () => void;
  liveStarted?: boolean;
}) {
  const insets = useSafeAreaInsets();

  return (
    <VStack
      zIndex={779}
      px={24}
      w="100%"
      bottom={insets.bottom}
      position="absolute">
      <HStack space={16}>
        <AppButton
          onPress={startOnPress}
          flex={1}
          width="auto"
          title={liveStarted ? 'End live' : 'Start live'}
        />
        <AppTouchable
          onPress={switchOnPress}
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
  const {liveData} = useSnapshot(liveStore);
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
      bottom={200}>
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
              show more...
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
                <AppText fontFamily="bold">{liveData?.category?.title}</AppText>
              </VStack>
              <VStack space={16}>
                <AppText color={Colors.DarkGray}>Price</AppText>
                <AppText fontFamily="bold">
                  {liveData?.isFree ? 'Free' : `$${liveData?.price}`}
                </AppText>
              </VStack>
            </HStack>

            <HStack mt={16} alignItems="flex-end">
              <VStack flex={1} space={24}>
                <AppText color={Colors.DarkGray}>Publishing schedule: </AppText>
                <AppText fontFamily="bold">
                  {liveData?.isSchedule
                    ? `${appFormatDate(
                        liveData?.publishingScheduleDate,
                        'YYYY/m/dd',
                      )}, ${appFormatDate(liveData?.publishingScheduleTime)}`
                    : '-'}
                </AppText>
              </VStack>

              <AppText
                zIndex={800}
                color={Colors.PRIMARY}
                onPress={() => setExpanded(false)}>
                show Less...
              </AppText>
            </HStack>
          </VStack>
        )}
      </VStack>
    </VStack>
  );
}

const styles = StyleSheet.create({
  video: {
    flex: 1,
    height: '100%',
    width: '100%',
  },
});
