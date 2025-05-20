import React from 'react';
import {AppLogo, Welcome} from '~/assets/svgs';
import {AppButton, AppContainer, AppText, Center, VStack} from '~/components';
import {navigate} from '~/navigation/methods';
import {Colors} from '~/styles';
import {fontSize} from '~/utils/style';

export default function SignupSigninScreen() {
  function loginOnPress() {
    navigate('Signin');
  }

  function signupOnPress() {
    navigate('Signup');
  }

  return (
    <AppContainer barStyle="light-content" backgroundColor={Colors.REGAL_BLUE}>
      <VStack flex={1} bg={Colors.REGAL_BLUE}>
        <Welcome />
        <VStack space={20} px={24} alignItems="center">
          <AppLogo />
          <Center rounded={5} py={6} px={12} bg={'#1B1B1B'}>
            <AppText
              fontSize={fontSize.medium}
              fontFamily="medium"
              color={Colors.WHITE}>
              Social Streaming
            </AppText>
          </Center>
          <AppButton onPress={loginOnPress} title="Log in" />
          <AppButton
            onPress={signupOnPress}
            borderColor={Colors.WHITE}
            borderWidth={1}
            color={Colors.BLACK}
            title="Sign up"
          />
        </VStack>
      </VStack>
    </AppContainer>
  );
}
