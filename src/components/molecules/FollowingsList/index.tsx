import React, {useCallback} from 'react';
import {StyleSheet} from 'react-native';
import {AppFlatList, Empty, FollowerFollowingItem} from '~/components';
import {useGetFollowerFollowings} from '~/hooks/user';
import {userDataStore} from '~/stores';
import {scale} from '~/utils/style';

const FollowingsList = () => {
  const userData = userDataStore(state => state?.userData);

  const {data, hasNextPage, fetchNextPage, refetch, isRefetching} =
    useGetFollowerFollowings({
      userId: userData?.id as number,
      where: {
        isFollower: {eq: true},
      },
      options: {
        enabled: !!userData?.id,
      },
    });

  function onLoadMore() {
    if (hasNextPage) {
      fetchNextPage();
    }
  }

  const renderItem = useCallback(() => <FollowerFollowingItem />, []);

  return (
    <AppFlatList
      style={styles.flex1}
      contentContainerStyle={styles.contentContainerStyle}
      data={data?.pages || []}
      spaceY={15}
      renderItem={renderItem}
      ListEmptyComponent={<Empty text={'You have no\nFollowings yet!'} />}
      onEndReached={onLoadMore}
      refreshing={isRefetching}
      onRefresh={refetch}
    />
  );
};

export default FollowingsList;

const styles = StyleSheet.create({
  flex1: {flex: 1},
  contentContainerStyle: {
    paddingTop: scale(20),
    paddingBottom: scale(70),
  },
});
