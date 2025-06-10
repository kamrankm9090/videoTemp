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

const TotalIncomeScreen = () => {
  const renderItem = useCallback(
    ({item}) => <SavedItem {...{item}} type="income" />,
    [],
  );

  return (
    <AppContainer>
      <AppHeader
        title="Total Income"
        titleColor={Colors.WHITE}
        backgroundColor={Colors.BACKGROUND}
        backAction
      />
      <AppFlatList
        spaceY={scale(25)}
        style={{flex: 1}}
        data={['']}
        renderItem={renderItem}
        contentContainerStyle={styles.contentContainerStyle}
        ListEmptyComponent={<Empty text={'You have no\nIncome yet!'} />}
      />
    </AppContainer>
  );
};

export default TotalIncomeScreen;

const styles = StyleSheet.create({
  contentContainerStyle: {
    paddingTop: scale(15),
    paddingBottom: scale(30),
  },
});
