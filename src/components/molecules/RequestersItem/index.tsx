import React, {useState} from 'react';
import {ActivityIndicator, StyleSheet} from 'react-native';
import {Close2} from '~/assets/svgs';
import {AppImage, AppText, AppTouchable, HStack, VStack} from '~/components';
import {queryClient} from '~/components/atoms/QueryClientProvider';
import {
  useCommunity_AcceptRequestMutation,
  useCommunity_RejectRequestMutation,
} from '~/graphql/generated';
import {Colors} from '~/styles';

const RequestersItem = ({item}: any) => {
  const [accepted, setAceepted] = useState(false);
  const {mutate: acceptMutate, isLoading: isLoadingAccept} =
    useCommunity_AcceptRequestMutation();
  const {mutate: rejectMutate, isLoading: isLoadingReject} =
    useCommunity_RejectRequestMutation();
  const acceptRequest = () => {
    acceptMutate(
      {requestId: item?.id},
      {
        onSuccess(data, variables, context) {
          if (data?.community_acceptRequest?.code === 1) {
            setAceepted(true);
          }
          queryClient.refetchQueries(['community_getCommunities.infinite']);
        },
      },
    );
  };
  const rejectRequest = () => {
    rejectMutate(
      {requestId: item?.id},
      {
        onSuccess(data, variables, context) {
          setAceepted(true);
          queryClient.refetchQueries(['community_getCommunities.infinite']);
        },
      },
    );
  };
  return (
    <HStack h={60} justifyContent="space-between">
      <HStack gap={8}>
        <AppImage
          imageSource={item?.user?.photoUrl}
          style={{width: 42, height: 42, borderRadius: 100}}
        />
        <VStack>
          <AppText fontSize={14} fontWeight={'600'}>
            {item?.user?.fullName}
          </AppText>
          <AppText fontSize={13} fontWeight={'400'} color={Colors.GARY_3}>
            {item?.user?.profession}
          </AppText>
        </VStack>
      </HStack>
      {accepted ? (
        <HStack />
      ) : isLoadingAccept || isLoadingReject ? (
        <ActivityIndicator />
      ) : (
        <HStack gap={16}>
          <AppTouchable
            bg={Colors.NIGHT_RIDER}
            p={8}
            borderRadius={5}
            onPress={() => acceptRequest()}>
            <AppText>Accept</AppText>
          </AppTouchable>
          <AppTouchable onPress={() => rejectRequest()}>
            <Close2 stroke={Colors.DarkGray} />
          </AppTouchable>
        </HStack>
      )}
    </HStack>
  );
};

export default RequestersItem;

const styles = StyleSheet.create({});
