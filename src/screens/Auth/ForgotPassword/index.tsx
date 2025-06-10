import {yupResolver} from '@hookform/resolvers/yup';
import React from 'react';
import {useForm} from 'react-hook-form';
import {useSnapshot} from 'valtio';
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
import {useUser_SendVerificationCodeToEmailMutation} from '~/graphql/generated';
import {navigate, replace} from '~/navigation/methods';
import {forgotPasswordSchema} from '~/schemas';
import {authenticationStore} from '~/stores';
import {Colors} from '~/styles';
import {fontSize} from '~/utils/style';
import {showErrorMessage} from '~/utils/utils';

const defaultValues = {email: ''};

export default function ForgotPasswordScreen({route}: {route: any}) {
  const hasGoBack = route?.params?.hasGoBack;
  const {...methods} = useForm({
    resolver: yupResolver(forgotPasswordSchema),
    defaultValues,
  });

  const {handleSubmit, register, formState} = methods;

  const {
    mutate: mutateSendVerificationCode,
    isLoading: isLoadingSendVerificationCode,
  } = useUser_SendVerificationCodeToEmailMutation();
  const {setEmail, setIsForResetPassword} = useSnapshot(authenticationStore);

  async function onSubmit(formData: typeof defaultValues) {
    const variables = {
      input: {
        isForResetPassword: true,
        email: formData?.email,
      },
    };
    mutateSendVerificationCode(variables, {
      onSuccess: response => {
        if (response?.user_sendVerificationCodeToEmail?.code === 1) {
          setEmail(formData?.email);
          setIsForResetPassword(true);
          navigate('VerificationCode');
        } else {
          showErrorMessage(
            response?.user_sendVerificationCodeToEmail?.description,
          );
        }
      },
    });
  }

  function loginOnPress() {
    replace('Signin');
  }

  const loading = isLoadingSendVerificationCode;

  return (
    <AppContainer barStyle="light-content" backgroundColor={Colors.BACKGROUND}>
      <AppKeyboardAwareScrollView>
        <VStack p={24} space={48} flex={1}>
          <AuthHeader hasGoBack={hasGoBack} />
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
                  editable={!loading}
                />
                <AppButton
                  loading={loading}
                  title="Continue"
                  onPress={handleSubmit(onSubmit)}
                />
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
