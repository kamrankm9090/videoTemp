import {useCallback, useEffect, useRef, useState} from 'react';
import createAgoraRtcEngine, {
  ChannelProfileType,
  ClientRoleType,
  ErrorCodeType,
  IRtcEngineEx,
  RtcConnection,
  ThreadPriorityType,
  UserOfflineReasonType,
} from 'react-native-agora';
import {useSnapshot} from 'valtio';
import {agoraStore, liveStore} from '~/stores';
import * as log from '~/utils/log';

const useInitAudienceEngine = ({
  listenUserJoinOrLeave = true,
  onOfflineUser,
}: {
  listenUserJoinOrLeave?: boolean;
  onOfflineUser?: (
    connection: RtcConnection,
    remoteUid: number,
    reason: UserOfflineReasonType,
  ) => void;
}) => {
  const {appId} = agoraStore(state => state);
  const {liveId, token} = useSnapshot(liveStore);
  const channelId = String(liveId);
  const [uid, setUid] = useState(0);
  const [joinChannelSuccess, setJoinChannelSuccess] = useState(false);
  const [remoteUsers, setRemoteUsers] = useState<number[]>([]);
  const [startPreview, setStartPreview] = useState(false);

  const engine = useRef<IRtcEngineEx>(createAgoraRtcEngine() as IRtcEngineEx);

  const initRtcEngine = useCallback(async () => {
    if (!appId) {
      log.error('appId is invalid');
    }

    engine.current.initialize({
      appId,
      logConfig: {filePath: ''},
      channelProfile: ChannelProfileType.ChannelProfileLiveBroadcasting,
      threadPriority: ThreadPriorityType.Critical,
    });

    engine.current.setVideoEncoderConfiguration({
      dimensions: {width: 1920, height: 1080},
      frameRate: 60,
      bitrate: 1130,
      orientationMode: 0,
    });
    engine.current.setChannelProfile(
        ChannelProfileType.ChannelProfileLiveBroadcasting,
      );
    engine.current.enableDualStreamMode(false);
    engine.current.setRemoteVideoStreamType(uid, 0);
    engine.current.setClientRole(ClientRoleType.ClientRoleAudience);
  }, [appId, uid]);

  const onJoinChannelSuccess = useCallback(
    (connection: RtcConnection, elapsed: number) => {
      // log.info(
      //   'onJoinChannelSuccess',
      //   'connection',
      //   connection,
      //   'elapsed',
      //   elapsed,
      // );
      if (
        connection.channelId === channelId &&
        (connection.localUid === uid || uid === 0)
      ) {
        setJoinChannelSuccess(true);
      }
    },
    [channelId, uid],
  );

  const onError = useCallback((err: ErrorCodeType, msg: string) => {
    log.info('onError', 'err', err, 'msg', msg);
  }, []);

  const onUserOffline = useCallback(
    (
      connection: RtcConnection,
      remoteUid: number,
      reason: UserOfflineReasonType,
    ) => {
      onOfflineUser?.(connection, remoteUid, reason);
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
    [channelId, uid, onOfflineUser],
  );

  useEffect(() => {
    (async () => {
      await initRtcEngine();
    })();

    const engineCopy = engine.current;
    return () => {
      engineCopy.release();
    };
  }, [engine, initRtcEngine]);

  useEffect(() => {
    engine.current.addListener('onError', onError);
    engine.current.addListener('onJoinChannelSuccess', onJoinChannelSuccess);
    if (listenUserJoinOrLeave) {
      engine.current.addListener('onUserOffline', onUserOffline);
    }
    const engineCopy = engine.current;
    return () => {
      engineCopy.removeListener('onError', onError);
      engineCopy.removeListener('onJoinChannelSuccess', onJoinChannelSuccess);
      if (listenUserJoinOrLeave) {
        engineCopy.removeListener('onUserOffline', onUserOffline);
      }
    };
  }, [
    engine,
    initRtcEngine,
    onError,
    onJoinChannelSuccess,
    onUserOffline,
    listenUserJoinOrLeave,
  ]);

  return {
    channelId,
    token,
    uid,
    joinChannelSuccess,
    remoteUsers,
    startPreview,
    engine,
  };
};

export default useInitAudienceEngine;
