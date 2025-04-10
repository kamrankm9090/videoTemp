import React from 'react';
import {Success} from '~/assets/svgs';
import {
  AppButton,
  AppContainer,
  AppText,
  ScreensHeader,
  VStack,
} from '~/components';
import {navigate} from '~/navigation/methods';
import {Colors} from '~/styles';
import {fontSize} from '~/utils/style';

export default function SignupSuccessScreen() {
  async function onStartPress() {
    navigate('SelectCategory');
  }

  return (
    <AppContainer barStyle="light-content" backgroundColor={Colors.BACKGROUND}>
      <VStack space={48} flex={1}>
        <ScreensHeader mt={48} backAction />
        <VStack alignItems="center" p={24} space={24}>
          <Success />
          <AppText fontSize={fontSize.large} color={Colors.WHITE}>
            Ready to Start Live
          </AppText>
          <AppText lineHeight={24} textAlign="center" color={Colors.GARY_3}>
            {'Your account has been created\nsuccessfully.'}
          </AppText>
          <AppButton mt={36} title="Let's start" onPress={onStartPress} />
        </VStack>
      </VStack>
    </AppContainer>
  );
}
