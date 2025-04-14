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
  SectionSocialMedia,
  VStack,
} from '~/components';
import {
  useUser_SendVerificationCodeToEmailMutation,
  useUser_SignUpMutation,
} from '~/graphql/generated';
import {navigate, replace} from '~/navigation/methods';
import {registerSchema} from '~/schemas';
import {authenticationStore, userDataStore} from '~/stores';
import {Colors} from '~/styles';
import {fontSize} from '~/utils/style';
import {showErrorMessage} from '~/utils/utils';

const defaultValues = {email: '', userName: '', password: '', confirm: ''};

export default function SignupScreen() {
  const {...methods} = useForm({
    resolver: yupResolver(registerSchema),
    defaultValues,
  });

  const {handleSubmit, register, formState} = methods;

  const {mutate: mutateSignup, isLoading: isLoadingSignup} =
    useUser_SignUpMutation();
  const {
    mutate: mutateSendVerificationCode,
    isLoading: isLoadingSendVerificationCode,
  } = useUser_SendVerificationCodeToEmailMutation();
  const {setEmail, setIsForResetPassword} = useSnapshot(authenticationStore);
  const {setAuthData, setUserData} = userDataStore(state => state);

  async function onSubmit(formData: typeof defaultValues) {
    const variables = {
      input: {
        email: formData?.email,
        password: formData?.password,
      },
      userInput: {
        username: formData?.userName,
      },
    };
    mutateSignup(variables, {
      onSuccess: response => {
        if (response?.user_signUp?.status?.code === 1) {
          sendVerificationCode(formData?.email, response?.user_signUp?.result);
        }
      },
    });
  }

  async function sendVerificationCode(
    email: string,
    signupData: {
      user: User;
      token: undefined;
      expireDate: undefined;
      refreshToken: undefined;
      refreshTokenExpiryTime: undefined;
    },
  ) {
    const variables = {
      input: {
        isForResetPassword: false,
        email,
      },
    };
    mutateSendVerificationCode(variables, {
      onSuccess: response => {
        if (response?.user_sendVerificationCodeToEmail?.code === 1) {
          setEmail(email);
          setIsForResetPassword(false);
          const authData = {
            token: signupData?.token,
            expireDate: signupData?.expireDate,
            refreshToken: signupData?.refreshToken,
            refreshTokenExpiryTime: signupData?.refreshTokenExpiryTime,
          };
          setAuthData(authData);
          setUserData(signupData?.user);
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
    // replace('Signin');
    replace('SelectCategory');
  }

  function onResponseSocialMedia() {}

  const loading = isLoadingSignup || isLoadingSendVerificationCode;

  return (
    <AppContainer barStyle="light-content" backgroundColor={Colors.BACKGROUND}>
      <AppKeyboardAwareScrollView>
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
              <AppButton
                loading={loading}
                title="Sign up"
                onPress={handleSubmit(onSubmit)}
              />
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
