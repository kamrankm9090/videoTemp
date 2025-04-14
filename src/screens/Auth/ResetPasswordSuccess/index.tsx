import React from 'react';
import {Success} from '~/assets/svgs';
import {
  AppButton,
  AppContainer,
  AppText,
  ScreensHeader,
  VStack,
} from '~/components';
import {replace} from '~/navigation/methods';
import {Colors} from '~/styles';
import {fontSize} from '~/utils/style';

export default function ResetPasswordSuccessScreen() {
  async function onStartPress() {
    replace('Signin');
  }

  return (
    <AppContainer barStyle="light-content" backgroundColor={Colors.BACKGROUND}>
      <VStack space={48} flex={1}>
        <ScreensHeader mt={48} backAction />
        <VStack alignItems="center" p={24} space={24}>
          <Success />
          <AppText fontSize={fontSize.large} color={Colors.WHITE}>
            Password Reset Successful
          </AppText>
          <AppText lineHeight={24} textAlign="center" color={Colors.GARY_3}>
            {'Your password has been updated\nsuccessfully.'}
          </AppText>
          <AppButton
            mt={36}
            title="Back to login page"
            onPress={onStartPress}
          />
        </VStack>
      </VStack>
    </AppContainer>
  );
}
