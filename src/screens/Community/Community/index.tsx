import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import {ChevronBack, NoCommunityIcon, Plus1Icon} from '~/assets/svgs';
import {
  AppContainer,
  AppFlatList,
  AppText,
  AppTouchable,
  CommunityItem,
  HStack,
  ScreensHeader,
  SearchBar,
  VStack,
} from '~/components';
import CommunityPlaceholder from '~/components/placeholders/CommunityPlaceholder';
import {
  SortEnumType,
  useInfiniteCommunity_GetCommunitiesQuery,
} from '~/graphql/generated';
import {userDataStore} from '~/stores';
import {Colors} from '~/styles';
import {showSheet} from '~/utils/utils';

export default function CommunityScreen() {
  const userData = userDataStore(state => state?.userData);
  const [tab, setTab] = useState('Your communities');
  const [search, setSearch] = useState('');

  const {data, hasNextPage, fetchNextPage, refetch, isRefetching, isLoading} =
    useInfiniteCommunity_GetCommunitiesQuery({
      where: {
        title: {
          startsWith: search,
        },
        users: {
          some: {
            userId: {
              [tab === 'Your communities' ? 'eq' : 'neq']: userData?.id,
            },
          },
        },
      },
      order: {
        createdDate: SortEnumType.Desc,
      },
    });

  const commData = data?.pages?.[0]?.community_getCommunities?.result?.items;

  const renderItem = ({item}: any) => {
    return <CommunityItem item={item} isMyComm={tab === 'Your communities'} />;
  };

  const ListFooterComponent = () => {
    return (
      commData &&
      commData.length > 2 && (
        <AppTouchable m={8} alignSelf="center">
          <HStack gap={8}>
            <AppText fontSize={14} fontWeight={'500'} textAlign="center">
              See more
            </AppText>
            <ChevronBack style={styles.chvron} />
          </HStack>
        </AppTouchable>
      )
    );
  };

  const ListEmptyComponent = () => {
    return isLoading ? (
      <CommunityPlaceholder />
    ) : (
      <VStack flexGrow={1} justifyContent="center" alignItems="center">
        <NoCommunityIcon />
        <AppText
          fontSize={18}
          fontWeight={'500'}
          color={Colors.GARY_4}
          paddingTop={16}>
          You have no communities yet!
        </AppText>
      </VStack>
    );
  };
  return (
    <AppContainer>
      <ScreensHeader
        title="Community"
        rightHeader={
          <AppTouchable onPress={() => showSheet('create-community-action')}>
            <Plus1Icon />
          </AppTouchable>
        }
      />
      <HStack
        bg={Colors.NERO}
        p={8}
        borderRadius={4}
        justifyContent="space-around">
        {['Your communities', 'Others communities'].map(i => {
          return (
            <AppTouchable
              py={8}
              px={20}
              bg={tab === i ? Colors.NIGHT_RIDER : Colors.NERO}
              borderRadius={4}
              onPress={() => setTab(i)}>
              <AppText fontWeight={tab === i ? '500' : '400'}>{i}</AppText>
            </AppTouchable>
          );
        })}
      </HStack>
      <SearchBar onSearch={setSearch} />
      <AppFlatList
        data={commData || []}
        renderItem={renderItem}
        refreshing={isRefetching}
        onRefresh={refetch}
        ListFooterComponent={ListFooterComponent}
        ListEmptyComponent={ListEmptyComponent}
        onEndReached={() => {
          if (hasNextPage) {
            fetchNextPage();
          }
        }}
      />
    </AppContainer>
  );
}

const styles = StyleSheet.create({
  chvron: {transform: [{rotate: '270deg'}]},
});
