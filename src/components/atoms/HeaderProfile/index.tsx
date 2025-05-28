import React, {memo} from 'react';
import {BarIcon, KlippedIcon, WalletIcon} from '~/assets/svgs';
import {
  AppButton,
  HStack,
  InviteFriendsCard,
  UserIdentityHeader,
  VStack,
} from '~/components';
import {Colors} from '~/styles';
import {scale, width} from '~/utils/style';

const HeaderProfile = () => {
  return (
    <VStack w={width} pb={scale(25)} space={scale(25)} px={scale(18)}>
      <HStack justifyContent="space-between" alignItems="center">
        <KlippedIcon />
        <HStack
          space={scale(10)}
          justifyContent="space-between"
          alignItems="center">
          <WalletIcon />
          <BarIcon />
        </HStack>
      </HStack>

      <UserIdentityHeader />

      <InviteFriendsCard mx={0} />

      <AppButton
        title={'My Resume'}
        backgroundColor={Colors.Nero_4}
        outline
        borderColor={Colors.WHITE_TRANSPARENT_3}
        color={Colors.WHITE_TRANSPARENT_8}
        borderWidth={1}
        width={'100%'}
      />
    </VStack>
  );
};

export default memo(HeaderProfile);
