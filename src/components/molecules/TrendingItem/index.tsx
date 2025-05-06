import React from 'react';
import {StyleSheet} from 'react-native';
import {ArchiveIcon, HotSpot} from '~/assets/svgs';
import {AppImage, AppText, HStack, VStack} from '~/components';
import {Colors} from '~/styles';
import {fontSize} from '~/utils/style';

interface TrendingItemProps {
  category: string;
  title: string;
  viewers: string;
  imageUrl: string;
}

const TrendingItem: React.FC<TrendingItemProps> = ({
  category,
  title,
  viewers,
  imageUrl,
}) => {
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
            {category}
          </AppText>
        </VStack>
        <ArchiveIcon />
      </HStack>

      <AppImage imageSource={{uri: imageUrl}} style={styles.image} />

      <HStack py={10} px={8} bg={Colors.BLACK}>
        <VStack flex={1} space={4}>
          <AppText fontFamily="medium" fontSize={fontSize.medium}>
            {title}
          </AppText>
          <HStack space={8}>
            <HotSpot />
            <AppText color={Colors.GARY_3}>{viewers} viewers</AppText>
          </HStack>
        </VStack>
      </HStack>
    </VStack>
  );
};

export default TrendingItem;

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 200,
    borderRadius: 8,
  },
});
