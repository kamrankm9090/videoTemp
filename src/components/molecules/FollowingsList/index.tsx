import React, {useCallback} from 'react';
import AppFlatList from '~/components/atoms/AppFlatList';
import Empty from '~/components/atoms/Empty';
import FollowerFollowingItem from '~/components/atoms/FollowerFollowingItem';
import Spacer from '~/components/common/Spacer';
import {useGetFollowerFollowings} from '~/hooks/user';
import {userDataStore} from '~/stores';
import {scale} from '~/utils/style';

const FollowingsList = () => {
  const userData = userDataStore(state => state?.userData);

  const {
    data,

    hasNextPage,
    fetchNextPage,
    refetch,
    isRefetching,
  } = useGetFollowerFollowings({
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

  const ItemSeparatorComponent = useCallback(
    () => <Spacer spaceY={scale(15)} />,
    [],
  );
  return (
    <AppFlatList
      style={{flex: 1}}
      contentContainerStyle={{
        paddingTop: scale(20),
        paddingBottom: scale(70),
      }}
      data={data?.pages || []}
      ItemSeparatorComponent={ItemSeparatorComponent}
      renderItem={renderItem}
      ListEmptyComponent={<Empty text={'You have no\nFollowings yet!'} />}
      onEndReached={onLoadMore}
      refreshing={isRefetching}
      onRefresh={refetch}
    />
  );
};

export default FollowingsList;
