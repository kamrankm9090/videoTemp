import React from 'react';
import {EditIcon} from '~/assets/svgs';
import {AppText, AppTouchable, HStack, VStack} from '~/components';
import {navigate} from '~/navigation/methods';
import {userDataStore} from '~/stores';
import {Colors} from '~/styles';

export default function YourBalanceBox({
  title = "You're balance",
  onPress,
}: {
  title?: string;
  onPress?: () => void;
}) {
  const {userData} = userDataStore(state => state);

  function onPressHandler() {
    onPress?.();
    navigate('ProfileStack', {
      screen: 'Wallet',
    });
  }

  return (
    <HStack rounded={8} bg={Colors.NERO} space={24} px={16} py={15}>
      <VStack space={16} flex={1}>
        <AppText>{title}</AppText>
        <AppText>{`$ ${userData?.wallet || 0}`}</AppText>
      </VStack>
      <AppTouchable p={4} onPress={onPressHandler}>
        <EditIcon />
      </AppTouchable>
    </HStack>
  );
}
