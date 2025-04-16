import React, {
  forwardRef,
  memo,
  useCallback,
  useImperativeHandle,
  useRef,
  useState,
  useMemo,
} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import Video, {
  BufferingStrategyType,
  ReactVideoProps,
  VideoRef,
} from 'react-native-video';
import {useIsFocused} from '@react-navigation/native';
import {Save} from '~/assets/svgs';
import { Colors } from '~/styles';
import AppTouchable from '../AppTouchable';
import AppText from '../AppText';
import { formatTime } from '~/utils/helper';

type AppVideoPlayerProps = {
  isPlaying?: boolean;
} & ReactVideoProps;

const AppVideoPlayerBase = forwardRef<VideoRef, AppVideoPlayerProps>(
  function AppVideoPlayerBase(
    {
      isPlaying = true,
      style = styles.video,
      resizeMode = 'cover',
      repeat = true,
      source,
      ...rest
    },
    ref,
  ) {
    const videoRef = useRef<VideoRef>(null);
    const isFocused = useIsFocused();
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);

    const paused = useMemo(() => !(isPlaying && isFocused), [isPlaying, isFocused]);

    useImperativeHandle(ref, () => videoRef.current!, []);

    const handleProgress = useCallback(({currentTime}: {currentTime: number}) => {
      setCurrentTime(currentTime);
    }, []);

    const handleLoad = useCallback(({duration}: {duration: number}) => {
      setDuration(duration);
    }, []);

    const handleError = useCallback((error: any) => {
      console.error('Video error:', error);
    }, []);

  

    const remainingTime = useMemo(
      () => formatTime(Math.max(duration - currentTime, 0)),
      [duration, currentTime, formatTime],
    );

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
          style={StyleSheet.absoluteFill}
        />

        {/* Live Badge */}
        <View style={styles.liveBadge}>
          <AppText fontFamily='bold' style={styles.liveText}>Live</AppText>
        </View>

        {/* Save Icon */}
        <AppTouchable style={styles.saveIcon}>
          <Save />
        </AppTouchable>

        {/* Timer */}
        <View style={styles.timer}>
          <AppText style={styles.timerText}>{remainingTime}</AppText>
        </View>
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
    backgroundColor: 'black',
  },
  container: {
    position: 'relative',
    backgroundColor: 'black',
  },
  liveBadge: {
    position: 'absolute',
    top: 12,
    left: 12,
    backgroundColor: Colors.ERROR,
    borderRadius: 20,
    paddingVertical: 4,
    paddingHorizontal: 10,
  },
  liveText: {
    color: Colors.WHITE,
    fontSize: 14,
  },
  saveIcon: {
    position: 'absolute',
    top: 12,
    right: 12,
  },
  timer: {
    position: 'absolute',
    bottom: 12,
    right: 12,
    backgroundColor: Colors.BLACK_TRANSPARENT_7,
    borderRadius: 16,
    paddingVertical: 4,
    paddingHorizontal: 10,
  },
  timerText: {
    color: Colors.WHITE,
    fontSize: 12,
  },
});
