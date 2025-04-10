import {yupResolver} from '@hookform/resolvers/yup';
import React from 'react';
import {useForm} from 'react-hook-form';
import {StyleSheet} from 'react-native';
import {
  AppButton,
  AppCodeInput,
  AppContainer,
  AppFormProvider,
  AppKeyboardAwareScrollView,
  AppText,
  ScreensHeader,
  SectionResendCode,
  VStack,
} from '~/components';
import {navigate} from '~/navigation/methods';
import {verificationSchema} from '~/schemas';
import {Colors} from '~/styles';
import {fontSize} from '~/utils/style';

const defaultValues = {verificationCode: ''};

export default function VerificationCodeScreen() {
  const {...methods} = useForm({
    resolver: yupResolver(verificationSchema),
    defaultValues,
  });

  const {handleSubmit, register, formState} = methods;

  async function onSubmit(formData: typeof defaultValues) {
    navigate('SignupSuccess');
  }

  return (
    <AppContainer barStyle="light-content" backgroundColor={Colors.BACKGROUND}>
      <AppKeyboardAwareScrollView
        contentContainerStyle={styles.contentContainerStyle}>
        <VStack space={48} flex={1}>
          <ScreensHeader mt={48} backAction />
          <VStack p={24} space={24}>
            <AppText fontSize={fontSize.large} color={Colors.WHITE}>
              Email Verification
            </AppText>
            <AppText color={Colors.GARY_3}>
              Enter the verification code we just sent to your email
              Nameexample.com.
            </AppText>
            <AppFormProvider methods={methods}>
              <VStack mt={16} mb={120} space={24}>
                <AppCodeInput length={6} {...register('verificationCode')} />
                <SectionResendCode email={''} />
              </VStack>
              <AppButton title="Verify" onPress={handleSubmit(onSubmit)} />
            </AppFormProvider>
          </VStack>
        </VStack>
      </AppKeyboardAwareScrollView>
    </AppContainer>
  );
}

const styles = StyleSheet.create({
  contentContainerStyle: {
    flexGrow: 1,
  },
});
