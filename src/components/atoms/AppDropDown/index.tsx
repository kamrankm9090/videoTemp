import React, {useCallback, useRef} from 'react';
import {useController} from 'react-hook-form';
import {StyleSheet, ViewStyle} from 'react-native';
import {
  ActionSheetContainer,
  AppContainer,
  AppFlatList,
  AppPressable,
  AppSelect,
  AppText,
  Box,
  SearchInput,
} from '~/components';
import {Colors} from '~/styles';
import {fontSize, height} from '~/utils/style';

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
};

const AppDropDown = React.forwardRef(
  ({
    name,
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
  }: Props) => {
    const {field} = useController({name});
    const modalRef = useRef<ModalRef>(null);

    function onPressHandler() {
      modalRef.current?.open();
    }

    function closeModal() {
      modalRef.current?.close();
    }

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
          closeModal();
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
      <AppContainer>
        <AppSelect
          name={name}
          label={label}
          onPress={onPressHandler}
          titleKey={titleKey}
          disabled={disabled}
          mb={mb}
        />
        <ActionSheetContainer
          isLoading={loading}
          minHeight={height * 0.8}
          scrollable={false}
          ref={modalRef}>
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
      </AppContainer>
    );
  },
);

AppDropDown.displayName = 'AppDropDown';

export default AppDropDown;

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
