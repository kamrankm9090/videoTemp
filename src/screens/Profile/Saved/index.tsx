import React, {useCallback} from 'react';
import {StyleSheet} from 'react-native';
import {
  AppContainer,
  AppFlatList,
  AppHeader,
  Empty,
  SavedItem,
} from '~/components';
import {Colors} from '~/styles';
import {scale} from '~/utils/style';

const SavedScreen = () => {
  const renderItem = useCallback(({item}) => <SavedItem {...{item}} />, []);

  return (
    <AppContainer>
      <AppHeader
        title="Saved"
        titleColor={Colors.WHITE}
        backgroundColor={Colors.BACKGROUND}
        backAction
      />
      <AppFlatList
        spaceY={scale(25)}
        style={{flex: 1}}
        data={[]}
        renderItem={renderItem}
        contentContainerStyle={styles.contentContainerStyle}
        ListEmptyComponent={<Empty text={'You have no\nSaves yet!'} />}
      />
    </AppContainer>
  );
};

export default SavedScreen;

const styles = StyleSheet.create({
  contentContainerStyle: {
    paddingTop: scale(15),
    paddingBottom: scale(30),
  },
});
