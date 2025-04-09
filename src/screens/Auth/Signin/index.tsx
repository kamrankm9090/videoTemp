import {yupResolver} from '@hookform/resolvers/yup';
import React from 'react';
import {useForm} from 'react-hook-form';
import {StyleSheet} from 'react-native';
import {
  AppButton,
  AppContainer,
  AppFormProvider,
  AppKeyboardAwareScrollView,
  AppLink,
  AppText,
  AuthHeader,
  FormInput,
  HStack,
  SectionSocialMedia,
  VStack,
} from '~/components';
import {navigate, replace} from '~/navigation/methods';
import {loginSchema} from '~/schemas';
import {Colors} from '~/styles';
import {fontSize} from '~/utils/style';

const defaultValues = {email: '', password: ''};

export default function SigninScreen() {
  const {...methods} = useForm({
    resolver: yupResolver(loginSchema),
    defaultValues,
  });

  const {handleSubmit, register, formState} = methods;

  async function onSubmit(formData: typeof defaultValues) {}

  function signupOnPress() {
    replace('Signup');
  }

  function forgotOnPress() {
    navigate('ForgotPassword');
  }

  function onResponseSocialMedia() {}

  return (
    <AppContainer barStyle="light-content" backgroundColor={Colors.BACKGROUND}>
      <AppKeyboardAwareScrollView
        contentContainerStyle={styles.contentContainerStyle}>
        <VStack p={24} space={48} flex={1}>
          <AuthHeader />
          <VStack space={24}>
            <AppText fontSize={fontSize.large} color={Colors.WHITE}>
              Log in your account
            </AppText>
            <AppText color={Colors.GARY_3}>
              Hello there, login to continue
            </AppText>
            <AppFormProvider methods={methods}>
              <VStack mb={24} space={16}>
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
                <HStack mb={24} justifyContent="flex-end">
                  <AppLink
                    color={Colors.PRIMARY}
                    underline={false}
                    text="Forgot password?"
                    onPress={forgotOnPress}
                  />
                </HStack>
                <SectionSocialMedia onResponse={onResponseSocialMedia} />
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
            text="Sign up"
            onPress={signupOnPress}
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
