import React from 'react';
import {StyleSheet} from 'react-native';
import {ChevronBack, GroupUsersIcon, LockIcon} from '~/assets/svgs';
import {AppImage, AppText, AppTouchable, HStack, VStack} from '~/components';
import {queryClient} from '~/components/atoms/QueryClientProvider';
import {useCommunity_CreateRequestMutation} from '~/graphql/generated';
import {navigate} from '~/navigation/methods';
import {userDataStore} from '~/stores';
import {Colors} from '~/styles';

const CommunityItem = ({item, isMyComm}: any) => {
  const userData = userDataStore(state => state?.userData);

  const isOwner = item?.creator?.id === userData?.id;
  const isRequester =
    item?.requests?.filter((i: any) => i?.userId === userData?.id)?.length > 0;

  const infoItem = [
    {
      title: item?.userCount,
      icon: <GroupUsersIcon />,
    },
    ...(item?.communityType === 'PRIVATE'
      ? [
          {
            title: 'private',
            icon: <LockIcon />,
          },
        ]
      : []),
  ];

  const {mutate, isLoading} = useCommunity_CreateRequestMutation();
  const createRequest = () => {
    mutate(
      {communityId: item?.id},
      {
        onSuccess(data, variables, context) {
          queryClient.refetchQueries(['community_getCommunities.infinite']);
        },
      },
    );
  };
  const ownerButtons = [
    {
      title: 'See more',
      color: Colors.NIGHT_RIDER,
      colorText: Colors.WHITE,
      disabled: false,
      onPress: () =>
        navigate('CommunityStack', {screen: 'CommunityInfo', params: {item}}),
    },
    {
      title: `Requesters ${item?.requestCount > 0 ? item?.requestCount : ''}`,
      color: Colors.PRIMARY,
      colorText: Colors.WHITE,
      disabled: false,
      onPress: () =>
        navigate('CommunityStack', {screen: 'Requesters', params: {item}}),
    },
  ];
  const othersButtons = [
    {
      title: isLoading
        ? 'Sending request...'
        : item?.communityType === 'PRIVATE'
        ? 'Request to join'
        : 'Join community',
      color: isRequester ? Colors.NIGHT_RIDER + '80' : Colors?.NIGHT_RIDER,
      colorText: isRequester ? Colors.GARY_3 : Colors.WHITE,
      disabled: isRequester,
      onPress: () => createRequest(),
    },
  ];
  return (
    <AppTouchable
      bg={Colors.Nero}
      p={16}
      gap={16}
      borderRadius={8}
      onPress={() =>
        navigate('CommunityStack', {
          screen: 'CommunityDetail',
          params: {...item},
        })
      }>
      <HStack gap={8}>
        <AppImage style={styles.imageStyle} imageSource={item?.photoUrl} />
        <HStack>
          <AppText fontSize={16} fontWeight={'500'}>
            {item?.title}
          </AppText>
          <ChevronBack
            width={16}
            color={'red'}
            style={{transform: [{rotate: '180deg'}]}}
          />
        </HStack>
        {isOwner && (
          <VStack bg={Colors.GARY_3} borderRadius={100} py={4} px={8}>
            <AppText fontSize={12} fontWeight={'400'}>
              Owner
            </AppText>
          </VStack>
        )}
      </HStack>
      <AppText
        fontSize={14}
        fontWeight={'400'}
        lineHeight={24}
        color={Colors.VeryLightGrey}>
        {item?.description}
      </AppText>
      <HStack justifyContent="space-between">
        {infoItem?.map(i => {
          return (
            <HStack key={i?.title} gap={4}>
              {i?.icon}
              <AppText fontSize={12} fontWeight={'400'}>
                {i?.title}
              </AppText>
            </HStack>
          );
        })}
      </HStack>
      <HStack justifyContent="space-between">
        {(isMyComm ? ownerButtons : othersButtons)?.map(i => {
          return (
            <AppTouchable
              disabled={i?.disabled}
              py={8}
              px={20}
              bg={i?.color}
              borderRadius={4}
              onPress={i?.onPress}>
              <AppText color={i?.colorText}>{i.title}</AppText>
            </AppTouchable>
          );
        })}
      </HStack>
    </AppTouchable>
  );
};

export default CommunityItem;

const styles = StyleSheet.create({
  imageStyle: {width: 32, height: 32, borderRadius: 5},
});
