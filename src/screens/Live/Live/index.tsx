import React, {useState, useEffect, useRef} from 'react';
import {Platform, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {
  createAgoraRtcEngine,
  ChannelProfileType,
  ClientRoleType,
  AudienceLatencyLevelType,
  RtcSurfaceView,
  RtcConnection,
  IRtcEngineEventHandler,
  VideoRemoteState,
  VideoSourceType,
  IRtcEngine,
} from 'react-native-agora';
import requestCameraAndAudioPermission from '~/utils/permissions';
import styles from './Styles';
import {agoraTempToken, appId, channelName} from '~/constants/constants';

/**
 * @property appId Agora App ID
 * @property token Token for the channel;
 * @property channelName Channel Name for the current session
 */
const token = agoraTempToken;

/**
 * @property isHost Boolean value to select between broadcaster and audience
 * @property joinSucceed State variable for storing success
 * @property peerIds Array for storing connected peers
 */
interface State {
  isHost: boolean;
  joinSucceed: boolean;
  peerIds: number[];
}

const App = () => {
  const [isHost, setIsHost] = useState(true);
  const [joinSucceed, setJoinSucceed] = useState(false);
  const [peerIds, setPeerIds] = useState<number[]>([]);
  const agoraEngineRef = useRef<IRtcEngine>();

  useEffect(() => {
    if (Platform.OS === 'android') {
      // Request required permissions from Android
      requestCameraAndAudioPermission().then(() => {
        console.log('requested!');
      });
    }
    init();
    return () => {
      agoraEngineRef.current?.release();
    };
  }, []);

  console.log('isHost-->', isHost);

  /**
   * @name init
   * @description Function to initialize the Rtc Engine, attach event listeners and actions
   */
  const init = async () => {
    agoraEngineRef.current = createAgoraRtcEngine();
    const agoraEngine = agoraEngineRef.current;
    await agoraEngine.initialize({appId: appId});

    await agoraEngineRef.current.enableVideo();
    await agoraEngineRef.current?.setChannelProfile(
      ChannelProfileType.ChannelProfileLiveBroadcasting,
    );
    await agoraEngineRef.current?.setClientRole(
      isHost
        ? ClientRoleType.ClientRoleBroadcaster
        : ClientRoleType.ClientRoleAudience,
    );

    agoraEngineRef.current.addListener('Warning', warn => {
      console.log('Warning', warn);
    });

    agoraEngineRef.current.addListener('onError', err => {
      console.log('Error', err);
    });

    agoraEngineRef.current.addListener('onUserJoined', (uid, elapsed) => {
      console.log('UserJoined', uid, elapsed);
      // If new user
      if (peerIds.indexOf(uid) === -1) {
        setPeerIds([...peerIds, uid]);
      }
    });

    agoraEngineRef.current.addListener('onUserOffline', (uid, reason) => {
      console.log('UserOffline', uid, reason);
      setPeerIds(peerIds.filter(id => id !== uid));
    });

    // If Local user joins RTC channel
    agoraEngineRef.current.addListener(
      'onJoinChannelSuccess',
      (channel, uid, elapsed) => {
        console.log('onJoinChannelSuccess', channel, uid, elapsed);
        setJoinSucceed(true);
      },
    );
  };

  /**
   * @name toggleRoll
   * @description Function to toggle the roll between broadcaster and audience
   */
  const toggleRoll = async () => {
    const newIsHost = !isHost;
    setIsHost(newIsHost);
    await agoraEngineRef.current?.setClientRole(
      newIsHost
        ? ClientRoleType.ClientRoleBroadcaster
        : ClientRoleType.ClientRoleAudience,
    );
  };

  /**
   * @name startCall
   * @description Function to start the call
   */
  const startCall = async () => {
    // Join Channel using null token and channel name
    try {
      if (isHost) {
        console.log('dddd');
        // Join the channel as a broadcaster
        agoraEngineRef.current?.joinChannel(token, channelName, 0, {
          // Set channel profile to live broadcast
          channelProfile: ChannelProfileType.ChannelProfileLiveBroadcasting,
          // Set user role to broadcaster
          clientRoleType: ClientRoleType.ClientRoleBroadcaster,
          // Publish audio collected by the microphone
          publishMicrophoneTrack: true,
          // Publish video collected by the camera
          publishCameraTrack: true,
          // Automatically subscribe to all audio streams
          autoSubscribeAudio: true,
          // Automatically subscribe to all video streams
          autoSubscribeVideo: true,
        });
      } else {
        // Join the channel as an audience
        agoraEngineRef.current?.joinChannel(token, channelName, 0, {
          // Set channel profile to live broadcast
          channelProfile: ChannelProfileType.ChannelProfileLiveBroadcasting,
          // Set user role to audience
          clientRoleType: ClientRoleType.ClientRoleAudience,
          // Do not publish audio collected by the microphone
          publishMicrophoneTrack: false,
          // Do not publish video collected by the camera
          publishCameraTrack: false,
          // Automatically subscribe to all audio streams
          autoSubscribeAudio: true,
          // Automatically subscribe to all video streams
          autoSubscribeVideo: true,
          // Change the delay level of the audience to achieve ultra-fast live broadcast
          audienceLatencyLevel:
            AudienceLatencyLevelType.AudienceLatencyLevelUltraLowLatency,
        });
      }
    } catch (error) {
      console.log('error--->', error);
    }
  };

  /**
   * @name endCall
   * @description Function to end the call
   */
  const endCall = async () => {
    await agoraEngineRef.current?.leaveChannel();
    setPeerIds([]);
    setJoinSucceed(false);
  };

  const renderRemoteVideos = () => {
    return (
      <View
        style={{
          width: '100%',
          height: 150,
          position: 'absolute',
          bottom: 80,
          backgroundColor: 'lightblue',
          zIndex: 200,
        }}>
        <ScrollView
          style={styles.remoteContainer}
          contentContainerStyle={styles.remoteContainerContent}
          horizontal={true}>
          {peerIds.map(value => (
            <RtcSurfaceView
              key={value}
              style={styles.remote}
              // uid={value}
              // channelId={channelName}
              // sourceType={VideoSourceType.VideoSourceRemote}
              zOrderMediaOverlay={true}
              canvas={{
                uid: value,
                sourceType: VideoSourceType.VideoSourceCamera,
              }}
            />
          ))}
        </ScrollView>
      </View>
    );
  };

  const renderVideos = () => {
    return joinSucceed ? (
      <View style={styles.fullView}>
        {isHost ? (
          <RtcSurfaceView
            style={styles.max}
            canvas={{
              uid: 0,
              sourceType: VideoSourceType.VideoSourceCamera,
            }}
            // channelId={channelName}
            // uid={0}
            // sourceType={VideoSourceType.VideoSourceCamera}
          />
        ) : (
          <></>
        )}
        {renderRemoteVideos()}
      </View>
    ) : null;
  };

  return (
    <View style={styles.max}>
      <View style={styles.max}>
        <Text style={styles.roleText}>
          You're {isHost ? 'a broadcaster' : 'the audience'}
        </Text>
        <View style={styles.buttonHolder}>
          <TouchableOpacity onPress={toggleRoll} style={styles.button}>
            <Text style={styles.buttonText}> Toggle Role </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={startCall} style={styles.button}>
            <Text style={styles.buttonText}> Start Call </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={endCall} style={styles.button}>
            <Text style={styles.buttonText}> End Call </Text>
          </TouchableOpacity>
        </View>
        {renderVideos()}
      </View>
    </View>
  );
};

export default App;
