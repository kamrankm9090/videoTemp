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
  VStack,
} from '~/components';
import {navigate, replace} from '~/navigation/methods';
import {forgotPasswordSchema} from '~/schemas';
import {Colors} from '~/styles';
import {fontSize} from '~/utils/style';

const defaultValues = {email: ''};

export default function ForgotPasswordScreen() {
  const {...methods} = useForm({
    resolver: yupResolver(forgotPasswordSchema),
    defaultValues,
  });

  const {handleSubmit, register, formState} = methods;

  async function onSubmit(formData: typeof defaultValues) {
    navigate('VerificationCode');
  }

  function loginOnPress() {
    replace('Signin');
  }

  return (
    <AppContainer barStyle="light-content" backgroundColor={Colors.BACKGROUND}>
      <AppKeyboardAwareScrollView
        contentContainerStyle={styles.contentContainerStyle}>
        <VStack p={24} space={48} flex={1}>
          <AuthHeader />
          <VStack space={24}>
            <AppText fontSize={fontSize.large} color={Colors.WHITE}>
              Reset Your Password
            </AppText>
            <AppText color={Colors.GARY_3}>
              Enter your email and we’ll send you a link to reset your password.
            </AppText>
            <AppFormProvider methods={methods}>
              <VStack space={124}>
                <FormInput
                  {...register('email')}
                  {...{formState}}
                  placeholder={'Email'}
                  autoComplete="email"
                  keyboardType="email-address"
                  // disabled={loading}
                />
                <AppButton title="Continue" onPress={handleSubmit(onSubmit)} />
              </VStack>
            </AppFormProvider>
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
