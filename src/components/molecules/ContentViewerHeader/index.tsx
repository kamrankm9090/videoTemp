import React from 'react';
import {Image} from 'react-native';
import {Close2, LiveIcon, MoreIcon} from '~/assets/svgs';
import {AppText, AppTouchable, HStack, VStack} from '~/components';
import { goBack } from '~/navigation/methods';
// import { CloseIcon, MoreIcon } from '~/assets/svgs'; // assuming you have these icons
import {Colors} from '~/styles';

const ContentViewerHeader = () => {
  return (
    <HStack
      alignItems="center"
      //   justifyContent="space-between"
      //   bg={Colors.BLACK_TRANSPARENT_4}
      gap={8}
      mx={16}
      mt={12}>
      <AppTouchable bg={Colors.BLACK_TRANSPARENT_4} p={16} borderRadius={12} onPress={() => goBack()}>
        <Close2  fill={Colors.WHITE} />
      </AppTouchable>

      <HStack flex={1} p={8} borderRadius={12} bg={Colors.BLACK_TRANSPARENT_4}>
        <HStack alignItems="center" gap={6} flex={1}>
          <Image
            source={{uri: 'https://randomuser.me/api/portraits/women/68.jpg'}}
            style={{
              width: 28,
              height: 28,
              borderRadius: 14,
            }}
          />
          <AppText fontSize={14} color={Colors.WHITE} fontWeight="500">
            Luna Miller
          </AppText>

          <AppTouchable py={4} px={10} borderRadius={4} bg={Colors.BLACK_TRANSPARENT_4} >
            <AppText
              fontSize={13}
              fontWeight="500"
              color={Colors.WHITE}
              borderRadius={8}>
              Following
            </AppText>
          </AppTouchable>
        </HStack>

        <HStack alignItems="center" gap={8}>
          <HStack alignItems="center" gap={4}>
            <AppText fontSize={13} fontWeight="600" color={Colors.WHITE}>
              96
            </AppText>
            <VStack
              style={{
                width: 18,
                height: 18,
                borderRadius: 9,
                backgroundColor: Colors.PRIMARY,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <LiveIcon />
              {/* replace with your red dot live icon if available */}
            </VStack>
          </HStack>

          <AppTouchable>
            <MoreIcon fill={Colors.WHITE} />
          </AppTouchable>
        </HStack>
      </HStack>
    </HStack>
  );
};

export default ContentViewerHeader;
