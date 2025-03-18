import React, {useEffect} from 'react';
import {Image} from 'react-native';
import {AppVideoPlayer, Box} from '~/components';
import {homePostsStore} from '~/stores';
import {getFullImageUrl} from '~/utils/helper';

export default function HomePostItem({item, yIndex, preloading}: any) {
  const isPlaying = homePostsStore.currentYIndex === yIndex;

  // useEffect(() => {
  //   if (preloading === item?.url && item?.url) {
  //     // console.log('item?.--->', item?.id, '---->', item?.url);
  //     const url = getFullImageUrl(item.url);
  //     Image.prefetch(url); // Prefetch the image/video
  //   }
  // }, [preloading, item?.url]);

  return (
    <Box h={300} w="100%">
      <AppVideoPlayer
        isPlaying={isPlaying}
        source={{
          uri: getFullImageUrl(item?.name),
        }}
      />
    </Box>
  );
}
