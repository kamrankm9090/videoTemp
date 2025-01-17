import React, {useEffect} from 'react';
import {Image} from 'react-native';
import {AppVideoPlayer, Box} from '~/components';
import {homePostsStore} from '~/stores';

export default function HomePostItem({item, yIndex, preloading}: any) {
  const isPlaying = homePostsStore.currentYIndex === yIndex;

  useEffect(() => {
    if (preloading === item?.url && item?.url) {
      Image.prefetch(item.url); // Prefetch the image/video
    }
  }, [preloading, item?.url]);

  return (
    <Box h={300} w="100%" rounded={16}>
      <AppVideoPlayer
        isPlaying={isPlaying}
        source={{
          uri: item?.url,
        }}
      />
    </Box>
  );
}
