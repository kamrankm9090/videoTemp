import {yupResolver} from '@hookform/resolvers/yup';
import React, {useCallback} from 'react';
import {useForm} from 'react-hook-form';
import {StyleSheet} from 'react-native';
import {useSnapshot} from 'valtio';
import {
  AppButton,
  AppContainer,
  AppFormProvider,
  AppKeyboardAwareScrollView,
  AppText,
  AppTouchable,
  Divider,
  FormCheckBox,
  FormDateTimePicker,
  FormInput,
  HStack,
  ScreensHeader,
  SectionCategory,
  VStack,
} from '~/components';
import {LiveInput, useLive_CreateLiveMutation} from '~/graphql/generated';
import {navigate} from '~/navigation/methods';
import {createContentSchema} from '~/schemas';
import {liveStore} from '~/stores';
import {Colors} from '~/styles';
import {showErrorMessage} from '~/utils/utils';

const defaultValues = {
  title: '',
  isFree: false,
  isSchedule: false,
  description: '',
  category: null,
  price: '',
  date: '',
  time: '',
};

export default function CreateContentScreen() {
  const {...methods} = useForm({
    resolver: yupResolver(createContentSchema),
    defaultValues,
  });

  const {handleSubmit, formState, watch} = methods;
  const {setLiveId} = useSnapshot(liveStore);

  const {mutate: mutateCreateLive, isLoading: isLoadingCreateLive} =
    useLive_CreateLiveMutation();

  const onSubmit = useCallback(
    (formData: typeof defaultValues) => {
      const input: LiveInput = {
        isFree: formData?.isFree,
        description: formData?.description,
        title: formData?.title,
        categoryId: formData?.category?.id,
        setSchedule: formData?.isSchedule,
        // price: formData?.price,
        // publishingScheduleDate: formData?.date,
        // publishingScheduleTime: formData?.time,
        previewUrl: '',
      };
      mutateCreateLive(
        {input},
        {
          onSuccess: response => {
            console.log('response-11->', response);
            if (response?.live_createLive?.status?.code === 1) {
              setLiveId(response?.live_createLive?.result?.id);
              navigate('Live');
            } else {
              showErrorMessage(response?.live_createLive?.status?.description);
            }
          },
        },
      );
    },
    [mutateCreateLive, setLiveId],
  );

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
              textArea
              name="description"
              placeholder="Description"
              {...{formState}}
            />
            <SectionCategory name="category" />
            <FormInput
              name="price"
              placeholder="Price"
              keyboardType="numeric"
              editable={!watch('isFree')}
              {...{formState}}
            />
            <FormCheckBox
              name="isFree"
              text=" This content is available for free"
            />
            <Divider backgroundColor={Colors.Nero_3} />
            <FormCheckBox name="isSchedule" text="Set schedule" />
            {watch('isSchedule') && (
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
          <AppButton
            loading={isLoadingCreateLive}
            title="Continue"
            onPress={handleSubmit(onSubmit)}
          />
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
