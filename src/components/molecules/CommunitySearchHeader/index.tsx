import React from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import {SearchIcon} from '~/assets/svgs';
import {AppText, AppTouchable, HStack} from '~/components';
import {Colors} from '~/styles';

const CommunitySearchHeader = ({searchText, setSearchText, onCancel}: any) => {
  return (
    <HStack style={styles.container} alignItems="center">
      <View style={styles.searchBox}>
        <SearchIcon style={styles.icon} />
        <TextInput
          value={searchText}
          onChangeText={setSearchText}
          placeholder="Search This Chat"
          placeholderTextColor={Colors.GARY_3}
          style={styles.input}
        />
      </View>

      <AppTouchable onPress={onCancel}>
        <AppText style={styles.cancelText}>Cancel</AppText>
      </AppTouchable>
    </HStack>
  );
};

export default CommunitySearchHeader;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: Colors.BACKGROUND,
  },
  searchBox: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    paddingHorizontal: 12,
    height: 36,
    marginRight: 12,
    borderColor: Colors.BORDER,
    borderWidth: 1,
    gap: 8,
  },
  icon: {},
  input: {
    flex: 1,
    color: Colors.WHITE,
    paddingVertical: 0,
  },
  cancelText: {
    color: Colors.WHITE,
    fontSize: 16,
  },
});
