import React, {useCallback, useMemo, useState} from 'react';
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
  LiveStreamItem,
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
import {navigate} from '~/navigation/methods';
import {Colors} from '~/styles';
import { width } from '~/utils/style';

interface SectionData {
  id: string;
  title: string;
  renderItem: ({
    item,
    index,
  }: {
    item: any;
    index: number;
  }) => React.ReactElement | null;
  data: Array<any>;
}

const OffersScreen: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const {data: getUsers} = useInfiniteUser_GetCastersToFollowQuery({});

  const filterCategories =
    selectedCategory === 'All'
      ? {}
      : {
          live: {
            category: {
              eq: selectedCategory,
            },
          },
        };

  const {data: getLiveStreams} = useLive_GetLiveStreamsQuery({
    where: filterCategories,
  });

  const {data: getRecommendedLives} = useLive_GetRecommendedLivesQuery({
    where: filterCategories,
  });

  const {data: getTrendingLives} = useLive_GetTrendingLivesQuery({
    where: filterCategories,
  });

  const {data: getNewLives} = useLive_GetNewLivesQuery({
    where: filterCategories,
  });

  const users = useMemo(() => {
    return getUsers?.pages
      ?.map(page => page?.user_getCastersToFollow?.result?.items || [])
      .flat();
  }, [getUsers]);

  const live_streams = getLiveStreams?.live_getLiveStreams?.result?.items || [];
  const recommended_lives =
    getRecommendedLives?.live_getRecommendedLives?.result?.items || [];
  const trending_lives =
    getTrendingLives?.live_getTrendingLives?.result?.items || [];
  const new_lives = getNewLives?.live_getNewLives?.result?.items || [];

  const renderTrendingItem = useCallback(
    ({item}: any) => <TrendingItem item={item} />,
    [],
  );
  const renderStreamItem = useCallback(
    ({item}: any) => <StreamItem item={item} />,
    [],
  );
  const renderUserItem = useCallback(
    ({item}: any) => <UserCardItem user={item} />,
    [],
  );
  const renderLiveStreamItem = useCallback(
    ({item}: any) => <LiveStreamItem item={item} />,
    [],
  );
  const renderInviteCard = useCallback(
    () => (
      <VStack w={width - 25} ml={-10}>
        <InviteFriendsCard />
      </VStack>
    ),
    [],
  );

  const sections: SectionData[] = useMemo(
    () => [
      {
        id: '4',
        title: 'Live streams',
        renderItem: renderLiveStreamItem,
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
              <AppTouchable
                onPress={() =>
                  navigate('OffersStack', {screen: 'OfferList', params: {item}})
                }>
                <AppText color={Colors.GARY_3}>See more</AppText>
              </AppTouchable>
            )}
          </HStack>
        )}
        <AppFlatList
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
