import React, {useCallback} from 'react';
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
import {TabRoute} from '~/components/molecules/CollapsibleTabView';
import TabsFlatlist from '~/components/molecules/CollapsibleTabView/TabsFlatList';
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
};

export default function ProfileScreen() {
  function logoutOnPress() {
    logout();
  }

  const data = Array.from({length: 5}, (_, i) => ({
    name: `Item ${i + 1}`,
  }));

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
    <AppContainer isLoading={false} loadingComponent={<ProfilePlaceholder />}>
      <Tabs routes={routes} renderHeader={renderHeader}>
        <TabsFlatlist
          key="content"
          data={data}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          {...commonOptionsList}
        />
        <TabsFlatList
          key="offers"
          data={data}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          {...commonOptionsList}
        />
      </Tabs>
    </AppContainer>
  );
}
