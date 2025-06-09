import React, {useCallback} from 'react';
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

const defaultValues = {
  fullName: '',
};

const ResumeScreen = () => {
  const {...methods} = useForm({
    resolver: yupResolver(resumeSchema),
    defaultValues,
  });

  const {handleSubmit, formState, setValue, watch} = methods;

  const onSubmit = useCallback((formData: typeof defaultValues) => {}, []);

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
