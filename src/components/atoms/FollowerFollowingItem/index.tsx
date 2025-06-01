import React from 'react';
import {CloseIcon} from '~/assets/svgs/SvgComponents';
import HStack from '~/components/common/HStack';
import VStack from '~/components/common/VStack';
import {Colors} from '~/styles';
import {scale} from '~/utils/style';
import AppButton from '../AppButton';
import AppText from '../AppText';
import AppTouchable from '../AppTouchable';
import Avatar from '../Avatar';
import {hideSheet, showSheet} from '~/utils/utils';
import {UserType, useSocial_RemoveFollowerMutation} from '~/graphql/generated';

const FollowerFollowingItem = ({
  item,
}: {
  item: {
    __typename?: 'FollowerFolloweeDto';
    isFollower: boolean;
    followedByCurrentUser: boolean;
    followerOfCurrentUser: boolean;
    user?: {
      __typename?: 'User';
      username?: string | null;
      phoneNumber?: string | null;
      photoUrl?: string | null;
      fullName?: string | null;
      about?: string | null;
      userType?: UserType | null;
      displayGender?: boolean | null;
      displayContactInfo?: boolean | null;
      isVerified: boolean;
      id: number;
      email?: string | null;
    } | null;
  };
}) => {
  const {mutate: mutateRemoveFollower} = useSocial_RemoveFollowerMutation();

  function removePress() {
    showSheet('confirmation-action', {
      payload: {
        title: 'Remove follower',
        description: 'Are you sure you want to remove this user?',
        positiveText: 'Remove',
        positiveBackgroundColor: 'red',
        positiveColor: '#fff',
        onClose: () => hideSheet('confirmation-action'),
        onConfirm: () => {
          const input = {};
          mutateRemoveFollower(input);
          hideSheet('confirmation-action');
        },
      },
    });
  }

  return (
    <HStack px={scale(15)} justifyContent="space-between" alignItems="center">
      <Avatar
        size={scale(50)}
        uri={
          'https://letsenhance.io/static/73136da51c245e80edc6ccfe44888a99/1015f/MainBefore.jpg'
        }
      />
      <VStack
        flex={1}
        ps={scale(10)}
        h={scale(50)}
        justifyContent="space-between">
        <AppText>Liam Clarke</AppText>
        <AppText>Producer</AppText>
      </VStack>

      <HStack space={scale(5)}>
        <AppButton
          width={scale(70)}
          height={scale(32)}
          hasWidth
          title="follow"
        />
        <AppTouchable onPress={removePress}>
          <CloseIcon fill={Colors.WHITE} style={{}} />
        </AppTouchable>
      </HStack>
    </HStack>
  );
};

export default FollowerFollowingItem;
