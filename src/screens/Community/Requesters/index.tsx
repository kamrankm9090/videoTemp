import { useRoute } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import {
  AppContainer,
  AppFlatList,
  RequestersItem,
  ScreensHeader,
  SearchBar,
} from '~/components';

export default function RequestersScreen() {
  const route: any = useRoute();
  const allRequesters = route?.params?.item?.requests || [];

  const [searchText, setSearchText] = useState('');
  const [filteredRequesters, setFilteredRequesters] = useState(allRequesters);

  useEffect(() => {
    if (!searchText) {
      setFilteredRequesters(allRequesters);
    } else {
      const lowercased = searchText.toLowerCase();
      const filtered = allRequesters.filter((req: any) =>
        (req.name || '').toLowerCase().includes(lowercased)
      );
      setFilteredRequesters(filtered);
    }
  }, [searchText, allRequesters]);

  const renderItem = ({ item }: any) => <RequestersItem {...item} />;

  return (
    <AppContainer>
      <ScreensHeader title="Requesters" backAction />
      <SearchBar onSearch={setSearchText} />
      <AppFlatList data={filteredRequesters} renderItem={renderItem} />
    </AppContainer>
  );
}
