import {useCallback, useEffect, useRef, useState} from 'react';
import {agoraStore, liveStore} from '~/stores';
import {useSnapshot} from 'valtio';
import createAgoraRtcEngine, {
  ChannelProfileType,
  ClientRoleType,
  ErrorCodeType,
  IRtcEngineEx,
  RtcConnection,
  VideoStreamType,
} from 'react-native-agora';
import * as log from '~/utils/log';
import {askMediaAccess} from '~/utils/permissions';
import {
  useAgora_StopRecordMutation,
  useLive_UpdateLiveMutation,
} from '~/graphql/generated';

const useInitBroadcastEngine = ({
  listenUserJoinOrLeave = true,
}: {
  listenUserJoinOrLeave?: boolean;
}) => {
  const {appId} = agoraStore(state => state);
  const {liveId, token} = useSnapshot(liveStore);
  const [joinChannelSuccess, setJoinChannelSuccess] = useState(false);
  const [uid, setUid] = useState(0);
  const [remoteUsers, setRemoteUsers] = useState<number[]>([]);
  const [startPreview, setStartPreview] = useState(false);
  const channelId = String(liveId);
  const engine = useRef<IRtcEngineEx>(createAgoraRtcEngine() as IRtcEngineEx);

  const {mutate: mutateStopRecord} = useAgora_StopRecordMutation();
  const {mutate: mutateUpdateLive} = useLive_UpdateLiveMutation();

  const initEngine = useCallback(async () => {
    if (appId && channelId && token) {
      engine.current.initialize({
        appId,
        logConfig: {filePath: ''},
        channelProfile: ChannelProfileType.ChannelProfileLiveBroadcasting,
      });
      await askMediaAccess(['android.permission.CAMERA']);
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
      engine.current.joinChannel(token, channelId, 0, {
        defaultVideoStreamType: VideoStreamType.VideoStreamHigh,
        channelProfile: ChannelProfileType.ChannelProfileLiveBroadcasting,
        clientRoleType: ClientRoleType.ClientRoleBroadcaster,
      });
      setStartPreview(true);
    } else {
      !appId && log.error('appId is invalid');
      !channelId && log.error('channelId is invalid');
      !token && log.error('token is invalid');
    }
  }, [engine, appId, channelId, token]);

  const switchCamera = () => {
    engine.current.switchCamera();
  };

  function leaveChannel() {
    engine.current.leaveChannel();
    engine.current.stopChannelMediaRelay();
    engine.current.removeAllListeners();
    engine.current.release();
    mutateStopRecord(
      {channelName: channelId},
      {
        onSuccess() {},
      },
    );
  }

  const onError = useCallback((err: ErrorCodeType, msg: string) => {
    log.info('onError', 'err', err, 'msg', msg);
  }, []);

  const onJoinSuccess = useCallback(
    (connection: RtcConnection) => {
      mutateUpdateLive(
        {
          input: {
            agoraUserId: connection.localUid?.toString(),
            id: Number(channelId),
          },
        },
        {
          onSuccess: response => {
            if (response?.live_updateLive?.status?.code === 1) {
              console.log('yes success');
            }
            console.log('response-->', response);
          },
        },
      );
    },
    [channelId, mutateUpdateLive],
  );

  const onJoinChannelSuccess = useCallback(
    (connection: RtcConnection) => {
      if (
        connection.channelId === channelId &&
        (connection.localUid === uid || uid === 0)
      ) {
        setJoinChannelSuccess(true);
        onJoinSuccess?.(connection);
      }
    },
    [channelId, uid, onJoinSuccess],
  );

  const onUserJoined = useCallback(
    (connection: RtcConnection, remoteUid: number) => {
      if (
        connection.channelId === channelId &&
        (connection.localUid === uid || uid === 0)
      ) {
        setRemoteUsers(prev => {
          if (prev === undefined) return [];
          return [...prev, remoteUid];
        });
      }
    },
    [channelId, uid],
  );

  const onUserOffline = useCallback(
    (connection: RtcConnection, remoteUid: number) => {
      if (
        connection.channelId === channelId &&
        (connection.localUid === uid || uid === 0)
      ) {
        setRemoteUsers(prev => {
          if (prev === undefined) return [];
          return prev!.filter(value => value !== remoteUid);
        });
      }
    },
    [channelId, uid],
  );

  useEffect(() => {
    (async () => {
      await initEngine();
    })();

    const engineCopy = engine.current;
    return () => {
      engineCopy.release();
    };
  }, [engine, initEngine]);

  useEffect(() => {
    engine.current.addListener('onError', onError);
    engine.current.addListener('onJoinChannelSuccess', onJoinChannelSuccess);
    if (listenUserJoinOrLeave) {
      engine.current.addListener('onUserJoined', onUserJoined);
      engine.current.addListener('onUserOffline', onUserOffline);
    }
    const engineCopy = engine.current;
    return () => {
      engineCopy.removeListener('onError', onError);
      engineCopy.removeListener('onJoinChannelSuccess', onJoinChannelSuccess);
      if (listenUserJoinOrLeave) {
        engineCopy.removeListener('onUserJoined', onUserJoined);
        engineCopy.removeListener('onUserOffline', onUserOffline);
      }
    };
  }, [
    onError,
    onJoinChannelSuccess,
    listenUserJoinOrLeave,
    onUserJoined,
    onUserOffline,
  ]);

  return {
    uid,
    remoteUsers,
    startPreview,
    joinChannelSuccess,
    setJoinChannelSuccess,
    onJoinChannelSuccess,
    switchCamera,
    leaveChannel,
  };
};

export default useInitBroadcastEngine;
