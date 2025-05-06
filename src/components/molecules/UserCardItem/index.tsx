import React, {memo, useState} from 'react';
import {StyleSheet} from 'react-native';
import {AppButton, AppImage, AppText, VStack} from '~/components';
import {
  useSocial_FollowUserMutation,
  useSocial_UnfollowMutation,
} from '~/graphql/generated';
import {Colors} from '~/styles';
import {fontFamily} from '~/utils/style';
import {showErrorMessage} from '~/utils/utils';

type UserType = {
  photoUrl?: string;
  username?: string;
  bio?: string;
  id: number;
};

const UserCardItem = memo(({user}: {user: UserType}) => {
  return (
    <VStack
      py={24}
      px={24}
      w={176}
      space={12}
      rounded={12}
      mx={8}
      alignItems="center"
      bg={Colors.SEMI_BLACK}>
      <AppImage
        imageSource={user?.photoUrl ? {uri: user.photoUrl} : undefined}
        style={styles.avatar}
      />
      <AppText fontFamily="medium">{user?.username}</AppText>
      <AppText
        flex={1}
        lineHeight={22}
        numberOfLines={2}
        textAlign="center"
        color={Colors.WHITE_TRANSPARENT_4}>
        {user?.bio}
      </AppText>
      <FollowButton userId={user.id} />
    </VStack>
  );
});

function FollowButton({userId}: {userId: number}) {
  const [isFollow, setIsFollow] = useState<boolean>(false);

  const {mutate: mutateFollowUser} = useSocial_FollowUserMutation();
  const {mutate: mutateUnfollowUser} = useSocial_UnfollowMutation();

  function followHandler() {
    if (isFollow) {
      setIsFollow(false);
      mutateUnfollowUser(
        {input: {followedId: userId}},
        {
          onSuccess: response => {
            if (response?.social_unfollow?.status?.code !== 1) {
              showErrorMessage(response?.social_unfollow?.status?.description);
            }
          },
        },
      );
    } else {
      setIsFollow(true);
      mutateFollowUser(
        {input: {followedId: userId}},
        {
          onSuccess: response => {
            if (response?.social_followUser?.status?.code !== 1) {
              showErrorMessage(
                response?.social_followUser?.status?.description,
              );
            }
          },
        },
      );
    }
  }

  return (
    <AppButton
      mt={12}
      width="auto"
      height={32}
      minW={100}
      title={isFollow ? 'Unfollow' : 'Follow'}
      font_family={fontFamily.medium}
      onPress={followHandler}
    />
  );
}

export default UserCardItem;
const styles = StyleSheet.create({
  contentContainerStyle: {
    paddingHorizontal: 16,
  },
  avatar: {
    width: 76,
    height: 76,
    borderRadius: 35,
  },
});
