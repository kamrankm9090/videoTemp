import React, {memo} from 'react';
import {PencilIcon} from '~/assets/svgs';
import {AppText, AppTouchable, Avatar, HStack, VStack} from '~/components';
import {UserType} from '~/graphql/generated';
import {navigate} from '~/navigation/methods';
import {Colors} from '~/styles';
import {getFullImageUrl, getOrdinalText} from '~/utils/helper';
import {fontSize, scale} from '~/utils/style';

const UserIdentityHeader = ({
  user,
}: {
  user?: {
    __typename?: 'UserDto';
    followersCount: number;
    followedCount: number;
    isFollowed: boolean;
    isFollower: boolean;
    requestSent: boolean;
    requestReceived: boolean;
    user?: {
      __typename?: 'User';
      skills?: string | null;
      username?: string | null;
      photoUrl?: string | null;
      fullName?: string | null;
      about?: string | null;
      userType?: UserType | null;
      professionalSummary?: string | null;
      education?: string | null;
    } | null;
  };
}) => {
  return (
    <VStack space={scale(15)} py={scale(0)}>
      <HStack justifyContent="space-between" alignItems="center">
        <Avatar
          size={scale(55)}
          uri={getFullImageUrl(user?.user?.photoUrl)}
          title={user?.user?.username as string}
        />
        <VStack
          justifyContent="space-between"
          h={scale(50)}
          flex={1}
          ps={scale(12)}>
          <AppText fontSize={fontSize.xMedium} fontFamily="bold">
            {user?.user?.fullName || user?.user?.username}
          </AppText>
          <AppText color={Colors.GARY_3}>
            {getOrdinalText(user?.user?.skills as string)}
          </AppText>
        </VStack>
        <AppTouchable
          onPress={() =>
            navigate('ProfileStack', {
              screen: 'EditProfile',
            })
          }>
          <PencilIcon />
        </AppTouchable>
      </HStack>
      <HStack justifyContent="space-between" alignItems="center">
        <Item title="balance" value={'$200'} onPress={() => null} />
        <Item
          title="Followers"
          value={user?.followersCount || 0}
          onPress={() =>
            navigate('ProfileStack', {
              screen: 'FollowerFollowing',
              params: {type: 'follower'},
            })
          }
        />
        <Item
          title="Following"
          value={user?.followedCount || 0}
          onPress={() =>
            navigate('ProfileStack', {
              screen: 'FollowerFollowing',
              params: {type: 'following'},
            })
          }
        />
      </HStack>
    </VStack>
  );
};

const Item = ({
  title,
  value,
  onPress,
}: {
  title: string;
  value: any;
  onPress: () => void;
}) => {
  return (
    <AppTouchable onPress={onPress}>
      <VStack alignItems="center" space={scale(5)} justifyContent="center">
        <AppText fontSize={fontSize.xMedium} fontFamily="bold">
          {value}
        </AppText>
        <AppText color={Colors.GARY_3}>{title}</AppText>
      </VStack>
    </AppTouchable>
  );
};

export default memo(UserIdentityHeader);
