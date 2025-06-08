import {useCallback, useEffect, useRef, useState} from 'react';
import createAgoraRtcEngine, {
  ChannelProfileType,
  ErrorCodeType,
  IRtcEngineEx,
  RtcConnection,
  RtcStats,
  UserOfflineReasonType,
} from 'react-native-agora';
import {useSnapshot} from 'valtio';
import {agoraStore, liveStore} from '~/stores';
import * as log from '~/utils/log';
import {askMediaAccess} from '~/utils/permissions';

const useInitRtcEngine = ({
  enableVideo,
  listenUserJoinOrLeave = true,
  isBroadcaster,
  onJoinSuccess,
  onOfflineUser,
  onLeaveSuccess,
}: {
  enableVideo?: boolean;
  listenUserJoinOrLeave?: boolean;
  isBroadcaster?: boolean;
  onJoinSuccess?: (connection: RtcConnection, elapsed: number) => void;
  onLeaveSuccess?: (connection: RtcConnection, stats: RtcStats) => void;
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

  function setChannelId(id: string) {
    console.log('setChannelId-->', id);
  }

  const engine = useRef<IRtcEngineEx>(createAgoraRtcEngine() as IRtcEngineEx);

  const initRtcEngine = useCallback(async () => {
    if (!appId) {
      log.error(`appId is invalid`);
    }

    engine.current.initialize({
      appId,
      logConfig: {filePath: ''},
      channelProfile: ChannelProfileType.ChannelProfileLiveBroadcasting,
    });

    if (isBroadcaster) {
    }
    await askMediaAccess(['android.permission.RECORD_AUDIO']);
    engine.current.enableAudio();
    if (enableVideo) {
      await askMediaAccess(['android.permission.CAMERA']);
      engine.current.enableVideo();
      engine.current.startPreview();
      setStartPreview(true);
    }
  }, [appId, enableVideo, isBroadcaster]);

  const onError = useCallback((err: ErrorCodeType, msg: string) => {
    log.info('onError', 'err', err, 'msg', msg);
  }, []);

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
        onJoinSuccess?.(connection, elapsed);
      }
    },
    [channelId, uid, onJoinSuccess],
  );

  const onLeaveChannel = useCallback(
    (connection: RtcConnection, stats: RtcStats) => {
      // log.info('onLeaveChannel', 'connection', connection, 'stats', stats);
      onLeaveSuccess?.(connection, stats);
      if (
        connection.channelId === channelId &&
        (connection.localUid === uid || uid === 0)
      ) {
        setJoinChannelSuccess(false);
        setRemoteUsers([]);
      }
    },
    [channelId, uid, onLeaveSuccess],
  );

  const onUserJoined = useCallback(
    (connection: RtcConnection, remoteUid: number, elapsed: number) => {
      // log.info(
      //   'onUserJoined',
      //   'connection',
      //   connection,
      //   'remoteUid',
      //   remoteUid,
      //   'elapsed',
      //   elapsed,
      // );
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
    engine.current.addListener('onLeaveChannel', onLeaveChannel);
    if (listenUserJoinOrLeave) {
      engine.current.addListener('onUserJoined', onUserJoined);
      engine.current.addListener('onUserOffline', onUserOffline);
    }

    const engineCopy = engine.current;
    return () => {
      engineCopy.removeListener('onError', onError);
      engineCopy.removeListener('onJoinChannelSuccess', onJoinChannelSuccess);
      engineCopy.removeListener('onLeaveChannel', onLeaveChannel);
      if (listenUserJoinOrLeave) {
        engineCopy.removeListener('onUserJoined', onUserJoined);
        engineCopy.removeListener('onUserOffline', onUserOffline);
      }
    };
  }, [
    engine,
    initRtcEngine,
    onError,
    onJoinChannelSuccess,
    onLeaveChannel,
    onUserJoined,
    onUserOffline,
    listenUserJoinOrLeave,
  ]);

  return {
    appId,
    channelId,
    token,
    uid,
    setUid,
    joinChannelSuccess,
    setJoinChannelSuccess,
    remoteUsers,
    setRemoteUsers,
    startPreview,
    engine,
    setChannelId,
    onJoinChannelSuccess,
  };
};
export default useInitRtcEngine;
