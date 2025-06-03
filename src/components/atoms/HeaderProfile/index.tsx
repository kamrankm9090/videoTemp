import React, {memo, useState} from 'react';
import {StyleSheet} from 'react-native';
import {BarIcon, KlippedIcon, WalletIcon} from '~/assets/svgs';
import {
  AppButton,
  AppTouchable,
  HStack,
  InviteFriendsCard,
  ModalContainer,
  SettingActivity,
  UserIdentityHeader,
  VStack,
} from '~/components';
import {useSocial_GetUserQuery} from '~/graphql/generated';
import {userDataStore} from '~/stores';
import {Colors} from '~/styles';
import {scale, width} from '~/utils/style';
import {hideSheet, logout, showSheet} from '~/utils/utils';

const HeaderProfile = () => {
  const userData = userDataStore(state => state?.userData);
  const [activitySettingModalVisible, setActivitySettingModalVisible] =
    useState(false);

  const {data} = useSocial_GetUserQuery(
    {otherId: userData?.id as number},
    {
      enabled: !!userData?.id,
    },
  );

  const user = data?.social_getUser?.result;

  function oncloseModal() {
    setActivitySettingModalVisible(false);
  }

  return (
    <VStack w={width} pb={scale(25)} space={scale(25)} px={scale(18)}>
      <HStack justifyContent="space-between" alignItems="center">
        <KlippedIcon />
        <HStack
          space={scale(10)}
          justifyContent="space-between"
          alignItems="center">
          <WalletIcon />
          <AppTouchable onPress={() => setActivitySettingModalVisible(true)}>
            <BarIcon />
          </AppTouchable>
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
      <ModalContainer
        style={styles.main}
        animationIn={'slideInRight'}
        animationOut={'slideOutRight'}
        isVisible={activitySettingModalVisible}
        backdropOpacity={1}
        onDismiss={oncloseModal}>
        <SettingActivity onclosePress={oncloseModal} />
      </ModalContainer>
    </VStack>
  );
};

export default memo(HeaderProfile);

const styles = StyleSheet.create({
  main: {
    flexGrow: 1,
    width: width,
    zIndex: 12,
  },
});
