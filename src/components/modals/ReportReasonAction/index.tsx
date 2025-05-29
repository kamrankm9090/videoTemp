import React from 'react';
import {yupResolver} from '@hookform/resolvers/yup';
import {SheetProps} from 'react-native-actions-sheet';
import {
  ActionSheetContainer,
  AppButton,
  AppFormProvider,
  AppText,
  FormInput,
  VStack,
} from '~/components';
import {Colors} from '~/styles';
import {height} from '~/utils/style';
import {useForm} from 'react-hook-form';
import {reportReasonSchema} from '~/schemas';
import {StyleSheet} from 'react-native';

const defaultValues = {reason: ''};

export default function ReportReasonAction(props: SheetProps) {
  const {...methods} = useForm({
    resolver: yupResolver(reportReasonSchema),
    defaultValues,
  });

  const {handleSubmit, register, formState} = methods;

  async function onSubmit(formData: typeof defaultValues) {}

  const loading = false;

  return (
    <ActionSheetContainer minHeight={height * 0.35}>
      <AppFormProvider methods={methods}>
        <VStack space={30} flex={1}>
          <AppText color={Colors.WhiteSmoke} fontFamily="bold">
            Report Reason
          </AppText>
          <FormInput
            textArea
            {...register('reason')}
            {...{formState}}
            placeholder={'Type your reason'}
            editable={!loading}
            containerStyle={styles.containerStyle}
          />

          <AppButton title="Send" onPress={handleSubmit(onSubmit)} />
        </VStack>
      </AppFormProvider>
    </ActionSheetContainer>
  );
}

const styles = StyleSheet.create({
  containerStyle: {
    backgroundColor: Colors.Nero,
    borderWidth: 1,
    borderRadius: 8,
    padding: 8,
  },
});
