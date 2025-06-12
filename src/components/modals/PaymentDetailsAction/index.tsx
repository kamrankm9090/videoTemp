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
  ModalHeader,
  VStack,
  YourBalanceBox,
} from '~/components';
import {paymentDetailsSchema} from '~/schemas';
import {Colors} from '~/styles';
import {fontSize, height} from '~/utils/style';
import {hideSheet} from '~/utils/utils';

export default function PaymentDetailsAction(
  props: SheetProps<'payment-details-action'>,
) {
  const liveId = props?.payload?.liveId;

  const defaultValues = {tip: '', requiredBalance: '25'};

  const {...methods} = useForm({
    resolver: yupResolver(paymentDetailsSchema),
    defaultValues,
  });

  const {handleSubmit, register, formState} = methods;

  async function onSubmit(formData: typeof defaultValues) {}

  function closeHandler() {
    hideSheet('payment-details-action');
  }

  return (
    <ActionSheetContainer minHeight={height * 0.25}>
      <AppFormProvider methods={methods}>
        <VStack space={20} flex={1}>
          <ModalHeader onClose={closeHandler} title="Tips" />
          <YourBalanceBox onPress={closeHandler} />
          <FormInput
            {...register('tip')}
            {...{formState}}
            placeholder={'Tip Value:'}
            containerStyle={styles.containerStyle}
            start={
              <AppText fontSize={fontSize.xNormal} color={Colors.Grey}>
                $
              </AppText>
            }
          />
          <FormInput
            editable={false}
            {...register('requiredBalance')}
            {...{formState}}
            placeholder={'Required Balance:'}
            containerStyle={styles.containerStyle}
            start={
              <AppText fontSize={fontSize.xNormal} color={Colors.Grey}>
                $
              </AppText>
            }
          />

          <AppButton title="Pay Now" onPress={handleSubmit(onSubmit)} />
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
