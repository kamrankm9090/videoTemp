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
} from '~/components';
import {TipInput, useTip_CreateTipMutation} from '~/graphql/generated';
import {tipSchema} from '~/schemas';
import {Colors} from '~/styles';
import {fontSize, height} from '~/utils/style';
import {hideSheet, switchActions} from '~/utils/utils';

const defaultValues = {tip: ''};

export default function TipsAction(props: SheetProps<'tips-action'>) {
  const userId = props?.payload?.userId;

  const {...methods} = useForm({
    resolver: yupResolver(tipSchema),
    defaultValues,
  });

  const {handleSubmit, register, formState} = methods;

  const {mutate: mutateCreateTip, isLoading: isLoadingCreateTip} =
    useTip_CreateTipMutation();

  async function onSubmit(formData: typeof defaultValues) {
    const input: TipInput = {
      forUserId: userId,
      value: Number(formData?.tip),
    };
    mutateCreateTip(
      {input},
      {
        onSuccess: response => {
          if (response?.tip_createTip?.status?.code === 1) {
            const tipId = response?.tip_createTip?.result?.id;
            switchActions('payment-details-action', 'tips-action', {
              payload: {tipId},
            });
          }
        },
      },
    );
  }

  function closeHandler() {
    hideSheet('tips-action');
  }

  return (
    <ActionSheetContainer minHeight={height * 0.25}>
      <AppFormProvider methods={methods}>
        <VStack space={30} flex={1}>
          <ModalHeader onClose={closeHandler} title="Tips" />
          <FormInput
            {...register('tip')}
            {...{formState}}
            placeholder={'Tip Value'}
            containerStyle={styles.containerStyle}
            start={
              <AppText fontSize={fontSize.xNormal} color={Colors.Grey}>
                $
              </AppText>
            }
          />

          <AppButton
            loading={isLoadingCreateTip}
            title="Submit"
            onPress={handleSubmit(onSubmit)}
          />
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
