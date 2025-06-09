import React from 'react';
import {AppImage, AppText, VStack} from '~/components';
import {Colors} from '~/styles';

export default function GroupInfoSection({item}: any) {
  return (
    <VStack alignItems="center" mt={24} mb={16}>
      <AppImage
        imageSource={item?.photoUrl}
        style={{
          width: 64,
          height: 64,
          borderRadius: 100,
          backgroundColor: Colors.PRIMARY,
        }}
        resizeMode="contain"
      />

      <AppText
        fontSize={16}
        fontWeight="600"
        color={Colors.WHITE}
        marginTop={12}>
        {item?.title}
      </AppText>

      <AppText
        fontSize={13}
        fontWeight="400"
        color={Colors.Silver}
        marginTop={4}>
        {item?.userCount} member{item?.userCount > 1 && 's'}
      </AppText>
    </VStack>
  );
}
