import React from 'react';
import {ViewStyle} from 'react-native';
import {AppButton, AppText, HStack, VStack} from '~/components';
import {Colors} from '~/styles';
import {fontSize} from '~/utils/style';
import {appSharing} from '~/utils/utils';

export default function InviteFriendsCard({
  w = '100%',
  px = 16,
  py = 24,
  mx = 16,
  rounded = 12,
  bg = Colors.Nero_1,
}: {
  w?: ViewStyle['width'];
  px?: ViewStyle['paddingHorizontal'];
  py?: ViewStyle['paddingVertical'];
  mx?: ViewStyle['marginHorizontal'];
  bg?: ViewStyle['backgroundColor'];
  rounded?: ViewStyle['borderRadius'];
}) {
  async function onPressHandler() {
    await appSharing(
      'Join me on this awesome app and earn KLP! Download it here: https://testflight.apple.com/join/fges3KxD',
    );
  }

  return (
    <HStack {...{w, px, py, mx, rounded, bg}}>
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
