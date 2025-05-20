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
import {useUser_ResetPasswordUsingEmailMutation} from '~/graphql/generated';
import {navigate, replace} from '~/navigation/methods';
import {resetPasswordSchema} from '~/schemas';
import {authenticationStore} from '~/stores';
import {Colors} from '~/styles';
import {fontSize} from '~/utils/style';
import {showErrorMessage} from '~/utils/utils';

const defaultValues = {newPassword: '', confirm: ''};

export default function ResetPasswordScreen() {
  const {...methods} = useForm({
    resolver: yupResolver(resetPasswordSchema),
    defaultValues,
  });

  const {handleSubmit, register, formState} = methods;

  const {email, verificationCode} = useSnapshot(authenticationStore);

  const {mutate: mutateResetPassword, isLoading: isLoadingResetPassword} =
    useUser_ResetPasswordUsingEmailMutation();

  async function onSubmit(formData: typeof defaultValues) {
    const variables = {
      input: {
        email,
        newPassword: formData?.newPassword,
        verificationCode,
      },
    };
    mutateResetPassword(variables, {
      onSuccess: response => {
        if (response?.user_resetPasswordUsingEmail?.code === 1) {
          navigate('ResetPasswordSuccess');
        } else {
          showErrorMessage(response?.user_resetPasswordUsingEmail?.description);
        }
      },
    });
  }

  function loginOnPress() {
    replace('Signin');
  }

  const loading = isLoadingResetPassword;

  return (
    <AppContainer barStyle="light-content" backgroundColor={Colors.BACKGROUND}>
      <AppKeyboardAwareScrollView>
        <VStack p={24} space={48} flex={1}>
          <AuthHeader />
          <VStack space={24}>
            <AppText fontSize={fontSize.large} color={Colors.WHITE}>
              Reset Your Password
            </AppText>
            <AppText color={Colors.GARY_3}>
              Pleaae enter a new password for your account.
            </AppText>
            <AppFormProvider methods={methods}>
              <VStack mb={24} space={16}>
                <FormInput
                  {...register('newPassword')}
                  {...{formState}}
                  placeholder="New password"
                  keyboardType="visible-password"
                />
                <FormInput
                  {...register('confirm')}
                  {...{formState}}
                  placeholder="Confirm new password"
                  keyboardType="visible-password"
                />
              </VStack>
              <AppButton
                loading={loading}
                title="Reset Password"
                onPress={handleSubmit(onSubmit)}
              />
            </AppFormProvider>
          </VStack>
          <HStack space={6} mb={24} justifyContent="center">
            <AppText fontFamily="medium" color={Colors.WHITE}>
              Have an account?
            </AppText>
            <AppLink
              color={Colors.PRIMARY}
              underline={false}
              text="Login"
              onPress={loginOnPress}
            />
          </HStack>
        </VStack>
      </AppKeyboardAwareScrollView>
    </AppContainer>
  );
}
