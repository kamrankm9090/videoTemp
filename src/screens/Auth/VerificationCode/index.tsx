import {yupResolver} from '@hookform/resolvers/yup';
import React from 'react';
import {useForm} from 'react-hook-form';
import {useSnapshot} from 'valtio';
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
import {setHeader} from '~/graphql/fetcher';
import {useUser_CheckVerificationCodeOfEmailMutation} from '~/graphql/generated';
import {navigate} from '~/navigation/methods';
import {verificationSchema} from '~/schemas';
import {authenticationStore, userDataStore} from '~/stores';
import {Colors} from '~/styles';
import {fontSize} from '~/utils/style';
import {showErrorMessage} from '~/utils/utils';

const defaultValues = {verificationCode: ''};

export default function VerificationCodeScreen() {
  const {...methods} = useForm({
    resolver: yupResolver(verificationSchema),
    defaultValues,
  });

  const {handleSubmit, register} = methods;

  const {email, isForResetPassword, setVerificationCode} =
    useSnapshot(authenticationStore);

  const {
    mutate: mutateCheckVerificationCode,
    isLoading: isLoadingCheckVerificationCode,
  } = useUser_CheckVerificationCodeOfEmailMutation();

  const {setUserData, setAuthData, setIsUserLoggedIn} = userDataStore(
    state => state,
  );

  async function onSubmit(formData: typeof defaultValues) {
    const verifyCode = formData?.verificationCode?.toString();
    mutateCheckVerificationCode(
      {
        email,
        verificationCode: verifyCode,
        isForResetPassword,
      },
      {
        onSuccess: response => {
          if (response?.user_checkVerificationCodeOfEmail?.status?.code === 1) {
            const res = response?.user_checkVerificationCodeOfEmail?.result;
            setHeader(res?.token);
            if (isForResetPassword) {
              setVerificationCode(verifyCode);
              navigate('ResetPassword');
            } else {
              const authData = {
                token: res?.token,
                expireDate: res?.expireDate,
                refreshToken: res?.refreshToken,
                refreshTokenExpiryTime: res?.refreshTokenExpiryTime,
              };
              setUserData(res?.user);
              setAuthData(authData);
              navigate('SignupSuccess');
            }
          } else {
            showErrorMessage(
              response?.user_checkVerificationCodeOfEmail?.status?.description,
            );
          }
        },
      },
    );
  }

  const loading = isLoadingCheckVerificationCode;

  return (
    <AppContainer barStyle="light-content" backgroundColor={Colors.BACKGROUND}>
      <AppKeyboardAwareScrollView>
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
                <SectionResendCode />
              </VStack>
              <AppButton
                loading={loading}
                title="Verify"
                onPress={handleSubmit(onSubmit)}
              />
            </AppFormProvider>
          </VStack>
        </VStack>
      </AppKeyboardAwareScrollView>
    </AppContainer>
  );
}
