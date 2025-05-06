import React, {useMemo, useState} from 'react';
import {FlatList, StyleSheet} from 'react-native';
import {
  AppContainer,
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
  renderItem: (item: any) => React.ReactElement | null;
  data: Array<any>;
}

const OffersScreen: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const {data: getUsers, isLoading: isLoadingGetUsers} =
    useInfiniteUser_GetCastersToFollowQuery();

  const {data: getLiveStreams, isLoading: isLoadingLiveStreams} =
    useLive_GetLiveStreamsQuery();

  const {data: getRecommendedLives, isLoading: isLoadingRecommendedLives} =
    useLive_GetRecommendedLivesQuery();

  const {data: getTrendingLives, isLoading: isLoadingTrendingLives} =
    useLive_GetTrendingLivesQuery();

  const {data: getNewLives, isLoading: isLoadingNewLives} =
    useLive_GetNewLivesQuery();

  const new_lives = useMemo(() => {
    return getNewLives?.live_getNewLives?.result?.items || [];
  }, [getNewLives]);
  const trending_lives = useMemo(() => {
    return getTrendingLives?.live_getTrendingLives?.result?.items || [];
  }, [getTrendingLives]);

  const recommended_lives = useMemo(() => {
    return getRecommendedLives?.live_getRecommendedLives?.result?.items || [];
  }, [getRecommendedLives]);
  const live_streams = useMemo(() => {
    return getLiveStreams?.live_getLiveStreams?.result?.items || [];
  }, [getLiveStreams]);

  const users = useMemo(() => {
    return getUsers?.pages
      ?.map(a => a?.user_getCastersToFollow?.result?.items)
      .flat();
  }, [getUsers]);

  const sections: SectionData[] = [
    {
      id: '1',
      title: 'Recommended',
      renderItem: ({item, index}) => {
        return (
          <StreamItem
            category={item?.live?.category}
            title={item?.live?.title}
            description={item?.live?.description}
            viewers={item?.live?.viewCount}
            imageUrl={item?.live?.photoUrl}
            profileImageUrl={item?.live?.user?.photoUrl}
            live={item?.live}
            recordEnded={item?.recordEnded}
          />
        );
      },
      data: recommended_lives,
    },
    {
      id: '2',
      title: 'Trending',
      renderItem: ({item, index}) => {
        return (
          <TrendingItem
            category={item?.live?.category}
            title={item?.live?.title}
            viewers={item?.live?.viewCount}
            imageUrl={item?.live?.photoUrl}
          />
        );
      },
      data: trending_lives,
    },
    {
      id: '3',
      title: 'People who may you know',
      renderItem: ({item, index}) => {
        return <UserCardItem user={item} />;
      },
      data: users ? users : [],
    },
    {
      id: '4',
      title: 'Live streams',
      renderItem: ({item, index}) => {
        return (
          <TrendingItem
            category={item?.live?.category}
            title={item?.live?.title}
            viewers={item?.live?.viewCount}
            imageUrl={item?.live?.photoUrl}
          />
        );
      },
      data: live_streams,
    },
    {
      id: '5',
      title: '',
      renderItem: ({item, index}) => {
        return <InviteFriendsCard />;
      },
      data: [1],
    },
    {
      id: '6',
      title: 'New Live',
      renderItem: ({item, index}) => {
        return (
          <StreamItem
            category={item?.live?.category}
            title={item?.live?.title}
            description={item?.live?.description}
            viewers={item?.live?.viewCount}
            imageUrl={item?.live?.photoUrl}
            profileImageUrl={item?.live?.user?.photoUrl}
            live={item?.live}
            recordEnded={item?.recordEnded}
          />
        );
      },
      data: new_lives,
    },
  ];

  const SectionRenderItem = ({item}: {item: SectionData}) => {
    return (
      item?.data?.length > 0 && (
        <VStack>
          {item.title && (
            <HStack justifyContent="space-between" mb={16}>
              <AppText fontSize={18} fontWeight={'600'}>
                {item.title}
              </AppText>
              {item.data?.length > 4 && (
                <AppTouchable onPress={() => {}}>
                  <AppText color={Colors.GARY_3}>See more</AppText>
                </AppTouchable>
              )}
            </HStack>
          )}
          <FlatList
            keyExtractor={_i => _i?.title}
            horizontal
            showsHorizontalScrollIndicator={false}
            data={item.data}
            renderItem={item.renderItem}
          />
        </VStack>
      )
    );
  };

  return (
    <AppContainer>
      <HomeHeader />
      <CategorySelector
        selected={selectedCategory}
        setSelected={setSelectedCategory}
      />
      <FlatList
        keyExtractor={_i => _i?.id}
        showsVerticalScrollIndicator={false}
        data={sections}
        contentContainerStyle={{gap: 16, margin:10}}
        renderItem={({item}) => <SectionRenderItem item={item} />}
        ListFooterComponent={<VStack style={{height: 60}} />}
      />
    </AppContainer>
  );
};

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginLeft: 10,
    marginBottom: 10,
  },
});

export default OffersScreen;
