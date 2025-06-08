import React, {memo} from 'react';
import {BarIcon, KlippedIcon, WalletIcon} from '~/assets/svgs';
import {
  AppButton,
  HStack,
  InviteFriendsCard,
  UserIdentityHeader,
  VStack,
} from '~/components';
import {useSocial_GetUserQuery} from '~/graphql/generated';
import {userDataStore} from '~/stores';
import {Colors} from '~/styles';
import {scale, width} from '~/utils/style';

const HeaderProfile = () => {
  const userData = userDataStore(state => state?.userData);

  const {data} = useSocial_GetUserQuery(
    {otherId: userData?.id as number},
    {
      enabled: !!userData?.id,
    },
  );
  const user = data?.social_getUser?.result;

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

      <UserIdentityHeader user={user} />

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
