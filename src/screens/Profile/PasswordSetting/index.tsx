import React, {useCallback} from 'react';
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
import {Colors} from '~/styles';
import {UserSchema} from '~/schemas';
import {useForm} from 'react-hook-form';
import {StyleSheet} from 'react-native';
import {yupResolver} from '@hookform/resolvers/yup';
import {scale} from '~/utils/style';

const defaultValues = {
  fullName: '',
};

const PasswordSettingScreen = () => {
  const {...methods} = useForm({
    resolver: yupResolver(UserSchema),
    defaultValues,
  });

  const {handleSubmit, formState, setValue, register, watch} = methods;

  const onSubmit = useCallback((formData: typeof defaultValues) => {}, []);

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
              {...register('password')}
              {...{formState}}
              placeholder={'Current password'}
              keyboardType="visible-password"
            />
            <FormInput
              mandatory
              {...register('password')}
              {...{formState}}
              placeholder={'New password'}
              keyboardType="visible-password"
            />
            <FormInput
              mandatory
              {...register('password')}
              {...{formState}}
              placeholder={'Repeat new password'}
              keyboardType="visible-password"
            />
          </VStack>
        </AppKeyboardAwareScrollView>
        <Box px={scale(12)} my={scale(50)}>
          <AppButton mt={24} title="Save" onPress={handleSubmit(onSubmit)} />
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
