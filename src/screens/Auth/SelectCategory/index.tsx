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
import {showErrorMessage} from '~/utils/utils';

const defaultValues = {categories: []};

export default function SelectCategoryScreen() {
  const {...methods} = useForm({
    resolver: yupResolver(selectCategorySchema),
    defaultValues,
  });

  const {handleSubmit} = methods;
  const {setIsUserLoggedIn} = userDataStore(state => state);

  const {mutate: mutateUserUpdate, isLoading: isLoadingUpdateUser} =
    useUser_UpdateUserMutation();

  const {data: getCategories, isLoading: isLoadingGetCategories} =
    useInfiniteCategory_GetCategoriesQuery();
  const categories = getCategories?.pages
    ?.map(a => a?.category_getCategories?.result?.items)
    .flat();

  async function onSubmit(formData: typeof defaultValues) {
    const variables = {
      userId: null,
      userInput: {
        favoriteCategories: formData?.categories?.join(','),
      },
    };
    mutateUserUpdate(variables, {
      onSuccess: response => {
        if (response?.user_updateUser?.status?.code === 1) {
          setIsUserLoggedIn(true);
        } else {
          showErrorMessage(response?.user_updateUser?.status?.description);
        }
      },
    });
  }

  function skipOnPress() {
    setIsUserLoggedIn(true);
  }

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
              valueKey="title"
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
