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
import {useSnapshot} from 'valtio';
import {
  AppContainer,
  BaseComponent,
  BaseRenderUsers,
  LiveHeader,
  RenderNothing,
} from '~/components';
import useInitRtcEngine from '~/hooks/agora/useInitRtcEngine';
import {goBack} from '~/navigation/methods';
import {liveStore} from '~/stores';
import * as log from '~/utils/log';
import {height, width} from '~/utils/style';

const setupMode = VideoViewSetupMode.VideoViewSetupReplace;

export default function LiveScreen() {
  const [enableVideo] = useState<boolean>(true);
  const {
    channelId,
    token,
    uid,
    joinChannelSuccess,
    remoteUsers,
    startPreview,
    engine,
  } = useInitRtcEngine(enableVideo);

  const {liveData} = useSnapshot(liveStore);

  useEffect(() => {
    setTimeout(() => {
      joinChannel();
    }, 5000);
  }, []);

  const joinChannel = () => {
    if (!channelId) {
      log.error('channelId is invalid');
      return;
    }
    if (uid < 0) {
      log.error('uid is invalid');
      return;
    }
    engine.current.joinChannel(token, channelId, uid, {
      // Make myself as the broadcaster to send stream to remote
      clientRoleType: ClientRoleType.ClientRoleAudience,
    });
  };

  const leaveChannel = () => {
    engine.current.leaveChannel();
    goBack();
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

  return (
    <AppContainer safeArea={false}>
      <LiveHeader
        user={{
          photoUrl: liveData?.user?.photoUrl,
          username: liveData?.user?.username,
        }}
        isOwner={false}
        onClose={leaveChannel}
      />
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
    </AppContainer>
  );

  function renderVideo(user: VideoCanvas): ReactElement | undefined {
    return (
      <RtcSurfaceView
        style={styles.video}
        zOrderMediaOverlay={user.uid !== 0}
        canvas={{...user, setupMode}}
      />
    );
  }
}

const styles = StyleSheet.create({
  video: {
    flex: 1,
    height: height,
    width: width,
    alignSelf: 'center',
  },
});
