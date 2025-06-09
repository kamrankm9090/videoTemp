import React, {useCallback, useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import {AppFlatList, Empty, FollowerFollowingItem} from '~/components';
import {useGetFollowerFollowings} from '~/hooks/user';
import {userDataStore} from '~/stores';
import {scale} from '~/utils/style';

const FollowingsList = () => {
  const userData = userDataStore(state => state?.userData);
  const [followings, setFollowings] = useState([]);

  const {data, hasNextPage, isLoading, fetchNextPage, refetch, isRefetching} =
    useGetFollowerFollowings({
      userId: userData?.id as number,
      where: {
        isFollower: {eq: false},
      },
      options: {
        enabled: !!userData?.id,
        refetchOnMount: 'always',
      },
      isFollower: false,
    });

  useEffect(() => {
    if (data?.pages?.length) {
      const flattened = data.pages.flat();
      setFollowings(flattened);
    }
  }, [data]);

  const removeByUserId = useCallback((userIdToRemove: number) => {
    setFollowings(prev =>
      prev.filter(item => item.user?.id !== userIdToRemove),
    );
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
        isFollower={false}
        onRemovePress={removeByUserId}
      />
    ),
    [removeByUserId, data],
  );

  return (
    <AppFlatList
      style={styles.flex1}
      contentContainerStyle={styles.contentContainerStyle}
      data={followings || []}
      spaceY={15}
      renderItem={renderItem}
      ListEmptyComponent={
        <Empty isLoading={isLoading} text={'You have no\nFollowings yet!'} />
      }
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
