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
import {navigate} from '~/navigation/methods';
import {UserSchema} from '~/schemas';
import {Colors} from '~/styles';
import {scale} from '~/utils/style';

const defaultValues = {
  fullName: '',
};

const DeleteAccountScreen = () => {
  const {...methods} = useForm({
    resolver: yupResolver(UserSchema),
    defaultValues,
  });

  const {handleSubmit, formState, setValue, register, watch} = methods;

  const onSubmit = useCallback((formData: typeof defaultValues) => {}, []);

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
          <AppButton mt={24} title="Save" onPress={handleSubmit(onSubmit)} />
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
