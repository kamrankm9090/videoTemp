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
  VideoRef,
} from 'react-native-video';
import {AppText, Center} from '~/components';
import {Colors} from '~/styles';
import {formatTime} from '~/utils/helper';
import {fontSize} from '~/utils/style';

type AppVideoPlayerProps = {
  isPlaying?: boolean;
  showTimer?: boolean;
} & ReactVideoProps;

const AppVideoPlayerBase = forwardRef<VideoRef, AppVideoPlayerProps>(
  function AppVideoPlayerBase(
    {
      isPlaying = true,
      style = styles.video,
      resizeMode = 'cover',
      repeat = true,
      source,
      showTimer,
      ...rest
    },
    ref,
  ) {
    const videoRef = useRef<VideoRef>(null);
    const isFocused = useIsFocused();
    const [durationState, setDurationState] = useState(0);
    const [curTime, setCurTime] = useState(0);
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

    const remainingTime = useMemo(() => {
      if (!showTimer) {
        return '';
      }
      return formatTime(Math.max(durationState - curTime, 0));
    }, [durationState, curTime, showTimer]);

    return (
      <View style={[style, styles.container]}>
        <Video
          {...rest}
          ref={videoRef}
          source={source}
          repeat={repeat}
          paused={paused}
          resizeMode={resizeMode}
          playInBackground={false}
          playWhenInactive={false}
          muted={false}
          ignoreSilentSwitch="ignore"
          useTextureView={false}
          minLoadRetryCount={3}
          bufferingStrategy={BufferingStrategyType.DEPENDING_ON_MEMORY}
          onLoad={handleLoad}
          onError={handleError}
          onProgress={handleProgress}
          style={[
            StyleSheet.absoluteFill,
            {backgroundColor: Colors.GARY_3, borderRadius: 12},
          ]}
        />
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
      </View>
    );
  },
);

const AppVideoPlayer = memo(AppVideoPlayerBase);

export default AppVideoPlayer;

const styles = StyleSheet.create({
  video: {
    width: '100%',
    height: '100%',
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: Colors.BLACK,
  },
  container: {
    position: 'relative',
    backgroundColor: Colors.BLACK,
  },
});
