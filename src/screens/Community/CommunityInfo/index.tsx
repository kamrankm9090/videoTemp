import {useRoute} from '@react-navigation/native';
import React from 'react';
import {StyleSheet} from 'react-native';
import {MoreIcon} from '~/assets/svgs';
import {
  AppContainer,
  AppHeader,
  AppScrollView,
  AppTouchable,
  GroupInfoActionButtons,
  GroupInfoDescription,
  GroupInfoMedia,
  GroupInfoMemberList,
  GroupInfoSection,
  queryClient,
} from '~/components';
import {useCommunity_DeleteCommunityMutation} from '~/graphql/generated';
import {navigate} from '~/navigation/methods';
import {Colors} from '~/styles';
import {hideSheet, showSheet} from '~/utils/utils';

const CommunityInfoScreen = () => {
  const route: any = useRoute();
  const item = route?.params?.item;
  const {mutate} = useCommunity_DeleteCommunityMutation();

  const deleteCommunity = () => {
    mutate(
      {communityId: item?.id},
      {
        onSuccess(data, variables, context) {
          if (data?.community_deleteCommunity?.code === 1) {
            queryClient.refetchQueries(['community_getCommunities.infinite']);
            hideSheet('more-option-action');
            navigate('Community');
          }
        },
      },
    );
  };

  const data: MoreOptionItemType[] = [
    {
      id: 0,
      title: 'Edit',
      onPress: () => {
        setTimeout(() => {
          showSheet('create-community-action', {payload: item});
        }, 500);
        hideSheet('more-option-action');
      },
    },
    {
      id: 1,
      title: 'Invite link',
      onPress: () => {
        navigate('InviteLink');
        hideSheet('more-option-action');
      },
    },
    {
      id: 2,
      title: 'Delete community',
      color: Colors.ERROR,
      onPress: deleteCommunity,
      keyLoading: 'community_deleteCommunity',
    },
  ];

  return (
    <AppContainer>
      <AppHeader
        title={'Community info'}
        backAction
        backgroundColor={Colors.BACKGROUND}
        titleColor={Colors.WHITE}
        rightHeader={
          <AppTouchable
            onPress={() =>
              showSheet('more-option-action', {
                payload: {
                  title: 'More Option',
                  data: data,
                },
              })
            }>
            <MoreIcon />
          </AppTouchable>
        }
      />
      <AppScrollView style={{padding: 20}}>
        <GroupInfoSection item={item} />
        <GroupInfoActionButtons item={item} />
        <GroupInfoDescription item={item} />
        <GroupInfoMemberList item={item} />
        <GroupInfoMedia media={item?.media} />
      </AppScrollView>
    </AppContainer>
  );
};

export default CommunityInfoScreen;

const styles = StyleSheet.create({});
