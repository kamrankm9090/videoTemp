import React from 'react';
import {StyleSheet, View} from 'react-native';
import { SearchStatusIcon } from '~/assets/svgs';
import {AppText, AppTouchable, HStack} from '~/components';
// import {RefreshIcon} from '~/assets/svgs';
import {Colors} from '~/styles';

const SearchFooterStatus = ({
  currentIndex,
  totalCount,
  onShowList,
}: {
  currentIndex: number;
  totalCount: number;
  onShowList: () => void;
}) => {
  return (
    <View style={styles.container}>
      <HStack alignItems="center" gap={8}>
        <SearchStatusIcon />
        <AppText color={Colors.GARY_3}>
          {currentIndex} of {totalCount}
        </AppText>
      </HStack>

      <AppTouchable onPress={onShowList}>
        <AppText fontWeight={"600"} color={Colors.PRIMARY} >Show as list</AppText>
      </AppTouchable>
    </View>
  );
};

export default SearchFooterStatus;

const styles = StyleSheet.create({
  container: {
    borderTopWidth: 1,
    borderTopColor: Colors.BORDER,
    backgroundColor: Colors.BACKGROUND,
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  icon: {
    marginRight: 6,
  },
  showListText: {
    color: Colors.PRIMARY,
    fontWeight: '500',
  },
});
