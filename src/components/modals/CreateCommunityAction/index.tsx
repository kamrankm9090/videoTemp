import {yupResolver} from '@hookform/resolvers/yup';
import React from 'react';
import {useForm} from 'react-hook-form';
import {StyleSheet} from 'react-native';
import * as yup from 'yup';
import {
  ActionSheetContainer,
  AppButton,
  AppDropDown,
  AppFormProvider,
  FormInput,
  ModalHeader,
  VStack,
} from '~/components';
import { queryClient } from '~/components/atoms/QueryClientProvider';
import UploadBox from '~/components/molecules/UploadBox';
import {useCommunity_CreateCommunityMutation} from '~/graphql/generated';
import {Colors} from '~/styles';
import {hideSheet} from '~/utils/utils';

const createCommunitySchema = yup.object().shape({
  title: yup.string().required('Title is required'),
  communityType: yup
    .object({
      value: yup.string().required(),
      title: yup.string(),
    })
    .required('Type is required'),
  description: yup.string().max(300),
});
export default function CreateCommunityAction() {
  const defaultValues = {
    title: '',
    communityType: {title: 'Private', value: 'PRIVATE'},
    description: '',
    photoUrl: '',
  };

  const methods = useForm({
    defaultValues,
    resolver: yupResolver(createCommunitySchema),
  });

  const {handleSubmit, watch, formState} = methods;

  const {mutate, isLoading} = useCommunity_CreateCommunityMutation();
  const onSubmit = (data: any) => {
    console.log('Create Community:', data);
    const input = {
      ...data,

      communityType: data?.communityType?.value,
    };
    mutate(
      {input},
      {
        onSettled(data, error, variables, context) {
          queryClient.refetchQueries(["community_getCommunities.infinite"])
          hideSheet("create-community-action")
        },
      },
    );
  };
  return (
    <ActionSheetContainer
      contentContainerStyle={styles.contentContainerStyle}
      backgroundColor={Colors.Nero_3}>
      <ModalHeader
        title={'Create Community'}
        onClose={() => hideSheet('create-community-action')}
      />
      <AppFormProvider methods={methods}>
        <VStack space={16} mb={24} mt={16}>
          <FormInput
            name="title"
            containerStyle={styles.InputContainer}
            placeholder="Title"
            mandatory
            {...{formState}}
          />
          <AppDropDown
            name="communityType"
            placeholder="Select Type"
            label="Type"
            backgroundColor={Colors.Nero_3}
            data={[
              {title: 'Private', value: 'PRIVATE'},
              {title: 'Public', value: 'PUBLIC'},
            ]}
            mandetory={true}
            {...{formState}}
          />
          <UploadBox name="photoUrl" label="Add photo" />
          <FormInput
            textArea
            containerStyle={styles.InputContainer}
            name="description"
            placeholder="Description"
            maxLength={300}
            {...{formState}}
          />
          <AppButton
            loading={isLoading}
            title="Create"
            disabled={!formState.isValid}
            onPress={handleSubmit(onSubmit)}
          />
        </VStack>
      </AppFormProvider>
    </ActionSheetContainer>
  );
}

const styles = StyleSheet.create({
  InputContainer: {
    height: 48,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.GARY_2,
    paddingHorizontal: 12,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.Nero_3,
  },
  contentContainerStyle: {
    backgroundColor: Colors.Nero_3,
  },
});
