import React, {useCallback, useEffect} from 'react';
import {
  AppButton,
  AppContainer,
  AppFormProvider,
  AppHeader,
  AppKeyboardAwareScrollView,
  FormInput,
  TagInputListForm,
  VStack,
} from '~/components';
import {resumeSchema} from '~/schemas';
import {Colors} from '~/styles';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {StyleSheet} from 'react-native';
import {scale} from '~/utils/style';
import {userDataStore} from '~/stores';
import {useUser_UpdateUserMutation} from '~/graphql/generated';
import {showErrorMessage, showSuccessMessage} from '~/utils/utils';
import {goBack} from '~/navigation/methods';

const defaultValues = {
  profession: '',
  professionalSummary: '',
  education: '',
  workExperience: '',
  skills: '',
  languages: '',
};

const ResumeScreen = () => {
  const {userData, setUserData} = userDataStore(state => state);
  const {mutate: mutateUserUpdate, isLoading: isLoadingUpdateUser} =
    useUser_UpdateUserMutation();

  const {...methods} = useForm({
    resolver: yupResolver(resumeSchema),
    defaultValues,
  });

  const {handleSubmit, formState, setValue, watch} = methods;

  useEffect(() => {
    if (userData) {
      setValue('profession', userData?.profession || '');
      setValue('professionalSummary', userData?.professionalSummary || '');
      setValue('education', userData?.education || '');
      setValue('workExperience', userData?.workExperience || '');
      setValue('skills', userData?.skills || '');
      setValue('languages', userData?.languages || '');
    }
  }, [userData]);

  const onSubmit = useCallback((formData: typeof defaultValues) => {
    const variables = {
      userId: userData?.id,
      userInput: {
        ...formData,
      },
    };

    mutateUserUpdate(variables, {
      onSuccess: response => {
        if (response?.user_updateUser?.status?.code === 1) {
          console.log('response', response);
          setUserData(response?.user_updateUser?.result);
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
        title="Your Resume"
        titleColor={Colors.WHITE}
        backgroundColor={Colors.BACKGROUND}
        backAction
      />
      <AppFormProvider methods={methods}>
        <AppKeyboardAwareScrollView
          contentContainerStyle={styles.contentContainerStyle}>
          <VStack mb={16} space={scale(16)}>
            <FormInput
              mandatory
              name="profession"
              placeholder="Profession"
              {...{formState}}
            />
            <FormInput
              name="professionalSummary"
              placeholder="Professional summary"
              multiline
              textArea
              {...{formState}}
            />
            <TagInputListForm
              name="education"
              placeholder="Education"
              {...{formState}}
            />
            <TagInputListForm
              name="workExperience"
              placeholder="Work experience"
              {...{formState}}
            />
            <TagInputListForm
              name="skills"
              placeholder="Skills"
              {...{formState}}
            />
            <TagInputListForm
              name="languages"
              placeholder="languages"
              {...{formState}}
            />

            <AppButton
              mt={24}
              title="Continue"
              loading={isLoadingUpdateUser}
              onPress={handleSubmit(onSubmit)}
            />
          </VStack>
        </AppKeyboardAwareScrollView>
      </AppFormProvider>
    </AppContainer>
  );
};

export default ResumeScreen;

const styles = StyleSheet.create({
  contentContainerStyle: {
    flexGrow: 1,
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
});
