import {yupResolver} from '@hookform/resolvers/yup';
import React from 'react';
import {useForm} from 'react-hook-form';
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
import {
  useInfiniteCategory_GetCategoriesQuery,
  useUser_UpdateUserMutation,
} from '~/graphql/generated';
import {selectCategorySchema} from '~/schemas';
import {userDataStore} from '~/stores';
import {Colors} from '~/styles';
import {fontSize} from '~/utils/style';

const defaultValues = {categories: []};

export default function SelectCategoryScreen() {
  const {...methods} = useForm({
    resolver: yupResolver(selectCategorySchema),
    defaultValues,
  });

  const {handleSubmit} = methods;
  const {userData} = userDataStore(state => state);

  const {mutate: mutateUserUpdate, isLoading: isLoadingUpdateUser} =
    useUser_UpdateUserMutation();

  const {data: getCategories, isLoading: isLoadingGetCategories} =
    useInfiniteCategory_GetCategoriesQuery();
  const categories = getCategories?.pages
    ?.map(a => a?.category_getCategories?.result?.items)
    .flat();

  console.log('categories-->', categories);

  async function onSubmit(formData: typeof defaultValues) {
    const variables = {
      userId: userData?.id,
      userInput: {
        favoriteCategories: formData?.categories,
      },
    };
    mutateUserUpdate(variables, {
      onSuccess: () => {},
    });
  }

  function skipOnPress() {}

  return (
    <AppContainer
      isLoading={isLoadingGetCategories}
      barStyle="light-content"
      backgroundColor={Colors.BACKGROUND}>
      <AppKeyboardAwareScrollView>
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
              data={categories}
            />
          </AppFormProvider>
        </VStack>
        <Center p={24}>
          <AppButton
            loading={isLoadingUpdateUser}
            title="Submit"
            onPress={handleSubmit(onSubmit)}
          />
        </Center>
      </AppKeyboardAwareScrollView>
    </AppContainer>
  );
}
