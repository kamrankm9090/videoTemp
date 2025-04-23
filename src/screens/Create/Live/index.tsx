import React, {ReactElement, useEffect, useState} from 'react';
import {Platform, StyleSheet} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {
  Close2,
  HotSpot2,
  Note,
  Reload,
  ThreePointVertical,
} from '~/assets/svgs';
import {
  AppButton,
  AppContainer,
  AppImage,
  AppText,
  AppTouchable,
  HStack,
  VStack,
  BaseComponent,
  BaseRenderChannel,
  BaseRenderUsers,
} from '~/components';
import useInitRtcEngine from '~/hooks/agora/useInitRtcEngine';
import {Colors} from '~/styles';
import {fontSize} from '~/utils/style';
import {
  ClientRoleType,
  LocalVideoStreamReason,
  LocalVideoStreamState,
  RtcSurfaceView,
  RtcTextureView,
  VideoCanvas,
  VideoSourceType,
  VideoViewSetupMode,
} from 'react-native-agora';
import * as log from '~/utils/log';
import {
  AgoraButton,
  AgoraDivider,
  AgoraDropdown,
  AgoraStyle,
  AgoraSwitch,
} from '~/components/ui';
import {enumToItems} from '~/utils/utils';

export default function LiveScreen() {
  const [enableVideo] = useState<boolean>(true);
  const {
    channelId,
    setChannelId,
    token,
    uid,
    joinChannelSuccess,
    remoteUsers,
    startPreview,
    engine,
  } = useInitRtcEngine(enableVideo);

  const [_, setSwitchCamera] = useState(false);
  const [renderByTextureView, setRenderByTextureView] = useState(false);
  const [setupMode, setSetupMode] = useState(
    VideoViewSetupMode.VideoViewSetupReplace,
  );

  const _switchCamera = () => {
    engine.current.switchCamera();
    setSwitchCamera(prev => !prev);
  };

  const joinChannel = () => {
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
  };

  const leaveChannel = () => {
    engine.current.leaveChannel();
  };

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

  function renderVideo(user: VideoCanvas): ReactElement | undefined {
    return renderByTextureView ? (
      <RtcTextureView
        style={user.uid === 0 ? AgoraStyle.videoLarge : AgoraStyle.videoSmall}
        canvas={{...user, setupMode}}
      />
    ) : (
      <RtcSurfaceView
        style={user.uid === 0 ? AgoraStyle.videoLarge : AgoraStyle.videoSmall}
        zOrderMediaOverlay={user.uid !== 0}
        canvas={{...user, setupMode}}
      />
    );
  }

  function renderConfiguration(): ReactElement | undefined {
    return (
      <>
        {Platform.OS === 'android' && (
          <AgoraSwitch
            disabled={!startPreview && !joinChannelSuccess}
            title={`renderByTextureView`}
            value={renderByTextureView}
            onValueChange={value => {
              setRenderByTextureView(value);
            }}
          />
        )}
        <AgoraDivider />
        <AgoraDropdown
          title={'setupMode'}
          items={enumToItems(VideoViewSetupMode)}
          value={setupMode}
          onValueChange={value => {
            setSetupMode(value);
          }}
        />
        {setupMode === VideoViewSetupMode.VideoViewSetupAdd ? (
          <>
            <AgoraDivider />
            {renderByTextureView ? (
              <RtcTextureView
                style={AgoraStyle.videoSmall}
                canvas={{uid: 0, setupMode}}
              />
            ) : (
              <RtcSurfaceView
                style={AgoraStyle.videoSmall}
                canvas={{uid: 0, setupMode}}
              />
            )}
          </>
        ) : undefined}
        <AgoraDivider />
      </>
    );
  }

  function renderAction(): ReactElement | undefined {
    return (
      <>
        <AgoraButton
          disabled={!startPreview && !joinChannelSuccess}
          title={`switchCamera`}
          onPress={_switchCamera}
        />
      </>
    );
  }

  return (
    <AppContainer>
      {/* <CreateLiveHeader />
      <ExperienceCard />
      <LiveCard /> */}
      <BaseComponent
        name={'JoinChannelVideo'}
        renderConfiguration={renderConfiguration}
        renderChannel={() => (
          <BaseRenderChannel
            channelId={channelId}
            joinChannel={joinChannel}
            leaveChannel={leaveChannel}
            joinChannelSuccess={joinChannelSuccess}
            onChannelIdChange={setChannelId}
          />
        )}
        renderUsers={() => (
          <BaseRenderUsers
            enableVideo={enableVideo}
            renderVideo={renderVideo}
            startPreview={startPreview}
            joinChannelSuccess={joinChannelSuccess}
            remoteUsers={remoteUsers}
          />
        )}
        renderAction={renderAction}
      />
      <CreateLiveFooter
        startOnPress={joinChannel}
        switchOnPress={_switchCamera}
      />
    </AppContainer>
  );
}

function CreateLiveHeader() {
  const insets = useSafeAreaInsets();

  function closeHandler() {}

  return (
    <HStack
      py={10}
      px={56}
      top={insets.top}
      space={8}
      position="absolute"
      justifyContent="center">
      <AppTouchable
        p={18}
        rounded={8}
        onPress={closeHandler}
        bg={Colors.Nero_2}
        alignItems="center"
        justifyContent="center">
        <Close2 />
      </AppTouchable>
      <HStack rounded={8} bg={Colors.Nero_2} space={12} py={10} px={12}>
        <AppImage imageSource={''} resizeMode="stretch" style={styles.avatar} />
        <AppText numberOfLines={1} flex={1}>
          Luna Miller
        </AppText>
        <HStack space={4}>
          <AppText>0</AppText>
          <HotSpot2 />
        </HStack>
        <AppTouchable>
          <ThreePointVertical />
        </AppTouchable>
      </HStack>
    </HStack>
  );
}

function CreateLiveFooter({
  startOnPress,
  switchOnPress,
}: {
  startOnPress?: () => void;
  switchOnPress?: () => void;
}) {
  const insets = useSafeAreaInsets();

  return (
    <VStack px={24} w="100%" bottom={insets.bottom} position="absolute">
      <HStack space={16}>
        <AppButton
          onPress={startOnPress}
          flex={1}
          width="auto"
          title="Start live"
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
  const [expanded, setExpanded] = useState<boolean>(false);

  return (
    <VStack
      w="90%"
      bg={Colors.BLACK_TRANSPARENT}
      p={16}
      rounded={16}
      alignSelf="center"
      justifyContent="flex-end"
      style={{height: 550}}
      position="relative"
      overflow="hidden">
      <AppImage
        imageSource={'https://via.placeholder.com/400x600'}
        style={StyleSheet.absoluteFill}
        resizeMode="cover"
      />

      <VStack space={12}>
        <AppText fontFamily="bold" fontSize={fontSize.large}>
          Maximize You Experience:
        </AppText>

        {!expanded ? (
          <>
            <AppText color={Colors.DarkGray} numberOfLines={2}>
              Lorem ipsum dolor sit amet, consectetur
            </AppText>
            <AppText
              right={0}
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
              I want to make a film in the field of cosmetics and skincare
              products, and I am currently looking for these skills for this
              project.
            </AppText>

            <AppTouchable
              py={6}
              px={12}
              gap={8}
              rounded={8}
              flexDirection="row"
              alignSelf="flex-start">
              <Note />
              <AppText fontWeight="bold">See Resume</AppText>
            </AppTouchable>

            <HStack justifyContent="space-between">
              <VStack space={24}>
                <AppText color={Colors.DarkGray}>Category</AppText>
                <AppText fontFamily="bold">Beauty</AppText>
              </VStack>
              <VStack space={24}>
                <AppText color={Colors.DarkGray}>Price</AppText>
                <AppText fontFamily="bold">$45</AppText>
              </VStack>
            </HStack>

            <HStack alignItems="flex-end">
              <VStack flex={1} space={24}>
                <AppText color={Colors.DarkGray}>Publishing schedule: </AppText>
                <AppText fontFamily="bold">2024/2/10 , 3:15 AM</AppText>
              </VStack>

              <AppText
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

function LiveCard() {
  return (
    <>
      <></>
    </>
  );
}

const styles = StyleSheet.create({
  avatar: {
    height: 30,
    width: 30,
    borderRadius: 15,
  },
});
