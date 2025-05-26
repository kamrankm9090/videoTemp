import React from 'react';
import {AppTouchable, AppText, HStack} from '~/components';
import { LogOutIcon, SearchIcon, SearchNormalIcon, VolumeMuteIcon} from '~/assets/svgs';
import {Colors} from '~/styles';
import { navigate } from '~/navigation/methods';

const actions = [
  {label: 'Mute', icon: VolumeMuteIcon, onPress: () => console.log('Muted')},
  {label: 'Search', icon: SearchNormalIcon, onPress: () => navigate("CommunityStack", {screen:"CommunitySearch"})},
  {label: 'Leave', icon: LogOutIcon, onPress: () => console.log('Leave')},
];

export default function GroupInfoActionButtons() {
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

