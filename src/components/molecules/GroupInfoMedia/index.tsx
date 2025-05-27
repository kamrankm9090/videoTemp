import React from 'react';
import {Image} from 'react-native';
import {AppText, AppTouchable, HStack, VStack} from '~/components';
import {Colors} from '~/styles';
import {ChevronBack} from '~/assets/svgs';

const mediaItems = [
  {uri: ''},
  {uri: ''},
  {uri: ''},
  {uri: ''},
  {uri: ''},
  {uri: ''},
];

export default function GroupInfoMedia() {
  const displayedItems = mediaItems.slice(0, 6); // Only show first 6

  return (
    <VStack mt={24} p={16} gap={12} bg={Colors.NERO} borderRadius={8}>
      <AppText fontSize={13} fontWeight="500" color={Colors.DarkGray}>
        Media
      </AppText>

      <HStack flexWrap="wrap" gap={8}>
        {displayedItems.map((src, index) => (
          <Image
            key={index}
            source={src}
            style={{
              width: '30%',
              aspectRatio: 1,
              borderRadius: 8,
              backgroundColor: Colors.NIGHT_RIDER,
            }}
            resizeMode="cover"
          />
        ))}
      </HStack>

      <AppTouchable alignSelf="center" onPress={() => {}}>
        <HStack alignItems="center" gap={4} mt={4}>
          <AppText fontSize={14} fontWeight="500">
            See more
          </AppText>
          <ChevronBack
            style={{transform: [{rotate: '270deg'}]}}
            stroke={Colors.WHITE}
          />
        </HStack>
      </AppTouchable>
    </VStack>
  );
}
