import {yupResolver} from '@hookform/resolvers/yup';
import React, {useCallback} from 'react';
import {useForm} from 'react-hook-form';
import {StyleSheet} from 'react-native';
import {
  AppButton,
  AppContainer,
  AppFormProvider,
  AppHeader,
  AppKeyboardAwareScrollView,
  Box,
  FormInput,
  VStack,
} from '~/components';
import {useUser_ChangeUserPassowrdMutation} from '~/graphql/generated';
import {goBack} from '~/navigation/methods';
import {passwordChangeSchema} from '~/schemas';
import {Colors} from '~/styles';
import {scale} from '~/utils/style';
import {showErrorMessage, showSuccessMessage} from '~/utils/utils';

const defaultValues = {
  currentPassword: '',
  newPassword: '',
  repeatNewPassword: '',
};

const PasswordSettingScreen = () => {
  const {...methods} = useForm({
    resolver: yupResolver(passwordChangeSchema),
    defaultValues,
  });

  const {mutate: mutateChangePassword, isLoading: isLoadingChangePassword} =
    useUser_ChangeUserPassowrdMutation();

  const {handleSubmit, formState, register} = methods;

  const onSubmit = useCallback((formData: typeof defaultValues) => {
    const input = {
      oldPassword: formData?.currentPassword,
      newPassword: formData?.newPassword,
    };
    mutateChangePassword(
      {input},
      {
        onSuccess: response => {
          if (response?.user_changeUserPassowrd?.code === 1) {
            showSuccessMessage('Your password has been changed successfully.');
            goBack();
          } else {
            showErrorMessage(response?.user_changeUserPassowrd?.description);
          }
        },
      },
    );
  }, []);

  return (
    <AppContainer>
      <AppHeader
        title="Password setting"
        titleColor={Colors.WHITE}
        backgroundColor={Colors.BACKGROUND}
        backAction
      />
      <AppFormProvider methods={methods}>
        <AppKeyboardAwareScrollView
          contentContainerStyle={styles.contentContainerStyle}>
          <VStack mb={16} space={scale(25)}>
            <FormInput
              mandatory
              {...register('currentPassword')}
              {...{formState}}
              placeholder={'Current password'}
              keyboardType="visible-password"
            />
            <FormInput
              mandatory
              {...register('newPassword')}
              {...{formState}}
              placeholder={'New password'}
              keyboardType="visible-password"
            />
            <FormInput
              mandatory
              {...register('repeatNewPassword')}
              {...{formState}}
              placeholder={'Repeat new password'}
              keyboardType="visible-password"
            />
          </VStack>
        </AppKeyboardAwareScrollView>
        <Box px={scale(12)} my={scale(50)}>
          <AppButton
            mt={24}
            title="Save"
            loading={isLoadingChangePassword}
            onPress={handleSubmit(onSubmit)}
          />
        </Box>
      </AppFormProvider>
    </AppContainer>
  );
};

export default PasswordSettingScreen;

const styles = StyleSheet.create({
  contentContainerStyle: {
    flexGrow: 1,
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
});
