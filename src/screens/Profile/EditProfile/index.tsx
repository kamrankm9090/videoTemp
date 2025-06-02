import {yupResolver} from '@hookform/resolvers/yup';
import React from 'react';
import {useForm} from 'react-hook-form';
import {StyleSheet} from 'react-native';
import {
  AppContainer,
  AppFormProvider,
  AppHeader,
  AppKeyboardAwareScrollView,
  FormImagePicker,
  FormInput,
  VStack,
} from '~/components';
import {UserSchema} from '~/schemas';
import {Colors} from '~/styles';

const EditProfileScreen = () => {
  const defaultValues = {
    title: '',
    imageProfile: '',
  };

  const {...methods} = useForm({
    resolver: yupResolver(UserSchema),
    defaultValues,
  });

  const {handleSubmit, formState, watch} = methods;

  return (
    <AppContainer>
      <AppHeader
        backgroundColor={Colors.BACKGROUND}
        titleColor={Colors.WHITE}
        backAction
        title="Edit Profile"
      />

      <AppFormProvider methods={methods}>
        <AppKeyboardAwareScrollView
          contentContainerStyle={styles.contentContainerStyle}>
          <VStack mb={16} space={16}>
            <FormInput
              mandatory
              name="title"
              placeholder="Title"
              {...{formState}}
            />
            <FormImagePicker name="imageProfile" {...{formState}} />
          </VStack>
        </AppKeyboardAwareScrollView>
      </AppFormProvider>
    </AppContainer>
  );
};

export default EditProfileScreen;

const styles = StyleSheet.create({
  contentContainerStyle: {
    flexGrow: 1,
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  previewBox: {
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: Colors.BORDER,
    height: 100,
    borderRadius: 8,
    marginBottom: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
