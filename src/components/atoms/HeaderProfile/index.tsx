import React, {memo} from 'react';
import {
  ArrowLeft,
  BarIcon,
  KlippedIcon,
  ThreePoint,
  WalletIcon,
} from '~/assets/svgs';
import {
  AppButton,
  AppText,
  AppTouchable,
  HStack,
  InviteFriendsCard,
  UserIdentityHeader,
  VStack,
} from '~/components';
import {
  BlockUserInput,
  useBlockUser_BlockMutation,
  UserDto,
} from '~/graphql/generated';
import {goBack, navigate} from '~/navigation/methods';
import {Colors} from '~/styles';
import {scale, width} from '~/utils/style';
import {
  hideSheet,
  showErrorMessage,
  showSheet,
  showSuccessMessage,
  switchActions,
} from '~/utils/utils';

const HeaderProfile = ({
  userData,
  isViewer,
}: {
  userData: UserDto;
  isViewer: boolean;
}) => {
  const user = userData;

  return (
    <VStack w={width} pb={scale(25)} space={scale(25)} px={scale(18)}>
      {isViewer ? (
        <UserHeaderProfileOther userData={user} />
      ) : (
        <UserHeaderProfileCurrent />
      )}

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
        onPress={() =>
          navigate('ProfileStack', {
            screen: 'Resume',
          })
        }
      />
    </VStack>
  );
};

const UserHeaderProfileOther = ({userData}: {userData: UserDto}) => {
  const {mutate} = useBlockUser_BlockMutation();
  const accountOtherUserOptions: MoreOptionItemType[] = [
    {
      id: 0,
      title: 'Block User',
      onPress: () => {
        switchActions('confirmation-action', 'more-option-action', {
          payload: {
            title: 'Block user',
            description: 'Are you sure you want to block this user?',
            positiveText: 'Block',
            positiveBackgroundColor: 'red',
            positiveColor: '#fff',
            onClose: () => hideSheet('confirmation-action'),
            onConfirm: () => {
              const input: BlockUserInput = {
                blockedUserId: userData?.user?.id,
              };

              mutate(
                {input},
                {
                  onSuccess: response => {
                    hideSheet('confirmation-action');

                    if (response?.blockUser_block?.status?.code === 1) {
                      showSuccessMessage('Success');
                    } else {
                      showErrorMessage(
                        response?.blockUser_block?.status?.description,
                      );
                    }
                  },
                },
              );
            },
          },
        });
      },
    },
    {
      id: 1,
      title: 'Report User',
      color: Colors.ERROR,
      onPress: () => {
        hideSheet('more-option-action');
      },
    },
  ];

  function showMoreOptionsUser() {
    showSheet('more-option-action', {
      payload: {
        title: 'More Option',
        data: accountOtherUserOptions,
      },
    });
  }

  return (
    <HStack pt={scale(20)} justifyContent="space-between" alignItems="center">
      <AppTouchable onPress={goBack} hitSlop={{right: 10, bottom: 10, top: 10}}>
        <ArrowLeft />
      </AppTouchable>
      <AppText textAlign="center" flex={1}>
        Contents List
      </AppText>

      <AppTouchable
        hitSlop={{left: 10, bottom: 10, top: 10}}
        onPress={showMoreOptionsUser}>
        <ThreePoint />
      </AppTouchable>
    </HStack>
  );
};

const UserHeaderProfileCurrent = () => {
  return (
    <HStack justifyContent="space-between" alignItems="center">
      <KlippedIcon />
      <HStack
        space={scale(10)}
        justifyContent="space-between"
        alignItems="center">
        <AppTouchable
          onPress={() =>
            navigate('ProfileStack', {
              screen: 'Wallet',
            })
          }>
          <WalletIcon />
        </AppTouchable>
        <AppTouchable
          onPress={() =>
            navigate('ProfileStack', {
              screen: 'SettingsActivity',
            })
          }>
          <BarIcon />
        </AppTouchable>
      </HStack>
    </HStack>
  );
};

export default memo(HeaderProfile);
