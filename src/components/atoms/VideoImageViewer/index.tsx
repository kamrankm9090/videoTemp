import React from 'react';
import {StyleSheet} from 'react-native';
import FastImage from 'react-native-fast-image';
import {PlayCircle} from '~/assets/svgs';
import {AppIndicator, Center} from '~/components';
import {useGetThumbnailVideo} from '~/hooks';
import {Colors} from '~/styles';

export default function VideoImageViewer({url}: {url: string}) {
  const {isLoading, imageUrl} = useGetThumbnailVideo(url);

  if (isLoading) {
    return (
      <Center
        borderColor={Colors.GRAY_6}
        borderWidth={0.8}
        h={300}
        w="100%"
        rounded={16}>
        <AppIndicator size="large" />
      </Center>
    );
  }

  return (
    <>
      <Center h={300} w="100%" zIndex={1000} position={'absolute'}>
        <Center
          h={70}
          w={70}
          shadow={1}
          rounded={35}
          bg={Colors.SEMI_TRANSPARENT}>
          <Center position={'absolute'} w="100%" h="100%">
            <PlayCircle />
          </Center>
        </Center>
      </Center>

      <FastImage
        resizeMode="cover"
        style={styles.image}
        source={{uri: imageUrl}}
      />
    </>
  );
}

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 300,
    borderRadius: 16,
  },
});
