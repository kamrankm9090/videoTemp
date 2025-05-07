import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import {ArchiveIcon, HotSpot} from '~/assets/svgs';
import {AppText, AppVideoPlayer, HStack, VStack} from '~/components';
import {Colors} from '~/styles';
import {getFullImageUrl} from '~/utils/helper';
import {fontSize} from '~/utils/style';

interface TrendingItemProps {
  item: any;
}

const TrendingItem: React.FC<TrendingItemProps> = ({
  item
}) => {
  const [isLoadingVideo, setIsLoadingVideo] = useState(true);

  return (
    <VStack
      minW={183}
      bg={Colors.Grey}
      mb={20}
      rounded={10}
      overflow="hidden"
      mx={10}>
      <HStack
        w="100%"
        position="absolute"
        top={10}
        px={16}
        justifyContent="space-between"
        zIndex={1}>
        <VStack bg={Colors.BLUE_BRAND} py={5} px={15} rounded={20}>
          <AppText fontWeight="500" color={Colors.WHITE}>
            {item?.live?.category}
          </AppText>
        </VStack>
        <ArchiveIcon />
      </HStack>

      <AppVideoPlayer
        style={styles.videoPlayer}
        fullscreen={false}
        controls={false}
        resizeMode="contain"
        source={{
          uri: getFullImageUrl(item?.live?.recordUrl),
        }}
        onLoadStart={() => setIsLoadingVideo(true)}
        onLoad={() => setIsLoadingVideo(false)}
        onBuffer={({isBuffering}) => setIsLoadingVideo(isBuffering)}
      />
      {/* <AppImage imageSource={{uri: imageUrl}} style={styles.image} /> */}

      <HStack py={10} px={8} bg={Colors.BLACK}>
        <VStack flex={1} space={4}>
          <AppText fontFamily="medium" fontSize={fontSize.medium}>
            {item?.live?.title}
          </AppText>
          <HStack space={8}>
            <HotSpot />
            <AppText color={Colors.GARY_3}>{item?.live?.viewCount} viewers</AppText>
          </HStack>
        </VStack>
      </HStack>
    </VStack>
  );
};

export default TrendingItem;

const styles = StyleSheet.create({
  videoPlayer: {
    width: '100%',
    height: 200,
    borderRadius: 8,
  },
});
