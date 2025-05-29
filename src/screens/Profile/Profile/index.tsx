import React, {useCallback, useMemo} from 'react';
import {View} from 'react-native';
import {ContentIcon, FireIcon} from '~/assets/svgs';
import {
  AppContainer,
  Box,
  ContentItem,
  HeaderProfile,
  Tabs,
  TabsFlatList,
  ProfilePlaceholder,
} from '~/components';
import Empty from '~/components/atoms/Empty';
import {TabRoute} from '~/components/molecules/CollapsibleTabView';
import TabsFlatlist from '~/components/molecules/CollapsibleTabView/TabsFlatList';
import {LiveType, SortEnumType} from '~/graphql/generated';
import {useGetLives} from '~/hooks/live';
import {userDataStore} from '~/stores';
import {scale, width} from '~/utils/style';
import {logout} from '~/utils/utils';

const routes: TabRoute[] = [
  {key: 'content', title: 'Content', icon: () => <ContentIcon />},
  {key: 'offers', title: 'Offers', icon: () => <FireIcon />},
];

const numColumns = 2;
const spacing = scale(15);
const itemWidth = (width - scale(40) - spacing) / numColumns;

const commonOptionsList = {
  numColumns,
  windowSize: 5,
  initialNumToRender: 4,
  maxToRenderPerBatch: 5,
  columnWrapperStyle: {
    justifyContent: 'space-between',
  },
  contentContainerStyle: {
    paddingBottom: scale(30),
    paddingHorizontal: scale(15),
  },
  ItemSeparatorComponent: () => <Box h={scale(10)} />,
  ListEmptyComponent: () => <Empty h={null} text={'You have no\nPosts yet!'} />,
};

export default function ProfileScreen() {
  const userData = userDataStore(state => state?.userData);

  const {
    data: getLivesContent,
    isLoading: isLoadingGetLivesContent,
    hasNextPage: hasNextPageLivesContent,
    fetchNextPage: fetchNextPageLivesContent,
    refetch: refetchGetLivesContent,
    isRefetching: isRefetchingGetLivesContent,
  } = useGetLives({
    where: {
      and: [
        {
          live: {
            and: [
              {liveType: {eq: LiveType.LiveContent}},
              {
                userId: {eq: userData?.id as number},
              },
            ],
          },
        },
      ],
    },
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
    where: {
      and: [
        {
          live: {
            and: [
              {liveType: {eq: LiveType.Promotion}},
              {
                userId: {eq: userData?.id as number},
              },
            ],
          },
        },
      ],
    },
    order: {live: {createdDate: SortEnumType.Desc}},
  });

  const livesOffer = useMemo(() => {
    return getLivesOffer?.pages || [];
  }, [getLivesOffer]);

  function logoutOnPress() {
    logout();
  }

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
    return (
      <View
        style={{
          width: itemWidth,
          marginBottom: spacing,
        }}>
        <ContentItem {...{item, index}} isOffers />
      </View>
    );
  }, []);

  const renderHeader = useCallback(() => {
    return <HeaderProfile />;
  }, []);

  const keyExtractor = useCallback((_, index) => index.toString(), []);

  return (
    <AppContainer
      isLoading={isLoadingGetLivesContent || isLoadingGetLivesOffer}
      loadingComponent={<ProfilePlaceholder />}>
      <Tabs routes={routes} renderHeader={renderHeader}>
        <TabsFlatlist
          key="content"
          data={livesContent}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          onEndReached={onLoadMore}
          refreshing={isRefetchingGetLivesContent}
          onRefresh={refetchGetLivesContent}
          {...commonOptionsList}
        />
        <TabsFlatList
          key="offers"
          data={livesOffer}
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
}
