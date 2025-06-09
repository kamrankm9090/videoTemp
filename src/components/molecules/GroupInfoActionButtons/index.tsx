import React from 'react';
import {LogOutIcon, SearchNormalIcon, VolumeMuteIcon} from '~/assets/svgs';
import {AppText, AppTouchable, HStack} from '~/components';
import {useCommunity_LeaveCommunityMutation} from '~/graphql/generated';
import {navigate, resetRoot} from '~/navigation/methods';
import {Colors} from '~/styles';
import {hideSheet, showSheet} from '~/utils/utils';

export default function GroupInfoActionButtons({item}: any) {
  const {mutate} = useCommunity_LeaveCommunityMutation();
  const leaveCommunity = () => {
    mutate(
      {communityId: item?.id},
      {
        onSuccess(data, variables, context) {
          navigate('Community');
          resetRoot('MainTabs');
          hideSheet('confirmation-action');
        },
      },
    );
  };

  const actions = [
    {label: 'Mute', icon: VolumeMuteIcon, onPress: () => {}},
    {
      label: 'Search',
      icon: SearchNormalIcon,
      onPress: () => navigate('CommunityStack', {screen: 'CommunitySearch'}),
    },
    {
      label: 'Leave',
      icon: LogOutIcon,
      onPress: () =>
        showSheet('confirmation-action', {
          payload: {
            title: 'Leave Community',
            description: 'Do you want to leave This community?',
            positiveText: 'Leave',
            positiveBackgroundColor: 'red',
            positiveColor: '#fff',
            onClose: () => hideSheet('confirmation-action'),
            onConfirm: () => {
              leaveCommunity();

              // showInfoMessage('Your live ended');
            },
          },
        }),
    },
  ];
  return (
    <HStack justifyContent="space-between" mt={16} mb={24}>
      {actions.map(({label, icon: Icon, onPress}) => (
        <AppTouchable
          key={label}
          w={96}
          h={80}
          borderRadius={12}
          borderColor={Colors.NIGHT_RIDER}
          borderWidth={1}
          bg={Colors.Nero_3}
          alignItems="center"
          justifyContent="center"
          onPress={onPress}
          activeOpacity={0.8}>
          <Icon width={24} height={24} stroke={Colors.PRIMARY} />
          <AppText
            marginTop={6}
            fontSize={12}
            fontWeight="500"
            color={Colors.PRIMARY}>
            {label}
          </AppText>
        </AppTouchable>
      ))}
    </HStack>
  );
}
