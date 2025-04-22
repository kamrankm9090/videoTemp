import {yupResolver} from '@hookform/resolvers/yup';
import React from 'react';
import {useForm} from 'react-hook-form';
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
import {useUser_SignInMutation} from '~/graphql/generated';
import {navigate, replace} from '~/navigation/methods';
import {loginSchema} from '~/schemas';
import {userDataStore} from '~/stores';
import {Colors} from '~/styles';
import {fontSize} from '~/utils/style';
import {setHeader, showErrorMessage} from '~/utils/utils';

const defaultValues = {email: '', password: ''};

export default function SigninScreen() {
  const {...methods} = useForm({
    resolver: yupResolver(loginSchema),
    defaultValues,
  });

  const {handleSubmit, register, formState} = methods;

  const {setUserData, setAuthData, setIsUserLoggedIn} = userDataStore(
    state => state,
  );

  const {mutate: mutateSignIn, isLoading: isLoadingSignIn} =
    useUser_SignInMutation();

  async function onSubmit(formData: typeof defaultValues) {
    const variables = {
      input: {
        email: formData?.email,
        password: formData?.password,
      },
    };
    mutateSignIn(variables, {
      onSuccess: response => {
        if (response?.user_signIn?.status?.code === 1) {
          const res = response?.user_signIn?.result;
          setHeader(res?.token || '');
          const authData = {
            token: res?.token,
            expireDate: res?.expireDate,
            refreshToken: res?.refreshToken,
            refreshTokenExpiryTime: res?.refreshTokenExpiryTime,
          };
          setAuthData(authData);
          setUserData(res?.user);
          setIsUserLoggedIn(true);
        } else {
          showErrorMessage(response?.user_signIn?.status?.description);
        }
      },
    });
  }

  function signupOnPress() {
    replace('Signup');
  }

  function forgotOnPress() {
    navigate('ForgotPassword');
  }

  function onResponseSocialMedia() {}

  const loading = isLoadingSignIn;

  return (
    <AppContainer barStyle="light-content" backgroundColor={Colors.BACKGROUND}>
      <AppKeyboardAwareScrollView>
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
                  editable={!loading}
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
              <AppButton
                loading={loading}
                title="Login"
                onPress={handleSubmit(onSubmit)}
              />
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
