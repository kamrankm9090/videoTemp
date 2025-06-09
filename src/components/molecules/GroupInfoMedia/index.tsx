import React from 'react';
import {ChevronBack} from '~/assets/svgs';
import {AppImage, AppText, AppTouchable, HStack, VStack} from '~/components';
import {Colors} from '~/styles';

const mediaItems = [
  {uri: ''},
  {uri: ''},
  {uri: ''},
  {uri: ''},
  {uri: ''},
  {uri: ''},
];

export default function GroupInfoMedia({media}:any) {
  const displayedItems = mediaItems.slice(0, 6); // Only show first 6

  console.log('====================================');
  console.log(media);
  console.log('====================================');
  return (
    <VStack mt={24} p={16} gap={12} bg={Colors.NERO} borderRadius={8}>
      <AppText fontSize={13} fontWeight="500" color={Colors.DarkGray}>
        Media
      </AppText>

      <HStack flexWrap="wrap" gap={8}>
        {displayedItems.map((src, index) => (
          <AppImage
            key={index}
            imageSource={'https://picsum.photos/200/300'}
            style={{
              width: 100,
              height: 100,
              aspectRatio: 1,
              borderRadius: 8,
              backgroundColor: Colors.NIGHT_RIDER,
            }}
            resizeMode="cover"
            zoomable={true}
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
