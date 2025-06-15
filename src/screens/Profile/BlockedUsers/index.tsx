import React, {useCallback, useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import {
  AppContainer,
  AppFlatList,
  AppHeader,
  Empty,
  UserItem,
} from '~/components';
import {
  BlockUserInput,
  SortEnumType,
  useBlockUser_UnblockMutation,
  User,
} from '~/graphql/generated';
import {useGetBlockedUsers} from '~/hooks/user';
import {navigate} from '~/navigation/methods';
import {Colors} from '~/styles';
import {scale} from '~/utils/style';

const BlockedUsersScreen = () => {
  const [blockedUsers, setBlockedUsers] = useState([]);

  const {data, isLoading, hasNextPage, fetchNextPage, refetch, isRefetching} =
    useGetBlockedUsers({
      order: {createdDate: SortEnumType.Desc},
      options: {
        refetchOnMount: 'always',
      },
    });

  const {mutate: mutateUnblock} = useBlockUser_UnblockMutation();

  useEffect(() => {
    if (data?.pages?.length) {
      const flattened = data.pages.flat();
      setBlockedUsers(flattened);
    }
  }, [data]);

  function onLoadMore() {
    if (hasNextPage) {
      fetchNextPage();
    }
  }

  const removeByUserId = useCallback(
    (id: number) => {
      setBlockedUsers(prev => prev.filter(item => item?.id !== id));
      const input: BlockUserInput = {
        blockedUserId: id,
      };
      mutateUnblock(
        {input},
        {
          onSuccess: response => {},
        },
      );
    },
    [blockedUsers],
  );

  const renderItem = useCallback(
    ({item}: {item: User}) => (
      <UserItem
        username={item?.username as string}
        displayName={item?.fullName as string}
        photoUrl={item?.photoUrl as string}
        onAction={() => removeByUserId?.(item?.id)}
        onPressItem={() =>
          navigate('ProfileStack', {
            screen: 'Profile',
            params: {userId: item?.id},
          })
        }
      />
    ),
    [blockedUsers, removeByUserId],
  );

  return (
    <AppContainer isLoading={isLoading}>
      <AppHeader
        title="Manage Blocked Users"
        titleColor={Colors.WHITE}
        backgroundColor={Colors.BACKGROUND}
        backAction
      />
      <AppFlatList
        spaceY={scale(25)}
        style={{flex: 1}}
        data={blockedUsers || []}
        renderItem={renderItem}
        contentContainerStyle={styles.contentContainerStyle}
        ListEmptyComponent={<Empty text={'You have no\nBlocked users yet!'} />}
        refreshing={isRefetching}
        onRefresh={refetch}
        onEndReached={onLoadMore}
      />
    </AppContainer>
  );
};

export default BlockedUsersScreen;

const styles = StyleSheet.create({
  contentContainerStyle: {
    paddingTop: scale(15),
    paddingBottom: scale(30),
    paddingHorizontal: scale(12),
  },
});
