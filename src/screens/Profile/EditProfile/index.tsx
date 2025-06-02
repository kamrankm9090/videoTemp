import {yupResolver} from '@hookform/resolvers/yup';
import React, {useCallback} from 'react';
import {useForm} from 'react-hook-form';
import {StyleSheet} from 'react-native';
import {
  AppButton,
  AppContainer,
  AppDropDown,
  AppFormProvider,
  AppHeader,
  AppKeyboardAwareScrollView,
  FormDateTimePicker,
  FormImagePicker,
  FormInput,
  VStack,
} from '~/components';
import {useUser_UpdateUserMutation} from '~/graphql/generated';
import {UserSchema} from '~/schemas';
import {userDataStore} from '~/stores';
import {Colors} from '~/styles';
import {showErrorMessage} from '~/utils/utils';

const EditProfileScreen = () => {
  const {setUserData} = userDataStore(state => state);

  const defaultValues = {
    title: '',
    photoUrl: '',
    username: '',
    email: '',
    skills: '',
    dateOfBirth: '',
    phoneNumber: '',
  };

  const {...methods} = useForm({
    resolver: yupResolver(UserSchema),
    defaultValues,
  });

  const {handleSubmit, formState} = methods;

  const {mutate: mutateUserUpdate, isLoading: isLoadingUpdateUser} =
    useUser_UpdateUserMutation();

  const onSubmit = useCallback((formData: typeof defaultValues) => {
    const variables = {
      userId: null,
      userInput: {
        ...formData,
      },
    };
    mutateUserUpdate(variables, {
      onSuccess: response => {
        if (response?.user_updateUser?.status?.code === 1) {
          setUserData(response?.user_updateUser?.result);
        } else {
          showErrorMessage(response?.user_updateUser?.status?.description);
        }
      },
    });
  }, []);

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
            <FormImagePicker name="photoUrl" {...{formState}} />

            <FormInput
              mandatory
              name="fullName"
              placeholder="Full name"
              {...{formState}}
            />
            <FormInput
              mandatory
              name="username"
              placeholder="Username"
              {...{formState}}
            />
            <FormInput
              mandatory
              name="email"
              placeholder="Email"
              {...{formState}}
            />
            <FormInput
              mandatory
              name="phoneNumber"
              keyboardType="phone-pad"
              placeholder="Phone Number"
              {...{formState}}
            />
            <FormInput name="skills" placeholder="Skills" {...{formState}} />
            <AppDropDown
              name="communityType"
              placeholder="Select Type"
              label="Gender"
              data={[
                {title: 'Male', value: 'MALE'},
                {title: 'Female', value: 'FEMALE'},
                {title: 'Others', value: 'OTHERS'},
              ]}
              searchable={false}
              mandetory={true}
              {...{formState}}
            />
            <FormDateTimePicker
              flex={1}
              label="Birth date"
              name="dateOfBirth"
              mode="date"
            />

            <AppButton
              mt={24}
              loading={isLoadingUpdateUser}
              title="Continue"
              onPress={handleSubmit(onSubmit)}
            />
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
