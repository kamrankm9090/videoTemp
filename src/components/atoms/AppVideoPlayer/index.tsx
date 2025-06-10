import {useIsFocused} from '@react-navigation/native';
import React, {
  forwardRef,
  memo,
  useCallback,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import {StyleSheet, View} from 'react-native';
import Video, {
  BufferingStrategyType,
  ReactVideoProps,
  VideoNativeProps,
  VideoRef,
} from 'react-native-video';
import {VolumeHighIcon, VolumeSlashIcon} from '~/assets/svgs';
import {
  AppText,
  AppTouchable,
  Center,
  MuteButton,
  WaterMark,
} from '~/components';
import {Colors} from '~/styles';
import {formatTime} from '~/utils/helper';
import {fontSize} from '~/utils/style';

type AppVideoPlayerProps = {
  isPlaying?: boolean;
  showTimer?: boolean;
  videoStyle?: VideoNativeProps['style'];
  showMute?: boolean;
  showWaterMark?: boolean;
} & ReactVideoProps;

const AppVideoPlayerBase = forwardRef<VideoRef, AppVideoPlayerProps>(
  function AppVideoPlayerBase(
    {
      isPlaying = true,
      style = styles.container,
      resizeMode = 'cover',
      repeat = true,
      source,
      showTimer,
      showMute = false,
      videoStyle = styles.video,
      showWaterMark,
      ...rest
    },
    ref,
  ) {
    const videoRef = useRef<VideoRef>(null);
    const isFocused = useIsFocused();
    const [durationState, setDurationState] = useState(0);
    const [curTime, setCurTime] = useState(0);
    const [isMuted, setIsMuted] = useState<boolean>(rest?.muted || false);
    const currentTimeRef = useRef(0);

    const paused = useMemo(
      () => !(isPlaying && isFocused),
      [isPlaying, isFocused],
    );

    useImperativeHandle(ref, () => videoRef.current!, []);

    const handleProgress = useCallback(
      ({currentTime}: {currentTime: number}) => {
        if (showTimer) {
          currentTimeRef.current = currentTime;
          setCurTime(currentTime);
        }
      },
      [showTimer],
    );

    const handleLoad = useCallback(({duration}: {duration: number}) => {
      setDurationState(duration);
    }, []);

    const handleError = useCallback((error: any) => {
      console.error('Video error:', error);
    }, []);

    const muteHandler = useCallback(() => {
      setIsMuted(prev => !prev);
    }, []);

    const remainingTime = useMemo(() => {
      if (!showTimer) {
        return '';
      }
      return formatTime(Math.max(durationState - curTime, 0));
    }, [durationState, curTime, showTimer]);

    return (
      <View style={[style, styles.contentContainer]}>
        <Video
          ref={videoRef}
          source={source}
          repeat={repeat}
          paused={paused}
          //***** */
          allowsExternalPlayback={true}
          disableAudioSessionManagement
          mixWithOthers="mix"
          //**** */
          resizeMode={resizeMode}
          playInBackground={false}
          playWhenInactive={false}
          muted={isMuted}
          ignoreSilentSwitch="ignore"
          useTextureView={false}
          minLoadRetryCount={3}
          bufferingStrategy={BufferingStrategyType.DEPENDING_ON_MEMORY}
          onLoad={handleLoad}
          onError={handleError}
          onProgress={handleProgress}
          style={[StyleSheet.absoluteFill, videoStyle]}
          {...rest}
        />
        {showMute && <MuteButton onPress={muteHandler} status={isMuted} />}

        {showTimer && (
          <Center
            py={4}
            px={10}
            right={12}
            bottom={12}
            rounded={16}
            position="absolute"
            bg={Colors.BLACK_TRANSPARENT_7}>
            <AppText fontSize={fontSize.tiny}>{remainingTime}</AppText>
          </Center>
        )}
        {showWaterMark && <WaterMark />}
      </View>
    );
  },
);

const AppVideoPlayer = memo(AppVideoPlayerBase);

export default AppVideoPlayer;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: Colors.BLACK,
  },
  contentContainer: {
    position: 'relative',
    backgroundColor: Colors.BLACK,
  },
  video: {backgroundColor: Colors.GARY_3},
});
