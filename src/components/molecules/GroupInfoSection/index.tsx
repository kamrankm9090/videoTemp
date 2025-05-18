import React from 'react';
import {Image} from 'react-native';
import {
  AppText,
  HStack,
  VStack,
} from '~/components';
import {Colors} from '~/styles';

export default function GroupInfoSection() {
  return (
    <VStack alignItems="center" mt={24} mb={16}>
      {/* Group Image */}
      <HStack
        w={64}
        h={64}
        borderRadius={32}
        bg={Colors.PRIMARY}
        alignItems="center"
        justifyContent="center">
        <Image
        //   source={require('~/assets/images/image-placeholder.png')}
          style={{width: 32, height: 32, tintColor: Colors.Silver}}
          resizeMode="contain"
        />
      </HStack>

      {/* Group Title */}
      <AppText fontSize={16} fontWeight="600" color={Colors.WHITE} marginTop={12}>
        Beauty Documentary
      </AppText>

      {/* Member Count */}
      <AppText fontSize={13} fontWeight="400" color={Colors.Silver} marginTop={4}>
        16 member
      </AppText>
    </VStack>
  );
}
