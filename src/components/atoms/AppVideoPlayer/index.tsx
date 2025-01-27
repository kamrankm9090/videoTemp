import React, {useEffect, useRef, useState} from 'react';
import {StyleSheet} from 'react-native';
import Video, {
  VideoRef,
  ReactVideoProps,
  BufferingStrategyType,
} from 'react-native-video';
import {VideoImageViewer} from '~/components';
import {useIsFocused} from '@react-navigation/native';

const videoPlayerControlsStyles: ReactVideoProps['controlsStyles'] = {
  hideDuration: true,
  hideForward: true,
  hideSeekBar: true,
  hidePrevious: true,
  hideNext: true,
  hideRewind: true,
  hideSettingButton: true,
  hidePosition: true,
};

export default function AppVideoPlayer({
  isPlaying,
  style = styles.video,
  resizeMode = 'cover',
  repeat = true,
  source,
  ...rest
}: {isPlaying?: boolean} & ReactVideoProps) {
  const videoRef = useRef<VideoRef>(null);

  const [play, setPlay] = useState<boolean>(false);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isPlaying && isFocused) {
      setPlay(true);
    } else {
      setPlay(false);
    }
  }, [isPlaying, isFocused]);

  // if (!isPlaying) {
  //   return <VideoImageViewer url={source?.uri} />;
  // }

  return (
    <Video
      {...rest}
      source={source}
      repeat={repeat}
      controls={true}
      paused={!play}
      ref={videoRef}
      resizeMode={resizeMode}
      playInBackground={false}
      controlsStyles={videoPlayerControlsStyles}
      style={style}
      muted={false}
      disableFocus={true}
      minLoadRetryCount={3}
      bufferingStrategy={BufferingStrategyType.DEPENDING_ON_MEMORY}
    />
  );
}

const styles = StyleSheet.create({
  video: {width: '100%', height: '100%', borderRadius: 16},
});
