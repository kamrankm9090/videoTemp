import dayjs from 'dayjs';
import React, {useCallback, useMemo, useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {Platform, ScrollView, StyleSheet, View} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {CalenderIcon, CheckBox, CheckBoxOutline, Clock} from '~/assets/svgs';
import {
  AppButton,
  AppContainer,
  AppFormProvider,
  AppInput,
  AppText,
  AppTouchable,
} from '~/components';
import BottomSheetSelect from '~/components/atoms/BottomSheetSelect';
import {useInfiniteCategory_GetCategoriesQuery} from '~/graphql/generated';
import {Colors} from '~/styles';

const CreateScreen = () => {
  const [isFree, setIsFree] = useState(true);
  const [isScheduled, setIsScheduled] = useState(true);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

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

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: {errors},
  } = form;

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
          keyboardShouldPersistTaps="handled">
          <AppText
            fontSize={18}
            fontWeight="700"
            color="white"
            marginBottom={16}>
            Create Content
          </AppText>

          <Controller
            control={control}
            name="title"
            rules={{required: 'Title is required'}}
            render={({field: {onChange, value}}) => (
              <AppInput
                placeholder="Title *"
                value={value}
                onChangeText={onChange}
                style={styles.input}
              />
            )}
          />
          {errors.title && (
            <AppText fontSize={12} color={Colors.ERROR} marginBottom={8}>
              {errors.title.message}
            </AppText>
          )}

          <Controller
            control={control}
            name="description"
            render={({field: {onChange, value}}) => (
              <AppInput
                placeholder="Description"
                value={value}
                onChangeText={onChange}
                multiline
                numberOfLines={4}
                style={[styles.input, {height: 100, textAlignVertical: 'top'}]}
              />
            )}
          />

          <Controller
            control={control}
            name="category"
            render={({field: {onChange, value}}) => {
              const selected = useMemo(
                () => options.find(opt => opt.value === value),
                [value, options],
              );
              return (
                <BottomSheetSelect
                  options={options}
                  selectedLabel={selected?.label}
                  onSelect={item => onChange(item.value)}
                />
              );
            }}
          />

          <Controller
            control={control}
            name="price"
            render={({field: {onChange, value}}) => (
              <AppInput
                placeholder="Price"
                value={value}
                onChangeText={onChange}
                editable={!isFree}
                keyboardType="numeric"
                style={[styles.input, isFree && {opacity: 0.4}]}
              />
            )}
          />

          <AppTouchable
            onPress={() => setIsFree(p => !p)}
            style={styles.checkBoxContainer}>
            {isFree ? <CheckBox /> : <CheckBoxOutline />}
            <AppText marginLeft={8} color="white">
              This content is available for free
            </AppText>
          </AppTouchable>

          <AppTouchable
            onPress={() => setIsScheduled(p => !p)}
            style={styles.checkBoxContainer}>
            {isScheduled ? <CheckBox /> : <CheckBoxOutline />}
            <AppText marginLeft={8} color="white">
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
                    color="white"
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
                    color="white"
                    marginTop={4}>
                    {dayjs(watch('time')).format('h:mm A')}
                  </AppText>
                  <Clock />
                </View>
              </AppTouchable>
            </View>
          )}

          <AppTouchable style={styles.previewBox} onPress={() => {}}>
            <AppText color={Colors.PLACEHOLDER}>Add video preview</AppText>
          </AppTouchable>

          <AppButton title="Continue" onPress={handleSubmit(onSubmit)} />
        </ScrollView>

        {/* Date pickers */}
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
  input: {
    backgroundColor: Colors.Nero_1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: Platform.OS === 'ios' ? 14 : 10,
    color: Colors.WHITE,
    marginBottom: 12,
  },
  dropdown: {
    backgroundColor: Colors.WHITE_TRANSPARENT_1,
    borderRadius: 8,
    padding: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
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
