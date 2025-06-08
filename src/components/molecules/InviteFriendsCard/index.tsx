import React from 'react';
import {ViewStyle} from 'react-native';
import {CloseIcon} from '~/assets/svgs';
import {AppButton, AppText, AppTouchable, HStack, VStack} from '~/components';
import {Colors} from '~/styles';
import {fontSize} from '~/utils/style';
import {appSharing} from '~/utils/utils';

type Props = {
  w?: ViewStyle['width'];
  px?: ViewStyle['paddingHorizontal'];
  py?: ViewStyle['paddingVertical'];
  mx?: ViewStyle['marginHorizontal'];
  bg?: ViewStyle['backgroundColor'];
  rounded?: ViewStyle['borderRadius'];
};

export default function InviteFriendsCard({
  w = '100%',
  px = 16,
  py = 24,
  mx = 16,
  rounded = 12,
  bg = Colors.Nero_1,
}: Props) {
  async function onPressHandler() {
    await appSharing(
      'Join me on this awesome app and earn KLP! Download it here: https://testflight.apple.com/join/fges3KxD',
    );
  }

  function closeHandler() {}

  return (
    <VStack space={16} {...{w, px, py, mx, rounded, bg}}>
      <HStack>
        <AppText flex={1} fontFamily="bold">
          You have 5 Invitations Left
        </AppText>
        <AppTouchable onPress={closeHandler}>
          <CloseIcon color={Colors.GreySuit} />
        </AppTouchable>
      </HStack>
      <AppText fontSize={fontSize.small} color={Colors.GreySuit}>
        Who’s a great potential addition to klipped? you will get credit for
        inviting people
      </AppText>
      <AppButton height={32} title="Invite friends" onPress={onPressHandler} />
    </VStack>
  );
}
