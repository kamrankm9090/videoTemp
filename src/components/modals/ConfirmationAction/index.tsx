import React from 'react';
import {StyleSheet} from 'react-native';
import {SheetProps} from 'react-native-actions-sheet';
import {
  ActionSheetContainer,
  AppButton,
  AppText,
  HStack,
  ModalHeader,
  VStack,
} from '~/components';
import {Colors} from '~/styles';
import {fontWeight} from '~/utils/style';

export default function ConfirmationAction(
  props: SheetProps<'confirmation-action'>,
) {
  const {
    title,
    description,
    onClose = () => {},
    onConfirm = () => {},
    negativeText = 'Cancel',
    positiveText = 'Confirm',
    positiveColor = Colors.ERROR,
    positiveBorderColor = Colors.ERROR,
    positiveBorderWidth = 1,
    positiveOutline = true,
    negativeColor = Colors.WHITE,
    negativeBorderColor = Colors.NIGHT_RIDER,
    negativeBorderWidth = 1,
    negativeOutline = true,
    negativeBackgroundColor = Colors.Nero_4,
    positiveBackgroundColor = Colors.Nero_4,
  } = props?.payload ?? {};

  return (
    <ActionSheetContainer
      contentContainerStyle={styles.contentContainerStyle}
      backgroundColor={Colors.Nero_3}>
      <ModalHeader title={title} onClose={onClose} />
      <VStack mt={24} space={24}>
        <AppText lineHeight={24} marginHorizontal={36} textAlign="center">
          {description}
        </AppText>
        <HStack space={20}>
          <AppButton
            onPress={onClose}
            color={negativeColor}
            borderColor={negativeBorderColor}
            borderWidth={negativeBorderWidth}
            outline={negativeOutline}
            flex={1}
            title={negativeText}
            backgroundColor={negativeBackgroundColor}
            font_weight={fontWeight.bold}
          />
          <AppButton
            onPress={onConfirm}
            color={positiveColor}
            borderColor={positiveBorderColor}
            borderWidth={positiveBorderWidth}
            outline={positiveOutline}
            flex={1}
            title={positiveText}
            backgroundColor={positiveBackgroundColor}
            font_weight={fontWeight.bold}
          />
        </HStack>
      </VStack>
    </ActionSheetContainer>
  );
}

const styles = StyleSheet.create({
  contentContainerStyle: {
    backgroundColor: Colors.Nero_3,
  },
});
