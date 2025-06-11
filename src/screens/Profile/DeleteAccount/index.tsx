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
  AppText,
  AppTouchable,
  Box,
  FormInput,
  VStack,
} from '~/components';
import {
  User_SignInMutationVariables,
  useUser_RemoveUserMutation,
  useUser_SignInMutation,
} from '~/graphql/generated';
import {navigate} from '~/navigation/methods';
import {UserSchema} from '~/schemas';
import {userDataStore} from '~/stores';
import {Colors} from '~/styles';
import {scale} from '~/utils/style';
import {logout, showErrorMessage} from '~/utils/utils';

const defaultValues = {
  password: '',
};

const DeleteAccountScreen = () => {
  const {userData} = userDataStore(state => state);

  const {...methods} = useForm({
    resolver: yupResolver(UserSchema),
    defaultValues,
  });
  const {mutate: mutateSignIn, isLoading: isLoadingSignIn} =
    useUser_SignInMutation();

  const {mutate: mutateRemoveUser, isLoading: isLoadingRemoveUser} =
    useUser_RemoveUserMutation();

  const {handleSubmit, formState, setValue, register, watch} = methods;

  const onSubmit = useCallback((formData: typeof defaultValues) => {
    const variables: User_SignInMutationVariables = {
      input: {
        email: userData?.email,
        password: formData?.password,
      },
    };
    mutateSignIn(variables, {
      onSuccess: response => {
        if (response?.user_signIn?.status?.code === 1) {
          const userId = userData?.id;
          mutateRemoveUser(
            {userId},
            {
              onSuccess: responseRemove => {
                if (responseRemove?.user_removeUser?.code === 1) {
                  logout();
                } else {
                  showErrorMessage(
                    responseRemove?.user_removeUser?.description,
                  );
                }
              },
            },
          );
        } else {
          showErrorMessage(response?.user_signIn?.status?.description);
        }
      },
    });
  }, []);

  return (
    <AppContainer>
      <AppHeader
        title="Delete Account"
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
              {...register('password')}
              {...{formState}}
              placeholder={'Password'}
              keyboardType="visible-password"
            />

            <AppTouchable
              onPress={() =>
                navigate('ProfileStack', {
                  screen: 'ForgotPassword',
                  params: {hasGoBack: true},
                })
              }
              alignSelf="flex-end">
              <AppText color={Colors.PRIMARY}>Forget password ?</AppText>
            </AppTouchable>
          </VStack>
        </AppKeyboardAwareScrollView>
        <Box px={scale(12)} my={scale(50)}>
          <AppButton
            mt={24}
            title="Save"
            loading={isLoadingSignIn || isLoadingRemoveUser}
            onPress={handleSubmit(onSubmit)}
          />
        </Box>
      </AppFormProvider>
    </AppContainer>
  );
};

export default DeleteAccountScreen;

const styles = StyleSheet.create({
  contentContainerStyle: {
    flexGrow: 1,
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
});
