import {yupResolver} from '@hookform/resolvers/yup';
import React, {useCallback, useMemo} from 'react';
import {useForm} from 'react-hook-form';
import {StyleSheet} from 'react-native';
import {useSnapshot} from 'valtio';
import {
  AppButton,
  AppContainer,
  AppFormProvider,
  AppKeyboardAwareScrollView,
  Divider,
  FormCheckBox,
  FormDateTimePicker,
  FormInput,
  HStack,
  ScreensHeader,
  SectionCategory,
  VideoPreview,
  VStack,
} from '~/components';
import {
  LiveInput,
  LiveType,
  useAgora_CreateTokenMutation,
  useLive_CreateLiveMutation,
} from '~/graphql/generated';
import {navigate} from '~/navigation/methods';
import {createContentSchema} from '~/schemas';
import {liveStore} from '~/stores';
import {Colors} from '~/styles';
import {showErrorMessage} from '~/utils/utils';

export default function CreateContentScreen() {
  const {
    liveType,
    setLiveId,
    setToken,
    setTokenCreateDate,
    liveData,
    setLiveData,
  } = useSnapshot(liveStore);

  const isLiveContent = useMemo(() => {
    return liveType === 'LIVE_CONTENT';
  }, [liveType]);

  const defaultValues = {
    liveType,
    title: '',
    isFree: true,
    isSchedule: false,
    description: '',
    category: null,
    date: '',
    time: '',
    ...(isLiveContent && {
      price: '',
      previewUrl: '',
      // previewUrl:
      //   'https://klpmedia.blob.core.windows.net/klpmedia/images/d5a13020f67438video_1749654865299.mp4',
    }),
  };

  const {...methods} = useForm({
    resolver: yupResolver(createContentSchema),
    defaultValues,
  });

  const {handleSubmit, formState, watch} = methods;

  const {mutate: mutateCreateLive, isLoading: isLoadingCreateLive} =
    useLive_CreateLiveMutation();
  const {mutate: mutateCreateAgoraToken, isLoading: isLoadingCreateAgoraToken} =
    useAgora_CreateTokenMutation();

  const onSubmit = useCallback(
    (formData: typeof defaultValues) => {
      const date = new Date(formData?.time);

      const hours = date.getUTCHours();
      const minutes = date.getUTCMinutes();
      const seconds = date.getUTCSeconds();

      const publishingScheduleTime = `PT${hours}H${minutes}M${seconds}S`;

      const input: LiveInput = {
        liveType: liveType || LiveType.LiveContent,
        isFree: isLiveContent ? formData?.isFree : null,
        description: formData?.description,
        title: formData?.title,
        categoryId: formData?.category?.id,
        category: formData?.category?.title,
        setSchedule: formData?.isSchedule,
        ...(!formData?.isFree &&
          isLiveContent && {
            price: Number(formData?.price),
          }),
        ...(formData?.isSchedule && {
          publishingScheduleDate: new Date(formData?.date),
          publishingScheduleTime: publishingScheduleTime,
        }),
        ...(formData?.previewUrl &&
          isLiveContent && {
            previewUrl: formData?.previewUrl,
          }),
      };
      mutateCreateLive(
        {input},
        {
          onSuccess: response => {
            if (response?.live_createLive?.status?.code === 1) {
              const liveId = response?.live_createLive?.result?.id?.toString();
              mutateCreateAgoraToken(
                {channelName: liveId, publisher: true},
                {
                  onSuccess: res => {
                    if (res?.agora_createToken?.status?.code === 1) {
                      setLiveData({
                        ...liveData,
                        live: {
                          ...input,
                          category: formData?.category,
                        },
                      });
                      setLiveId(liveId);
                      setToken(res?.agora_createToken?.result);
                      setTokenCreateDate(Date.now());
                      navigate('Live');
                    }
                  },
                },
              );
            } else {
              showErrorMessage(response?.live_createLive?.status?.description);
            }
          },
        },
      );
    },
    [
      mutateCreateLive,
      mutateCreateAgoraToken,
      setLiveId,
      setTokenCreateDate,
      setToken,
      setLiveData,
      isLiveContent,
      liveType,
      liveData,
    ],
  );

  const loading = isLoadingCreateLive || isLoadingCreateAgoraToken;

  return (
    <AppContainer safeArea>
      <ScreensHeader
        backAction
        title={isLiveContent ? 'Create Content' : 'Collaborative'}
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
            <FormInput
              textArea
              name="description"
              placeholder="Description"
              {...{formState}}
            />
            <SectionCategory mandatory name="category" />
            {isLiveContent && (
              <>
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
              </>
            )}
            <Divider backgroundColor={Colors.Nero_3} />
            <FormCheckBox
              name="isSchedule"
              text="Set schedule"
              description="The record is no more live and will be played as scheduled."
            />
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
          {isLiveContent && <VideoPreview name="previewUrl" />}
          <AppButton
            mt={24}
            loading={loading}
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
