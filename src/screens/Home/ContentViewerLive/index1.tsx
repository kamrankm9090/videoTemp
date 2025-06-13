import React, {useEffect, useRef, useState} from 'react';
import {AppContainer, LiveHeader} from '~/components';
import {useSnapshot} from 'valtio';
import {agoraStore, liveStore} from '~/stores';
import createAgoraRtcEngine, {
  ChannelProfileType,
  ClientRoleType,
  IRtcEngineEx,
  VideoStreamType,
  RtcSurfaceView,
  RtcConnection,
} from 'react-native-agora';
import {goBack} from '~/navigation/methods';
import * as log from '~/utils/log';

const ContentViewerLiveScreen = () => {
  const {appId} = agoraStore(state => state);
  const {liveId, token} = useSnapshot(liveStore);
  const {liveData, resetLiveStore} = useSnapshot(liveStore);
  const channelId = String(liveId);
  const engine = useRef<IRtcEngineEx>(createAgoraRtcEngine() as IRtcEngineEx);
  const [remoteUid, setRemoteUid] = useState<{
    uid: number;
    connection: RtcConnection;
  } | null>(null);

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
      engine.current.setClientRole(ClientRoleType.ClientRoleAudience);
      engine.current.setVideoEncoderConfiguration({
        dimensions: {width: 1920, height: 1080},
        frameRate: 30,
        bitrate: 2080,
        orientationMode: 0,
      });
      engine.current.joinChannel(token, channelId, 0, {
        defaultVideoStreamType: VideoStreamType.VideoStreamHigh,
        channelProfile: ChannelProfileType.ChannelProfileLiveBroadcasting,
        clientRoleType: ClientRoleType.ClientRoleBroadcaster,
      });
    };

    engine.current.addListener('onUserJoined', (connection, uid) => {
      setRemoteUid({connection, uid});
    });

    init();

    return () => {
      engine?.current?.leaveChannel();
    };
  }, [engine, appId, channelId, token]);

  const leaveChannel = async () => {
    try {
      engine.current.leaveChannel();
      resetLiveStore();
      goBack();
    } catch (err) {
      log.error('leaveChannel error', err);
    }
  };

  return (
    <AppContainer>
      <LiveHeader
        user={{
          photoUrl: liveData?.user?.photoUrl,
          username: liveData?.user?.username,
        }}
        isOwner={false}
        onClose={leaveChannel}
      />
      {remoteUid !== null && (
        <RtcSurfaceView
          style={{flex: 1}}
          connection={remoteUid?.connection}
          canvas={{uid: remoteUid.uid}}
        />
      )}
    </AppContainer>
  );
};

export default ContentViewerLiveScreen;
