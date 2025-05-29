import React, {useCallback} from 'react';
import AppFlatList from '~/components/atoms/AppFlatList';
import Empty from '~/components/atoms/Empty';
import FollowerFollowingItem from '~/components/atoms/FollowerFollowingItem';
import Spacer from '~/components/common/Spacer';
import {scale} from '~/utils/style';

const FollowersList = () => {
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
      data={[]}
      ItemSeparatorComponent={ItemSeparatorComponent}
      renderItem={renderItem}
      ListEmptyComponent={<Empty text={'You have no\nFollowers yet!'} />}
    />
  );
};

export default FollowersList;
