import React, {memo, useMemo, useState} from 'react';
import {StyleSheet} from 'react-native';
import {
  AppButton,
  AppFlatList,
  AppImage,
  AppLink,
  AppText,
  HStack,
  VStack,
} from '~/components';
import {
  useInfiniteUser_GetCastersToFollowQuery,
  useSocial_FollowUserMutation,
  useSocial_UnfollowMutation,
} from '~/graphql/generated';
import {Colors} from '~/styles';
import {fontFamily, fontSize} from '~/utils/style';
import {showErrorMessage} from '~/utils/utils';

type UserType = {
  photoUrl?: string;
  username?: string;
  bio?: string;
  id: number;
};

export default function PeopleYouMayKnow() {
  const {data: getUsers, isLoading: isLoadingGetUsers} =
    useInfiniteUser_GetCastersToFollowQuery();

  const users = useMemo(() => {
    return getUsers?.pages
      ?.map(a => a?.user_getCastersToFollow?.result?.items)
      .flat();
  }, [getUsers]);

  function seeMoreOnPress() {}

  if (!isLoadingGetUsers) {
    return (
      <VStack space={20}>
        <HStack space={8} px={16}>
          <AppText flex={1} fontSize={fontSize.large} fontFamily="medium">
            People who may you know
          </AppText>
          <AppLink
            text="See more"
            underline={false}
            fontSize={fontSize.small}
            onPress={seeMoreOnPress}
            color={Colors.VeryLightGrey}
          />
        </HStack>
        <AppFlatList
          horizontal
          data={users || []}
          keyExtractor={item => item?.id}
          renderItem={({item}) => <UserCard user={item} />}
          spaceX={16}
          contentContainerStyle={styles.contentContainerStyle}
        />
      </VStack>
    );
  }

  return null;
}

const UserCard = memo(({user}: {user: UserType}) => {
  return (
    <VStack
      py={24}
      px={24}
      w={238}
      space={12}
      rounded={12}
      alignItems="center"
      bg={Colors.SEMI_BLACK}>
      <AppImage imageSource={user?.photoUrl} style={styles.avatar} />
      <AppText fontFamily="medium">{user?.username}</AppText>
      <AppText
        flex={1}
        lineHeight={22}
        numberOfLines={2}
        textAlign="center"
        color={Colors.WHITE_TRANSPARENT_4}>
        {user?.bio}
      </AppText>
      <FollowButton userId={user?.id} />
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
      outline={isFollow ? true : false}
      font_family={fontFamily.medium}
      onPress={followHandler}
    />
  );
}

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
