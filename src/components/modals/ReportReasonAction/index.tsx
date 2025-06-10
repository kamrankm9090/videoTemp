import {yupResolver} from '@hookform/resolvers/yup';
import React from 'react';
import {useForm} from 'react-hook-form';
import {StyleSheet} from 'react-native';
import {SheetProps} from 'react-native-actions-sheet';
import {
  ActionSheetContainer,
  AppButton,
  AppFormProvider,
  AppText,
  FormInput,
  VStack,
} from '~/components';
import {useReportHandler} from '~/hooks';
import {reportReasonSchema} from '~/schemas';
import {Colors} from '~/styles';
import {height} from '~/utils/style';
import {hideSheet} from '~/utils/utils';

const defaultValues = {reason: ''};

export default function ReportReasonAction(
  props: SheetProps<'report-reason-action'>,
) {
  const liveId = props?.payload?.liveId;
  const showToastInActionSheet =
    props?.payload?.showToastInActionSheet || false;

  const {...methods} = useForm({
    resolver: yupResolver(reportReasonSchema),
    defaultValues,
  });

  const {handleSubmit, register, formState} = methods;

  function onSuccessReport() {
    hideSheet('report-reason-action');
  }

  const {reportHandler, isLoading} = useReportHandler();

  async function onSubmit(formData: typeof defaultValues) {
    reportHandler({
      liveId,
      reason: formData.reason,
      onSuccess: () => onSuccessReport(),
    });
  }

  const loading = false;

  return (
    <ActionSheetContainer
      isLoading={isLoading}
      showToastInActionSheet={showToastInActionSheet}
      minHeight={height * 0.35}>
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
