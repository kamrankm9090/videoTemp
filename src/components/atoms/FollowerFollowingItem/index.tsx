import React, {useEffect, useState} from 'react';
import {CloseIcon} from '~/assets/svgs';
import {
  AppButton,
  AppText,
  AppTouchable,
  Avatar,
  HStack,
  VStack,
} from '~/components';
import {queryKeys} from '~/constants/queryKeys';
import {
  FollowerFolloweeDto,
  useSocial_FollowUserMutation,
  useSocial_RemoveFollowerMutation,
  useSocial_UnfollowMutation,
} from '~/graphql/generated';
import {Colors} from '~/styles';
import {getFullImageUrl} from '~/utils/helper';
import {scale} from '~/utils/style';
import {hideSheet, showErrorMessage, showSheet} from '~/utils/utils';
import {queryClient} from '../QueryClientProvider';

const FollowerFollowingItem = ({
  item,
  isFollower,
  onRemovePress,
}: {
  item: FollowerFolloweeDto;
  isFollower: boolean;
  onRemovePress: (userId: number) => void;
}) => {
  const userId = item?.user?.id as number;

  const [followedByCurrentUser, setFollowedByCurrentUser] = useState(
    item?.followedByCurrentUser,
  );

  useEffect(() => {
    setFollowedByCurrentUser(item?.followedByCurrentUser);
  }, [item?.followedByCurrentUser]);

  const {mutate: mutateRemoveFollower} = useSocial_RemoveFollowerMutation();
  const {mutate: mutateFollowUser} = useSocial_FollowUserMutation();
  const {mutate: mutateUnfollowUser} = useSocial_UnfollowMutation();

  function removePress() {
    if (isFollower) {
      showSheet('confirmation-action', {
        payload: {
          title: 'Remove follower',
          description: 'Are you sure you want to remove this user?',
          positiveText: 'Remove',
          positiveBackgroundColor: 'red',
          positiveColor: '#fff',
          onClose: () => hideSheet('confirmation-action'),
          onConfirm: () => {
            onRemovePress?.(userId);

            mutateRemoveFollower(
              {followerId: userId},
              {
                onSuccess: response => {
                  if (response?.social_removeFollower?.status?.code !== 1) {
                    showErrorMessage(
                      response?.social_removeFollower?.status?.description,
                    );
                  }
                },
              },
            );
            queryClient.invalidateQueries([
              'social_getUser',
              {
                exact: false,
              },
            ]);

            hideSheet('confirmation-action');
          },
        },
      });
    } else {
      showSheet('confirmation-action', {
        payload: {
          title: 'Unfollow user',
          description: 'Are you sure you want to unfollow this user?',
          positiveText: 'Unfollow',
          positiveBackgroundColor: 'red',
          positiveColor: '#fff',
          onClose: () => hideSheet('confirmation-action'),
          onConfirm: () => {
            onRemovePress?.(userId);
            hideSheet('confirmation-action');
            mutateUnfollowUser(
              {input: {followedId: userId}},
              {
                onSuccess: response => {
                  if (response?.social_unfollow?.status?.code === 1) {
                    console.log('alireza');
                    queryClient.invalidateQueries(
                      [queryKeys.getFollowerFollowings, true],
                      {
                        exact: false,
                      },
                    );
                    queryClient.invalidateQueries(['social_getUser'], {
                      exact: false,
                    });
                  }
                  if (response?.social_unfollow?.status?.code !== 1) {
                    showErrorMessage(
                      response?.social_unfollow?.status?.description,
                    );
                  }
                },
              },
            );
          },
        },
      });
    }
  }

  function followUser() {
    setFollowedByCurrentUser(true);
    mutateFollowUser(
      {input: {followedId: userId}},
      {
        onSuccess: response => {
          if (response?.social_followUser?.status?.code !== 1) {
            showErrorMessage(response?.social_followUser?.status?.description);
            setFollowedByCurrentUser(false);
          }
          if (response?.social_followUser?.status?.code === 1) {
            console.log('alireza222222');
            queryClient.invalidateQueries([
              'social_getUser',
              {
                exact: false,
              },
            ]);
            queryClient.invalidateQueries([
              queryKeys.getFollowerFollowings,
              false,
            ]);
          }
        },
        onError: () => {
          setFollowedByCurrentUser(false);
        },
      },
    );
  }

  return (
    <HStack px={scale(15)} justifyContent="space-between" alignItems="center">
      <Avatar
        size={scale(50)}
        title={item?.user?.username as string}
        uri={getFullImageUrl(item?.user?.photoUrl)}
      />
      <VStack
        flex={1}
        ps={scale(10)}
        h={scale(50)}
        justifyContent="space-between">
        <AppText>{item?.user?.username || item?.user?.fullName}</AppText>
        <AppText>{item?.user?.userType}</AppText>
      </VStack>

      <HStack space={scale(5)}>
        {!followedByCurrentUser && isFollower && (
          <AppButton
            width={scale(70)}
            height={scale(32)}
            hasWidth
            title="follow"
            onPress={followUser}
          />
        )}
        <AppTouchable onPress={removePress}>
          <CloseIcon fill={Colors.WHITE} style={{}} />
        </AppTouchable>
      </HStack>
    </HStack>
  );
};

export default FollowerFollowingItem;
