import {yupResolver} from '@hookform/resolvers/yup';
import React, {useCallback, useState} from 'react';
import {useForm} from 'react-hook-form';
import {StyleSheet} from 'react-native';
import {
  AppButton,
  AppCheckBox,
  AppContainer,
  AppFormProvider,
  AppKeyboardAwareScrollView,
  AppText,
  AppTouchable,
  Divider,
  FormDateTimePicker,
  FormInput,
  HStack,
  ScreensHeader,
  SectionCategory,
  VStack,
} from '~/components';
import {createContentSchema} from '~/schemas';
import {Colors} from '~/styles';

const defaultValues = {
  title: '',
  description: '',
  category: '',
  price: '',
  date: '',
  time: '',
};

export default function CreateContentScreen() {
  const [isFree, setIsFree] = useState(true);
  const [isScheduled, setIsScheduled] = useState(true);

  const {...methods} = useForm({
    resolver: yupResolver(createContentSchema),
    defaultValues,
  });

  const {handleSubmit, register, formState} = methods;

  const onSubmit = useCallback((data: any) => {
    console.log('SUBMIT:', data);
  }, []);

  return (
    <AppContainer>
      <ScreensHeader backAction title="Create Content" />
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
            <FormInput
              name="description"
              placeholder="Description"
              multiline
              textArea
              {...{formState}}
            />
            <FormInput
              textArea
              {...register('description')}
              {...{formState}}
              placeholder={'Type your reason'}
            />
            <SectionCategory name="category" />
            <FormInput
              name="price"
              placeholder="Price"
              keyboardType="numeric"
              editable={!isFree}
              {...{formState}}
            />
            <AppCheckBox
              text=" This content is available for free"
              isChecked={isFree}
              onPress={checked => setIsFree(checked)}
            />
            <Divider backgroundColor={Colors.Nero_3} />
            <AppCheckBox
              text="Set schedule"
              isChecked={isScheduled}
              onPress={checked => setIsScheduled(checked)}
            />
            {isScheduled && (
              <HStack alignItems="flex-start" space={8}>
                <FormDateTimePicker
                  flex={1}
                  label="Publishing Schedule"
                  name="date"
                  mode="date"
                />
                <FormDateTimePicker
                  flex={1}
                  label="Publishing Schedule"
                  name="time"
                  mode="time"
                />
              </HStack>
            )}
            <Divider backgroundColor={Colors.Nero_3} />
          </VStack>
          <AppTouchable style={styles.previewBox} onPress={() => {}}>
            <AppText color={Colors.PLACEHOLDER}>Add video preview</AppText>
          </AppTouchable>
          <AppButton title="Continue" onPress={handleSubmit(onSubmit)} />
        </AppKeyboardAwareScrollView>
      </AppFormProvider>
    </AppContainer>
  );
}

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
