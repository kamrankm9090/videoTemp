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
import {registerSchema} from '~/schemas';
import {Colors} from '~/styles';
import {fontSize} from '~/utils/style';

const defaultValues = {email: '', userName: '', password: '', confirm: ''};

export default function SignupScreen() {
  const {...methods} = useForm({
    resolver: yupResolver(registerSchema),
    defaultValues,
  });

  const {handleSubmit, register, formState} = methods;

  async function onSubmit(formData: typeof defaultValues) {
    navigate('VerificationCode');
  }

  function loginOnPress() {
    replace('Signin');
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
              Sign Up Your Account
            </AppText>
            <AppText color={Colors.GARY_3}>
              Hello there, Sign up to continue
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
                  {...register('userName')}
                  {...{formState}}
                  placeholder={'Username'}
                />
                <FormInput
                  {...register('password')}
                  {...{formState}}
                  placeholder={'Password'}
                  keyboardType="visible-password"
                />
                <FormInput
                  {...register('confirm')}
                  {...{formState}}
                  placeholder={'Confirm password'}
                  keyboardType="visible-password"
                />
              </VStack>
              <AppButton title="Sign up" onPress={handleSubmit(onSubmit)} />
            </AppFormProvider>
            <SectionSocialMedia onResponse={onResponseSocialMedia} />
          </VStack>
        </VStack>
        <HStack space={6} mb={24} justifyContent="center">
          <AppText fontFamily="medium" color={Colors.WHITE}>
            Did have an account?
          </AppText>
          <AppLink
            color={Colors.PRIMARY}
            underline={false}
            text="Login"
            onPress={loginOnPress}
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
