import React from 'react';
import {ArchiveIcon, HotSpot} from '~/assets/svgs';
import {AppImage, AppText, HStack, VStack} from '~/components';
import {Colors} from '~/styles';

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
      borderRadius={10}
      overflow="hidden"
      mx={10}>
      
      <HStack
        w="100%"
        position="absolute"
        top={10}
        px={16}
        justifyContent="space-between"
        zIndex={1}>
        <VStack
          bg={Colors.BLUE_BRAND}
          py={5}
          px={15}
          borderRadius={20}>
          <AppText fontWeight="500" color={Colors.WHITE}>
            {category}
          </AppText>
        </VStack>
        <ArchiveIcon />
      </HStack>

      <AppImage
        imageSource={{uri: imageUrl}}
        style={{
          width: '100%',
          height: 200,
          borderRadius: 8,
        }}
      />

      <VStack
        flexDirection="row"
        alignItems="center"
        py={10}
        px={8}
        bg={Colors.BLACK}>
        <VStack flex={1} style={{gap: 4}}>
          <AppText fontWeight="500" fontSize={16}>
            {title}
          </AppText>
          <HStack>
            <HotSpot style={{marginRight: 8}} />
            <AppText color={Colors.GARY_3}>{viewers} viewers</AppText>
          </HStack>
        </VStack>
      </VStack>
    </VStack>
  );
};

export default TrendingItem;
