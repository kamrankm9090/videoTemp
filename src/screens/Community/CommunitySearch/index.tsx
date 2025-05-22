import React from 'react';
import {StyleSheet} from 'react-native';
import {
  AppContainer,
  AppFlatList,
  CommunityDetailItem,
  CommunitySearchHeader,
  SearchFooterStatus,
  SearchNavControls,
} from '~/components';

const CommunitySearch = () => {
  const renderItem = () => {
    return <CommunityDetailItem />;
  };
  return (
    <AppContainer>
      <CommunitySearchHeader />
      <AppFlatList
        data={[1, 2, 3]}
        keyExtractor={(item, index) => `message-${index}`}
        contentContainerStyle={{padding: 16, paddingBottom: 80}}
        renderItem={renderItem}
      />
      <SearchNavControls />
      <SearchFooterStatus
        currentIndex={1}
        onShowList={() => {}}
        totalCount={2}
      />
    </AppContainer>
  );
};

export default CommunitySearch;

const styles = StyleSheet.create({});
