import React, {useMemo, useState, useCallback} from 'react';
import {FlatList} from 'react-native';
import {
  AppContainer,
  AppFlatList,
  AppText,
  AppTouchable,
  CategorySelector,
  HomeHeader,
  HStack,
  InviteFriendsCard,
  StreamItem,
  TrendingItem,
  UserCardItem,
  VStack,
} from '~/components';
import {
  useInfiniteUser_GetCastersToFollowQuery,
  useLive_GetLiveStreamsQuery,
  useLive_GetNewLivesQuery,
  useLive_GetRecommendedLivesQuery,
  useLive_GetTrendingLivesQuery,
} from '~/graphql/generated';
import {Colors} from '~/styles';

interface SectionData {
  id: string;
  title: string;
  renderItem: ({item, index}: {item: any; index: number}) => React.ReactElement | null;
  data: Array<any>;
}

const OffersScreen: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('');

  const {data: getUsers} = useInfiniteUser_GetCastersToFollowQuery({});
  const {data: getLiveStreams} = useLive_GetLiveStreamsQuery(
    selectedCategory
      ? {
          where: {
            live: {
              category: {
                eq: selectedCategory,
              },
            },
          },
        }
      : {},
  );

  const {data: getRecommendedLives} = useLive_GetRecommendedLivesQuery({
    where: {
      live: {
        category: {
          eq: selectedCategory || null,
        },
      },
    },
  });

  const {data: getTrendingLives} = useLive_GetTrendingLivesQuery({
    where: {
      live: {
        category: {
          eq: selectedCategory || null,
        },
      },
    },
  });

  const {data: getNewLives} = useLive_GetNewLivesQuery({
    where: {
      live: {
        category: {
          eq: selectedCategory || null,
        },
      },
    },
  });

  const users = useMemo(() => {
    return getUsers?.pages
      ?.map(page => page?.user_getCastersToFollow?.result?.items || [])
      .flat();
  }, [getUsers]);

  const live_streams = getLiveStreams?.live_getLiveStreams?.result?.items || [];
  const recommended_lives = getRecommendedLives?.live_getRecommendedLives?.result?.items || [];
  const trending_lives = getTrendingLives?.live_getTrendingLives?.result?.items || [];
  const new_lives = getNewLives?.live_getNewLives?.result?.items || [];

  // Memoize renderItem functions once
  const renderTrendingItem = useCallback(({item}:any) => <TrendingItem item={item} />, []);
  const renderStreamItem = useCallback(({item}:any) => <StreamItem item={item} />, []);
  const renderUserItem = useCallback(({item}:any) => <UserCardItem user={item} />, []);
  const renderInviteCard = useCallback(() => <InviteFriendsCard />, []);

  const sections: SectionData[] = useMemo(
    () => [
      {
        id: '4',
        title: 'Live streams',
        renderItem: renderTrendingItem,
        data: live_streams || [],
      },
      {
        id: '1',
        title: 'Recommended',
        renderItem: renderStreamItem,
        data: recommended_lives || [],
      },
      {
        id: '2',
        title: 'Trending',
        renderItem: renderTrendingItem,
        data: trending_lives || [],
      },
      {
        id: '3',
        title: 'People who may you know',
        renderItem: renderUserItem,
        data: users || [],
      },
      {
        id: '5',
        title: '',
        renderItem: renderInviteCard,
        data: [1],
      },
      {
        id: '6',
        title: 'New Live',
        renderItem: renderStreamItem,
        data: new_lives || [],
      },
    ],
    [
      live_streams,
      recommended_lives,
      trending_lives,
      new_lives,
      users,
      renderStreamItem,
      renderTrendingItem,
      renderUserItem,
      renderInviteCard,
    ],
  );

  const SectionRenderItem = useCallback(({item}: {item: SectionData}) => {
    if (!item.data?.length) return null;
    return (
      <VStack>
        {item.title && (
          <HStack justifyContent="space-between" mb={16}>
            <AppText fontSize={18} fontWeight={'600'}>
              {item.title}
            </AppText>
            {item.data.length > 4 && (
              <AppTouchable onPress={() => {}}>
                <AppText color={Colors.GARY_3}>See more</AppText>
              </AppTouchable>
            )}
          </HStack>
        )}
        <FlatList
          keyExtractor={(_, index) => index.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          data={item.data}
          renderItem={item.renderItem}
        />
      </VStack>
    );
  }, []);

  return (
    <AppContainer>
      <HomeHeader />
      <AppFlatList
        keyExtractor={_i => _i?.id}
        showsVerticalScrollIndicator={false}
        data={sections}
        contentContainerStyle={{gap: 16, margin: 10}}
        ListHeaderComponent={
          <CategorySelector
            selected={selectedCategory}
            setSelected={setSelectedCategory}
          />
        }
        renderItem={({item}) => <SectionRenderItem item={item} />}
        ListFooterComponent={<VStack style={{height: 60}} />}
      />
    </AppContainer>
  );
};

export default OffersScreen;
