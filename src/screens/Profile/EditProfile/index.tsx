import {yupResolver} from '@hookform/resolvers/yup';
import React, {useCallback, useEffect} from 'react';
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
  queryClient,
  TagInputListForm,
  VStack,
} from '~/components';
import {GENDERS} from '~/constants/constants';
import {useUser_UpdateUserMutation} from '~/graphql/generated';
import {goBack} from '~/navigation/methods';
import {UserSchema} from '~/schemas';
import {userDataStore} from '~/stores';
import {Colors} from '~/styles';
import {showErrorMessage, showSuccessMessage} from '~/utils/utils';

const EditProfileScreen = () => {
  const {userData, setUserData} = userDataStore(state => state);
  const gender = GENDERS.find(
    el => userData?.gender?.toString().trim().toUpperCase() === el.value,
  );

  const defaultValues = {
    fullName: '',
    photoUrl: '',
    username: '',
    email: '',
    skills: '',
    dateOfBirth: '',
    phoneNumber: '',
    gender: '',
  };

  const {...methods} = useForm({
    resolver: yupResolver(UserSchema),
    defaultValues,
  });

  const {handleSubmit, formState, setValue, watch} = methods;

  useEffect(() => {
    if (userData) {
      setValue('email', userData?.email || '');
      setValue('dateOfBirth', userData?.dateOfBirth || '');
      setValue('photoUrl', userData?.photoUrl || '');
      setValue('skills', userData?.skills || '');
      setValue('phoneNumber', userData?.phoneNumber || '');
      setValue('fullName', userData?.fullName || '');
      setValue('username', userData?.username || '');
      if (userData?.gender) {
        setValue('gender', gender || {title: 'Others', value: 'OTHERS'});
      }
    }
  }, [userData]);

  const {mutate: mutateUserUpdate, isLoading: isLoadingUpdateUser} =
    useUser_UpdateUserMutation();

  const onSubmit = useCallback((formData: typeof defaultValues) => {
    const variables = {
      userId: userData?.id,
      userInput: {
        ...formData,
        gender: formData?.gender?.value,
      },
    };

    mutateUserUpdate(variables, {
      onSuccess: response => {
        if (response?.user_updateUser?.status?.code === 1) {
          setUserData(response?.user_updateUser?.result);
          queryClient.invalidateQueries(['social_getUser']);
          goBack();
          showSuccessMessage('Success');
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
            <TagInputListForm
              name="skills"
              placeholder="Skills"
              {...{formState}}
            />
            <AppDropDown
              name="gender"
              placeholder="Select Type"
              label="Gender"
              data={GENDERS}
              searchable={false}
              mandatory
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
