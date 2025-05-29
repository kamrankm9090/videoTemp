import React, {useCallback} from 'react';
import {useController} from 'react-hook-form';
import {StyleSheet, ViewStyle} from 'react-native';
import {SheetProps} from 'react-native-actions-sheet';
import {
  ActionSheetContainer,
  AppFlatList,
  AppPressable,
  AppText,
  Box,
  SearchInput,
} from '~/components';
import {Colors} from '~/styles';
import {fontSize, height} from '~/utils/style';
import {hideSheet} from '~/utils/utils';

type Props = {
  name: string;
  data: any;
  label?: string;
  placeholder?: string;
  loading?: boolean;
  titleKey?: string;
  nestedTitleKey?: string;
  valueKey?: string;
  onSubmitSearch?: (val: string) => void;
  onChange?: (val: any) => void;
  disabled?: boolean;
  isObject?: boolean;
  optional?: boolean;
  searchable?: boolean;
  onLoadMore?: () => void;
  mb?: ViewStyle['marginBottom'];
  backgroundColor?: ViewStyle['backgroundColor'];
};

const DropDownActionSheet = (props: SheetProps<'drop-down-action-sheet'>) => {
  const {
    name,
    control,
    data,
    label,
    loading,
    titleKey = 'title',
    nestedTitleKey,
    valueKey = 'value',
    onSubmitSearch = () => {},
    onChange,
    disabled,
    isObject = true,
    searchable = true,
    onLoadMore,
    mb,
    backgroundColor,
  } = props?.payload ?? {};

  const {field} = useController({name, control});

  const renderItem = useCallback(
    ({item}: {item: any}) => {
      const isActive = isObject
        ? item?.[valueKey] === field.value?.[valueKey]
        : item === field.value;
      const color = isActive ? Colors.PRIMARY : Colors.WHITE;

      function itemOnPress() {
        if (isActive) {
          field.onChange(undefined);
          onChange?.(undefined);
        } else {
          field.onChange?.(item);
          onChange?.(item);
        }
        hideSheet('drop-down-action-sheet');
      }

      return (
        <AppPressable
          style={({pressed}) => [
            styles.option,
            pressed && styles.optionPressed,
          ]}
          onPress={itemOnPress}>
          <AppText
            color={color}
            fontFamily="regular"
            fontSize={fontSize.medium}
            flex={1}>
            {isObject ? item[titleKey] : item}{' '}
            {nestedTitleKey && `(${item?.[nestedTitleKey]})`}
          </AppText>
        </AppPressable>
      );
    },
    [field, titleKey, isObject, nestedTitleKey, valueKey, onChange],
  );
  return (
    <ActionSheetContainer
      isLoading={loading}
      minHeight={height * 0.8}
      scrollable={false}>
      <Box flexGrow={1}>
        {searchable && <SearchInput onChange={onSubmitSearch} />}
        <AppFlatList
          data={data ?? []}
          keyboardDismissMode="on-drag"
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={styles.contentContainerStyle}
          renderItem={renderItem}
          hasItemSeparatorComponent={false}
          keyValue={valueKey}
          isLoading={loading}
          onEndReached={onLoadMore}
        />
      </Box>
    </ActionSheetContainer>
  );
};

export default DropDownActionSheet;

const styles = StyleSheet.create({
  contentContainerStyle: {
    flexGrow: 1,
    paddingBottom: 54,
    paddingTop: 16,
  },
  option: {
    borderRadius: 8,
    paddingVertical: 16,
    paddingHorizontal: 8,
  },
  optionPressed: {
    backgroundColor: Colors.WHITE_TRANSPARENT_1,
  },
});
