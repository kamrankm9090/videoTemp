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

  // const [play, setPlay] = useState<boolean>(false);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isPlaying && isFocused) {
      // setPlay(true);
      videoRef.current?.resume();
    } else {
      // setPlay(false);
      videoRef.current?.pause();
    }
  }, [isPlaying, isFocused]);

  // if (!isPlaying) {
  //   return <VideoImageViewer url={source?.uri} />;
  // }

  return (
    <Video
      {...rest}
      // source={
      //   {
      //     uri: convertToProxyURL(source?.uri),
      //   } // Converts the video URL to a proxy URL if visible
      // }
      source={source}
      // source={{
      //   uri: source?.uri,
      //   // bufferConfig: {
      //   //   minBufferMs: 1000,
      //   //   maxBufferMs: 2000,
      //   //   bufferForPlaybackMs: 5000,
      //   //   bufferForPlaybackAfterRebufferMs: 2000,
      //   // },
      //   shouldCache: true,
      // }}
      repeat={repeat}
      controls={true}
      filter=""
      // paused={!play}
      ref={videoRef}
      resizeMode={resizeMode}
      playInBackground={false}
      controlsStyles={videoPlayerControlsStyles}
      style={style}
      muted={false}
      disableFocus={true}
      useTextureView={false}
      minLoadRetryCount={3}
      bufferingStrategy={BufferingStrategyType.DEPENDING_ON_MEMORY}
      ignoreSilentSwitch="ignore"
      onLoadStart={() => console.log('Video loading started')}
      onLoad={() => console.log('Video loaded successfully')}
      onError={error => console.log('Video error:', error)}
    />
  );
}

const styles = StyleSheet.create({
  video: {width: '100%', height: '100%', borderRadius: 16},
});
