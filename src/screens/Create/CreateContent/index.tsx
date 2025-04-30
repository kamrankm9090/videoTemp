import {yupResolver} from '@hookform/resolvers/yup';
import { useRoute } from '@react-navigation/native';
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
import {
  LiveInput,
  useAgora_CreateTokenMutation,
  useLive_CreateLiveMutation,
} from '~/graphql/generated';
import useInitAgora from '~/hooks/agora/useInitAgora';
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
  useInitAgora();
  const {...methods} = useForm({
    resolver: yupResolver(createContentSchema),
    defaultValues,
  });

  const {params}:any = useRoute()
  

  const {handleSubmit, formState, watch} = methods;
  const {setLiveId, setToken, setTokenCreateDate} = useSnapshot(liveStore);

  const {mutate: mutateCreateLive, isLoading: isLoadingCreateLive} =
    useLive_CreateLiveMutation();
  const {mutate: mutateCreateAgoraToken, isLoading: isLoadingCreateAgoraToken} =
    useAgora_CreateTokenMutation();

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
        previewUrl: params?.videoUrl,
      };
      mutateCreateLive(
        {input},
        {
          onSuccess: response => {
            console.log('response-11->', response);
            if (response?.live_createLive?.status?.code === 1) {
              const liveId = response?.live_createLive?.result?.id?.toString();
              mutateCreateAgoraToken(
                {channelName: liveId, publisher: true},
                {
                  onSuccess: res => {
                    if (res?.agora_createToken?.status?.code === 1) {
                      console.log('res===>', res);
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
    ],
  );

  const loading = isLoadingCreateLive || isLoadingCreateAgoraToken;

  return (
    <AppContainer safeArea>
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
            <AppTouchable style={{...styles.previewBox, borderColor:params?.videoUrl ? Colors.GREEN_BRAND :  Colors.BORDER,}} onPress={() => navigate("VideoPreview")}>
                 <AppText numberOfLines={1} maxWidth={200} color={Colors.PLACEHOLDER}>{params?.videoUrl ? params?.videoUrl : "Add video preview"}</AppText>
               </AppTouchable>
          <AppButton
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
