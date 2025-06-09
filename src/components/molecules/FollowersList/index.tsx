import React, {useCallback, useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import {AppFlatList, Empty, FollowerFollowingItem} from '~/components';
import {useGetFollowerFollowings} from '~/hooks/user';
import {userDataStore} from '~/stores';
import {scale} from '~/utils/style';

const FollowersList = () => {
  const userData = userDataStore(state => state?.userData);
  const [followers, setFollowers] = useState([]);

  const {data, isLoading, hasNextPage, fetchNextPage, refetch, isRefetching} =
    useGetFollowerFollowings({
      userId: userData?.id as number,
      where: {
        isFollower: {eq: true},
      },
      options: {
        enabled: !!userData?.id,
        refetchOnMount: 'always',
      },
      isFollower: true,
    });

  useEffect(() => {
    if (data?.pages?.length) {
      const flattened = data.pages.flat();
      setFollowers(flattened);
    }
  }, [data]);

  const removeByUserId = useCallback((userIdToRemove: number) => {
    setFollowers(prev => prev.filter(item => item.user?.id !== userIdToRemove));
  }, []);

  function onLoadMore() {
    if (hasNextPage) {
      fetchNextPage();
    }
  }

  const renderItem = useCallback(
    ({item}: any) => (
      <FollowerFollowingItem
        {...{item}}
        isFollower
        onRemovePress={removeByUserId}
      />
    ),
    [data, removeByUserId],
  );

  return (
    <AppFlatList
      style={styles.flatList}
      contentContainerStyle={styles.contentContainerStyle}
      data={followers || []}
      renderItem={renderItem}
      ListEmptyComponent={
        <Empty isLoading={isLoading} text={'You have no\nFollowers yet!'} />
      }
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
