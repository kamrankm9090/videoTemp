import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import {ChevronBack, Plus1Icon} from '~/assets/svgs';
import {
  AppContainer,
  AppFlatList,
  AppText,
  AppTouchable,
  CommunityItem,
  HStack,
  ScreensHeader,
  SearchBar,
} from '~/components';
import { useCommunity_GetCommunitiesQuery } from '~/graphql/generated';
import {Colors} from '~/styles';
import {showSheet} from '~/utils/utils';

export default function CommunityScreen() {
  const [tab, setTab] = useState('Your communities');

  const {data} = useCommunity_GetCommunitiesQuery()
  console.log(data);
  const commData = data?.community_getCommunities?.result?.items
  
  const renderItem = ({item}:any) => {
    return <CommunityItem item={item}/>;
  };

  const ListFooterComponent = () => {
    return (
      <AppTouchable m={8} alignSelf="center">
        <HStack gap={8}>
          <AppText fontSize={14} fontWeight={'500'} textAlign="center">
            See more
          </AppText>
          <ChevronBack style={styles.chvron} />
        </HStack>
      </AppTouchable>
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
      <SearchBar onSearch={t => {}} />
      <AppFlatList
        data={commData || []}
        renderItem={renderItem}
        ListFooterComponent={ListFooterComponent}
      />
    </AppContainer>
  );
}

const styles = StyleSheet.create({
  chvron: {transform: [{rotate: '270deg'}]},
});
