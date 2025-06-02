import React, {useCallback} from 'react';
import {StyleSheet} from 'react-native';
import {
  AppFlatList,
  AppLoading,
  Empty,
  FollowerFollowingItem,
} from '~/components';
import {useGetFollowerFollowings} from '~/hooks/user';
import {userDataStore} from '~/stores';
import {scale} from '~/utils/style';

const FollowersList = () => {
  const userData = userDataStore(state => state?.userData);

  const {data, isLoading, hasNextPage, fetchNextPage, refetch, isRefetching} =
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

  const renderItem = useCallback(
    ({item}: any) => <FollowerFollowingItem {...{item}} />,
    [],
  );

  if (isLoading) {
    return <AppLoading />;
  }

  return (
    <AppFlatList
      style={styles.flatList}
      contentContainerStyle={styles.contentContainerStyle}
      data={data?.pages || []}
      renderItem={renderItem}
      ListEmptyComponent={<Empty text={'You have no\nFollowers yet!'} />}
      onEndReached={onLoadMore}
      refreshing={isRefetching}
      onRefresh={refetch}
      spaceY={15}
    />
  );
};

export default FollowersList;

const styles = StyleSheet.create({
  flatList: {flex: 1},
  contentContainerStyle: {
    paddingTop: scale(20),
    paddingBottom: scale(70),
  },
});
