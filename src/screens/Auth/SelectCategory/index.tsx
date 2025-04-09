import {yupResolver} from '@hookform/resolvers/yup';
import React from 'react';
import {useForm} from 'react-hook-form';
import {StyleSheet} from 'react-native';
import {
  AppButton,
  AppContainer,
  AppFormProvider,
  AppKeyboardAwareScrollView,
  AppLink,
  AppMultiSelect,
  AppText,
  Center,
  HStack,
  VStack,
} from '~/components';
import {selectCategorySchema} from '~/schemas';
import {Colors} from '~/styles';
import {fontSize} from '~/utils/style';

const data = [
  {
    id: 0,
    value: 'producer',
    title: 'Producer',
  },
  {
    id: 1,
    value: 'photographer',
    title: 'Photographer',
  },
  {
    id: 2,
    value: 'cameraOperator',
    title: 'Camera Operator',
  },
];

const defaultValues = {categories: []};

export default function SelectCategoryScreen() {
  const {...methods} = useForm({
    resolver: yupResolver(selectCategorySchema),
    defaultValues,
  });

  const {handleSubmit} = methods;

  async function onSubmit(formData: typeof defaultValues) {}

  function skipOnPress() {}

  return (
    <AppContainer barStyle="light-content" backgroundColor={Colors.BACKGROUND}>
      <AppKeyboardAwareScrollView
        contentContainerStyle={styles.contentContainerStyle}>
        <VStack p={24} space={48} flex={1}>
          <HStack space={64}>
            <AppText
              flex={1}
              fontFamily="medium"
              fontSize={fontSize.tooLarge}
              color={Colors.WHITE}>
              What are your interests?
            </AppText>
            <AppLink
              text="Skip"
              color={Colors.WHITE}
              underline={false}
              onPress={skipOnPress}
            />
          </HStack>
          <AppFormProvider methods={methods}>
            <AppMultiSelect
              prompt="You can select multiple answers."
              name="categories"
              data={data}
            />
          </AppFormProvider>
        </VStack>
        <Center p={24}>
          <AppButton title="Submit" onPress={handleSubmit(onSubmit)} />
        </Center>
      </AppKeyboardAwareScrollView>
    </AppContainer>
  );
}

const styles = StyleSheet.create({
  contentContainerStyle: {
    flexGrow: 1,
  },
});
