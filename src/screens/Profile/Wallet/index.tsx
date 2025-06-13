import React, {useCallback, useMemo} from 'react';
import {SafeAreaView} from 'react-native';
import {
  AppContainer,
  AppHeader,
  Box,
  Empty,
  HeaderWallet,
  PurchaseItem,
  Tabs,
  TabsFlatList,
} from '~/components';
import {TabRoute} from '~/components/molecules/CollapsibleTabView';
import TabsFlatlist from '~/components/molecules/CollapsibleTabView/TabsFlatList';
import {SortEnumType} from '~/graphql/generated';
import {useGetLives} from '~/hooks/live';
import {Colors} from '~/styles';
import {scale} from '~/utils/style';

const routes: TabRoute[] = [
  {key: 'purchase_content', title: 'Purchase content'},
  {key: 'earn_money', title: 'Earn money'},
];

const commonOptionsList = {
  windowSize: 5,
  initialNumToRender: 4,
  maxToRenderPerBatch: 5,

  contentContainerStyle: {
    paddingBottom: scale(30),
    paddingHorizontal: scale(15),
  },
  ItemSeparatorComponent: () => <Box h={scale(20)} />,
  ListEmptyComponent: () => (
    <Empty h={null} text={'You have no\nPurchase yet!'} />
  ),
};

const WalletScreen = () => {
  const {
    data: getLivesContent,
    isLoading: isLoadingGetLivesContent,
    hasNextPage: hasNextPageLivesContent,
    fetchNextPage: fetchNextPageLivesContent,
    refetch: refetchGetLivesContent,
    isRefetching: isRefetchingGetLivesContent,
  } = useGetLives({
    order: {live: {createdDate: SortEnumType.Desc}},
  });

  const livesContent = useMemo(() => {
    return getLivesContent?.pages || [];
  }, [getLivesContent]);

  const {
    data: getLivesOffer,
    isLoading: isLoadingGetLivesOffer,
    hasNextPage: hasNextPageLivesOffer,
    fetchNextPage: fetchNextPageLivesOffer,
    refetch: refetchGetLivesOffer,
    isRefetching: isRefetchingGetLivesOffer,
  } = useGetLives({
    order: {live: {createdDate: SortEnumType.Desc}},
  });

  const livesOffer = useMemo(() => {
    return getLivesOffer?.pages || [];
  }, [getLivesOffer]);

  function onLoadMore() {
    if (hasNextPageLivesContent) {
      fetchNextPageLivesContent();
    }
  }

  function onLoadMoreOffer() {
    if (hasNextPageLivesOffer) {
      fetchNextPageLivesOffer();
    }
  }

  const renderItem = useCallback(({item, index}) => {
    return <PurchaseItem {...{item, index}} />;
  }, []);

  const renderHeader = useCallback(() => {
    return <HeaderWallet />;
  }, []);

  const keyExtractor = useCallback((_, index) => index.toString(), []);

  return (
    <AppContainer>
      <Tabs routes={routes} renderHeader={renderHeader}>
        <TabsFlatlist
          key="purchase_content"
          data={['', '', '']}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          onEndReached={onLoadMore}
          refreshing={isRefetchingGetLivesContent}
          onRefresh={refetchGetLivesContent}
          {...commonOptionsList}
        />
        <TabsFlatList
          key="earn_money"
          data={['', '', '']}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          onEndReached={onLoadMoreOffer}
          refreshing={isRefetchingGetLivesOffer}
          onRefresh={refetchGetLivesOffer}
          {...commonOptionsList}
        />
      </Tabs>
    </AppContainer>
  );
};

export default WalletScreen;
