import React from 'react';
import {Share} from 'react-native';
import {AppButton, AppText, HStack, VStack} from '~/components';
import {Colors} from '~/styles';
import {fontSize} from '~/utils/style';

export default function InviteFriendsCard() {
  async function onPressHandler() {
    try {
      await Share.share({
        message:
          'Join me on this awesome app and earn KLP! Download it here: https://testflight.apple.com/join/fges3KxD',
      });
    } catch (error) {
      console.warn('Error sharing link:', error);
    }
  }

  return (
    <HStack w="100%" px={16} py={24} mx={16} rounded={12} bg={Colors.Nero_1}>
      <VStack space={16} flex={1}>
        <AppText fontFamily="bold">Invite friends to get KLP</AppText>
        <AppText fontSize={fontSize.small} color={Colors.GreySuit}>
          Get 10 KLP for each other
        </AppText>
      </VStack>
      <AppButton
        width={100}
        height={32}
        hasWidth
        title="Invite friend"
        onPress={onPressHandler}
      />
    </HStack>
  );
}
