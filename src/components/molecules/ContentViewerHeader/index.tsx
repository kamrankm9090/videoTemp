import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import {Close2, LiveIcon, MoreIcon} from '~/assets/svgs';
import {AppImage, AppText, AppTouchable, Center, HStack} from '~/components';
import {
  useSocial_FollowUserMutation,
  useSocial_UnfollowMutation,
} from '~/graphql/generated';
import {goBack} from '~/navigation/methods';
import {Colors} from '~/styles';
import {fontSize} from '~/utils/style';
import {showErrorMessage} from '~/utils/utils';

const ContentViewerHeader = ({user, isFollowed, viewCount}: {user:any , isFollowed: boolean, viewCount:number }) => {
  return (
    <HStack space={8} mx={16} mt={12}>
      <AppTouchable
        bg={Colors.BLACK_TRANSPARENT_4}
        p={16}
        borderRadius={12}
        onPress={() => goBack()}>
        <Close2 fill={Colors.WHITE} />
      </AppTouchable>

      <HStack flex={1} p={8} rounded={12} bg={Colors.BLACK_TRANSPARENT_4}>
        <HStack space={6} flex={1}>
          <AppImage
            imageSource={{
              uri: user?.photoUrl,
            }}
            style={styles.image}
          />
          <AppText
            numberOfLines={1}
            width={80}
            fontSize={fontSize.small}
            fontFamily="medium">
            {user?.fullName || user?.username}
          </AppText>

          <FollowButton userId={user?.id} isFollowed={isFollowed}/>
        </HStack>

        <HStack space={8}>
          <HStack space={4}>
            <AppText
              fontSize={fontSize.small}
              fontWeight="600"
              color={Colors.WHITE}>
              0
            </AppText>
            <Center w={18} h={18} rounded={9} bg={Colors.PRIMARY}>
              <LiveIcon />
            </Center>
          </HStack>
          <AppTouchable>
            <MoreIcon fill={Colors.WHITE} />
          </AppTouchable>
        </HStack>
      </HStack>
    </HStack>
  );
};

export default ContentViewerHeader;

function FollowButton({userId,isFollowed}: {userId: number,isFollowed:boolean}) {
  const [isFollow, setIsFollow] = useState<boolean>(isFollowed || false);

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
    <AppTouchable
      py={4}
      px={10}
      borderRadius={4}
      bg={Colors.BLACK_TRANSPARENT_4} onPress={followHandler}>
      <AppText fontSize={fontSize.small} fontFamily="medium" borderRadius={8}>
        {isFollow ? 'Following' : 'Follow'}
      </AppText>
    </AppTouchable>
  );
}
const styles = StyleSheet.create({
  image: {
    width: 28,
    height: 28,
    borderRadius: 14,
  },
});
