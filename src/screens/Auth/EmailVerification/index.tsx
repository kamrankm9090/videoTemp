import {yupResolver} from '@hookform/resolvers/yup';
import React from 'react';
import {useForm} from 'react-hook-form';
import {StyleSheet} from 'react-native';
import {AppLogo} from '~/assets/svgs';
import {
  AppButton,
  AppContainer,
  AppFormProvider,
  AppKeyboardAwareScrollView,
  AppLink,
  AppText,
  Divider,
  FormInput,
  HStack,
  VStack,
} from '~/components';
import {navigate, replace} from '~/navigation/methods';
import {loginSchema} from '~/schemas';
import {Colors} from '~/styles';
import {fontSize} from '~/utils/style';

const defaultValues = {email: '', password: ''};

export default function EmailVerificationScreen() {
  const {...methods} = useForm({
    resolver: yupResolver(loginSchema),
    defaultValues,
  });

  const {handleSubmit, register, formState} = methods;

  async function onSubmit(formData: typeof defaultValues) {}

  function registerOnPress() {
    replace('Signup');
  }

  function forgotOnPress() {
    navigate('Forgot');
  }

  return (
    <AppContainer barStyle="light-content" backgroundColor={Colors.BACKGROUND}>
      <AppKeyboardAwareScrollView
        contentContainerStyle={styles.contentContainerStyle}>
        <VStack p={24} space={48} flex={1}>
          <VStack space={48} alignItems="center">
            <AppLogo width={122} height={47} />
            <Divider backgroundColor={Colors.NIGHT_RIDER} />
          </VStack>
          <VStack space={24}>
            <AppText fontSize={fontSize.large} color={Colors.WHITE}>
              Log in your account
            </AppText>
            <AppText color={Colors.GARY_3}>
              Hello there, login to continue
            </AppText>
            <AppFormProvider methods={methods}>
              <VStack space={16}>
                <FormInput
                  {...register('email')}
                  {...{formState}}
                  placeholder={'Email'}
                  autoComplete="email"
                  keyboardType="email-address"
                  // disabled={loading}
                />
                <FormInput
                  {...register('password')}
                  {...{formState}}
                  placeholder={'Password'}
                  keyboardType="visible-password"
                />
                <HStack justifyContent="flex-end">
                  <AppLink
                    color={Colors.PRIMARY}
                    underline={false}
                    text="Forgot password?"
                    onPress={forgotOnPress}
                  />
                </HStack>
              </VStack>
              <AppButton title="Login" onPress={handleSubmit(onSubmit)} />
            </AppFormProvider>
          </VStack>
        </VStack>
        <HStack space={6} mb={24} justifyContent="center">
          <AppText fontFamily="medium" color={Colors.WHITE}>
            Didn’t have an account?
          </AppText>
          <AppLink
            color={Colors.PRIMARY}
            underline={false}
            text="Register"
            onPress={registerOnPress}
          />
        </HStack>
      </AppKeyboardAwareScrollView>
    </AppContainer>
  );
}

const styles = StyleSheet.create({
  contentContainerStyle: {
    flexGrow: 1,
  },
});
