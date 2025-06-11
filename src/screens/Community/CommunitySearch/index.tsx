import {useRoute} from '@react-navigation/native';
import React, {useState, useEffect, useRef} from 'react';
import {StyleSheet, FlatList} from 'react-native';
import {
  AppContainer,
  AppFlatList,
  CommunityDetailItem,
  CommunitySearchHeader,
  SearchFooterStatus,
  SearchNavControls,
} from '~/components';
import {SortEnumType} from '~/graphql/generated';
import {useInfiniteCommunity_GetCommunityMessagesQuery} from '~/hooks/community/useGetCommunityMessages';
import {goBack} from '~/navigation/methods';

const CommunitySearch = () => {
  const route = useRoute();
  const item: any = route?.params;
  const [searchText, setSearchText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(1);
  const flatListRef = useRef<FlatList>(null);

  const pageSize = 100;

  const {
    data,
    hasNextPage,
    fetchNextPage,
    fetchPreviousPage,
    refetch,
    isRefetching,
    isFetchingNextPage,
    isLoading,
  } = useInfiniteCommunity_GetCommunityMessagesQuery({
    communityId: item?.id,
    where: {
      message: {
        contains: searchText,
      },
    },
    order: {
      createdDate: SortEnumType.Desc,
    },
    take: pageSize,
  });

  const searchResult =
    data?.pages?.[0]?.community_getCommunityMessages?.result?.items;
  const totalResult =
    data?.pages?.[0]?.community_getCommunityMessages?.result?.totalCount || 0;

  const renderItem = ({item, index}: any) => {
    const isCurrent = index === ( currentIndex - 1); // for inverted list
    return <CommunityDetailItem item={item} isCurrent={isCurrent} />;
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      refetch();
      setCurrentIndex(1);
    }, 300);
    return () => clearTimeout(timeout);
  }, [searchText]);

  useEffect(() => {
    if (searchResult && searchResult.length > 0 && flatListRef.current) {
      const scrollIndex = currentIndex - 1;
      if (scrollIndex >= 0 && scrollIndex < searchResult.length) {
        flatListRef.current.scrollToIndex({
          index: scrollIndex,
          animated: true,
          viewPosition: 0.5, // Center the item in view
        });
      }
    }
  }, [currentIndex, searchResult]);

  const handleNext = async () => {
    if (!isFetchingNextPage && totalResult > currentIndex) {
      try {
        await fetchNextPage();
        setCurrentIndex(prev => prev + 1);
      } catch (error) {
        console.warn('Failed to fetch next page:', error);
      }
    }
  };

  const handlePrev = async () => {
    if (!isFetchingNextPage && currentIndex > 1) {
      try {
        await fetchPreviousPage();
        setCurrentIndex(prev => prev - 1);
      } catch (error) {
        console.warn('Failed to fetch previous page:', error);
      }
    }
  };

  return (
    <AppContainer>
      <CommunitySearchHeader
        searchText={searchText}
        setSearchText={setSearchText}
        onCancel={() => goBack()}
      />

      <AppFlatList
        ref={flatListRef}
        data={searchResult || []}
        keyExtractor={(item, index) => `message-${index}`}
        contentContainerStyle={{padding: 16, paddingBottom: 80}}
        renderItem={renderItem}
        inverted
        onScrollToIndexFailed={(info) => {
          setTimeout(() => {
            flatListRef.current?.scrollToIndex({
              index: info.index,
              animated: true,
            });
          }, 500);
        }}
      />

      {searchResult && searchResult.length > 0 && (
        <>
          <SearchNavControls
            onPrev={handleNext}
            onNext={handlePrev}
            disabled={isFetchingNextPage || isRefetching}
          />
          <SearchFooterStatus
            currentIndex={currentIndex}
            totalCount={totalResult}
            onShowList={() => setSearchText('')}
          />
        </>
      )}
    </AppContainer>
  );
};

export default CommunitySearch;

const styles = StyleSheet.create({});
