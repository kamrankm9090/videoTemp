import React, {useState} from 'react';
import { StyleSheet } from 'react-native';
import {ChevronBack} from '~/assets/svgs';
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
import {Colors} from '~/styles';

export default function CommunityScreen() {
  const [tab, setTab] = useState('Your communities');

  const renderItem = () => {
    return <CommunityItem />;
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
    <AppContainer >
      <ScreensHeader title="Community" />
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
      <SearchBar onSearch={t => console.log(t)} />
      <AppFlatList
        data={[1, 2]}
        renderItem={renderItem}
        ListFooterComponent={ListFooterComponent}
      />
    </AppContainer>
  );
}

const styles = StyleSheet.create({
  chvron:{transform: [{rotate: '270deg'}]}
})
