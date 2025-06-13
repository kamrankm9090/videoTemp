import {View, PermissionsAndroid, Platform, Text} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {AppContainer, LiveHeader} from '~/components';
import {hideSheet, showInfoMessage, showSheet} from '~/utils/utils';
import {
  RtcSurfaceView,
  createAgoraRtcEngine,
  IRtcEngineEx,
  ChannelProfileType,
  VideoStreamType,
  ClientRoleType,
} from 'react-native-agora';
import {resetRoot} from '~/navigation/methods';
import {agoraStore, liveStore} from '~/stores';
import {useSnapshot} from 'valtio';

const LiveScreen = () => {
  const {appId} = agoraStore(state => state);
  const {liveId, token} = useSnapshot(liveStore);
  const {resetLiveStore} = useSnapshot(liveStore);
  const channelId = String(liveId);
  const engine = useRef<IRtcEngineEx>(createAgoraRtcEngine() as IRtcEngineEx);

  useEffect(() => {
    const init = async () => {
      engine.current.initialize({
        appId,
        logConfig: {filePath: ''},
        channelProfile: ChannelProfileType.ChannelProfileLiveBroadcasting,
      });
      engine.current.enableVideo();
      engine.current.setChannelProfile(
        ChannelProfileType.ChannelProfileLiveBroadcasting,
      ); // LiveBroadcasting
      engine.current.setClientRole(ClientRoleType.ClientRoleBroadcaster);
      engine.current.setVideoEncoderConfiguration({
        dimensions: {width: 1920, height: 1080},
        frameRate: 30,
        bitrate: 2080,
        orientationMode: 0,
      });
      engine.current.startPreview();
      engine.current.switchCamera();
      engine.current.joinChannel(token, channelId, 0, {
        defaultVideoStreamType: VideoStreamType.VideoStreamHigh,
        channelProfile: ChannelProfileType.ChannelProfileLiveBroadcasting,
        clientRoleType: ClientRoleType.ClientRoleBroadcaster,
      });
    };

    if (Platform.OS === 'android') {
      PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.CAMERA,
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
      ]).then(init);
    } else {
      init();
    }

    return () => {
      engine?.current?.leaveChannel();
    };
  }, [engine, appId, channelId, token]);

  function closeHandler() {
    showSheet('confirmation-action', {
      payload: {
        title: 'End Your Live',
        description:
          'If you end your live, it will also end for all your viewers.',
        positiveText: 'End now',
        onClose: () => hideSheet('confirmation-action'),
        onConfirm: () => {
          engine?.current?.leaveChannel();
          resetLiveStore();
          resetRoot('MainTabs');
          hideSheet('confirmation-action');
          showInfoMessage('Your live ended');
        },
      },
    });
  }

  return (
    <AppContainer safeArea={false}>
      <LiveHeader onClose={closeHandler} />
      {engine && (
        <RtcSurfaceView
          style={{flex: 1}}
          canvas={{uid: 0}}
          zOrderMediaOverlay={false}
        />
      )}
    </AppContainer>
  );
};

export default LiveScreen;
