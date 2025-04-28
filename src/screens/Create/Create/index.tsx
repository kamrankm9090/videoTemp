import { useNavigation, useRoute } from '@react-navigation/native';
import dayjs from 'dayjs';
import React, {useCallback, useMemo, useState} from 'react';
import {useForm} from 'react-hook-form';
import {ScrollView, StyleSheet, View} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {CalenderIcon, CheckBox, CheckBoxOutline, Clock} from '~/assets/svgs';
import {
  AppButton,
  AppContainer,
  AppFormProvider,
  AppText,
  AppTouchable,
  FormInput,
  VStack,
} from '~/components';
import FormBottomSheetSelect from '~/components/atoms/FormBottomSheetSelect';
import {useInfiniteCategory_GetCategoriesQuery} from '~/graphql/generated';
import { navigate } from '~/navigation/methods';
import {Colors} from '~/styles';

const CreateScreen = () => {
  const [isFree, setIsFree] = useState(true);
  const [isScheduled, setIsScheduled] = useState(true);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const {params}:any = useRoute()

  const {data: getCategories} = useInfiniteCategory_GetCategoriesQuery();

  const options = useMemo(() => {
    const flat = getCategories?.pages
      ?.map(a => a?.category_getCategories?.result?.items)
      .flat();
    return (
      flat?.map((c: any) => ({
        label: c?.title ?? '',
        value: c?.id ?? '',
      })) ?? []
    );
  }, [getCategories]);

  const form = useForm({
    defaultValues: {
      title: '',
      description: '',
      category: '',
      price: '',
      date: new Date(),
      time: new Date(),
    },
  });

  const {handleSubmit, setValue, watch, formState} = form;

  const onSubmit = useCallback((data: any) => {
    console.log('SUBMIT:', data);
  }, []);

  const handleDateConfirm = useCallback(
    (date: Date) => {
      setValue('date', date);
      setShowDatePicker(false);
    },
    [setValue],
  );

  const handleTimeConfirm = useCallback(
    (time: Date) => {
      setValue('time', time);
      setShowTimePicker(false);
    },
    [setValue],
  );

  return (
    <AppContainer>
      <AppFormProvider methods={form}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={{paddingBottom: 100}}
          keyboardShouldPersistTaps="handled">
          <VStack mb={16} space={16}>
            <AppText
              fontSize={18}
              fontWeight="700"
              color="white"
              marginBottom={16}>
              Create Content
            </AppText>

            <FormInput name="title" placeholder="Title *" {...{formState}} />

            <FormInput
              name="description"
              placeholder="Description"
              multiline
              height={100}
              textAlignVertical={'top'}
              numberOfLines={4}
              {...{formState}}
            />

            <FormBottomSheetSelect name="category" options={options} />

            <FormInput
              name="price"
              placeholder="Price"
              keyboardType="numeric"
              editable={!isFree}
              containerStyle={[
                isFree
                  ? {
                      backgroundColor: Colors.WHITE_TRANSPARENT_2,
                    }
                  : {backgroundColor: Colors.BACKGROUND},
                {borderWidth: 1, borderRadius: 12, padding: 8},
              ]}
              {...{formState}}
            />
          </VStack>

          <AppTouchable
            onPress={() => setIsFree(p => !p)}
            style={styles.checkBoxContainer}>
            {isFree ? <CheckBox /> : <CheckBoxOutline />}
            <AppText marginLeft={8} color={Colors.WHITE}>
              This content is available for free
            </AppText>
          </AppTouchable>

          <AppTouchable
            onPress={() => setIsScheduled(p => !p)}
            style={styles.checkBoxContainer}>
            {isScheduled ? <CheckBox /> : <CheckBoxOutline />}
            <AppText marginLeft={8} color={Colors.WHITE}>
              Set schedule
            </AppText>
          </AppTouchable>

          {isScheduled && (
            <View style={styles.scheduleContainer}>
              <AppTouchable
                style={styles.scheduleBox}
                onPress={() => setShowDatePicker(true)}>
                <AppText fontSize={12} color={Colors.PLACEHOLDER}>
                  Publishing Schedule
                </AppText>
                <View style={styles.timeContainer}>
                  <AppText
                    fontSize={14}
                    fontWeight="600"
                    color={Colors.WHITE}
                    marginTop={4}>
                    {dayjs(watch('date')).format('YYYY/MM/DD')}
                  </AppText>
                  <CalenderIcon />
                </View>
              </AppTouchable>

              <AppTouchable
                style={styles.scheduleBox}
                onPress={() => setShowTimePicker(true)}>
                <AppText fontSize={12} color={Colors.PLACEHOLDER}>
                  Time
                </AppText>
                <View style={styles.timeContainer}>
                  <AppText
                    fontSize={14}
                    fontWeight="600"
                    color={Colors.WHITE}
                    marginTop={4}>
                    {dayjs(watch('time')).format('h:mm A')}
                  </AppText>
                  <Clock />
                </View>
              </AppTouchable>
            </View>
          )}

          <AppTouchable style={{...styles.previewBox, borderColor:params?.videoUrl ? Colors.GREEN_BRAND :  Colors.BORDER,}} onPress={() => navigate("VideoPreview")}>
            <AppText numberOfLines={1} maxWidth={200} color={Colors.PLACEHOLDER}>{params?.videoUrl ? params?.videoUrl : "Add video preview"}</AppText>
          </AppTouchable>

          <AppButton title="Continue" onPress={handleSubmit(onSubmit)} />
        </ScrollView>

        <DateTimePickerModal
          isVisible={showDatePicker}
          mode="date"
          onConfirm={handleDateConfirm}
          onCancel={() => setShowDatePicker(false)}
        />

        <DateTimePickerModal
          isVisible={showTimePicker}
          mode="time"
          onConfirm={handleTimeConfirm}
          onCancel={() => setShowTimePicker(false)}
        />
      </AppFormProvider>
    </AppContainer>
  );
};

export default CreateScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.BACKGROUND,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  checkBoxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  scheduleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  scheduleBox: {
    flex: 1,
    borderWidth: 1,
    borderColor: Colors.BORDER,
    borderRadius: 8,
    padding: 12,
    marginRight: 8,
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
