import React, {useCallback} from 'react';
import AppFlatList from '~/components/atoms/AppFlatList';
import AppLoading from '~/components/atoms/AppLoading';
import Empty from '~/components/atoms/Empty';
import FollowerFollowingItem from '~/components/atoms/FollowerFollowingItem';
import Spacer from '~/components/common/Spacer';
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
    ({item, index}) => <FollowerFollowingItem {...{item}} />,
    [],
  );

  const ItemSeparatorComponent = useCallback(
    () => <Spacer spaceY={scale(15)} />,
    [],
  );

  if (isLoading) return <AppLoading />;

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
      ListEmptyComponent={<Empty text={'You have no\nFollowers yet!'} />}
      onEndReached={onLoadMore}
      refreshing={isRefetching}
      onRefresh={refetch}
    />
  );
};

export default FollowersList;
