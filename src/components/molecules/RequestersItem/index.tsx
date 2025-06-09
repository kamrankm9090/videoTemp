import React from 'react';
import {StyleSheet} from 'react-native';
import {AppImage, AppText, AppTouchable, HStack, VStack} from '~/components';
import {queryClient} from '~/components/atoms/QueryClientProvider';
import {
  useCommunity_AcceptRequestMutation,
  useCommunity_RejectRequestMutation,
} from '~/graphql/generated';
import {Colors} from '~/styles';

const RequestersItem = ({item}: any) => {
  const {mutate: acceptMutate} = useCommunity_AcceptRequestMutation();
  const {mutate: rejectMutate} = useCommunity_RejectRequestMutation();
  const acceptRequest = () => {
    acceptMutate(
      {requestId: item?.id},
      {
        onSuccess(data, variables, context) {
          console.log(data);
          queryClient.refetchQueries(['']);
        },
      },
    );
  };
  const rejectRequest = () => {
    rejectMutate(
      {requestId: item?.id},
      {
        onSuccess(data, variables, context) {
          console.log(data);
          queryClient.refetchQueries(['']);
        },
      },
    );
  };
  return (
    <HStack h={60} justifyContent="space-between">
      <HStack gap={8}>
        <AppImage
          imageSource={{uri: ''}}
          style={{width: 42, height: 42, borderRadius: 100}}
        />
        <VStack>
          <AppText fontSize={14} fontWeight={'600'}>
            Liam Clarke
          </AppText>
          <AppText fontSize={13} fontWeight={'400'} color={Colors.GARY_3}>
            Actor
          </AppText>
        </VStack>
      </HStack>
      <HStack gap={16}>
        <AppTouchable onPress={() => rejectRequest()}>
          <AppText color={Colors.DarkGray}>Decline</AppText>
        </AppTouchable>
        <AppTouchable
          bg={Colors.NIGHT_RIDER}
          p={8}
          borderRadius={5}
          onPress={() => acceptRequest()}>
          <AppText>Confirm</AppText>
        </AppTouchable>
      </HStack>
    </HStack>
  );
};

export default RequestersItem;

const styles = StyleSheet.create({});
