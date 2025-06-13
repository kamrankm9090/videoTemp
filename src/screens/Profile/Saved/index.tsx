import React, {useCallback, useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import {
  AppContainer,
  AppFlatList,
  AppHeader,
  Empty,
  SavedItem,
} from '~/components';
import {
  SortEnumType,
  useLive_RemoveFromBookmarkMutation,
} from '~/graphql/generated';
import {useGetLives} from '~/hooks/live';
import {Colors} from '~/styles';
import {scale} from '~/utils/style';

const SavedScreen = () => {
  const [savedItems, setSavedItems] = useState([]);

  const {
    data: getLives,
    isLoading: isLoadingGetLives,
    hasNextPage: hasNextPageLives,
    fetchNextPage: fetchNextPageLives,
    refetch: refetchGetLives,
    isRefetching: isRefetchingGetLives,
  } = useGetLives({
    where: {
      isBookmark: {eq: true},
    },
    order: {live: {createdDate: SortEnumType.Desc}},
  });

  const {mutate: mutateRemoveBookmark} = useLive_RemoveFromBookmarkMutation();

  useEffect(() => {
    if (getLives?.pages?.length) {
      const flattened = getLives.pages.flat();
      setSavedItems(flattened);
    }
  }, [getLives]);

  function onLoadMore() {
    if (hasNextPageLives) {
      fetchNextPageLives();
    }
  }

  const removeByUserId = useCallback(
    (id: number) => {
      setSavedItems(prev => prev.filter(item => item?.live?.id !== id));
      const liveId = id;
      mutateRemoveBookmark({liveId});
    },
    [savedItems],
  );

  const renderItem = useCallback(
    ({item}: {item: LiveDto}) => (
      <SavedItem
        title={item?.live?.title as string}
        description={item?.live?.description as string}
        imageSource={item?.live?.photoUrl as string}
        id={item?.live?.id as number}
        onRemovePress={removeByUserId}
      />
    ),
    [savedItems, removeByUserId],
  );

  return (
    <AppContainer isLoading={isLoadingGetLives}>
      <AppHeader
        title="Saved"
        titleColor={Colors.WHITE}
        backgroundColor={Colors.BACKGROUND}
        backAction
      />
      <AppFlatList
        spaceY={scale(25)}
        style={{flex: 1}}
        data={savedItems || []}
        renderItem={renderItem}
        contentContainerStyle={styles.contentContainerStyle}
        ListEmptyComponent={<Empty text={'You have no\nSaves yet!'} />}
        refreshing={isRefetchingGetLives}
        onRefresh={refetchGetLives}
        onEndReached={onLoadMore}
      />
    </AppContainer>
  );
};

export default SavedScreen;

const styles = StyleSheet.create({
  contentContainerStyle: {
    paddingTop: scale(15),
    paddingBottom: scale(30),
  },
});
