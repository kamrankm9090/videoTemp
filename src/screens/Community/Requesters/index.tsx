import React, {useState} from 'react';
import {
  AppContainer,
  AppFlatList,
  RequestersItem,
  ScreensHeader,
  SearchBar,
} from '~/components';

export default function RequestersScreen() {
  const renderItem = () => {
    return <RequestersItem />;
  };

  return (
    <AppContainer>
      <ScreensHeader title="Requesters" />
      <SearchBar onSearch={t => {}} />
      <AppFlatList data={[1, 2]} renderItem={renderItem} />
    </AppContainer>
  );
}
